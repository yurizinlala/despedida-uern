
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
    subjects: ['Introdução à Programação', 'Interação Homem-Computador', 'Desenvolvimento Para Web', 'Computação Afetiva'],
    quiz: [
      { id: 1, question: "O que significa a sigla P.O.G.?", options: ["Processamento Gráfico", "Programação Orientada a Gambiarra", "Protocolo Global", "Pequenos Objetos"], answer: 1 },
      { id: 2, question: "Desculpa padrão nº 1 para atrasos?", options: ["Cachorro comeu SSD", "GitHub caiu", "Pneu do ônibus", "Windows atualizando"], answer: 2 },
      { id: 3, question: "Em qual semestre o aluno perde o brilho?", options: ["1º Dia (Cálculo)", "3º (ED)", "5º (SO)", "TCC"], answer: 0 },
      { id: 4, question: "Atalho salvador da graduação?", options: ["Alt+F4", "Ctrl+Z", "Ctrl+C/V", "Del"], answer: 2 },
      { id: 5, question: "O que acontece se compilar de primeira?", options: ["Premio Turing", "Servidor explode", "Não salvou arquivo", "Aprovado no TCC"], answer: 2 },
      { id: 6, question: "Combustível biológico da prova?", options: ["Água", "Café e Energético", "Lágrimas", "Sono"], answer: 1 },
      { id: 7, question: "Onde o aluno aprende a programar?", options: ["Documentação", "Livros", "Indianos no Youtube", "StackOverflow"], answer: 2 },
      { id: 8, question: "Sensação ao ver o slide de revisão?", options: ["Alívio", "Medo", "Vontade de trancar", "Desistência"], answer: 1 },
      { id: 9, question: "Nome do arquivo final do TCC?", options: ["tcc.pdf", "tcc_final.pdf", "tcc_final_agora_vai_PELOAMOR.pdf", "projeto.pdf"], answer: 2 },
      { id: 10, question: "Reação à prova com consulta?", options: ["Felicidade", "Desespero", "Indiferença", "Dúvida"], answer: 1 }
    ],
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
      totalHours: 270,
      timeStudying: 60,
      timeUnderstanding: 210,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Loops infinitos usando for", cost: "32 horas" },
        { name: "Esquecendo ponto e virgula", cost: "1.276 erros de compilação" },
        { name: "Achar usuários de teste em IHC", cost: "7 amigos coagidos" },
        { name: "Heurísticas de Nielsen violadas", cost: "10 mandamentos" },
        { name: "Tentativas de centralizar div", cost: "3.934 vezes" },
        { name: "Vezes que eu entendi Rosalind Picard", cost: "0 vezes" },
        { name: "Quantidade de afeto bugado", cost: "Incalculável" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Jefferson", emoji: "🏆", count: 11 },
        { name: "Rafael", emoji: "🥈", count: 7 },
        { name: "Inácio", emoji: "🥉", count: 6 },
        { name: "Maria Klara", emoji: "4️⃣", count: 5 },
        { name: "Emilly", emoji: "5️⃣", count: 5 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Introdução à Programação", topic: "Entender ponteiros em C", level: 89 },
        { discipline: "Introdução à Programação", topic: "Esquecer ponto e vírgula", level: 53 },
        { discipline: "Interação Homem-Computador", topic: "Seguir Nielsen a risca", level: 38 },
        { discipline: "Interação Homem-Computador", topic: "Saber qual cor escolher", level: 47 },
        { discipline: "Desenvolvimento Para Web", topic: "Centralizar <div>", level: 95 },
        { discipline: "Desenvolvimento Para Web", topic: "Trabalhar com Figma", level: 2 },
        { discipline: "Computação Afetiva", topic: "Fazer o PC entender sarcasmo", level: 22 },
        { discipline: "Computação Afetiva", topic: "Suportar os anúncios", level: 79 },
      ],
      peakSeason: { event: "Projeto de Web", intensity: "Centralizar div é infernal" },

      // Slide 6: Aura Docente
      aura: {
        color: "#EC4899",
        vibe: "Lógico e empático",
        attributes: [
          { name: "Paciência", value: 95 },
          { name: "Design", value: 90 },
          { name: "Humanidade", value: 92 },
          { name: "Futurismo", value: 80 },
          { name: "Didática", value: 100 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 89,
      bestSubject: { name: "Desenvolvimento para Web", grade: 10 },
      worstSubject: { name: "Interação Homem-Computador", grade: 7.9 },

      // Slide 8: Arquétipo Tech
      techArchetype: { name: "O Terapeuta de Algoritmos", description: "Ele te ensina a lógica do if/else no primeiro ano, a deixar o site bonito no segundo, e a fazer a máquina chorar com seu código ruim no último. Mestre em conectar neurônios humanos e artificiais.", icon: "Wand2" },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "O código não está identado bonito", count: 127 },
        { word: "O usuário é idiota?", count: 98 },
        { word: "Como assim não centralizou?", count: 84 },
        { word: "CADÊ A VARIÁVEL NÃO DECLARADA?", count: 76 },
        { word: "Não é só o pc que tem sentimentos...", count: 65 },
        { word: "Bootstrap é fácil demais", count: 43 },
        { word: "O que é valência e alerta?", count: 38 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: { song: "Harder, Better, Faster, Stronger", artist: "Daft Punk", reason: "Porque programar é um loop infinito de melhorar, compilar, debugar, repetir.", coverColor: "from-pink-500 to-purple-500", spotifyUrl: "https://open.spotify.com/track/5W3cjX2J3tjhG8zb6u0qHn" },

      // Slide 11: Badge Final
      finalBadge: "Mestre dos Ponteiros e Emoções",

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
    quiz: [
      { id: 1, question: "Qual estrutura de dados usa política FIFO?", options: ["Fila", "Pilha", "Árvore Binária", "Grafo Direcionado"], answer: 0 },
      { id: 2, question: "Como se chama um grafo conexo e sem ciclos?", options: ["Árvore", "Grafo Completo", "Clique", "Matriz Esparsa"], answer: 0 },
      { id: 3, question: "Qual a estrutura de um dicionário (chave-valor)?", options: ["Tabela Hash", "Vetor Ordenado", "Árvore B", "Fila de Prioridade"], answer: 0 },
      { id: 4, question: "Qual a complexidade de tempo da Busca Binária?", options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"], answer: 0 },
      { id: 5, question: "Qual famoso problema NP-Difícil envolve cidades?", options: ["Caixeiro Viajante", "Torre de Hanói", "Bolsa de Valores", "N-Rainhas"], answer: 0 },
      { id: 6, question: "O que o algoritmo de Dijkstra encontra?", options: ["Caminho Mais Curto", "Árvore Geradora Mínima", "Ciclos Negativos", "Fluxo Máximo"], answer: 0 },
      { id: 7, question: "Qual é o pior caso de complexidade do QuickSort?", options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"], answer: 0 },
      { id: 8, question: "O que significa 'NullPointerException' em Java?", options: ["Acessar ponteiro vazio", "Estouro de array", "Erro de sintaxe", "Loop infinito"], answer: 0 },
      { id: 9, question: "Se A e B são VERDADEIROS, 'A XOR B' é:", options: ["FALSO", "VERDADEIRO", "NULO", "INDEFINIDO"], answer: 0 },
      { id: 10, question: "Para verificar balanceamento de parênteses, usa-se:", options: ["Pilha", "Fila", "Grafo Bipartido", "Lista Duplamente Encadeada"], answer: 0 }
    ],
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
