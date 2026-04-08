
import React from 'react';
import { Lock, Mail, Bug, UserCheck } from 'lucide-react';
import { AttackCategory, Mission } from './types';

export const AVATARS = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=Shadow&backgroundColor=0f172a",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Cipher&backgroundColor=0f172a",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Ghost&backgroundColor=0f172a",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Matrix&backgroundColor=0f172a",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Phantom&backgroundColor=0f172a",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Root&backgroundColor=0f172a"
];

export const CATEGORY_ICONS = {
  [AttackCategory.PHISHING]: <Mail className="w-5 h-5" />,
  [AttackCategory.PASSWORD]: <Lock className="w-5 h-5" />,
  [AttackCategory.MALWARE]: <Bug className="w-5 h-5" />,
  [AttackCategory.SOCIAL_ENGINEERING]: <UserCheck className="w-5 h-5" />,
};

export const MISSIONS: Mission[] = [
  {
    id: 'phish-101',
    title: 'Operation Bluefin',
    description: 'Intercept and analyze high-level corporate phishing attempts.',
    category: AttackCategory.PHISHING,
    minLevel: 1,
    xpReward: 350,
    duration: '5 min'
  },
  {
    id: 'pass-master',
    title: 'Entropy Surge',
    description: 'Analyze brute-force resistance and deploy 2FA protocols.',
    category: AttackCategory.PASSWORD,
    minLevel: 1,
    xpReward: 400,
    duration: '8 min'
  },
  {
    id: 'malware-detect',
    title: 'Logic Bomb Defusal',
    description: 'Identify and isolate polymorphic malware signatures.',
    category: AttackCategory.MALWARE,
    minLevel: 2,
    xpReward: 600,
    duration: '10 min'
  },
  {
    id: 'social-ninja',
    title: 'Ghost Protocol',
    description: 'Identify psychological manipulation in human-element attacks.',
    category: AttackCategory.SOCIAL_ENGINEERING,
    minLevel: 3,
    xpReward: 900,
    duration: '15 min'
  }
];

export const XP_PER_LEVEL = 1000;
