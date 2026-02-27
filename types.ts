export type ProfessorTheme = 'logic' | 'hardware' | 'math' | 'web' | 'db' | 'manager' | 'sysop' | 'network' | 'parallel' | 'distributed';

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

export interface WrappedData {
  // Slide 2: Carga Horária
  totalHours: number;
  timeStudying: number;
  timeUnderstanding: number;

  // Slide 3: Extrato da Disciplina
  receiptItems: { name: string; cost: string }[];

  // Slide 4: Ranking de Grupos
  groupRanking: { name: string; emoji: string; count: number }[];

  // Slide 5: Métricas de Estresse
  stressBars: { discipline: string; topic: string; level: number }[];
  peakSeason: { event: string; intensity: string };

  // Slide 6: Aura Docente
  aura: { color: string; vibe: string; attributes: { name: string; value: number }[] };

  // Slide 7: Sobrevivência
  survivalRate: number;
  bestSubject: { name: string; grade: number };
  worstSubject?: { name: string; grade: number };

  // Slide 8: Arquétipo Tech / Classe RPG
  techArchetype: { name: string; description: string; icon: string };

  // Slide 9: Frases Mais Faladas
  wordCloud: { word: string; count: number }[];

  // Slide 10: Trilha Sonora
  soundtrack: { song: string; artist: string; reason: string; coverColor: string; spotifyUrl?: string };

  // Slide 11: Badge Final
  finalBadge: string;
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
  codeName: string; // Apelido secreto para autenticação do certificado
  quiz: { id: number, question: string, options: string[], answer: number }[]; // Questões da prova final
  wrapped: WrappedData;
  muralItems: MuralItem[]; // Items for the corkboard
}

export type AppState = 'BOOT' | 'LOGIN' | 'TRANSITION' | 'WRAPPED';