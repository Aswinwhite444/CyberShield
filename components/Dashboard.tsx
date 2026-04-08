
import React, {useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { MISSIONS, CATEGORY_ICONS, XP_PER_LEVEL } from '../constants';
// Added Lock to the imports to resolve conflict with global Lock type from Web Locks API
import { Trophy, Zap, Clock, Shield, Star, Swords, Target, Cpu, Fingerprint, Lock } from 'lucide-react';


interface DashboardProps {
  user: UserProfile;
  onSelectMission: (missionId: string) => void;
  onLaunchSimulation: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectMission, onLaunchSimulation }) => {
  const currentXP = user.xp % XP_PER_LEVEL;
  const progressPercent = (currentXP / XP_PER_LEVEL) * 100;
const [activities, setActivities] = useState([]);
useEffect(() => {

  const loadFeed = () => {
    fetch("http://localhost:5000/api/activity/feed")
      .then(res => res.json())
      .then(data => setActivities(data));
  };

  loadFeed();

  const interval = setInterval(loadFeed, 5000); // refresh every 5 sec

  return () => clearInterval(interval);

}, []);



  return (
    <div className="max-w-6xl mx-auto px-6 py-8 pb-24 space-y-12">
      {/* 1st SECTION: OPERATIVE IDENTITY HERO */}
      <section className="relative overflow-hidden rounded-[40px] border border-blue-500/20 bg-slate-900/40 p-1 md:p-2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
        <div className="relative glass-card rounded-[36px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          
          {/* Avatar Visual Core */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-700" />
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-blue-500/50 p-2 bg-slate-950 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <img 
                src={user.avatar} 
                alt="Operative" 
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute -bottom-2 right-4 bg-blue-600 text-white px-4 py-1 rounded-full font-black italic text-sm border-2 border-slate-950 shadow-lg">
                LEVEL_{user.level}
              </div>
            </div>
          </div>

          {/* Operative Stats & Info */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-400 mono text-[10px] font-bold tracking-[0.3em] uppercase">
                <Fingerprint className="w-3 h-3" />
                <span>Verified_Operative</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
                {user.name}
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <p className="text-[10px] text-slate-500 mono uppercase font-bold tracking-widest">XP_Progress</p>
                <div className="flex items-end space-x-2">
                  <span className="text-xl font-black text-white">{currentXP}</span>
                  <span className="text-xs text-slate-500 mb-1">/ {XP_PER_LEVEL}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <p className="text-[10px] text-slate-500 mono uppercase font-bold tracking-widest">Active_Streak</p>
                <div className="flex items-center space-x-2">
                 <span className="text-xl font-black text-white flex items-center gap-2">
                 {user.streak >= 5 ? "🔥" : "⚡"} {user.streak} DAYS
                </span>
</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1 hidden md:block">
                <p className="text-[10px] text-slate-500 mono uppercase font-bold tracking-widest">Ops_Completed</p>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-blue-500" />
                  <span className="text-xl font-black text-white">{user.completedMissions.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-32 bg-white/10" />

          {/* Rapid Action Widget */}
          <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-4 px-4">
              <div className="p-4 rounded-full bg-blue-500/10 border border-blue-500/20 animate-pulse">
                <Cpu className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-[10px] font-bold mono text-slate-500 uppercase tracking-widest">System_Status</p>
              <span className="text-xs font-bold text-green-500 mono">OPTIMAL</span>
          </div>
        </div>
      </section>

      {/* 2nd SECTION: TRAINING MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button 
          onClick={onLaunchSimulation}
          className="relative group overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-blue-700 to-indigo-900 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-blue-900/40 border border-white/10"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-700">
            <Swords className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col items-start text-left">
            <div className="p-4 bg-white/10 rounded-2xl mb-6 backdrop-blur-md border border-white/10 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">Live_Simulator</h2>
            <p className="text-blue-100/70 mb-8 max-w-[280px] text-sm leading-relaxed">Engage in high-fidelity simulations of Phishing, Malware, and System Intrusion events.</p>
            <div className="flex items-center space-x-3 bg-white text-blue-900 px-6 py-3 rounded-xl font-black italic uppercase tracking-widest text-sm group-hover:bg-blue-50 transition-colors">
              <span>Enter_Sandbox</span>
              <Target className="w-4 h-4" />
            </div>
          </div>
        </button>

        <div className="glass-card rounded-[32px] p-8 flex flex-col border-slate-800/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
               <div className="p-2 bg-cyan-500/10 rounded-lg"><Clock className="w-5 h-5 text-cyan-400" /></div>
               <h3 className="text-lg font-black italic text-white uppercase tracking-tight">
                LIVE_THREAT_FEED
               </h3>
            </div>
            <span className="text-[10px] font-bold text-green-400 mono bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">LIVE</span>
          </div>
          <div className="text-sm text-slate-300 space-y-3 mt-4 mb-8">

  {activities.length === 0 ? (

    <div className="text-center text-slate-500 py-4">
      System monitoring active...
      <br />
      Awaiting cyber threat activity...
    </div>

  ) : (

    activities.map((a: any, i: number) => (
  <div 
    key={i} 
    className="flex justify-between border-b border-slate-800 pb-2"
  >
    <span>
      ⚡ <b>{a.codename}</b> {a.action}

      <span className="text-xs text-slate-500 ml-2">
        {new Date(a.createdAt).toLocaleTimeString()}
      </span>

    </span>

    <span className="text-cyan-400 font-bold">
      +{a.xp} XP
    </span>
  </div>
))

  )}

</div>
          <div className="mt-auto flex space-x-2">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className={`flex-1 h-3 rounded-xl transition-all duration-500 ${i <= user.streak ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-800 border border-white/5'}`} />
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mono mt-3 font-bold uppercase tracking-widest text-center">Current_Streak: {user.streak}_Days</p>
        </div>
      </div>

      {/* 3rd SECTION: MISSION COMMAND */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-3" /> Operational_Missions
          </h3>
          <div className="hidden sm:flex space-x-2">
             <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400 mono">ALL_DEPARTMENTS</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MISSIONS.map((mission) => {
            const isLocked = user.level < mission.minLevel;
            const isCompleted = user.completedMissions.includes(mission.id);
            
            return (
              <button
                key={mission.id}
                disabled={isLocked}
                onClick={() => onSelectMission(mission.id)}
                className={`text-left glass-card p-6 rounded-[28px] border-2 transition-all relative overflow-hidden group ${
                  isLocked ? 'opacity-40 grayscale cursor-not-allowed border-slate-900' : 'hover:border-blue-500/50 hover:bg-blue-500/5 hover:-translate-y-2 active:translate-y-0 border-white/5'
                } ${isCompleted ? 'border-green-500/40 bg-green-500/5' : ''}`}
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <div className="p-1.5 bg-green-500 rounded-full shadow-lg shadow-green-900/40">
                      <Shield className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                )}
                
                <div className={`p-4 rounded-2xl mb-6 w-fit transition-all group-hover:scale-110 ${isLocked ? 'bg-slate-800' : 'bg-blue-600 shadow-xl shadow-blue-900/20 text-white'}`}>
                  {CATEGORY_ICONS[mission.category]}
                </div>
                
                <h4 className="font-black italic text-white mb-2 line-clamp-1 uppercase tracking-tight">{mission.title}</h4>
                <p className="text-xs text-slate-400 mb-8 line-clamp-2 h-10 leading-relaxed font-medium">
                  {mission.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center text-[10px] font-bold text-slate-500 mono uppercase tracking-widest">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {mission.duration}
                  </div>
                  <div className="flex items-center text-[10px] font-black text-blue-400 mono uppercase tracking-widest">
                    <Zap className="w-3 h-3 mr-1" />
                    {mission.xpReward}_XP
                  </div>
                </div>

                {isLocked && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4">
                    <Lock className="w-6 h-6 text-slate-500 mb-2" />
                    <span className="bg-slate-800 text-white text-[10px] font-black px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-widest">
                      REQ_LVL_{mission.minLevel}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
