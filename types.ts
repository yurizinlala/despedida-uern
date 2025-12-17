export type ProfessorTheme = 'logic' | 'hardware' | 'math' | 'web' | 'db' | 'manager' | 'sysop';

export type MuralItemType = 'note' | 'postit' | 'polaroid' | 'tape' | 'sticker';

export interface MuralItem {
  id: string;
  type: MuralItemType;
  content: string; // Text text or Image URL
  style?: {
    x?: number; // Random initial position %
    y?: number;
    rotation?: number;
    color?: string; // For post-its
    width?: string;
  };
  meta?: string; // Caption for polaroids, or youtube ID for tapes
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  unlocked: boolean;
}

export interface WrappedData {
  receiptItems: { name: string; cost: string }[];
  survivalRate: number; // 0 to 100
  techArchetype: { name: string; description: string; icon: string };
  peakSeason: { event: string; intensity: string }; 
  wordCloud: string[];
  soundtrack: { song: string; artist: string; reason: string; coverColor: string };
  aura: { color: string; vibe: string };
  finalBadge: string;
  
  // New Data Fields
  totalHours: number; // Horas totais de "sofrimento"
  comparison: {
    label: string;
    studentValue: string;
    profValue: string;
  };
  achievements: Achievement[]; // Conquistas específicas deste professor
}

export interface Professor {
  id: string;
  name: string; // Nome completo oficial
  nickname: string; // Nome para UI
  gender: 'male' | 'female';
  password: string; // Senha para o login fake
  hint: string; // Dica do post-it
  theme: ProfessorTheme;
  subjects: string[]; // Matérias lecionadas (Nomes Reais)
  wrapped: WrappedData;
  muralItems: MuralItem[]; // NEW: Items for the corkboard
}

export type AppState = 'BOOT' | 'LOGIN' | 'TRANSITION' | 'WRAPPED';