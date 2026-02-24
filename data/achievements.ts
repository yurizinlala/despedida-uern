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
}

export const achievements: Achievement[] = [
    // ─── BootSequence ───
    { id: 'funny_guy', title: 'Engraçadinho', description: 'Clicou em "Não" logo de cara', icon: Laugh },
    { id: 'pedro_is_you', title: 'Pedro, é você?', description: 'Negou 3 vezes seguidas', icon: UserX },

    // ─── FakeLogin ───
    { id: 'i_know_this', title: 'Eu conheço esse lugar', description: 'Entrou na tela de login', icon: MapPin },
    { id: 'academic_pride', title: 'Orgulho acadêmico', description: 'Clicou na logo do SIGAA', icon: Award },
    { id: 'curious', title: 'Curioso', description: 'Explorou todas as opções do menu', icon: Search },
    { id: 'hackerman', title: 'Hackerman', description: 'Acertou a senha de primeira', icon: Terminal },
    { id: 'router_admin', title: 'Tá achando que é roteador?', description: 'Tentou "admin" como senha', icon: Wifi },

    // ─── GlitchTransition ───
    { id: '80s_nerd', title: 'Nerd dos anos 80', description: 'Digitou o Código Konami', icon: Gamepad2 },

    // ─── WrappedSequence ───
    { id: 'rpg_mode', title: 'Virou RPG agora?', description: 'Viu o card de aura do professor', icon: Sparkles },
    { id: 'dj_mode', title: 'Som na caixa, DJ!', description: 'Chegou na trilha sonora', icon: Music },
    { id: 'spotify_sorry', title: 'Spotify, não me processe', description: 'Assistiu o review completo', icon: Headphones },

    // ─── Hub ───
    { id: 'cat_lover', title: 'Acariciador compulsivo', description: 'Clicou no gato 7 vezes', icon: Cat },

    // ─── Mural ───
    { id: 'time_machine', title: 'Máquina do tempo', description: 'Entrou no desktop retrô', icon: Monitor },
    { id: 'trash_cleaner', title: 'Limpando o lixo', description: 'Esvaziou a lixeira', icon: Trash2 },
    { id: 'ram_torturer', title: 'Torturador de RAM', description: 'Abriu todas as janelas ao mesmo tempo', icon: Cpu },

    // ─── Quiz ───
    { id: 'top_student', title: 'CDF', description: 'Tirou 10 na prova final', icon: GraduationCap },
    { id: 'ask_chatgpt', title: 'Consulte o ChatGPT', description: 'Errou tudo na prova', icon: Bot },
    { id: 'barely_passed', title: 'Raspando', description: 'Tirou exatamente 5, a nota mínima', icon: TrendingUp },
    { id: 'reviewer', title: 'Depois devolva, ok?', description: 'Usou o botão de revisar', icon: BookOpen },

    // ─── Certificate ───
    { id: 'sentimental', title: 'Sentimental', description: 'Escreveu uma dedicatória no diploma', icon: Heart },
    { id: 'anxious', title: 'Ansioso', description: 'Soltou o dedo durante a biometria', icon: Timer },
    { id: 'collector', title: 'Mais um pra conta', description: 'Baixou o diploma em PDF', icon: Download },

    // ─── Credits ───
    { id: 'no_time', title: 'Sem tempo, irmão', description: 'Pulou os créditos', icon: FastForward },
    { id: 'heartless', title: 'Insensível', description: 'Pulou o vídeo de despedida', icon: HeartCrack },
    { id: 'here_we_go', title: 'E lá vamos nós...', description: 'Reiniciou a experiência', icon: RotateCcw },
];
