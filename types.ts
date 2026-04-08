
export enum AttackCategory {
  PHISHING = 'PHISHING',
  PASSWORD = 'PASSWORD',
  MALWARE = 'MALWARE',
  SOCIAL_ENGINEERING = 'SOCIAL_ENGINEERING'
}

export enum SimulationType {
  PHISHING = 'PHISHING',
  PASSWORD_ATTACK = 'PASSWORD_ATTACK',
  MALWARE_BEHAVIOR = 'MALWARE_BEHAVIOR'
}

export interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  completedMissions: string[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: AttackCategory;
  minLevel: number;
  xpReward: number;
  duration: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MissionResult {
  score: number;
  totalQuestions: number;
  xpEarned: number;
}

export interface SimulationScenario {
  type: SimulationType;
  title: string;
  content: {
    header: string;
    subHeader: string;
    body: string;
  };
  isThreat: boolean;
  redFlags: string[];
}

export interface PhishingScenario {
  id: string;
  sender: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  redFlags: string[];
}
