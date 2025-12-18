
import { Professor, ProfessorTheme, MuralItem } from '../types';

const createMural = (theme: ProfessorTheme, name: string): MuralItem[] => {
    const themeStickers: MuralItem[] = [];
    const icons = {
        web: ['🌐', '🎨', '💻', '✨', '📎', '🪙'],
        logic: ['🧠', '🌲', '⚡', '📐', '📎', '🖊️'],
        math: ['∑', 'π', '∞', '∫', '📎', '📏'],
        hardware: ['🔌', '🔋', '💾', '🤖', '📎', '🔩'],
        db: ['🗄️', '📊', '🔑', '🔍', '📎', '🏷️'],
        manager: ['📅', '📈', '🤝', '📋', '📎', '📌'],
        sysop: ['🐧', '⚙️', '🛡️', '🚦', '📎', '💿']
    };

    icons[theme].forEach((icon, i) => {
        themeStickers.push({
            id: `sticker-${i}`,
            type: 'sticker',
            content: icon,
            style: { 
                x: Math.random() * 80 + 10, 
                y: Math.random() * 80 + 10, 
                rotation: Math.random() * 360 
            }
        });
    });

    return themeStickers;
};

export const professors: Professor[] = [
  { 
    id: 'raul', 
    name: 'Prof. Dr. Raul Benites Paradeda', 
    nickname: 'Raul Paradeda', 
    gender: 'male', 
    password: 'afeto', 
    hint: 'Sentimentos na computação...', 
    theme: 'web', 
    subjects: ['Introdução à Programação', 'IHC', 'Web Development', 'Computação Afetiva'],
    muralItems: [
        ...createMural('web', 'Raul'),
        {
            id: 'letter-raul',
            type: 'note',
            content: "Professor Raul,\n\nEu queria deixar aqui meu agradecimento sincero. Você me ensinou que por trás de cada tela existe uma pessoa, com sentimentos, frustrações e necessidades.\n\nObrigado por ter paciência quando minhas divs não centralizavam e por insistir na importância da acessibilidade.",
            style: { x: 30, y: 20, rotation: -2 }
        },
        {
            id: 'photo-raul',
            type: 'polaroid',
            content: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            meta: "Turma de IHC 2023",
            style: { x: 10, y: 60, rotation: -5 }
        }
    ],
    wrapped: {
      receiptItems: [
        { name: "Divs Centralizadas", cost: "50 horas" },
        { name: "Análise de Sentimento", cost: "200 emoções" },
        { name: "Acessibilidade W3C", cost: "100 pontos" },
        { name: "Cafés com Leite", cost: "Incalculável" }
      ],
      survivalRate: 85,
      totalHours: 420,
      comparison: {
        label: "Sorrisos detectados pela Webcam",
        studentValue: "3 (de nervoso)",
        profValue: "8.500"
      },
      achievements: [
        { id: 'empatia_lvl_max', title: 'Empata Profissional', description: 'Fez a IA chorar de emoção.', icon: 'Heart', unlocked: false },
        { id: 'html_god', title: 'Div Master', description: 'Centralizou uma div sem Flexbox ou Grid.', icon: 'Layout', unlocked: false }
      ],
      techArchetype: { name: "HTML5 Semântico", description: "Estruturado, acessível e cheio de significado.", icon: "Layout" },
      peakSeason: { event: "Projeto Final de Web", intensity: "Caos no CSS" },
      wordCloud: ["Usabilidade", "Empatia", "Bootstrap", "Responsivo", "Usuário"],
      soundtrack: { song: "Feelings", artist: "Morris Albert", reason: "Porque computadores também choram.", coverColor: "from-pink-500 to-purple-500" },
      aura: { color: "#EC4899", vibe: "Empática e Front-end" },
      finalBadge: "O Empata Digital"
    }
  },
  { 
    id: 'camila', 
    name: 'Profa. Dra. Camila de Araújo Sena', 
    nickname: 'Camila Sena', 
    gender: 'female', 
    password: 'grafo', 
    hint: 'Vértices e Arestas...', 
    theme: 'logic', 
    subjects: ['Lógica Matemática', 'Estrutura de Dados', 'Grafos', 'Compiladores'],
    muralItems: [
        ...createMural('logic', 'Camila'),
        {
            id: 'letter-camila',
            type: 'note',
            content: "Professora Camila,\n\nEu confesso: eu tinha medo de Grafos. Morria de medo de não entender nada. Mas sua didática transformou um bicho de sete cabeças em algo lógico.",
            style: { x: 40, y: 30, rotation: 1 }
        },
        {
            id: 'photo-camila',
            type: 'polaroid',
            content: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            meta: "Quadro cheio de grafos",
            style: { x: 75, y: 65, rotation: 8 }
        }
    ],
    wrapped: {
      receiptItems: [
        { name: "Nós e Arestas", cost: "500 unidades" },
        { name: "Árvores Balanceadas", cost: "30 rotações" },
        { name: "Demonstrações Lógicas", cost: "10 folhas A4" },
        { name: "Autômatos Finitos", cost: "1 alma" }
      ],
      survivalRate: 42,
      totalHours: 666,
      comparison: {
        label: "Folhas de papel gastas em provas",
        studentValue: "500 árvores",
        profValue: "1 tablet"
      },
      achievements: [
        { id: 'survivor_logic', title: 'Sobrevivente Lógico', description: 'Passou em Grafos sem chorar publicamente.', icon: 'GitGraph', unlocked: false },
        { id: 'compiler_god', title: 'Compilador Humano', description: 'Entendeu Autômatos de Pilha de primeira.', icon: 'Binary', unlocked: false }
      ],
      techArchetype: { name: "Árvore Rubro-Negra", description: "Complexa, auto-ajustável e intimidante.", icon: "GitGraph" },
      peakSeason: { event: "Prova de Grafos", intensity: "Caminho Euleriano sem volta" },
      wordCloud: ["Vértice", "Adjacente", "Pilha", "Recursão", "Indução"],
      soundtrack: { song: "The Logical Song", artist: "Supertramp", reason: "Não há bugs, apenas lógica não compreendida.", coverColor: "from-blue-600 to-indigo-900" },
      aura: { color: "#4F46E5", vibe: "Lógica Pura" },
      finalBadge: "A Rainha dos Nós"
    }
  }
];

export const getWelcomeText = (gender: 'male' | 'female') => gender === 'male' ? 'Bem-vindo' : 'Bem-vinda';
export const getAuthText = (gender: 'male' | 'female') => gender === 'male' ? 'do Professor' : 'da Professora';
export const getLoadingMessages = (theme: ProfessorTheme) => ["Carregando..."];
