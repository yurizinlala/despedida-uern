import React from 'react';
import {
    Laugh, UserX, MapPin, Award, Search, Terminal, Wifi,
    Gamepad2, Sparkles, Music, Headphones, Cat,
    Monitor, Trash2, Cpu, GraduationCap, Bot, TrendingUp, BookOpen,
    Heart, Timer, Download, FastForward, HeartCrack, RotateCcw
} from 'lucide-react';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    points: number; // Gamerscore based on difficulty
}

export const achievements: Achievement[] = [
    // ─── BootSequence ───
    { id: 'funny_guy', title: 'Engraçadinho', description: 'Clicou em "Não" logo de cara', icon: Laugh, points: 10 },
    { id: 'pedro_is_you', title: 'Pedro, é você?', description: 'Negou 3 vezes seguidas', icon: UserX, points: 25 },

    // ─── FakeLogin ───
    { id: 'i_know_this', title: 'Eu conheço esse lugar', description: 'Entrou na tela de login', icon: MapPin, points: 5 },
    { id: 'academic_pride', title: 'Orgulho acadêmico', description: 'Clicou na logo do SIGAA', icon: Award, points: 30 },
    { id: 'curious', title: 'Curioso', description: 'Explorou todas as opções do menu', icon: Search, points: 40 },
    { id: 'hackerman', title: 'Hackerman', description: 'Acertou a senha de primeira', icon: Terminal, points: 50 },
    { id: 'router_admin', title: 'Tá achando que é roteador?', description: 'Tentou "admin" como senha', icon: Wifi, points: 15 },

    // ─── GlitchTransition ───
    { id: '80s_nerd', title: 'Nerd dos anos 80', description: 'Digitou o Código Konami', icon: Gamepad2, points: 75 },

    // ─── WrappedSequence ───
    { id: 'rpg_mode', title: 'Virou RPG agora?', description: 'Viu o card de aura do professor', icon: Sparkles, points: 10 },
    { id: 'dj_mode', title: 'Som na caixa, DJ!', description: 'Chegou na trilha sonora', icon: Music, points: 10 },
    { id: 'spotify_sorry', title: 'Spotify, não me processe', description: 'Assistiu o review completo', icon: Headphones, points: 30 },

    // ─── Hub ───
    { id: 'cat_lover', title: 'Acariciador compulsivo', description: 'Clicou no gato 7 vezes', icon: Cat, points: 35 },

    // ─── Mural ───
    { id: 'time_machine', title: 'Máquina do tempo', description: 'Entrou no desktop retrô', icon: Monitor, points: 5 },
    { id: 'trash_cleaner', title: 'Limpando o lixo', description: 'Esvaziou a lixeira', icon: Trash2, points: 20 },
    { id: 'ram_torturer', title: 'Torturador de RAM', description: 'Abriu todas as janelas ao mesmo tempo', icon: Cpu, points: 40 },

    // ─── Quiz ───
    { id: 'top_student', title: 'CDF', description: 'Tirou 10 na prova final', icon: GraduationCap, points: 100 },
    { id: 'ask_chatgpt', title: 'Consulte o ChatGPT', description: 'Errou tudo na prova', icon: Bot, points: 50 },
    { id: 'barely_passed', title: 'Raspando', description: 'Tirou exatamente 5, a nota mínima', icon: TrendingUp, points: 60 },
    { id: 'reviewer', title: 'Depois devolva, ok?', description: 'Usou o botão de revisar', icon: BookOpen, points: 15 },

    // ─── Certificate ───
    { id: 'sentimental', title: 'Sentimental', description: 'Escreveu uma dedicatória no diploma', icon: Heart, points: 25 },
    { id: 'anxious', title: 'Ansioso', description: 'Soltou o dedo durante a biometria', icon: Timer, points: 15 },
    { id: 'collector', title: 'Mais um pra conta', description: 'Baixou o diploma em PDF', icon: Download, points: 20 },

    // ─── Credits ───
    { id: 'no_time', title: 'Sem tempo, irmão', description: 'Pulou os créditos', icon: FastForward, points: 10 },
    { id: 'heartless', title: 'Insensível', description: 'Pulou o vídeo de despedida', icon: HeartCrack, points: 10 },
    { id: 'here_we_go', title: 'E lá vamos nós...', description: 'Reiniciou a experiência', icon: RotateCcw, points: 20 },
];

export const MAX_GAMERSCORE = achievements.reduce((sum, a) => sum + a.points, 0);
