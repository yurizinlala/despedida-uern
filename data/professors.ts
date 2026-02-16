
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
    hint: 'Tem que ter a__to na computação...',
    theme: 'web',
    subjects: ['Introdução à Programação', 'Interação Homem Computador', 'Desenvolvimento Web', 'Computação Afetiva'],
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
      // Slide 2: Carga Horária
      totalHours: 420,
      timeStudying: 320,
      timeUnderstanding: 95,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Divs Centralizadas", cost: "50 horas" },
        { name: "Testes de Usabilidade", cost: "30 cobaias" },
        { name: "Wireframes Descartados", cost: "47 folhas" },
        { name: "Análise de Sentimento", cost: "200 emoções" },
        { name: "Acessibilidade W3C", cost: "100 pontos" },
        { name: "CSS que Funcionou de Primeira", cost: "0 vezes" },
        { name: "Cafés com Leite", cost: "Incalculável" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Lucas", emoji: "🏆", count: 6 },
        { name: "Ana", emoji: "🥈", count: 5 },
        { name: "Pedro", emoji: "🥉", count: 4 },
        { name: "Maria", emoji: "4️⃣", count: 3 },
        { name: "João", emoji: "5️⃣", count: 2 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Intro Programação", topic: "Ponteiros em C", level: 40 },
        { discipline: "IHC", topic: "Avaliação Heurística", level: 55 },
        { discipline: "Web Dev", topic: "CSS Grid Layout", level: 70 },
        { discipline: "Comp. Afetiva", topic: "Reconhecimento Facial", level: 85 },
        { discipline: "IHC", topic: "Projeto Final", level: 100 },
        { discipline: "Web Dev", topic: "API REST", level: 60 },
        { discipline: "Intro Programação", topic: "Recursão", level: 75 },
        { discipline: "Comp. Afetiva", topic: "Análise de Emoções", level: 45 },
        { discipline: "Web Dev", topic: "Deploy Final", level: 95 }
      ],
      peakSeason: { event: "Projeto Final de Web", intensity: "Caos no CSS" },

      // Slide 6: Aura Docente
      aura: {
        color: "#EC4899",
        vibe: "Empática e Front-end",
        attributes: [
          { name: "Paciência", value: 95 },
          { name: "Didática", value: 90 },
          { name: "Criatividade", value: 85 },
          { name: "Humor", value: 80 },
          { name: "Acessibilidade", value: 100 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 85,
      bestSubject: { name: "Web Development", grade: 9.5 },
      worstSubject: { name: "Computação Afetiva", grade: 6.8 },

      // Slide 8: Arquétipo Tech
      techArchetype: { name: "Mago do Frontend", description: "Domina as artes visuais do CSS e transforma wireframes em realidade. Seus feitiços de flexbox são lendários.", icon: "Wand2" },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Centraliza essa div", count: 127 },
        { word: "Pensa no usuário", count: 98 },
        { word: "Responsivo", count: 84 },
        { word: "Usabilidade", count: 76 },
        { word: "Acessibilidade", count: 65 },
        { word: "Bootstrap é muleta", count: 43 },
        { word: "Empatia", count: 38 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: { song: "Feelings", artist: "Morris Albert", reason: "Porque computadores também precisam de afeto.", coverColor: "from-pink-500 to-purple-500" },

      // Slide 11: Badge Final
      finalBadge: "O Empata Digital",

      achievements: []
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
      // Slide 2: Carga Horária
      totalHours: 666,
      timeStudying: 500,
      timeUnderstanding: 120,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Nós e Arestas", cost: "500 unidades" },
        { name: "Árvores Balanceadas", cost: "30 rotações" },
        { name: "Demonstrações Lógicas", cost: "10 folhas A4" },
        { name: "Provas por Indução", cost: "3 crises" },
        { name: "Autômatos Finitos", cost: "1 alma" },
        { name: "Compiladores Quebrados", cost: "15 noites" },
        { name: "Café Expresso Duplo", cost: "∞" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Rafael", emoji: "🏆", count: 7 },
        { name: "Carla", emoji: "🥈", count: 5 },
        { name: "Diego", emoji: "🥉", count: 4 },
        { name: "Bruna", emoji: "4️⃣", count: 3 },
        { name: "Thiago", emoji: "5️⃣", count: 2 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Lógica Matemática", topic: "Tabelas Verdade", level: 35 },
        { discipline: "Estrutura de Dados", topic: "Árvore AVL", level: 60 },
        { discipline: "Grafos", topic: "Dijkstra", level: 80 },
        { discipline: "Compiladores", topic: "Análise Sintática", level: 95 },
        { discipline: "Grafos", topic: "Caminho Euleriano", level: 70 },
        { discipline: "Lógica Matemática", topic: "Indução Matemática", level: 85 },
        { discipline: "Estrutura de Dados", topic: "Hash Table", level: 50 },
        { discipline: "Compiladores", topic: "Gramáticas Livres", level: 100 },
        { discipline: "Grafos", topic: "Prova Final", level: 90 }
      ],
      peakSeason: { event: "Prova de Grafos", intensity: "Caminho Euleriano sem volta" },

      // Slide 6: Aura Docente
      aura: {
        color: "#4F46E5",
        vibe: "Lógica Pura",
        attributes: [
          { name: "Rigor", value: 100 },
          { name: "Didática", value: 92 },
          { name: "Desafio", value: 95 },
          { name: "Cobrança", value: 88 },
          { name: "Clareza", value: 85 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 42,
      bestSubject: { name: "Grafos", grade: 8.7 },
      worstSubject: { name: "Compiladores", grade: 5.2 },

      // Slide 8: Arquétipo Tech
      techArchetype: { name: "Paladina da Lógica", description: "Armadura feita de provas formais. Seu escudo são as demonstrações por indução. Nenhum bug sobrevive à sua revisão de código.", icon: "Shield" },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Isso é trivial", count: 156 },
        { word: "Prova por indução", count: 112 },
        { word: "Vértice adjacente", count: 89 },
        { word: "Complexidade O(n)", count: 74 },
        { word: "Recursão infinita", count: 67 },
        { word: "Faz no quadro", count: 52 },
        { word: "Pilha ou Fila?", count: 41 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: { song: "The Logical Song", artist: "Supertramp", reason: "Não há bugs, apenas lógica não compreendida.", coverColor: "from-blue-600 to-indigo-900" },

      // Slide 11: Badge Final
      finalBadge: "A Rainha dos Nós",

      achievements: []
    }
  }
];

export const getWelcomeText = (gender: 'male' | 'female') => gender === 'male' ? 'Bem-vindo' : 'Bem-vinda';
export const getAuthText = (gender: 'male' | 'female') => gender === 'male' ? 'do Professor' : 'da Professora';
export const getLoadingMessages = (theme: ProfessorTheme) => ["Carregando..."];
