
import React, { useState, useEffect } from 'react';
import { UserProfile, QuizQuestion } from './types';
import { MISSIONS, XP_PER_LEVEL } from './constants';
import { QUIZ_REPOSITORY } from './data/trainingData';
import AvatarSelector from './components/AvatarSelector';
import Dashboard from './components/Dashboard';
import Simulation from './components/Simulation';
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import AuthPortal from "./components/AuthPortal";
import { LogOut } from "lucide-react";


import { 
  Shield, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Home, 
  ChevronLeft,
  X,
  Loader2,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Zap
} from 'lucide-react';


const App: React.FC = () => {
  

  const session = localStorage.getItem("cybershield_session");
  const [activeView, setActiveView] = useState<'dashboard' | 'simulation' | 'quiz' | 'results'>('dashboard');
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(() => {
  try {
    const savedUser = localStorage.getItem("cybershield_user");

    if (!savedUser || savedUser === "undefined") {
      return null;
    }


    return JSON.parse(savedUser);
  } catch {
    return null;
  }
});

  useEffect(() => {
    if (user) {
      localStorage.setItem("cybershield_user", JSON.stringify(user));
    }
  }, [user]);

  const updateProgression = (xpGain: number) => {
    if (!user) return;
    
    const newXP = user.xp + xpGain;
    const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
    const leveledUp = newLevel > user.level;

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedMissions: activeMissionId && !prev.completedMissions.includes(activeMissionId) 
          ? [...prev.completedMissions, activeMissionId] 
          : prev.completedMissions
      };
    });

    if (leveledUp) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  };

  const launchMission = async (missionId: string) => {
    const mission = MISSIONS.find(m => m.id === missionId);
    if (!mission) return;

    setActiveMissionId(missionId);
    setActiveView('quiz');
    setQuizLoading(true);

    // Simulate loading for effect
    setTimeout(() => {
      const allCategoryQuestions = QUIZ_REPOSITORY[mission.category] || [];
      // Shuffle and pick 3
      const shuffled = [...allCategoryQuestions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      setQuizQuestions(selected);
      setCurrentQuestionIndex(0);
      setCorrectCount(0);
      setQuizAnswered(null);
      setQuizLoading(false);
    }, 800);
  };
const handleAvatarComplete = (profile: UserProfile) => {

  // save user profile in browser storage
  localStorage.setItem("cybershield_user", JSON.stringify(profile));

  // update app state
  setUser(profile);
};
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizAnswered(null);
    } else {
      setActiveView('results');
    }
  };

  const handleAnswer = (index: number) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(index);
    if (index === quizQuestions[currentQuestionIndex].correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const finishMission = () => {

  if (!activeMissionId) return;   // prevents duplicate XP

  const mission = MISSIONS.find(m => m.id === activeMissionId);
  const baseXP = mission?.xpReward || 0;
  const performanceMultiplier = quizQuestions.length > 0 ? correctCount / quizQuestions.length : 0;
  const earnedXP = Math.round(baseXP * performanceMultiplier);

  updateProgression(earnedXP);



  fetch("http://localhost:5000/api/activity/log", {

  method: "POST",

  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    codename: user?.name,
    action: "completed mission",
    xp: earnedXP
  })

});

fetch("http://localhost:5000/api/user/save-mission", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    codename: user?.name,
    missionId: activeMissionId
  })
});

fetch("http://localhost:5000/api/user/update-streak", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    codename: user?.name
  })
});
  setActiveMissionId(null);   // important: reset mission
  setActiveView('dashboard');

  fetch("http://localhost:5000/api/user/update-xp", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      codename: user?.name,
      xp: earnedXP
    })
  });

  fetch("http://localhost:5000/api/score", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      codename: user?.name,
      score: earnedXP
    })
  });

  

};

  const handleLogout = () => {

  localStorage.removeItem("cybershield_session");

  window.location.reload();


};

  if (!session) {
  return (
    <AuthPortal
  onAuthSuccess={(backendUser) => {

  localStorage.setItem("cybershield_session", "true");

  const profile: UserProfile = {
  name: backendUser.codename,
  avatar: backendUser.avatar || "",
  level: backendUser.level || 1,
  xp: backendUser.xp || 0,
  streak: backendUser.streak || 1,
  completedMissions: backendUser.completedMissions || []
};

  localStorage.setItem("cybershield_user", JSON.stringify(profile));
  setUser(profile);

 
}}
/>
  );
}


