
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { AVATARS } from '../constants';

interface AvatarSelectorProps {
  onComplete: (profile: UserProfile) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const saveAvatarToDatabase = async (avatar: string) => {

  const user = JSON.parse(localStorage.getItem("cybershield_user") || "{}");

  await fetch("http://localhost:5000/api/user/update-profile", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      codename: user.name,
      avatar: avatar
    })

  });

};

  const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();
  console.log("Submit clicked");

  if (!name.trim()) {
    console.log("Name empty");
    return;
  }

  await saveAvatarToDatabase(selectedAvatar);

  const user = JSON.parse(localStorage.getItem("cybershield_user") || "{}");

  user.avatar = selectedAvatar;

  localStorage.setItem("cybershield_user", JSON.stringify(user));

  onComplete({
    name,
    avatar: selectedAvatar,
    level: 1,
    xp: 0,
    streak: 1,
    completedMissions: []
  });

};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
      <div className="w-full max-w-md p-8 rounded-3xl glass-card shadow-2xl border border-blue-500/30">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Welcome, Recruit
        </h1>
        <p className="text-slate-400 text-center mb-8">Set up your operative profile to begin training.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {AVATARS.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setSelectedAvatar(url)}
                  className={`relative p-1 rounded-full transition-all duration-300 ${
                    selectedAvatar === url ? 'ring-4 ring-blue-500 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="Avatar" className="w-16 h-16 rounded-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Codename</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. GhostProtocol"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg shadow-blue-900/40 transition-all active:scale-95"
          >
            INITIALIZE TRAINING
          </button>
        </form>
      </div>
    </div>
  );
};

export default AvatarSelector;
