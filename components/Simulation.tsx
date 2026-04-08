
import React, { useState, useEffect } from 'react';
import { SIMULATION_REPOSITORY } from '../data/trainingData';
import { SimulationScenario, SimulationType } from '../types';
import { 
  Loader2, 
  ShieldCheck, 
  ShieldAlert, 
  Terminal, 
  Activity, 
  AlertTriangle,
  Zap,
  Mail,
  Lock,
  Bug,
  ChevronRight,
  Crosshair
} from 'lucide-react';

interface SimulationProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
}

const Simulation: React.FC<SimulationProps> = ({ onComplete, onExit }) => {
  const [selectedType, setSelectedType] = useState<SimulationType | 'RANDOM' | null>(null);
  const [scenario, setScenario] = useState<SimulationScenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);

  const startSimulation = (type: SimulationType | 'RANDOM') => {
    setSelectedType(type);
    setLoading(true);
    setRevealed(false);
    setSelectedAnswer(null);
    
    setTimeout(() => {
      let filtered = SIMULATION_REPOSITORY;
      if (type !== 'RANDOM') {
        filtered = SIMULATION_REPOSITORY.filter(s => s.type === type);
      }
      
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setScenario(filtered[randomIndex]);
      setLoading(false);
    }, 800);
  };

  const handleDecision = (isThreat: boolean) => {
    if (revealed) return;
    setSelectedAnswer(isThreat);
    setRevealed(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
          <Loader2 className="relative w-16 h-16 text-blue-500 animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-blue-400 mono animate-pulse uppercase font-bold tracking-widest text-sm">Initializing_Sandbox...</p>
          <p className="text-slate-500 text-[10px] mono uppercase">Allocating_Virtual_Resources</p>
        </div>
      </div>
    );
  }

  // Selection Screen
  if (!selectedType) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Crosshair className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-black mono text-blue-400 uppercase tracking-[0.2em]">Select_Vector</span>
          </div>
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">Choose Your Training Ground</h2>
          <p className="text-slate-400 mt-2 max-w-lg mx-auto">Select a specialized environment to test your defensive capabilities against specific attack patterns.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SimulationOption 
            title="Email Phishing" 
            desc="Analyze corporate communications for spoofing, malicious links, and social engineering red flags."
            icon={<Mail className="w-6 h-6" />}
            color="blue"
            onClick={() => startSimulation(SimulationType.PHISHING)}
          />
          <SimulationOption 
            title="Password Security" 
            desc="Audit authentication logs and identify brute-force patterns or credential harvesting attempts."
            icon={<Lock className="w-6 h-6" />}
            color="purple"
            onClick={() => startSimulation(SimulationType.PASSWORD_ATTACK)}
          />
          <SimulationOption 
            title="Malware Analysis" 
            desc="Monitor system processes and registry changes for signs of ransomware or polymorphic viruses."
            icon={<Bug className="w-6 h-6" />}
            color="red"
            onClick={() => startSimulation(SimulationType.MALWARE_BEHAVIOR)}
          />
          <SimulationOption 
            title="Random Selection" 
            desc="The ultimate test. Jump into a surprise scenario from any of the available training modules."
            icon={<Zap className="w-6 h-6" />}
            color="cyan"
            onClick={() => startSimulation('RANDOM')}
          />
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === scenario?.isThreat;

  const renderContent = () => {
    if (!scenario) return null;

    switch (scenario.type) {
      case SimulationType.PASSWORD_ATTACK:
        return (
          <div className="bg-black/80 p-6 rounded-2xl border border-blue-500/30 font-mono text-sm leading-relaxed overflow-hidden">
            <div className="flex items-center space-x-2 text-blue-500 mb-4 border-b border-blue-500/20 pb-2">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Sys_Auth_Log</span>
            </div>
            <div className="text-green-500 mb-2">[ID: {scenario.content.header}]</div>
            <div className="text-slate-500 mb-4 italic font-bold">{scenario.content.subHeader}</div>
            <div className="text-slate-300 whitespace-pre-wrap">{scenario.content.body}</div>
          </div>
        );
      case SimulationType.MALWARE_BEHAVIOR:
        return (
          <div className="bg-slate-900 p-6 rounded-2xl border border-red-500/20 shadow-inner">
            <div className="flex items-center justify-between mb-4 text-red-400">
               <div className="flex items-center space-x-2"><Activity className="w-4 h-4" /><span className="text-xs font-bold mono">IO_MONITOR</span></div>
               <div className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-bold mono uppercase">Live</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <p className="text-[10px] text-slate-500 mono uppercase mb-1">Process</p>
                    <p className="text-xs font-bold text-white truncate">{scenario.content.header}</p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <p className="text-[10px] text-slate-500 mono uppercase mb-1">CWD</p>
                    <p className="text-xs font-bold text-slate-400 truncate">{scenario.content.subHeader}</p>
                </div>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-white/5 text-slate-300 text-sm">{scenario.content.body}</div>
          </div>
        );
      default:
        return (
          <div className="bg-white text-slate-900 rounded-2xl border-4 border-slate-200 overflow-hidden shadow-2xl">
            <div className="bg-slate-100 p-4 border-b flex justify-between">
               <div className="flex space-x-2"><div className="w-2 h-2 rounded-full bg-slate-400" /><div className="w-2 h-2 rounded-full bg-slate-400" /></div>
               <span className="text-[10px] font-bold text-slate-400 uppercase">Mail_Preview</span>
            </div>
            <div className="p-4 border-b">
                <p className="text-xs font-bold text-slate-500 mb-1">FROM: <span className="text-blue-600 ml-2">{scenario.content.header}</span></p>
                <p className="text-xs font-bold text-slate-500">SUBJ: <span className="ml-2">{scenario.content.subHeader}</span></p>
            </div>
            <div className="p-8 text-sm leading-relaxed min-h-[160px]">{scenario.content.body}</div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">{scenario?.title}</h3>
      </div>

      {renderContent()}

      {!revealed ? (
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleDecision(false)} 
            className="flex flex-col items-center p-6 glass-card rounded-[24px] border-green-500/20 hover:border-green-500/60 hover:bg-green-500/5 transition-all group active:scale-95"
          >
            <div className="p-4 bg-green-500/10 rounded-2xl mb-4 group-hover:bg-green-500/20 transition-colors">
              <ShieldCheck className="w-8 h-8 text-green-500" />
            </div>
            <span className="font-black italic text-white uppercase tracking-widest text-sm">BENIGN_ACTOR</span>
          </button>
          <button 
            onClick={() => handleDecision(true)} 
            className="flex flex-col items-center p-6 glass-card rounded-[24px] border-red-500/20 hover:border-red-500/60 hover:bg-red-500/5 transition-all group active:scale-95"
          >
            <div className="p-4 bg-red-500/10 rounded-2xl mb-4 group-hover:bg-red-500/20 transition-colors">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <span className="font-black italic text-white uppercase tracking-widest text-sm">THREAT_VECTOR</span>
          </button>
        </div>
      ) : (
        <div className={`p-8 rounded-[32px] border-2 animate-in slide-in-from-bottom-8 ${isCorrect ? 'bg-green-500/5 border-green-500/40' : 'bg-red-500/5 border-red-500/40'}`}>
          <div className="flex flex-col items-center text-center space-y-6">
            <div className={`p-4 rounded-full ${isCorrect ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'}`}>
              {isCorrect ? <ShieldCheck className="w-10 h-10 text-white" /> : <AlertTriangle className="w-10 h-10 text-white" />}
            </div>
            <div>
              <h3 className={`text-2xl font-black italic tracking-tighter uppercase ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? 'Analysis_Verified' : 'Containment_Failed'}
              </h3>
              <p className="text-slate-300 text-sm mt-2 font-medium">
                {scenario?.isThreat 
                  ? "Confirmed malicious vector detected. System isolation recommended." 
                  : "Activity verified as legitimate system behavior."
                }
              </p>
            </div>
            <div className="w-full space-y-3 pt-4 border-t border-white/10">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mono">Evidence_Logged</p>
                <div className="grid gap-2">
                    {scenario?.redFlags.map((flag, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start p-3 bg-white/5 rounded-xl border border-white/5 text-left leading-relaxed font-medium">
                      <Zap className="w-3 h-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      {flag}
                    </div>
                    ))}
                </div>
            </div>
            <div className="flex space-x-4 w-full pt-4">
                <button 
                  onClick={() => setSelectedType(null)} 
                  className="flex-1 py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black italic rounded-2xl border border-white/10 transition-all active:scale-95 uppercase text-sm"
                >
                  NEW_VETERAN
                </button>
                <button 
  onClick={() => {
    const xp = isCorrect ? 200 : 50;

    fetch("http://localhost:5000/api/score/update-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "aswin@test.com",
        score: xp
      })
    });

    onComplete(xp);
  }}
                  className={`flex-1 py-4 px-6 font-black italic rounded-2xl transition-all active:scale-95 uppercase text-sm ${isCorrect ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20'}`}
                >
                  EXIT_SANDBOX
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SimulationOptionProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'red' | 'cyan';
  onClick: () => void;
}

const SimulationOption: React.FC<SimulationOptionProps> = ({ title, desc, icon, color, onClick }) => {
  const colorMap = {
    blue: 'border-blue-500/20 hover:border-blue-500/60 bg-blue-500/5 hover:bg-blue-500/10 text-blue-500 shadow-blue-500/5',
    purple: 'border-purple-500/20 hover:border-purple-500/60 bg-purple-500/5 hover:bg-purple-500/10 text-purple-500 shadow-purple-500/5',
    red: 'border-red-500/20 hover:border-red-500/60 bg-red-500/5 hover:bg-red-500/10 text-red-500 shadow-red-500/5',
    cyan: 'border-cyan-500/20 hover:border-cyan-500/60 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-500 shadow-cyan-500/5',
  };

  const iconBgMap = {
    blue: 'bg-blue-500/10',
    purple: 'bg-purple-500/10',
    red: 'bg-red-500/10',
    cyan: 'bg-cyan-500/10',
  };

  return (
    <button
      onClick={onClick}
      className={`text-left p-8 rounded-[32px] border-2 transition-all flex flex-col group active:scale-95 shadow-xl ${colorMap[color]}`}
    >
      <div className={`p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${iconBgMap[color]}`}>
        {icon}
      </div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xl font-black italic text-white uppercase tracking-tight">{title}</h4>
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
      </div>
      <p className="text-slate-400 text-sm leading-relaxed font-medium">
        {desc}
      </p>
    </button>
  );
};

export default Simulation;