if (user && (!user.avatar || user.avatar === "")) {
  return <AvatarSelector onComplete={handleAvatarComplete} />;
}
if (!user) {
  return null;
}

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-blue-500/30">
      {showLevelUp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-blue-600 text-white px-12 py-8 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.6)] border-4 border-white/20 animate-bounce">
            <h2 className="text-4xl font-black italic tracking-tighter text-center">LEVEL UP!</h2>
            <p className="text-center font-bold text-blue-100">ACCESS LEVEL {user.level} GRANTED</p>
          </div>
        </div>
      )}

      <nav className="glass-card sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-white leading-tight">CyberShield</h1>
            <p className="text-[10px] text-blue-400 font-bold mono tracking-[0.2em] uppercase">Offline Training Core</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 bg-slate-900/50 p-1.5 pr-4 rounded-full border border-slate-800">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 overflow-hidden">
                <img src={user?.avatar || "/avatars/avatar1.png"} alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold text-white mono">LVL.{user?.level}</span>
          </div>
          <button
  onClick={handleLogout}
  className="p-2 bg-red-600 rounded-xl hover:bg-red-500"
>
  <LogOut size={18} />
</button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        {activeView === 'dashboard' && (
  <div className="px-6 py-8 space-y-10">
    
    <Dashboard 
      user={user} 
      onSelectMission={launchMission} 
      onLaunchSimulation={() => setActiveView('simulation')} 
    />

    {/* Leaderboard Section */}
    <div className="max-w-4xl mx-auto glass-card p-8 rounded-3xl border border-blue-500/20">
      <h2 className="text-xl font-bold text-white mb-4 mono uppercase tracking-wider">
        Top Cyber Defenders
      </h2>

      <Leaderboard />

    </div>

  </div>
)}

        {activeView === 'simulation' && (
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
              <button onClick={() => setActiveView('dashboard')} className="flex items-center text-slate-400 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" /> RETURN_TO_BASE
              </button>
              <h2 className="text-xl font-bold mono tracking-tighter uppercase">Simulation_Active</h2>
              <div className="w-10 h-10" />
            </div>
            <Simulation 
  onComplete={(xp) => {

    updateProgression(xp);
     //mkn tht bx prctcl
  fetch("http://localhost:5000/api/activity/log", {

  method: "POST",

  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({

    codename: user?.name,
    action: "neutralized a cyber threat",
    xp: xp

  })

});

    // Save score
    fetch("http://localhost:5000/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        codename: user?.name,
        score: xp
      })
    });

    // Save XP
    fetch("http://localhost:5000/api/user/update-xp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        codename: user?.name,
        xp: xp
      })
    });

    setActiveView('dashboard');

  }} 
/>
          </div>
        )}

        {activeView === 'quiz' && (
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto mb-8">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => { setActiveView('dashboard'); setActiveMissionId(null); }} className="p-2 hover:bg-slate-900 rounded-lg transition-colors text-slate-400">
                      <X className="w-6 h-6" />
                    </button>
                    <div>
                      <h3 className="text-lg font-bold mono uppercase">Mission_Ongoing</h3>
                      <p className="text-[10px] text-blue-500 font-bold mono tracking-[0.2em] uppercase">{activeMissionId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mono">STEP</p>
                    <p className="font-bold mono">{currentQuestionIndex + 1} / {quizQuestions.length}</p>
                  </div>
               </div>
               <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / (quizQuestions.length || 1)) * 100}%` }} />
               </div>
            </div>

            {quizLoading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-6">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                <p className="text-slate-400 mono animate-pulse">DECRYPTING_MODULES...</p>
              </div>
            ) : quizQuestions[currentQuestionIndex] ? (
              <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
                <div className="glass-card p-10 rounded-3xl border-slate-800 relative overflow-hidden">
                  <h2 className="text-2xl font-bold mb-10 leading-relaxed text-slate-100">
                    {quizQuestions[currentQuestionIndex].question}
                  </h2>
                  <div className="grid gap-4">
                    {quizQuestions[currentQuestionIndex].options.map((option, index) => {
                      const isCorrect = index === quizQuestions[currentQuestionIndex].correctIndex;
                      const isSelected = index === quizAnswered;
                      let variant = quizAnswered === null ? 'default' : (isCorrect ? 'correct' : (isSelected ? 'incorrect' : 'dimmed'));

                      return (
                        <button key={index} disabled={quizAnswered !== null} onClick={() => handleAnswer(index)} className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between ${
                            variant === 'default' ? 'border-slate-800 hover:border-blue-500 hover:bg-blue-500/5' :
                            variant === 'correct' ? 'border-green-500 bg-green-500/10 text-green-400' :
                            variant === 'incorrect' ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-slate-900 opacity-40 grayscale'
                          }`}>
                          <span className="font-medium text-lg">{option}</span>
                          {variant === 'correct' && <CheckCircle2 className="w-6 h-6" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {quizAnswered !== null && (
                  <div className="glass-card p-8 rounded-3xl border-blue-500/30 bg-blue-500/5 animate-in slide-in-from-top-4">
                    <div className="flex items-start space-x-4 mb-6">
                        <div className="p-3 bg-blue-600/20 rounded-xl"><Zap className="w-6 h-6 text-blue-400" /></div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Analysis</h4>
                            <p className="text-slate-300 leading-relaxed text-lg">{quizQuestions[currentQuestionIndex].explanation}</p>
                        </div>
                    </div>
                    <button onClick={handleNextQuestion} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black italic rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-xl">
                      <span>{currentQuestionIndex < quizQuestions.length - 1 ? 'NEXT_PHASE' : 'FINALIZE_OP'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {activeView === 'results' && (
            <div className="px-6 py-24 flex items-center justify-center">
                <div className="max-w-md w-full glass-card p-12 rounded-[40px] border-blue-500/20 text-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
                            <Trophy className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black italic tracking-tighter text-white mb-2 uppercase tracking-widest">Op_Complete</h2>
                        <p className="text-slate-500 mono text-sm">SUMMARY_LOG_GENERATED</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                            <p className="text-[10px] text-slate-500 mono uppercase mb-1">ACCURACY</p>
                            <p className="text-3xl font-black text-white">{quizQuestions.length > 0 ? Math.round((correctCount / quizQuestions.length) * 100) : 0}%</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                            <p className="text-[10px] text-slate-500 mono uppercase mb-1">XP_GAIN</p>
                            <p className="text-3xl font-black text-blue-400">+{Math.round((MISSIONS.find(m => m.id === activeMissionId)?.xpReward || 0) * (quizQuestions.length > 0 ? correctCount / quizQuestions.length : 0))}</p>
                        </div>
                    </div>
                    <button onClick={finishMission} className="w-full py-5 bg-white text-slate-950 font-black italic rounded-2xl hover:scale-105 transition-all shadow-xl">
                        RETURN_TO_DASHBOARD
                    </button>
                </div>
            </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/5 md:hidden px-6 py-4 flex justify-around backdrop-blur-2xl">
        <button onClick={() => setActiveView('dashboard')} className={`p-3 rounded-2xl transition-all ${activeView === 'dashboard' ? 'text-blue-500 bg-blue-500/10 shadow-lg' : 'text-slate-500'}`}>
          <Home className="w-7 h-7" />
        </button>
        <button onClick={() => setActiveView('simulation')} className={`p-3 rounded-2xl transition-all ${activeView === 'simulation' ? 'text-blue-500 bg-blue-500/10 shadow-lg' : 'text-slate-500'}`}>
          <Shield className="w-7 h-7" />
        </button>
        <button className="p-3 rounded-2xl text-slate-500"><BarChart3 className="w-7 h-7" /></button>
        <button className="p-3 rounded-2xl text-slate-500"><Settings className="w-7 h-7" /></button>
      </div>
    </div>
  );
};

export default App;
