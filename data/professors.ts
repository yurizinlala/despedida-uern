
import { Professor, ProfessorTheme, MuralItem } from '../types';

// Per-professor icon stickers (Lucide icon names)
const professorStickers: Record<string, string[]> = {
  raul: ['Code', 'Palette', 'Globe', 'Heart', 'Layout', 'MousePointer'],
  camila: ['Brain', 'GitBranch', 'Network', 'FileCode', 'Binary', 'Scale'],
  adriana: ['Sigma', 'Triangle', 'BrainCircuit', 'Box', 'Pi', 'Sparkles'],
  glaucia: ['Terminal', 'Cpu', 'Users', 'Globe', 'Shield', 'Lock'],
  rosiery: ['Flame', 'Puzzle', 'Timer', 'TrendingUp', 'Lightbulb', 'Target'],
  bartira: ['Database', 'Key', 'Table2', 'FileSearch', 'BookOpen', 'ClipboardCheck'],
  'andre-gustavo': ['Coffee', 'Container', 'Server', 'Code2', 'Layers', 'Workflow'],
  'anderson-abner': ['CircuitBoard', 'Cpu', 'Bot', 'Zap', 'MemoryStick', 'Cog'],
  'felipe-denis': ['Wifi', 'Radio', 'Cable', 'Antenna', 'Chip', 'Waves'],
  'carlos-andre': ['BookMarked', 'FileText', 'Ruler', 'Pen', 'CheckSquare', 'Award'],
  'bruno-cruz': ['Cpu', 'GitFork', 'Gauge', 'Activity', 'Layers', 'Repeat'],
  wilfredo: ['ClipboardList', 'FileSpreadsheet', 'List', 'Music', 'Users', 'Pencil'],
};

const createMural = (profId: string): MuralItem[] => {
  const icons = professorStickers[profId] || ['Star', 'Star', 'Star', 'Star', 'Star', 'Star'];
  return icons.map((icon, i) => ({
    id: `sticker-${i}`,
    type: 'sticker' as const,
    content: icon,
    style: {
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      rotation: Math.random() * 360
    }
  }));
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
    codeName: 'cara pálida',
    subjects: ['Introdução à Programação', 'Interação Homem-Computador', 'Desenvolvimento Para Web', 'Computação Afetiva'],
    quiz: [
      { id: 1, question: "No projeto final de Introdução à Programação, onde o código mais sofria?", options: ["Na física do carrinho (totalmente realista)", "No menu inicial cheio de animações", "No uso de ponteiros dentro das estruturas", "No placar, que misteriosamente se atualizava sozinho"], answer: 2 },
      { id: 2, question: "Qual foi o erro mais humilhante que impediu o código em C de compilar?", options: ["Condição de corrida entre threads imaginárias", "Falta de memória RAM no laboratório", "Um ponto e vírgula esquecido", "Bug do compilador conspirando contra o aluno"], answer: 2 },
      { id: 3, question: "Apesar da fama do C, como eram as aulas de Introdução à Programação?", options: ["Uma experiência traumática coletiva", "Surpreendentemente claras e humanas", "Uma sequência infinita de fórmulas matemáticas", "Aprender C apenas lendo slides"], answer: 1 },
      { id: 4, question: "Em IHC, qual foi o verdadeiro sofrimento do projeto final?", options: ["Escolher entre azul ou azul um pouco diferente", "Aplicar Nielsen como se fosse mandamento bíblico", "Convencer pessoas reais a testar o sistema", "Ler o manual do Figma até o fim"], answer: 2 },
      { id: 5, question: "O experimento com anúncios em IHC tentava responder qual pergunta?", options: ["Quantos anúncios fazem o usuário desistir da vida", "Como anúncios afetam a retenção do usuário", "Se o professor gosta mais de anúncios no início", "Se o algoritmo do YouTube ficaria orgulhoso"], answer: 1 },
      { id: 6, question: "Qual disciplina do Raul fez o aluno esquecer que tinha outras matérias?", options: ["Introdução à Programação", "Interação Homem-Computador", "Desenvolvimento Para Web", "Computação Afetiva (definitivamente)"], answer: 2 },
      { id: 7, question: "Qual foi o verdadeiro boss final em Desenvolvimento Para Web?", options: ["Configurar o servidor sem chorar", "Centralizar uma div por meios não documentados", "Dominar JavaScript em uma semana", "Convencer o CSS a colaborar"], answer: 1 },
      { id: 8, question: "Além de deixar o site bonito, o projeto final de Web exigia:", options: ["Ignorar completamente usuários reais", "Pensar seriamente em acessibilidade", "Seguir tutorial do YouTube à risca", "Usar todas as fontes do Google Fonts"], answer: 1 },
      { id: 9, question: "Por que Computação Afetiva causava confusão?", options: ["O computador começou a julgar o aluno", "Quantidade absurda de autores e artigos novos", "Excesso de código em Assembly", "Provas práticas toda semana"], answer: 1 },
      { id: 10, question: "Mesmo confusa, Computação Afetiva ensinou principalmente a:", options: ["Programar máquinas carinhosas", "Reduzir bugs com empatia", "Pensar na reação do usuário", "Criar sistemas que elogiam o código"], answer: 2 }
    ],
    muralItems: [
      ...createMural('raul'),
      {
        id: 'letter-raul',
        type: 'note',
        content: "Professor Raul,\n\nEu lembro bem do começo de tudo. Primeiro semestre, tudo novo, tudo estranho, e a gente cheio de perguntas — e quase sempre começando com: “cara pálida…”. Aquilo virou marca, virou identidade, virou o jeito leve de aprender mesmo quando a gente não entendia nada.\n\nEm Introdução à Programação, você conseguiu fazer algo raro: tornar C algo acessível. A didática era tão boa que o problema nunca foi entender a ideia — o problema era sobreviver ao ponto e vírgula e às estruturas. O maior desafio foi o projeto final: um jogo de corrida em C, cheio de funções, structs e ponteiros. Ali eu quebrei a cabeça de verdade. Mas também foi ali que eu percebi que aprender podia ser difícil sem ser traumático.\n\nEm IHC, tudo mudou. Eu achei que ia aprender computação… e acabei aprendendo pessoas. Psicologia, percepção, sentimento, comportamento. Meu maior perrengue foi sair caçando gente pra testar meu projeto — tentando entender retenção de usuário colocando anúncios no início, no meio, no fim ou espalhados pelo vídeo. Foi cansativo, deu trabalho, mas abriu minha mente. Pela primeira vez eu parei pra pensar de verdade: “como quem usa isso se sente?”.\n\nEm Web, foi amor à primeira vista. Já gostava da área, mas com Figma e a liberdade criativa que você sempre deu nos projetos, eu fiquei completamente deslumbrado. Foi minha matéria favorita. O desafio? O clássico boss final: centralizar divs e, principalmente, fazer acessibilidade direito no projeto final. Não era só deixar bonito — era fazer funcionar pra todo mundo.\n\nComputação Afetiva foi outro nível. Muitos conceitos novos, muitos autores, muitos artigos. Confesso que ali eu me senti perdido várias vezes. Era informação demais pra processar. Mas, mesmo assim, foi uma disciplina que expandiu meu jeito de pensar e me colocou em contato com um mundo acadêmico que ainda era muito distante pra mim.\n\nO momento que mais me marcou, porém, não foi um código nem um projeto. Foi uma conversa. Quando você me fez pensar sobre futuro e sobre com quem eu ando. Quando você perguntou se existiam pessoas com quem eu realmente fundaria uma empresa, observando o quanto elas se envolviam e se dedicavam nos trabalhos. Aquilo ficou na minha cabeça. Me fez amadurecer. Me fez olhar ao redor com mais consciência.\n\nVocê me ajudou a ser mais criativo, sempre abrindo espaço para ideias, desafios e caminhos diferentes. Me incentivou a publicar artigos, algo totalmente novo pra mim, mas que sei que vai ser muito importante no meu futuro. Hoje eu penso mais no usuário, apresento melhor meus trabalhos, busco mais soluções e tento ir além do óbvio — muito por causa do que aprendi com você.\n\nObrigado por ensinar com lógica e com humanidade. Por mostrar que computação não é só máquina, é gente. E que até o código carrega sentimentos.\n\nCom gratidão,\nYuri Cara Pálida",
        style: { x: 30, y: 20, rotation: -2 }
      },
      {
        id: 'photo-raul',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        meta: "O melhor professor de IHC",
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
    }
  },
  {
    id: 'camila',
    name: 'Profa. Dra. Camila de Araújo Sena',
    nickname: 'Camila Sena',
    gender: 'female',
    password: 'dijkstra',
    hint: 'Dij... Dijk... aff, aquele algoritmo gulosinho lá',
    theme: 'logic',
    codeName: 'xexis++',
    subjects: ['Lógica Matemática Aplicada à Computação', 'Estrutura de Dados', 'Engenharia de Software', 'Linguagens Formais e Autômatos', 'Estruturas Auto-ajustáveis e Grafos', 'Compiladores'],
    quiz: [
      { id: 1, question: "Em Lógica Matemática, qual parte mais destruía o psicológico do aluno?", options: ["Montar tabela verdade simples", "Provas por indução com infinitas variáveis", "Negar proposições triviais", "Usar AND e OR corretamente"], answer: 1 },
      { id: 2, question: "O maior problema da indução matemática era:", options: ["Aplicar a hipótese indutiva", "Descobrir de onde aquela expressão gigantesca surgiu", "Somar números naturais", "Aceitar que 'é óbvio'"], answer: 1 },
      { id: 3, question: "Em Estrutura de Dados, o sentimento predominante do aluno foi:", options: ["Confiança absoluta", "Compreensão imediata", "Aceitação silenciosa e seguir em frente", "Domínio completo de todas as estruturas"], answer: 2 },
      { id: 4, question: "Qual estrutura parecia surgir em TODAS as provas para testar a sanidade do aluno?", options: ["Fila simples", "Lista encadeada básica", "Árvore auto-balanceada", "Vetor estático"], answer: 2 },
      { id: 5, question: "O primeiro choque em Grafos foi perceber que:", options: ["Era só teoria sem código", "Existiam árvores e grafos implementados em código", "Tudo se resolvia com BFS", "Grafos eram apenas desenhos bonitos"], answer: 1 },
      { id: 6, question: "Qual foi um dos maiores vilões em Grafos?", options: ["Busca em largura", "Algoritmo simples de caminho", "Estruturas auto-balanceadas complexas", "Somar vértices manualmente"], answer: 2 },
      { id: 7, question: "Por que Compiladores foi tão pesado?", options: ["Programar em Assembly puro", "Excesso de gramáticas e formalismos", "Pouca matemática envolvida", "Slides confusos"], answer: 1 },
      { id: 8, question: "A principal dificuldade em Linguagens Formais e Autômatos era:", options: ["Desenhar diagramas bonitos", "Entender gramáticas que nem o português ajudava", "Implementar interfaces gráficas", "Rodar código em tempo real"], answer: 1 },
      { id: 9, question: "Mesmo com o caos, qual fator foi essencial para sobreviver a Compiladores?", options: ["Estudar sozinho em silêncio", "Boa vontade do compilador", "Grupos de estudo e colaboração", "Dormir bem antes da prova"], answer: 2 },
      { id: 10, question: "Depois das disciplinas da Camila, o aluno aprendeu principalmente a:", options: ["Decorar algoritmos", "Pensar logicamente e estruturar melhor ideias", "Evitar matérias difíceis", "Resolver tudo no chute"], answer: 1 }
    ],
    muralItems: [
      ...createMural('camila'),
      {
        id: 'letter-camila',
        type: 'note',
        content: "Professora Camila,\n\nEu acho que tudo começou quando eu percebi que você não era só professora. Você sofria junto com a gente. Se desesperava, se animava, ria, chorava e seguia firme. Desde o início ficou claro que ali tinha alguém que realmente se importava.\n\nLógica Matemática foi meu primeiro choque de realidade. Tabelas verdade até que iam bem… mas quando chegou a indução, meu amigo… aquilo acabava comigo. Aquela linha gigantesca de variáveis aparecendo do nada e a gente tendo que descobrir de onde aquilo saiu parecia magia negra acadêmica. Mesmo assim, você explicava com tanta calma que, mesmo quando eu não entendia tudo, eu entendia o caminho — e isso fez diferença.\n\nEm Estrutura de Dados, o sofrimento foi democrático. Você explicava muito bem, os slides eram praticamente um \"quer que eu desenhe?\" materializado, mas as notas… misericórdia. Foi uma enxurrada. Sofri, aceitei e segui em frente. Até hoje ainda me enrolo com alguns temas, mas ali eu aprendi algo importante: nem sempre a gente entende tudo — e mesmo assim precisa continuar andando.\n\nGrafos abriu um mundo novo pra mim. Eu nunca imaginei que existia árvore, grafo e tudo aquilo dentro do código. No começo deu medo, mas depois eu consegui lidar. Teve vilão, teve tabela gigante, teve cabeça fervendo… mas também teve aprendizado real. Foi ali que comecei a enxergar conexões onde antes eu só via confusão.\n\nEngenharia de Software veio com outra lição: eu não fazia ideia de que desenvolver um software simples envolvia TANTA coisa. Documentação, casos de uso, processos, etapas que não podiam ser puladas — exatamente o contrário do meu jeito. Mas graças aos projetos da disciplina, tudo foi entrando na caixola. Até hoje essa matéria me ajuda a estruturar projetos, trabalhar melhor em grupo e organizar ideias.\n\nLinguagens Formais e Autômatos foi… outro nível de realidade. Máquina de Turing, gramáticas, autômatos… meu amigo, aquilo não foi feito pra humanos comuns. Meu maior problema era tudo ao mesmo tempo. Desisti mentalmente várias vezes, e muita gente caiu no caminho. Sobrevivi graças aos grupos — e isso também conta como aprendizado. Hoje ainda é meio nebuloso, confesso. Se você me perguntar algo de gramática, eu provavelmente não sei responder nem em português, nem em computação.\n\nNo meio de tudo isso, você sempre esteve ali. Com seu jeito leve, divertido e humano. Sempre parceira das minhas loucuras — menos votar no Bolsonaro, que sempre vai ser nossa piada interna. Você abraçou o \"xexis\" de um jeito que eu nunca vou esquecer, criou até uma linguagem inteira como exemplo de prova. Se existisse fã-clube oficial, eu seria o presidente — mesmo com o Demóstenes lembrando que ele também tem o dele.\n\nEu sempre perguntava se você estava bem, se tinha dormido bem, como estava sua família. E nunca foi só educação — era carinho real. Você deixou de ser apenas professora há muito tempo. Hoje é referência, inspiração e alguém que eu levo comigo.\n\nVocê me ensinou a pensar melhor, a organizar ideias, a apresentar com clareza e a focar no que importa. Me ajudou até a fazer uma boa introdução de TCC — e não por acaso, fez parte da minha banca. As matérias mais difíceis do curso, você fez passar como manteiga… manteiga quente, queimando a pele, mas manteiga.\n\nAntes de você, eu tinha dificuldade de visualizar grafos, pensar fora da caixa e dar vida às apresentações. Depois, eu aprendi a pensar computacionalmente, identificar lógica, loops e conexões. Eu cresci — e cresci muito — graças a você.\n\nObrigado por tudo. De verdade. Você vai estar eternizada no meu coração e na minha história.\n\nCom carinho,\nYuri Xexis",
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
      totalHours: 360,
      timeStudying: 170,
      timeUnderstanding: 190,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Tabelas verdade (tranquilas até não serem)", cost: "200 linhas" },
        { name: "Indução que começa do nada", cost: "4 existências questionadas" },
        { name: "Documentação de Engenharia de Software", cost: "1 sanidade" },
        { name: "Casos de uso que nunca acabam", cost: "diagramas infinitos" },
        { name: "AVL e Rubro-Negra", cost: "30 rotações + confusão" },
        { name: "Grafos que viraram mundo novo", cost: "1 mente expandida" },
        { name: "Dijkstra (nome impronunciável)", cost: "∞ tentativas" },
        { name: "Autômatos e Máquinas de Turing", cost: "outro nível de realidade" },
        { name: "Gramáticas (nem o português ajuda)", cost: "nebulosidade eterna" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Rafael", emoji: "🏆", count: 13 },
        { name: "Inácio", emoji: "🥈", count: 13 },
        { name: "Emilly", emoji: "🥉", count: 9 },
        { name: "Klara", emoji: "4️⃣", count: 8 },
        { name: "Jefferson", emoji: "5️⃣", count: 4 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Lógica Matemática", topic: "Indução com expressão que nasce do nada", level: 87 },
        { discipline: "Lógica Matemática", topic: "\"Isso é trivial\"", level: 32 },
        { discipline: "Engenharia de Software", topic: "Não poder pular etapas", level: 79 },
        { discipline: "Engenharia de Software", topic: "Documentação e casos de uso", level: 55 },
        { discipline: "Estrutura de Dados", topic: "AVL (rotações)", level: 68 },
        { discipline: "Estrutura de Dados", topic: "Rubro-Negra (tabela gigante)", level: 90 },
        { discipline: "Estruturas Auto-ajustáveis e Grafos", topic: "Dijkstra (guloso)", level: 22 },
        { discipline: "Linguagens Formais e Autômatos", topic: "Máquina de Turing", level: 92 },
        { discipline: "Linguagens Formais e Autômatos", topic: "Gramáticas e autômatos combinados", level: 99 },
        { discipline: "Compiladores", topic: "Gramáticas livres de contexto", level: 83 }
      ],
      peakSeason: { event: "Semana de Prova de Linguagens Formais", intensity: "Quando todo mundo começou a surtar" },

      // Slide 6: Aura Docente
      aura: {
        color: "#4F46E5",
        vibe: "Didática com rigor real",
        attributes: [
          { name: "Didática", value: 98 },
          { name: "Rigor", value: 96 },
          { name: "Empatia", value: 97 },
          { name: "Organização", value: 94 },
          { name: "Clareza", value: 93 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 61,
      bestSubject: { name: "Estruturas Auto-ajustáveis e Grafos", grade: 10.0 },
      worstSubject: { name: "Linguagens Formais e Autômatos", grade: 5.9 },

      // Slide 8: Arquétipo Tech
      techArchetype: { name: "Paladina da Lógica", description: "Ela desenha, explica, sofre junto, mas não deixa pular etapa. Se você sobrevive às matérias dela, você aprende a pensar, organizar e justificar — mesmo quando o conteúdo parece de outro planeta.", icon: "Shield" },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Fale xexis", count: 156 },
        { word: "Vish, tem que ser peso 13?", count: 112 },
        { word: "Dji- Dijki- aff...", count: 89 },
        { word: "Gramática em programação?!", count: 74 },
        { word: "Hipótese indutiva é o cão", count: 67 },
        { word: "Turing não precisa disso tudo", count: 52 },
        { word: "Pila ou Filha?", count: 41 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: { song: "Everybody Wants to Rule the World", artist: "Tears for Fears", reason: "Em tese, essa música combinaria mais nessas matérias se o refrão fosse: 'Everybody Wants to Rule the Code'.", coverColor: "from-blue-600 to-indigo-900", spotifyUrl: "https://open.spotify.com/track/4RvWPyQ5RL0ao9LPZeSouE" },

      // Slide 11: Badge Final
      finalBadge: "A Rainha dos Nós (e do xexis++)",


    }
  },
  {
    id: 'adriana',
    name: 'Profa. Dra. Adriana Takahashi',
    nickname: 'Adriana Takahashi',
    gender: 'female',
    password: 'codelab',
    hint: 'Meu primeiro projeto de extensão foi com você! Lembra o nome?',
    theme: 'math',
    codeName: 'mando já o tcc',
    subjects: ['Álgebra Linear', 'Cálculo Numérico Computacional', 'Inteligência Artificial', 'Computação Gráfica'],
    quiz: [
      { id: 1, question: "Em Álgebra Linear, o maior choque inicial foi:", options: ["Descobrir que tudo era matriz e transformação", "Somar vetores simples", "Resolver regra de três", "Usar calculadora científica"], answer: 0 },
      { id: 2, question: "Qual sensação era mais comum ao ver tantas transformações lineares?", options: ["Empolgação imediata", "Pânico matemático controlado", "Indiferença total", "Saudade de aritmética básica"], answer: 1 },
      { id: 3, question: "Em Cálculo Numérico, o verdadeiro vilão era:", options: ["Quantidade absurda de contas", "Falta de fórmulas", "Pouco conteúdo", "Excesso de teoria sem prática"], answer: 0 },
      { id: 4, question: "Qual foi a maior dificuldade dos métodos numéricos?", options: ["Encontrar solução exata", "Aceitar soluções aproximadas", "Usar papel", "Abrir o MATLAB"], answer: 1 },
      { id: 5, question: "O MATLAB entrou na vida do aluno para:", options: ["Facilitar contas gigantes", "Substituir o raciocínio", "Criar gráficos bonitos apenas", "Evitar estudar"], answer: 0 },
      { id: 6, question: "Em IA, a maior surpresa foi:", options: ["Descobrir que não era só ChatGPT", "Não usar matemática", "Criar robôs conscientes", "Treinar modelo sem dados"], answer: 0 },
      { id: 7, question: "Mesmo em IA, o aluno percebeu que:", options: ["A matemática sempre volta", "Tudo é mágica", "Código resolve tudo sozinho", "Peso não importa"], answer: 0 },
      { id: 8, question: "Em Computação Gráfica, o momento mais marcante foi:", options: ["Renderizar uma pirâmide em C", "Abrir o Photoshop", "Desenhar no Paint", "Ignorar matrizes"], answer: 0 },
      { id: 9, question: "O maior inimigo em Computação Gráfica foi:", options: ["Iluminação e cálculos de luz", "Criatividade", "Escolha de cores", "Salvar o arquivo"], answer: 0 },
      { id: 10, question: "Depois das disciplinas da Adriana, o aluno aprendeu principalmente a:", options: ["Pensar com rigor e confiança", "Evitar matemática", "Chutar resultados", "Depender só de software"], answer: 0 }
    ],
    muralItems: [
      ...createMural('adriana'),
      {
        id: 'letter-adriana',
        type: 'note',
        content: "Professora Adriana,\n\nEu não sei se você tem noção do estrago que você fez na minha cabeça… no melhor sentido possível.\n\nÁlgebra Linear foi onde eu te conheci e onde eu descobri um universo que eu nem sabia que existia. Eu gosto de matemática, mas eu nunca pensei que ia ver TANTA transformação na minha vida. Matrizes, determinantes, transformação linear… misericórdia. Eu olhava e pensava: “isso aqui é matemática ou é um portal?”. E o pior: eu ainda fui descobrir depois que isso tudo era só a base pra eu sofrer com mais qualidade em Computação Gráfica e Inteligência Artificial.\n\nE assim… seus slides eram bonitos demais. Parecia até que a conta ficava mais educada quando estava no seu slide. Era o que a gente mais usava pra fazer lista, porque no papel… no papel a gente apanhava.\n\nCálculo Numérico foi outra novela. Se não fossem as listas, eu tava lascada. Era conta demais, quadro cheio, mente vazia. Foi nessa matéria que eu conheci o MATLAB — e foi também onde eu entendi que existe uma fase da vida em que você não encontra nem a solução exata… e ainda tem que aceitar uma aproximada. Método iterativo, erro de arredondamento, truncamento… um tanto de nome estranho pra explicar o simples fato de que a vida não fecha certinho.\n\nMas foi aí também que aconteceu uma coisa que eu gosto de lembrar: você sempre chamava alguém pro quadro… e eu sempre ia. E eu não ia só porque era 'responsável'. Eu ia porque eu gostava. Eu gostava de tentar, de errar, de pensar em voz alta. Aí no semestre seguinte já virou automático: você me chamava e eu virava praticamente seu assistente de palco oficial.\n\nEm Inteligência Artificial, eu entrei achando que ia aprender a fazer prompt… e saí entendendo o que é IA de verdade. O que é um sistema inteligente, como é que se pensa a diferença entre um robô que limpa a casa e algo mais avançado, como é que entra peso, vetor… e sim: a matemática volta. Ela sempre volta. Só que ali foi menos 'conta de encher o quadro' e mais 'entender o processo', e isso me ganhou.\n\nE Computação Gráfica… meu Deus. Eu nunca imaginei que eu ia fazer um programa em C que renderizasse uma pirâmide. Quando eu vi aquilo funcionando eu fiquei besta. Agora… a parte da luz? Se desse pra facilitar, eu apagava a luz da sala inteira, porque que negócio CHATO de calcular. Mas deu certo. E quando deu, foi muito bom.\n\nSó que, no fim, o mais marcante em você não foi matriz, nem MATLAB, nem pirâmide. Foi você mesma.\n\nVocê é paciente num nível sobrenatural. A sala podia estar um caos, gente falando, barulho, confusão… e você lá: firme, calma, explicando de novo, gesticulando, mudando o tom de voz do nada, esperando a gente completar a frase… e muitas vezes a gente te deixava no vácuo porque não entendia nem onde era o fim da frase. E você continuava. Se fosse eu, eu tinha distribuído uns tapão em todo mundo. Ainda bem que não sou eu.\n\nFora da sala, você sempre foi mais que professora. Teve dia que eu subi na sua sala só pra conversar, pra fofocar, pra pedir conselho, pra jogar papo fora. E você sempre escutava. Eu vi em você um cuidado de mãe mesmo, e isso me marcou muito. Eu conheci sua família, suas histórias, e eu sempre me senti acolhido perto de você.\n\nE o momento que eu guardo no coração: quando você aceitou ser minha orientadora do TCC.\n\nVocê não só aceitou — você ficou perto. Você me cobrou quando precisava, puxou quando eu tava mole, e ao mesmo tempo manteve tudo leve, do nosso jeito. Eu não tenho palavras pra te agradecer por ter caminhado comigo pra eu entregar o melhor TCC que eu conseguia.\n\nObrigado por tudo. Pelo CodeLab, pelas listas, pela paciência, pelas dicas até o final da prova, pelo carinho, pelas conversas… e por fazer parte da minha história.\n\nE relaxa: eu mando já o TCC.\n\nCom carinho,\nOrientado Yuri",
        style: { x: 35, y: 25, rotation: -1 }
      },
      {
        id: 'photo-adriana',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        meta: "A matriz que me venceu",
        style: { x: 70, y: 62, rotation: 6 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 240,
      timeStudying: 170,
      timeUnderstanding: 70,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Transformações lineares", cost: "vidas alteradas" },
        { name: "Determinantes infinitos", cost: "12 crises" },
        { name: "Listas salvadoras", cost: "todas as semanas" },
        { name: "Contas de encher o quadro", cost: "∞" },
        { name: "Métodos iterativos", cost: "confusão progressiva" },
        { name: "Erro por arredondamento", cost: "trauma leve" },
        { name: "Pesos e vetores em IA", cost: "mente expandida" },
        { name: "Renderizar pirâmide em C", cost: "orgulho puro" },
        { name: "Cálculo de luz em CG", cost: "paciência testada" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Rafael", emoji: "🏆", count: 5 },
        { name: "Inácio", emoji: "🥈", count: 5 },
        { name: "Klara", emoji: "🥉", count: 3 },
        { name: "Emilly", emoji: "4️⃣", count: 3 },
        { name: "Jefferson", emoji: "5️⃣", count: 2 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Álgebra Linear", topic: "Transformações e matrizes", level: 72 },
        { discipline: "Cálculo Numérico", topic: "Métodos que não convergem", level: 66 },
        { discipline: "Cálculo Numérico", topic: "Arredondamento e truncamento", level: 24 },
        { discipline: "Inteligência Artificial", topic: "Pesos e vetores", level: 69 },
        { discipline: "Computação Gráfica", topic: "Iluminação", level: 95 },
        { discipline: "Computação Gráfica", topic: "Transformações geométricas", level: 84 }
      ],
      peakSeason: { event: "Projeto de Computação Gráfica", intensity: "Luz demais, pirâmide e paciência de menos" },

      // Slide 6: Aura Docente
      aura: {
        color: "#22C55E",
        vibe: "Rigor com acolhimento",
        attributes: [
          { name: "Paciência", value: 100 },
          { name: "Didática", value: 95 },
          { name: "Rigor", value: 92 },
          { name: "Humanidade", value: 98 },
          { name: "Parceria", value: 96 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 73,
      bestSubject: { name: "Cálculo Numérico Computacional", grade: 9.7 },
      worstSubject: { name: "Computação Gráfica", grade: 4.7 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "A Matemática que Acolhe",
        description: "Ela cobra, exige e desafia, mas nunca abandona. Com ela, a matemática deixa de ser inimiga e vira ferramenta.",
        icon: "Sigma"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Calma que vai dar certo!", count: 120 },
        { word: "Ela disse que era fácil...", count: 97 },
        { word: "Bisseção é um saco!", count: 76 },
        { word: "Ainda não convergiu?", count: 69 },
        { word: "Essa transformação não dá", count: 63 },
        { word: "Olha tua foto negativada", count: 140 },
        { word: "Não esquece de normalizar", count: 54 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Theme From Peanuts (Linus And Lucy)",
        artist: "The Kidz Band",
        reason: "Toda vez que ela entrava na sala, sempre sacava o computador dela e o que mais chamava atenção era aquele cachorrinho deitado na tela dela.",
        coverColor: "from-green-500 to-emerald-700",
        spotifyUrl: "https://open.spotify.com/track/44uVkv28rjIQr1WEB1Rvao"
      },

      // Slide 11: Badge Final
      finalBadge: "Sobrevivente das Matrizes",


    }
  },
  {
    id: 'glaucia',
    name: 'Profa. Msc. Gláucia Melissa Medeiros Campos',
    nickname: 'Gláucia Melissa',
    gender: 'female',
    password: 'podcast',
    hint: 'Nunca me esquecerei das minhas entrevistas no po___st.',
    theme: 'sysop',
    codeName: 'shellzinho dos crias',
    subjects: ['Sistemas Operacionais', 'Computadores e Sociedade'],
    quiz: [
      { id: 1, question: "Em Sistemas Operacionais, qual tópico já chegou dando tapa na cara?", options: ["Escalonamento (e seus 4 tipos pra te confundir)", "Escolher papel de parede", "Configurar tema escuro", "Aprender a usar o mouse"], answer: 0 },
      { id: 2, question: "Enquanto eu tentava entender SO, minha cabeça entrava em:", options: ["Deadlock mental", "RGB lock", "Bluetoothlock", "Airplane mode"], answer: 0 },
      { id: 3, question: "A diferença entre processo e thread foi:", options: ["Clara e simples (mentira)", "O tipo de coisa que parece fácil até a prova", "Só um detalhe de nomenclatura", "Algo que não existe no mundo real"], answer: 1 },
      { id: 4, question: "Qual foi o trabalho mais marcante em SO?", options: ["Criar nosso próprio Shell (o CMD do meu jeito)", "Fazer um TikTok explicando kernel", "Instalar Windows sem reiniciar", "Rodar tudo sem sistema operacional"], answer: 0 },
      { id: 5, question: "A primeira vez usando máquina virtual foi:", options: ["No trabalho do Shell", "No tribunal de fake news", "Na prova de ética", "Quando a sala travou"], answer: 0 },
      { id: 6, question: "Em Computadores e Sociedade, a aula era mais:", options: ["Conversa, debate e discussão", "Só fórmula e lista", "Silêncio e sofrimento", "Compilação e erro"], answer: 0 },
      { id: 7, question: "Qual tema ficou comigo até hoje em Computadores e Sociedade?", options: ["Impacto social da tecnologia", "Como overclockar o cérebro", "Como burlar Wi-Fi do vizinho", "Como ganhar no LOL com ética"], answer: 0 },
      { id: 8, question: "O momento mais marcante da disciplina de Sociedade foi:", options: ["O tribunal de fake news", "A aula de cálculo 2", "A prova de ponteiros", "A guerra do Git"], answer: 0 },
      { id: 9, question: "Qual era o estilo da Gláucia com trabalhos?", options: ["Clara no que queria e firme com enrolação", "Aceitava qualquer desculpa criativa", "Sumia e aparecia no fim do semestre", "Só avaliava por carisma"], answer: 0 },
      { id: 10, question: "Depois de Gláucia, eu entendi que tecnologia:", options: ["Funciona por dentro e impacta o mundo por fora", "É neutra sempre", "Não tem nada a ver com sociedade", "Só dá problema quando falta café"], answer: 0 }
    ],
    muralItems: [
      ...createMural('glaucia'),
      {
        id: 'letter-glaucia',
        type: 'note',
        content: "Professora Gláucia,\n\nEu acho que com você eu vivi dois extremos muito curiosos da computação — e ambos me marcaram bastante.\n\nSistemas Operacionais chegou chegando. Logo de cara, escalonamento. Um pior que o outro. Gráficos, processos começando, esperando, voltando, parando… e enquanto eu tentava entender o que estava acontecendo na CPU, minha cabeça entrava em deadlock. Era processo, thread, concorrência, kernel, usuário… eu mal entendia no mundo real, imagine dentro de um computador.\n\nConcorrência, então, foi quando eu percebi que nem só pessoas brigam por recurso. O computador também. E ele faz isso de um jeito muito mais confuso. Na teoria já era difícil — na prática, travava tudo de vez. Sem dúvida, foi a matéria mais difícil que eu tive com você.\n\nMas no meio desse caos teve algo muito marcante: o trabalho do Shell. Construir nosso próprio \"CMD\", responder comandos, rodar tudo numa máquina virtual… foi a primeira vez que eu realmente coloquei a mão num ambiente diferente e pensei: \"ok, isso aqui é o sistema operacional funcionando\". Foi difícil, mas foi muito massa. Eu gostei. De verdade.\n\nJá em Computadores e Sociedade, o clima mudou completamente — e isso foi maravilhoso. A matéria era mais leve, mais conversa, mais troca. Discutimos fake news, ética, impacto social da tecnologia, inteligência artificial… e aquilo abriu minha cabeça de um jeito que nenhuma conta abriu. Até hoje eu carrego comigo essa ideia de que tecnologia não existe no vácuo — ela impacta pessoas, decisões, sociedades inteiras.\n\nO tribunal de fake news foi, sem dúvida, o momento mais marcante. Debater, argumentar, ouvir o outro lado, pensar criticamente… eu não conhecia esse lado criativo seu, e foi incrível ver tudo aquilo acontecendo em sala. Foi ali que muita coisa se construiu dentro de mim — e ficou.\n\nComo professora, você sempre foi muito clara. Sempre deixou explícito o que esperava, como avaliava, o que importava. Não tinha muito espaço pra desculpa inventada, mas tinha espaço pra pergunta, pra conversa, pra ajustar. Isso fez diferença. A lista de critérios do trabalho do Shell, por exemplo, me ajudou a entender não só como você avaliava, mas como eu deveria organizar meu próprio trabalho.\n\nEu sempre senti que você queria esse contato mais próximo. As conversas no Telegram, as dúvidas, os pedidos de prazo, as respostas. Você sempre presente. Sempre chegando na sala, dando bom dia, com sua garrafa de água — e sim, irmãos de óculos, isso precisa ser registrado.\n\nCom você, eu aprendi duas coisas muito importantes: como o computador funciona por dentro… e como a tecnologia funciona no mundo. São aprendizados completamente diferentes, mas igualmente necessários. E eu sou muito grato por ambos.\n\nObrigado por tudo. Pela firmeza, pela criatividade, pelas conversas, pelos debates e por ter deixado marcas que eu levo até hoje.\n\nCom carinho,\nYuri_shell",
        style: { x: 30, y: 20, rotation: -1 }
      },
      {
        id: 'photo-glaucia',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        meta: "Tribunal de Fake News (lendário)",
        style: { x: 68, y: 62, rotation: 7 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 120,
      timeStudying: 80,
      timeUnderstanding: 40,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Escalonamento (um pior que o outro)", cost: "4 traumas" },
        { name: "Processo vs Thread", cost: "confusão crônica" },
        { name: "Concorrência (no PC e na mente)", cost: "deadlock mental" },
        { name: "Criar um Shell do meu jeito", cost: "1 orgulho" },
        { name: "Primeira máquina virtual", cost: "1 mundo novo" },
        { name: "Tribunal de fake news", cost: "debate inesquecível" },
        { name: "Ética e impacto social", cost: "mudança de visão" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Jefferson", emoji: "🏆", count: 4 },
        { name: "Inácio", emoji: "🥈", count: 3 },
        { name: "Rafael", emoji: "🥉", count: 2 },
        { name: "George", emoji: "4️⃣", count: 1 },
        { name: "Luis Henrique", emoji: "5️⃣", count: 1 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Sistemas Operacionais", topic: "Escalonamento (gráficos e sofrimento)", level: 88 },
        { discipline: "Sistemas Operacionais", topic: "Processo vs Thread", level: 76 },
        { discipline: "Sistemas Operacionais", topic: "Concorrência e sincronização", level: 92 },
        { discipline: "Sistemas Operacionais", topic: "Entender kernel até o topo", level: 80 },
        { discipline: "Sistemas Operacionais", topic: "Trabalho do Shell", level: 74 },
        { discipline: "Computadores e Sociedade", topic: "Fake news e responsabilidade", level: 35 },
        { discipline: "Computadores e Sociedade", topic: "Debate no tribunal (falar e sustentar ideia)", level: 52 },
        { discipline: "Computadores e Sociedade", topic: "Impacto social da tecnologia", level: 40 }
      ],
      peakSeason: { event: "Trabalho do Shell", intensity: "Meu CMD, minhas regras" },

      // Slide 6: Aura Docente
      aura: {
        color: "#0EA5E9",
        vibe: "Firme, clara e humana",
        attributes: [
          { name: "Clareza", value: 95 },
          { name: "Firmeza", value: 90 },
          { name: "Abertura a dúvidas", value: 92 },
          { name: "Criatividade", value: 88 },
          { name: "Presença", value: 94 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 78,
      bestSubject: { name: "Computadores e Sociedade", grade: 10.0 },
      worstSubject: { name: "Sistemas Operacionais", grade: 5.8 },

      // Slide 8: Arquétipo Tech
      techArchetype: { name: "A Juíza do Kernel", description: "Ela é clara no que quer, firme com enrolação e humana no trato. Te faz entender o computador por dentro (mesmo doendo) e ainda te coloca pra debater tecnologia no mundo real.", icon: "Gavel" },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Sim, mas thread é o que mesmo?", count: 88 },
        { word: "Escalonamento Robin?", count: 76 },
        { word: "Semáforo até aqui...", count: 64 },
        { word: "Só tem concorrência!", count: 61 },
        { word: "Não acho que isso seja ético", count: 58 },
        { word: "CALA BOCA, FAKE NEWS!", count: 52 },
        { word: "Protesto!", count: 49 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Here Comes the Sun",
        artist: "The Beatles",
        reason: "Porque mesmo depois do caos dos processos, deadlocks e debates difíceis, as aulas dela sempre traziam clareza, conversa e a sensação de que tudo ia ficar bem.",
        coverColor: "from-yellow-400 to-orange-500",
        spotifyUrl: "https://open.spotify.com/track/6dGnYIeXmHdcikdzNNDMm2"
      },

      // Slide 11: Badge Final
      finalBadge: "Juiza do Shell e do Debate",


    }
  },
  {
    id: 'rosiery',
    name: 'Profa. Dra. Rosiery da Silva Maia',
    nickname: 'Rosiery Maia',
    gender: 'female',
    password: 'crianças',
    hint: 'Você sempre chegava com: "BOM DIA, C____ÇAS"',
    theme: 'math',
    codeName: 'mestra dos magos',
    subjects: [
      'Matemática Fundamental',
      'Desafios de Programação',
      'Complexidade de Algoritmos',
      'Teoria Geral da Administração e Empreendedorismo'
    ],
    quiz: [
      { id: 1, question: "Em Matemática Fundamental, qual era a marca registrada da Rosiery?", options: ["Sondagem antes de tudo", "Prova surpresa toda semana", "Silêncio absoluto na sala", "Resolver tudo só no quadro sem explicação"], answer: 0 },
      { id: 2, question: "Em Desafios de Programação, o que NÃO era permitido?", options: ["Internet e GPT da vida", "Pensar por conta própria", "Usar C", "Errar tentando"], answer: 0 },
      { id: 3, question: "A Torre de Hanoi foi:", options: ["Simples até você tentar codar", "Só um brinquedo decorativo", "Opcional na matéria", "Uma metáfora filosófica apenas"], answer: 0 },
      { id: 4, question: "Pensar logicamente e matematicamente era:", options: ["O maior desafio da disciplina inteira", "Automático e fácil", "Só copiar do colega", "Intuitivo igual respirar"], answer: 0 },
      { id: 5, question: "Em Complexidade de Algoritmos, o verdadeiro aprendizado foi:", options: ["Funcionar não basta, tem que ser eficiente", "Código bonito é o mais rápido", "Recursão resolve tudo", "Sempre usar força bruta"], answer: 0 },
      { id: 6, question: "Para entender complexidade, às vezes eu fazia:", options: ["Tabelas gigantes na prova", "Chutava e torcia", "Desenhava memes", "Ignorava a pergunta"], answer: 0 },
      { id: 7, question: "Em Teoria Geral, o projeto final envolvia:", options: ["Criar um produto de verdade", "Responder questionário infinito", "Só decorar teoria", "Montar planilha sem sentido"], answer: 0 },
      { id: 8, question: "Rosiery sempre foi conhecida por:", options: ["Motivar até quem estava desanimado", "Ignorar conflitos", "Ser distante", "Não propor desafios"], answer: 0 },
      { id: 9, question: "Quando ela parecia sumir, lembrava quem?", options: ["Mestre dos Magos", "Gandalf", "Batman", "Linus Torvalds"], answer: 0 },
      { id: 10, question: "No TCC, Rosiery foi:", options: ["Uma orientadora de verdade", "Só de coração", "Espectadora distante", "Figurante do processo"], answer: 0 }
    ],
    muralItems: [
      ...createMural('rosiery'),
      {
        id: 'letter-rosiery',
        type: 'note',
        content: "Professora Rosiery,\n\nMinha primeira impressão com você veio lá em Matemática Fundamental. Logo de cara deu pra perceber que você não era uma professora comum. Tinha dinâmica, tinha gincana, tinha lista, tinha sondagem — você sempre queria saber o que a gente realmente entendia antes de seguir em frente. A matéria já era difícil por natureza, e você sempre deixou claro que não fazia sentido transformar isso em trauma. Você explicava com calma, com paciência, e tornava tudo mais leve. Não à toa, enquanto era você na matéria, as notas iam bem.\n\nDepois vieram outras ondas. Em Desafios de Programação, você chegou com uma proposta muito clara: pensar. Pensar de verdade. Nada de internet, nada de GPT, nada de atalhos mágicos. Era a lógica nua e crua. Lembro bem da Torre de Hanoi — no brinquedo e no código — e de como aquilo parecia simples… até não ser. Pensar logicamente e matematicamente nunca foi meu ponto mais forte, então confesso que a matéria inteira me quebrava um pouco. Mas você nunca deixou virar desespero. Sempre acompanhou, passou lista, ajudou, puxou, acreditou. E isso fez toda a diferença.\n\nEm Complexidade de Algoritmos, você deixou uma marca que eu nunca esqueci. A definição de complexidade, do porquê não basta o código funcionar, mas sim funcionar bem, otimizado, eficiente — isso ficou comigo. Entender O(n), O(log n), comparar soluções, analisar prós e contras… eu lembro de escrever tabelas inteiras na prova só pra tentar visualizar o comportamento das funções. Era confuso, era difícil, mas fazia sentido. E hoje eu penso código de um jeito muito diferente por causa disso.\n\nJá em Teoria Geral da Administração e Empreendedorismo, você abriu outra porta. Mesmo sendo uma matéria mais teórica — e eu não sendo o maior fã disso — você conseguiu trazer tudo para o nosso universo. Falou de empreendedorismo, de produto, de ideias, de computação aplicada ao mundo real. E quando veio o projeto final… pronto. Desenvolver um produto, pensar no cliente, usar Figma, montar apresentação, estruturar tudo em grupo — eu amei. Descobri ali que talvez eu não seja líder, mas sou apaixonado por fazer parte de equipes, pensar no produto final e no impacto dele.\n\nMas o momento mais marcante com você, sem dúvida, foi o TCC. Você aceitar ser minha co-orientadora mudou tudo. Foi graças a você que a ideia tomou forma, que o projeto ganhou corpo. Você apoiou, sugeriu, corrigiu, cobrou quando precisava e até ofereceu sua própria mãe como usuária de teste. Isso não é pouca coisa.\n\nEu nunca vou esquecer o dia da apresentação, quando você pediu desculpa por ter sumido e disse que não tinha sido uma boa orientadora. E eu discordo profundamente disso. Orientar não é estar disponível 24 horas por dia. Orientar é direcionar, influenciar, dar segurança, corrigir quando precisa e manter o aluno no caminho certo. E você fez exatamente isso. Eu apresentei meu TCC confiante porque confiei nas suas orientações. E isso vale mais do que presença constante.\n\nVocê sempre foi motivadora. Nunca aceitou ver ninguém para baixo. Sempre perguntou se a gente estava bem. Sempre incentivou sonhos. Sempre chamou a gente de \"garoto\". E eu espero, de verdade, ser eternamente o garoto da Rosiery. Mesmo quando você parecia sumir como o Mestre dos Magos, você nunca deixou ninguém na mão.\n\nObrigado por acreditar em mim, por me desafiar, por me apoiar e por me ajudar a chegar até o fim. Você não foi uma orientadora de coração. Você foi — e é — uma orientadora de verdade. E tem um lugar muito especial no meu coração.\n\nCom carinho e admiração,\nGaroto Yuri",
        style: { x: 32, y: 24, rotation: -2 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 240,
      timeStudying: 90,
      timeUnderstanding: 150,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Sondagens infinitas", cost: "autoconhecimento" },
        { name: "Torre de Hanoi", cost: "neurônios queimados" },
        { name: "Lista de desafios", cost: "lógica reforçada" },
        { name: "Análise de complexidade", cost: "tabelas na prova" },
        { name: "Produto no Figma", cost: "criatividade desbloqueada" },
        { name: "Projeto de extensão", cost: "base do TCC" },
        { name: "Confiança para apresentar", cost: "segurança construída" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Jefferson", emoji: "🏆", count: 8 },
        { name: "Emilly", emoji: "🥈", count: 6 },
        { name: "Klara", emoji: "🥉", count: 5 },
        { name: "Rafael", emoji: "4️⃣", count: 4 },
        { name: "Inácio", emoji: "5️⃣", count: 4 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Desafios de Programação", topic: "Pensar sem internet", level: 87 },
        { discipline: "Desafios de Programação", topic: "Torre de Hanoi", level: 63 },
        { discipline: "Complexidade de Algoritmos", topic: "Identificar O(n)", level: 44 },
        { discipline: "Complexidade de Algoritmos", topic: "Comparar heurísticas", level: 52 },
        { discipline: "Teoria Geral", topic: "Parte teórica extensa", level: 60 },
        { discipline: "TCC", topic: "Segurança na apresentação", level: 21 }
      ],
      peakSeason: { event: "Complexidade de Algoritmos", intensity: "Não basta funcionar" },

      // Slide 6: Aura Docente
      aura: {
        color: "#F97316",
        vibe: "Desafiadora e motivadora",
        attributes: [
          { name: "Motivação", value: 98 },
          { name: "Energia", value: 95 },
          { name: "Desafio", value: 92 },
          { name: "Acolhimento", value: 94 },
          { name: "Criatividade", value: 90 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 84,
      bestSubject: { name: "Desafios de Programação", grade: 8.8 },
      worstSubject: { name: "Teoria Geral da Administração e Empreendedorismo", grade: 6.7 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "A Mentora dos Desafios",
        description: "Ela não facilita o caminho, mas caminha junto. Propõe desafios, cobra eficiência e motiva até o último minuto.",
        icon: "Flame"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "A senhora tá bem, prof?", count: 120 },
        { word: "E Suami tá bem também?", count: 98 },
        { word: "Vai valer ponto, prof?", count: 87 },
        { word: "Isso aí é O(n)!", count: 75 },
        { word: "O disco menor é encima do maior!", count: 70 },
        { word: "HEGGG, BOLSONAROOO!", count: 65 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Hall of Fame",
        artist: "The Script ft. will.i.am",
        reason: "Porque ela sempre motivou a acreditar no próprio potencial, a encarar desafios de frente e a não desistir no meio do caminho.",
        coverColor: "from-orange-500 to-yellow-500",
        spotifyUrl: "https://open.spotify.com/embed/track/7wMq5n8mYSKlQIGECKUgTX"
      },

      // Slide 11: Badge Final
      finalBadge: "Mentora Acima da Complexidade"
    }
  },
  {
    id: 'bartira',
    name: 'Profa. Dra. Bartira Paraguaçu Falcão Dantas Rocha',
    nickname: 'Bartira Rocha',
    gender: 'female',
    password: 'orientadora',
    hint: 'Pra mim, sempre serás nossa or_____dora',
    theme: 'db',
    codeName: 'fiscal de corredor',
    subjects: ['Banco de Dados', 'Métodos Formais', 'Projeto de Trabalho de Conclusão de Curso'],
    quiz: [
      { id: 1, question: "Em Banco de Dados, qual foi o conteúdo \"tranquilo\" que virou padrão de guerra?", options: ["DER (Diagrama Entidade-Relacionamento)", "Escolher cor do botão no Figma", "Configurar Wi-Fi do laboratório", "Instalar Windows sem pendrive"], answer: 0 },
      { id: 2, question: "Quando Bartira cobrava relacionamento no DER, ela queria:", options: ["Cardinalidade e participação bem definidas", "Que todo mundo virasse amigo no grupo", "Que o banco tivesse sentimentos", "Que a tabela se explicasse sozinha"], answer: 0 },
      { id: 3, question: "O erro mais comum que faz o banco \"virar inimigo\" é:", options: ["Chave estrangeira apontando pro nada", "A tabela ficar com ciúmes da outra", "O SQL decidir tirar férias", "A entidade fugir do diagrama"], answer: 0 },
      { id: 4, question: "Em Métodos Formais, a maior surpresa foi descobrir que:", options: ["Não existe só C… existe B e Z também", "O compilador vira pastor e te converte", "A matemática some do curso", "O programa prova sozinho que tá certo"], answer: 0 },
      { id: 5, question: "Métodos Formais doía mais porque exigia:", options: ["Resgatar conjuntos e matemática antiga", "Apenas decorar memes", "Só copiar do colega sem entender", "Rodar o código e confiar no destino"], answer: 0 },
      { id: 6, question: "Quando Bartira salvava a nota em Métodos Formais, geralmente vinha com:", options: ["Lista + apresentação (e suor)", "Prova surpresa com 2 minutos", "Trabalho sem critérios e sem rumo", "Nota por carisma"], answer: 0 },
      { id: 7, question: "Projeto de TCC serve principalmente pra:", options: ["Dar o pontapé inicial: título, objetivos, método e cronograma", "Fazer o TCC inteiro em uma aula", "Escolher fonte do PDF final", "Aprender a sofrer com ABNT sem contexto"], answer: 0 },
      { id: 8, question: "O momento mais \"mãe\" da Bartira aparecia quando:", options: ["Ela puxava pra realidade e falava de futuro e oportunidades", "Ela dizia: 'faz do teu jeito aí e boa sorte'", "Ela ignorava a turma por 3 meses", "Ela aceitava desculpa inventada com roteiro"], answer: 0 },
      { id: 9, question: "O estilo Bartira de lidar com desculpas era:", options: ["Acolhe, aconselha… mas não vacila de novo", "Aceita qualquer história triste com trilha sonora", "Passa pano industrial 220V", "Finge que não ouviu e dá 10"], answer: 0 },
      { id: 10, question: "Qual é o título oficial do cargo não-oficial dela nos corredores?", options: ["Fiscal de corredor", "Gerente de Wi-Fi", "Ministra da Compilação", "CEO do Laboratório"], answer: 0 }
    ],
    muralItems: [
      ...createMural('bartira'),
      {
        id: 'letter-bartira',
        type: 'note',
        content: "Professora Bartira,\n\nMinha primeira memória sua é em Banco de Dados. Eu já tinha visto a matéria antes no técnico, então cheguei achando que estava tranquilo. E realmente estava… até eu perceber que agora não era só fazer SELECT bonito, era entender de verdade o que estava por trás. Diagrama Entidade-Relacionamento, cardinalidade, integridade referencial… você fazia a gente desenhar relacionamento como se estivesse organizando uma árvore genealógica complicada da família inteira. E ali eu já vi quem você era: uma mãe. Uma mãe que gritava quando precisava, que brigava quando vacilava, mas que aconselhava como ninguém.\n\nVocê insistia no aluno. Mas também deixava muito claro: não vacile. Estude. Corra atrás. Você aconselha uma vez, mas se fizer errado de novo… o sermão vem. E eu brincava dizendo que você mandava eu deixar de ser doido. E mandava mesmo. Mas era cuidado disfarçado de bronca.\n\nEm Métodos Formais eu descobri que o mundo não gira só em torno da linguagem C. Existia B. Existia Z. Existia sofrimento matemático disfarçado de validação formal. Eu tive que revisitar conjuntos, lógica, símbolos que eu jurava que nunca mais ia ver na vida. Era difícil. Era técnico. Era chato às vezes. Mas você sempre estava lá com lista, com explicação, com apresentação para ajudar na nota e na compreensão. Você não largava ninguém.\n\nE então veio Projeto de TCC. Ali você virou mãe nível máximo. Porque não era mais só sobre passar na disciplina, era sobre formar. Era sobre título, objetivo, metodologia, cronograma, pré-banca. Era sobre o futuro. Eu lembro de você dando conselhos que, na época, a sala nem sempre merecia — porque a gente era meio idiota mesmo. Mas você insistia. Falava de visão, de carreira, de bolsa, de oportunidade, de correr atrás. Você se importava com o antes, o durante e o depois da graduação.\n\nUma coisa que sempre me marcou foi perceber que aquilo não parecia só profissão. Não parecia só obrigação de orientadora pedagógica. Parecia genuíno. Parecia cuidado de verdade. Você nos tratava como filhos acadêmicos. E isso é raro.\n\nVocê sempre foi organizada, rígida quando precisava, não aceitava desculpa mole. Pisava no pé se fosse necessário — porque queria ver todo mundo formado. E conseguiu. Hoje você é vice-diretora, e eu tenho orgulho demais de dizer que fui seu aluno.\n\nE fora da sala, no corredor, eu sempre dizia: \"E aí, Bartira, só andando? Virou fiscal agora?\" E você me ameaçava. Mas eu sabia que era carinho disfarçado.\n\nObrigado por ensinar Banco de Dados, Métodos Formais e Projeto de TCC. Mas, principalmente, obrigado por ensinar resiliência. Por ensinar que não basta começar — tem que terminar direito.\n\nCom respeito e carinho,\nMenino Yuri",
        style: { x: 30, y: 20, rotation: -2 }
      },
      {
        id: 'photo-bartira',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        meta: "DER, café e conselhos (combo mortal)",
        style: { x: 68, y: 62, rotation: 6 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 180,
      timeStudying: 105,
      timeUnderstanding: 75,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "DER desenhado até em sonho", cost: "12 diagramas" },
        { name: "Relacionamento 1:N explicado 3x", cost: "paciência materna" },
        { name: "Chave estrangeira quebrada", cost: "2 surtos" },
        { name: "Linguagem B e Z", cost: "2 alfabetos novos" },
        { name: "Conjuntos ressuscitados", cost: "matemática do passado" },
        { name: "Lista pra salvar a nota", cost: "sempre" },
        { name: "Pré-banca do Projeto de TCC", cost: "realidade batendo" },
        { name: "Conselhos de futuro", cost: "pra vida" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Rafael", emoji: "🏆", count: 7 },
        { name: "Inácio", emoji: "🥈", count: 6 },
        { name: "Jefferson", emoji: "🥉", count: 5 },
        { name: "Luis Henrique", emoji: "4️⃣", count: 4 },
        { name: "Maria Antônia", emoji: "5️⃣", count: 4 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Banco de Dados", topic: "Cardinalidade que não bate", level: 55 },
        { discipline: "Banco de Dados", topic: "Integridade referencial (FK apontando pro vazio)", level: 70 },
        { discipline: "Banco de Dados", topic: "Normalização (quando tudo vira tabela)", level: 48 },
        { discipline: "Métodos Formais", topic: "Aprender B e Z do zero", level: 88 },
        { discipline: "Métodos Formais", topic: "Conjuntos e símbolos ressuscitados", level: 82 },
        { discipline: "Projeto de TCC", topic: "Definir objetivo sem viajar demais", level: 60 },
        { discipline: "Projeto de TCC", topic: "Cronograma que seja minimamente real", level: 66 }
      ],
      peakSeason: { event: "Pré-banca do Projeto de TCC", intensity: "Começa bonito… termina realista" },

      // Slide 6: Aura Docente
      aura: {
        color: "#14B8A6",
        vibe: "Mãe firme e organizada",
        attributes: [
          { name: "Organização", value: 98 },
          { name: "Cuidado", value: 96 },
          { name: "Firmeza", value: 92 },
          { name: "Didática", value: 90 },
          { name: "Presença", value: 95 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 84,
      bestSubject: { name: "Projeto de Trabalho de Conclusão de Curso", grade: 10.0 },
      worstSubject: { name: "Métodos Formais", grade: 7.0 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "A Mãe do Fluxo",
        description: "Ela aconselha, puxa a orelha e te coloca no rumo. Organiza teu caos, cobra o necessário e não deixa ninguém pra trás.",
        icon: "HeartHandshake"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "No corredor de novo, Bartira?", count: 120 },
        { word: "Esse conjunto não bate", count: 95 },
        { word: "DER ou MER?", count: 78 },
        { word: "ESSA CHAVE NÃO É PRIMÁRIA!", count: 70 },
        { word: "Até o banco tem relacionamentos...", count: 64 },
        { word: "1:N ou N:N?", count: 58 },
        { word: "Ainda dá pra trancar?", count: 52 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Raridade",
        artist: "Anderson Freire",
        reason: "Porque ela sempre enxergou valor onde às vezes a gente não via. Cobrou, aconselhou e lembrou que cada aluno tem propósito e potencial.",
        coverColor: "from-teal-600 to-emerald-800",
        spotifyUrl: "https://open.spotify.com/embed/track/3Gam4UbOwnwQQQKuItui39"
      },

      // Slide 11: Badge Final
      finalBadge: "Mãe e Fiscal do Corredor",


    }
  },
  {
    id: 'andre-gustavo',
    name: 'Prof. Msc. André Gustavo Pereira da Silva',
    nickname: 'André Gustavo',
    gender: 'male',
    password: 'notadez',
    hint: 'Você sempre me cobrava uma coisa com as mãos... n__a __z',
    theme: 'web',
    codeName: 'sem uber e lanche no lab',
    subjects: [
      'Paradigmas de Programação',
      'Sistemas Distribuídos',
      'Projeto de Graduação',
      'Prática de Programação II'
    ],
    quiz: [
      { id: 1, question: "Em Paradigmas, qual foi o susto do 2º semestre?", options: ["Do nada: Java e POO", "Cálculo 4 escondido", "Assembly obrigatório", "O professor mandar programar sem teclado"], answer: 0 },
      { id: 2, question: "O que o André fazia quase sempre antes de continuar o conteúdo?", options: ["Recapitulação da aula anterior", "Prova surpresa", "Sumir igual Mestre dos Magos", "Mandar ler 200 páginas e rezar"], answer: 0 },
      { id: 3, question: "Qual era o foco mais forte em Paradigmas?", options: ["Orientação a Objetos", "Programação Quântica", "HTML com herança", "CSS recursivo"], answer: 0 },
      { id: 4, question: "Em Sistemas Distribuídos, o que virou rotina?", options: ["Aula no laboratório e máquina virtual", "Só copiar slide e pronto", "Nada de prática", "Trabalhar sem internet e sem energia"], answer: 0 },
      { id: 5, question: "Qual tecnologia foi o boss mais 'grande' da disciplina?", options: ["Kubernetes", "Paint", "WordArt", "PowerPoint com animação 3D"], answer: 0 },
      { id: 6, question: "No seminário, Kubernetes foi explicado como:", options: ["Uma cozinha (chefes, garçons e pedidos)", "Um jogo de tiro", "Um culto com liturgia", "Um banco de dados emocional"], answer: 0 },
      { id: 7, question: "Projeto de Graduação servia para:", options: ["Dar forma real ao TCC: intro, objetivos, método e cronograma", "Escrever o TCC inteiro em 1 semana", "Escolher a capa e acabou", "Sofrer com ABNT sem contexto"], answer: 0 },
      { id: 8, question: "Qual era a marca registrada dele em todas as matérias?", options: ["Listas enormes (15–20 questões) que salvavam", "Não passar nada e cobrar tudo", "Só avaliação oral em latim", "Nota baseada em carisma"], answer: 0 },
      { id: 9, question: "Em Prática II, a linguagem foi:", options: ["Python (aka programação orientada a gambiarra)", "Java com ponteiro", "C puro com Kubernetes", "SQL com herança"], answer: 0 },
      { id: 10, question: "Quais duas regras viraram piada interna com ele?", options: ["Sem Uber pra UERN e sem lanche no lab", "Sem café e sem Wi-Fi", "Sem estudar e sem reclamar", "Sem código e sem compilar"], answer: 0 }
    ],
    muralItems: [
      ...createMural('andre-gustavo'),
      {
        id: 'letter-andre-gustavo',
        type: 'note',
        content: "Professor André,\n\nMinha primeira impressão sua foi em Paradigmas de Programação. A gente mal tinha se acostumado com C e, de repente, o senhor chega com Java, orientação a objetos, herança, polimorfismo… parecia que tinham aberto um portal para outro universo. E o mais interessante é que o senhor nunca jogava o conteúdo e saía correndo. Sempre recapitulação antes de avançar. Sempre retomando o que ficou pra trás. Sempre explicando de novo se fosse necessário.\n\nJava assustava, mas sua didática não. O senhor sempre foi calmo, educado, gentil. Um professor que testa na hora, que provoca raciocínio, mas que não deixa ninguém se afogar.\n\nDepois vieram Sistemas Distribuídos. E aí o buraco era mais embaixo. Máquina virtual, concorrência, comunicação entre processos, Kubernetes… aquilo abriu minha cabeça de um jeito que eu não esperava. Eu lembro do seminário onde expliquei Kubernetes como se fosse uma cozinha — chefe, garçom, organização de pedidos — tentando traduzir aquele caos distribuído pra algo que fizesse sentido. Foi difícil entender a dimensão do que é um sistema distribuído, mas foi fascinante.\n\nProjeto de Graduação foi outro marco. Ali eu senti pela primeira vez o gosto real de um TCC universitário. O senhor organizava tudo com clareza: introdução, objetivos, metodologia, cronograma. Sempre com lista. Muitas listas. Quinze, vinte questões. E o melhor: muitas vezes as questões da revisão apareciam na prova. Era quase um carinho acadêmico.\n\nEm Prática de Programação II, Python entrou em cena. Programação orientada a gambiarra, como o senhor mesmo brincava. Fiz uma loja de pets, foi divertido demais. Ainda tenho meus preconceitos com Python — sou da velha guarda — mas aprendi muito ali.\n\nE claro, não tem como esquecer nossas piadas internas. Não comer no laboratório. Nunca pegar Uber pra UERN. Depois daquele acidente na chuva, todo molhado, o senhor me olhando e dizendo pra nunca mais fazer aquilo. E também o gesto do 10 com os dedos. Sempre que passava na janela, levantava os dois dedos cobrando a nota máxima. Pode parecer simples, mas aquilo virou meta. Virou motivação.\n\nO senhor sempre esperou o melhor da gente. E quando alguém espera o melhor de você, você aprende a buscar isso.\n\nObrigado por ensinar paradigmas, distribuídos, prática e projeto. Mas principalmente por ensinar disciplina, constância e excelência.\n\nCom respeito e aquele 10 simbólico levantado,\nYuri Nota 10",
        style: { x: 30, y: 20, rotation: -1 }
      },
      {
        id: 'photo-andre-gustavo',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        meta: "Sem Uber. Sem lanche. Só nota 10.",
        style: { x: 66, y: 62, rotation: 7 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 240,
      timeStudying: 100,
      timeUnderstanding: 140,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Java e POO no 2º semestre", cost: "1 susto coletivo" },
        { name: "Recapitulação antes de avançar", cost: "didática premium" },
        { name: "Listas de 15–20 questões", cost: "salvação de nota" },
        { name: "Máquina virtual no laboratório", cost: "1 mundo novo" },
        { name: "Concorrência em sistemas distribuídos", cost: "bugs invisíveis" },
        { name: "Kubernetes explicado como cozinha", cost: "criatividade aplicada" },
        { name: "Projeto de Graduação (estrutura do TCC)", cost: "maturidade" },
        { name: "Python (POG) + loja de pets", cost: "1 projeto divertido" },
        { name: "Gestinho do 10 na janela", cost: "motivação eterna" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Jefferson", emoji: "🏆", count: 7 },
        { name: "Rafael", emoji: "🥈", count: 6 },
        { name: "Inácio", emoji: "🥉", count: 6 },
        { name: "Klara", emoji: "4️⃣", count: 4 },
        { name: "Emilly", emoji: "5️⃣", count: 4 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Paradigmas de Programação", topic: "Java e POO do nada", level: 72 },
        { discipline: "Paradigmas de Programação", topic: "Herança e polimorfismo", level: 60 },
        { discipline: "Sistemas Distribuídos", topic: "Concorrência (bug invisível)", level: 88 },
        { discipline: "Sistemas Distribuídos", topic: "Máquina virtual no lab", level: 52 },
        { discipline: "Sistemas Distribuídos", topic: "Kubernetes", level: 90 },
        { discipline: "Projeto de Graduação", topic: "Objetivos e metodologia bem amarrados", level: 58 },
        { discipline: "Prática de Programação II", topic: "Python e suas gambiarras", level: 65 }
      ],
      peakSeason: { event: "Seminário de Kubernetes", intensity: "Cozinha distribuída pegando fogo" },

      // Slide 6: Aura Docente
      aura: {
        color: "#22C55E",
        vibe: "Calmo e exigente no 10",
        attributes: [
          { name: "Didática", value: 92 },
          { name: "Calma", value: 95 },
          { name: "Humor", value: 88 },
          { name: "Cobrança", value: 85 },
          { name: "Presença", value: 90 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 87,
      bestSubject: { name: "Prática de Programação II", grade: 10.0 },
      worstSubject: { name: "Sistemas Distribuídos", grade: 6.7 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "O Mestre do 10",
        description: "Ele te joga em Java quando você ainda é 'criança do C', depois te bota em Kubernetes, e ainda te cobra excelência com dez dedos levantados na janela.",
        icon: "Trophy"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Vai dar certo sim!", count: 110 },
        { word: "Vai ter lista de revisão?", count: 92 },
        { word: "Esse Pyhton é uma bixiga", count: 80 },
        { word: "Quem é Kubernetes?", count: 76 },
        { word: "Tô comendo não professor", count: 64 },
        { word: "Deixe comigo que aqui é 10!", count: 120 },
        { word: "Orientado a gambiarra mesmo.", count: 58 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Robot Rock",
        artist: "Daft Punk",
        reason: "Porque era laboratório, lista, prática, repetir, ajustar, melhorar — quase um loop infinito de evolução técnica. Robótico e preciso.",
        coverColor: "from-green-700 to-emerald-900",
        spotifyUrl: "https://open.spotify.com/embed/track/7LL40F6YdZgeiQ6en1c7Lk"
      },

      // Slide 11: Badge Final
      finalBadge: "O Professor Nota 10",
    }
  },
  {
    id: 'anderson-abner',
    name: 'Prof. Dr. Anderson Abner de Santana Souza',
    nickname: 'Anderson Abner',
    gender: 'male',
    password: 'theconstruct',
    hint: 'O “mundo” onde a Robótica acontecia (e onde você ensinou ROS)',
    theme: 'hardware',
    codeName: 'entenderam? show',
    subjects: [
      'Circuitos Digitais',
      'Sistemas Digitais',
      'Arquitetura de Computadores',
      'Arquitetura Avançada de Computadores',
      'Prática de Programação para Robótica I'
    ],
    quiz: [
      { id: 1, question: "Em Circuitos Digitais, qual foi o primeiro portal pro mundo do hardware?", options: ["Portas lógicas + tabela verdade", "Compilar Java com ponteiro", "Treinar rede neural no papel", "Deploy no Kubernetes sem internet"], answer: 0 },
      { id: 2, question: "Qual ferramenta virou o \"laboratório virtual\" da turma?", options: ["Logisim", "Photoshop", "Excel", "Scratch Enterprise Edition"], answer: 0 },
      { id: 3, question: "Em Sistemas Digitais, o que começou a complicar de verdade?", options: ["Flip-flops e mapas de Karnaugh", "Escolher tema do slide", "Configurar fonte do VS Code", "Trocar a cor do LED no CSS"], answer: 0 },
      { id: 4, question: "Qual era o charme nerd das práticas com circuitos?", options: ["LEDs e displays hexadecimais acendendo certinho", "Servidor chorando de emoção", "Banco de dados com autoestima", "Um robô fazendo TCC sozinho"], answer: 0 },
      { id: 5, question: "Arquitetura de Computadores foi mais:", options: ["Conceitos densos (registradores, cache, pipeline)", "Só prática com robôs o semestre inteiro", "Uma matéria de design no Figma", "Assembly obrigatório no primeiro dia"], answer: 0 },
      { id: 6, question: "Qual coisa você agradece até hoje por NÃO ter entrado pesado na disciplina?", options: ["Assembly", "Tabela verdade", "Cache", "Slide ilustrado"], answer: 0 },
      { id: 7, question: "Arquitetura Avançada parecia:", options: ["Arquitetura I com esteroides: superpipeline, superescalar e fórmulas", "Uma revisão leve de HTML", "Uma aula só de memes", "Um passeio sem matemática"], answer: 0 },
      { id: 8, question: "Em Robótica, o ambiente que marcou a experiência foi:", options: ["The Construct + ROS", "PowerPoint + Paint", "Notepad + fé", "Excel com macros de sensores"], answer: 0 },
      { id: 9, question: "O objetivo real da Robótica I foi mais:", options: ["Fundamentos: fazer o robô andar, desviar e entender sensores", "Construir um robô cirurgião em 2 semanas", "Treinar o robô a voar", "Fazer o robô pagar boleto"], answer: 0 },
      { id: 10, question: "Bordão que virou assinatura emocional das aulas:", options: ["Entenderam? Show.", "Quem não chorar não passa.", "Não existe bug, existe destino.", "É só reiniciar o kernel."], answer: 0 }
    ],
    muralItems: [
      ...createMural('anderson-abner'),
      {
        id: 'letter-anderson-abner',
        type: 'note',
        content: "Professor Abner,\n\nMinha primeira impressão sua foi em Circuitos Digitais. Um professor simpático, tranquilo, na dele, mas totalmente disposto a ensinar. Tabela verdade, portas AND, OR, NOR… tudo parecia simples no começo. Até que a gente começou a perceber que por trás daqueles 0s e 1s existia um mundo inteiro funcionando. O Logisim virou nosso laboratório virtual e, enquanto o senhor não pediu pra montar um computador inteiro ali dentro, eu estava feliz.\n\nDepois vieram Sistemas Digitais. Flip-flop, mapas de Karnaugh, sobe 1, desce 0… ali a coisa começou a ficar séria. Já não era só entender porta lógica, era entender memória, estado, transição. E mesmo ficando mais pesado, seus trabalhos sempre eram organizados, bem estruturados. Mexer com os displays hexadecimais, ver LEDs acendendo… aquilo era muito massa.\n\nArquitetura de Computadores veio forte. Muito conceito, muito pipeline, registradores, cache, superpipeline. E eu agradeço até hoje por não termos entrado em Assembly naquele momento, porque já estava desafiador o suficiente. Era teórico, era denso, mas seus slides eram lindos e ilustrados, o que pra mim fazia muita diferença. Sempre que terminava um slide, o senhor perguntava: \"Entenderam?\" E quando a gente respondia que sim, vinha aquele \"show\". Isso ficou marcado.\n\nArquitetura Avançada foi o irmão mais velho que não brinca em serviço. Superescalar, processamento paralelo, fórmulas sobre fórmulas. Conceitos antigos ganhando camadas novas. Matemática reaparecendo quando eu jurava que tinha ido embora. Foi tenso. Mas com listas, seminários e sua condução firme, deu pra atravessar.\n\nE então veio Robótica.\n\nRobótica não foi só uma disciplina. Foi um sonho materializado. Entrar no The Construct, mexer com ROS, entender sensores, ver um robô andar em quadrado, desviar de obstáculos… testar em robôs reais no laboratório… levar pro GoRN… aquilo foi outro nível. Eu achava que ia operar um robô cirurgião, mas entender os fundamentos e fazer ele andar já foi incrível demais.\n\nO senhor sempre foi muito solícito. Sempre deixou a porta aberta pra tirar dúvida. Sempre ajudou. Sempre falou dos seus próprios projetos. E quando apareceu a oportunidade de bolsa, o senhor ofereceu. Isso não é pouca coisa.\n\nEu lembro de perguntar das suas filhas, de me preocupar quando alguma ficava doente. E lembro do senhor perguntando se a gente tinha entendido, sempre buscando garantir que ninguém estivesse perdido.\n\nO senhor despertou em mim essa sede por tecnologia nova. Sensores, robótica, arquitetura… não era só aprender conteúdo. Era entender como as coisas realmente funcionam por dentro.\n\nObrigado por ensinar hardware, arquitetura e robótica com firmeza e entusiasmo.\n\nEntendemos, professor.\nShow.\n\nROS:Yuri",
        style: { x: 30, y: 20, rotation: -2 }
      },
      {
        id: 'photo-anderson-abner',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        meta: "LEDs, robôs e um “show” no final",
        style: { x: 66, y: 62, rotation: 7 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 300,
      timeStudying: 210,
      timeUnderstanding: 90,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Portas lógicas e tabela verdade", cost: "0 e 1 na veia" },
        { name: "Logisim sem montar um PC inteiro", cost: "gratidão" },
        { name: "Flip-flops e estados", cost: "memória de curto prazo indo embora" },
        { name: "Mapas de Karnaugh", cost: "tabelas sobe-1-desce-0" },
        { name: "Registradores, cache e pipeline", cost: "conceitos no cérebro" },
        { name: "Fórmulas extras (porque sim)", cost: "matemática voltando" },
        { name: "Robô andando quadrado/círculo", cost: "felicidade genuína" },
        { name: "Sensores e desvio de obstáculos", cost: "mundo real" },
        { name: "GoRN com robô", cost: "orgulho" },
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Jefferson", emoji: "🏆", count: 8 },
        { name: "Rafael", emoji: "🥈", count: 5 },
        { name: "Inácio", emoji: "🥉", count: 5 },
        { name: "Maria Klara", emoji: "4️⃣", count: 4 },
        { name: "Emily", emoji: "5️⃣", count: 4 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Circuitos Digitais", topic: "Tabela verdade e simplificação", level: 35 },
        { discipline: "Circuitos Digitais", topic: "Logisim (atividade que parece fácil)", level: 45 },
        { discipline: "Sistemas Digitais", topic: "Flip-flops", level: 68 },
        { discipline: "Sistemas Digitais", topic: "Mapas de Karnaugh", level: 80 },
        { discipline: "Arquitetura de Computadores", topic: "Pipeline e hazards", level: 72 },
        { discipline: "Arquitetura de Computadores", topic: "Cache e hierarquia de memória", level: 65 },
        { discipline: "Arquitetura Avançada", topic: "Superescalar + fórmulas", level: 88 },
        { discipline: "Arquitetura Avançada", topic: "Processamento paralelo (conceito novo em cima do velho)", level: 84 },
        { discipline: "Robótica I", topic: "ROS + nós e tópicos", level: 55 },
        { discipline: "Robótica I", topic: "Sensores e obstáculos", level: 50 }
      ],
      peakSeason: { event: "Arquitetura Avançada", intensity: "Conceitos em camadas + matemática ressuscitada" },

      // Slide 6: Aura Docente
      aura: {
        color: "#0EA5E9",
        vibe: "Didático e sempre 'show'",
        attributes: [
          { name: "Didática", value: 92 },
          { name: "Clareza", value: 90 },
          { name: "Bom humor", value: 85 },
          { name: "Inovação", value: 88 },
          { name: "Atenção", value: 93 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 57,
      bestSubject: { name: "Arquitetura de Computadores", grade: 9.6 },
      worstSubject: { name: "Arquitetura Avançada de Computadores", grade: 3.5 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "O Arquiteto dos Robôs",
        description: "Ele te ensina o mundo dos 0s e 1s, te joga em pipeline e cache, e depois te entrega um robô real pra você ver a teoria andando na sua frente.",
        icon: "Bot"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "E agora é SUPERescalar é?", count: 120 },
        { word: "Entendi sim, professor!", count: 160 },
        { word: "Cansei de tanta pipeline", count: 78 },
        { word: "KARNAUGH TÁ ERRADO!", count: 64 },
        { word: "O robô tá batendo em tudo...", count: 70 },
        { word: "Como que faz essa tabela verdade?", count: 58 },
        { word: "AEEEEE, o robô andou!", count: 62 },
        { word: "Vou chorar se der 0 de novo...", count: 50 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Technologic",
        artist: "Daft Punk",
        reason: "Porque hardware, arquitetura e robótica são exatamente isso: executar, repetir, otimizar, evoluir. Mecânico, preciso e futurista — igual as aulas.",
        coverColor: "from-gray-800 to-black",
        spotifyUrl: "https://open.spotify.com/embed/track/0LSLM0zuWRkEYemF7JcfEE"
      },

      // Slide 11: Badge Final
      finalBadge: "Dono de Todo ROS e Cache",


    }
  },
  {
    id: 'felipe-denis',
    name: 'Prof. Dr. Felipe Denis Mendonça de Oliveira',
    nickname: 'Felipe Denis',
    gender: 'male',
    password: 'vampirao',
    hint: 'Só nas madrugadas, nosso v____rao',
    theme: 'sysop',
    codeName: 'e djuri? faltou?',
    subjects: [
      'Geometria Analítica',
      'Transmissão de Dados',
      'Redes de Computadores',
      'Tópicos Especiais em Sistemas Embarcados I',
      'Tópicos Especiais em Sistemas Embarcados II'
    ],
    quiz: [
      { id: 1, question: "Por que as provas do Felipe pareciam 'justas' de um jeito suspeito?", options: ["Porque podia consultar o material dele (e ainda assim tinha pegadinha)", "Porque ele aceitava resposta em forma de meme", "Porque ele corrigia por osmose", "Porque a nota vinha por DHCP automaticamente"], answer: 0 },
      { id: 2, question: "Em Geometria Analítica, a sensação era:", options: ["Muita conta… mas com explicação tão boa que virava só 'trabalho honesto'", "Nenhuma conta: só desenhar coração no plano cartesiano", "Só teoria sem exercício (o terror)", "Resolver vetor no Figma"], answer: 0 },
      { id: 3, question: "Em Redes, qual ferramenta fazia você se sentir um mini-hacker vendo pacotes passando?", options: ["Wireshark (o 'olho' da rede)", "Paint 3D", "Bloco de Notas Premium", "Gerenciador de Tarefas em modo dark"], answer: 0 },
      { id: 4, question: "O choque em Redes foi perceber que a internet:", options: ["É um monte de camadas e protocolos (e nada é 'mágica')", "Funciona por telepatia", "É só um cabo grande com fé", "Só existe porque o roteador tem autoestima"], answer: 0 },
      { id: 5, question: "Em Transmissão de Dados, qual verdade cruel apareceu?", options: ["Até o silêncio tem ruído", "Wi-Fi é 100% perfeito e puro", "Largura de banda é placebo", "Nyquist é um personagem de anime"], answer: 0 },
      { id: 6, question: "Qual nome de teoria virou figurinha mental na disciplina?", options: ["Teorema de Nyquist", "Teorema do 'Confia'", "Teorema do Print", "Teorema do 'Dá teu jeito'"], answer: 0 },
      { id: 7, question: "O que deixava as matérias dele com cara de 'bem pensado'?", options: ["Slides gigantes tipo livro, com exemplos e exercícios", "Slide com 2 palavras e oração final", "Só mandar link do YouTube e sumir", "Apostila escrita em hieróglifo"], answer: 0 },
      { id: 8, question: "Em Embarcados (I/II), o que abriu a porta pro seu TCC acontecer na prática?", options: ["S32 + Arduino + IoT + sensores (mundo real)", "Configurar CSS do microcontrolador", "Treinar LLM dentro do LED", "Rodar Kubernetes no Arduino UNO"], answer: 0 },
      { id: 9, question: "Qual foi o momento 'mágico' de Embarcados que fica pra sempre?", options: ["Ver o LED acender com código seu", "O roteador pedir desculpa", "O sensor pagar boleto sozinho", "O Tinkercad virar consciência"], answer: 0 },
      { id: 10, question: "Qual apelido/assinatura do professor com você ficou eternizado?", options: ["Djuri", "Root", "Kernelzinho", "IPv7"], answer: 0 }
    ],
    muralItems: [
      ...createMural('felipe-denis'),
      {
        id: 'letter-felipe-denis',
        type: 'note',
        content: "Professor Felipe Denis,\n\nFalar do senhor é quase injusto com os outros professores. Porque enquanto alguns davam o caminho das pedras, o senhor dava a estrada do céu toda polida, iluminada e organizada. Seus slides não eram slides — eram livros. 60, 70 páginas, exemplos, exercícios, explicação detalhada. E ainda permitia consulta na prova. Isso não era facilidade. Era confiança no aluno. Claro… sempre tinha uma pegadinha estratégica, porque o senhor é ligeiramente safado academicamente.\n\nGeometria Analítica foi muita conta. Vetor, produto escalar, produto vetorial, plano, reta, cálculo atrás de cálculo. Mas com sua didática prática, tudo parecia resolvível. Difícil? Sim. Mas impossível? Nunca.\n\nRedes de Computadores foi quando eu percebi que a internet não é mágica — é engenharia pura. Camadas, protocolos, Packet Tracer, analisadores de tráfego… eu me sentia um hacker profissional só de abrir o programa e ver os pacotes passando. E ainda assim o senhor tornava aquilo simples.\n\nTransmissão de Dados então… eu nem sabia que passagem de dados tinha tanta fórmula. Nyquist, largura de banda, ruído. Até o silêncio tem ruído. E lá estava o senhor explicando tudo como se fosse a coisa mais natural do mundo.\n\nE então vieram os Embarcados.\n\nFoi ali que meu TCC nasceu. S32, Arduino, sensores, Tinkercad, IoT. Ver um LED acender com código escrito por mim foi mágico. E se hoje a parte prática do meu TCC existiu, foi porque o senhor abriu essa porta. Literalmente.\n\nMas o senhor não ensinou só técnica.\n\nO senhor ensinou apresentação. Organização. Slide limpo. Texto conciso. Nada de poluição visual. Ensinou postura. Tempo. Expressão. Ensinou conselho de vida. Falou sobre casamento, escolhas, companhias. Cobrou minhas amizades. Cobrou meus grupos. E eu sei que isso nunca foi obrigação sua.\n\nE claro… o vampirão do Telegram. Respondendo mensagens meia-noite, uma da manhã, duas da manhã. Sempre lá.\n\nE sempre perguntando:\n\"E djuri? Faltou?\"\n\nNão faltou, professor.\n\nObrigado por tudo.\n\nDjuri",
        style: { x: 30, y: 20, rotation: -2 }
      },
      {
        id: 'photo-felipe-denis',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        meta: "Pacotes, sinais, sensores… e respostas 02:13 no Telegram.",
        style: { x: 66, y: 62, rotation: 8 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 300,
      timeStudying: 95,
      timeUnderstanding: 205,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Prova com consulta (material dele)", cost: "confiança + pegadinha" },
        { name: "Vetores e planos (Geometria)", cost: "muita conta, pouco trauma" },
        { name: "Packet Tracer e camadas da internet", cost: "hacker por 1 semestre" },
        { name: "Wireshark vendo pacotes", cost: "curiosidade perigosa" },
        { name: "Teorema de Nyquist", cost: "1 nome pra nunca esquecer" },
        { name: "Arduino + Tinkercad + sensores", cost: "mundo IoT abrindo" },
        { name: "ESP32 e mão na massa", cost: "TCC saindo do papel" },
        { name: "Conselhos de vida (bônus DLC)", cost: "professor + mentor" },
        { name: "Mensagens respondidas tarde da noite", cost: "vampirão do Telegram" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Rafael", emoji: "🏆", count: 9 },
        { name: "Inácio", emoji: "🥈", count: 9 },
        { name: "Jefferson", emoji: "🥉", count: 6 },
        { name: "Maria Klara", emoji: "4️⃣", count: 5 },
        { name: "Emilly", emoji: "5️⃣", count: 5 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Geometria Analítica", topic: "Produto vetorial / plano / reta", level: 62 },
        { discipline: "Transmissão de Dados", topic: "Nyquist + fórmulas + ruído", level: 78 },
        { discipline: "Transmissão de Dados", topic: "Largura de banda na prática", level: 66 },
        { discipline: "Redes de Computadores", topic: "Camadas e protocolos", level: 70 },
        { discipline: "Redes de Computadores", topic: "Packet Tracer (topologia que dá errado)", level: 58 },
        { discipline: "Embarcados I", topic: "Arduino + bibliotecas (sem virar bagunça)", level: 55 },
        { discipline: "Embarcados II", topic: "Projeto final (TCC tomando forma)", level: 72 }
      ],
      peakSeason: { event: "Projeto de Embarcados II", intensity: "IoT no talo + prazos bem definidos" },

      // Slide 6: Aura Docente
      aura: {
        color: "#A855F7",
        vibe: "Didático e estratégico com vampirismo",
        attributes: [
          { name: "Didática", value: 98 },
          { name: "Organização", value: 95 },
          { name: "Humor (ácido controlado)", value: 88 },
          { name: "Criatividade", value: 92 },
          { name: "Mentoria", value: 96 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 91,
      bestSubject: { name: "Redes de Computadores", grade: 9.8 },
      worstSubject: { name: "Tópicos Especiais em Sistemas Embarcados I", grade: 5.8 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "O Vampirão dos Protocolos",
        description: "Ele transforma rede e sinal em algo legível, te dá consulta pra ver se você aprendeu de verdade, e ainda responde no Telegram quando a madrugada já venceu.",
        icon: "Radio"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Dormiu bem e tá bem, professor?", count: 120 },
        { word: "Será que vai valer ponto?", count: 88 },
        { word: "Baixou todos os PDFs?", count: 92 },
        { word: "SAÍ RUIÍDO DAQUI!", count: 76 },
        { word: "Professor, pode emprestar mais jumpers?", count: 64 },
        { word: "E se eu queimar essa placa?", count: 58 },
        { word: "Tá em que página isso?", count: 85 },
        { word: "Djuri tá aqui, professor.", count: 70 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Radioactive",
        artist: "Imagine Dragons",
        reason: "Porque entre sinais, largura de banda, sensores e IoT, tudo parecia energia pura se propagando. Técnico, intenso e impossível de ignorar.",
        coverColor: "from-yellow-500 to-orange-800",
        spotifyUrl: "https://open.spotify.com/embed/track/62yJjFtgkhUrXktIoSjgP2"
      },

      // Slide 11: Badge Final
      finalBadge: "Vampirão dos Embarcados e das Redes",


    }
  },
  {
    id: 'carlos-andre',
    name: 'Prof. Dr. Carlos André Guerra Fonseca',
    nickname: 'Carlos André',
    gender: 'male',
    password: 'normas',
    hint: 'Você é o mestre das n___as da UERN.',
    theme: 'manager',
    codeName: 'olha aí!',
    subjects: [
      'Matemática Fundamental (3ª unidade)',
      'Metodologia do Trabalho Científico',
      'Trabalho de Conclusão de Curso'
    ],
    quiz: [
      { id: 1, question: "Quando Carlos André assumiu Matemática Fundamental, a sensação foi:", options: ["Subimos de nível na matemática sem aviso prévio", "Voltamos para tabuada", "Virou aula de filosofia", "Virou oficina de memes"], answer: 0 },
      { id: 2, question: "Qual era o verdadeiro poder oculto dele no TCC?", options: ["Detectar vírgula fora do lugar a 10 metros de distância", "Fazer a ABNT desaparecer", "Ignorar formatação", "Aprovar por telepatia"], answer: 0 },
      { id: 3, question: "Os slides de Metodologia eram:", options: ["Praticamente um manual completo da ABNT", "3 tópicos e fé", "Um link pro Google", "Resumo em 2 páginas"], answer: 0 },
      { id: 4, question: "Durante o TCC, ele era:", options: ["Técnico, observador e extremamente preciso", "Totalmente ausente", "Só emocional", "Contra normas acadêmicas"], answer: 0 },
      { id: 5, question: "O bordão imortal que ecoou pela UERN foi:", options: ["Olha aí!", "Confia no processo", "Isso não é comigo", "Reinicia o Word"], answer: 0 },
      { id: 6, question: "No TCC final, ele não fazia:", options: ["Reescrever tudo por você (ele ensinava a corrigir)", "Reuniões individuais", "Analisar metodologia", "Cobrar prazos"], answer: 0 },
      { id: 7, question: "A maior contribuição dele no TCC foi:", options: ["Dar segurança e clareza para apresentar", "Escolher o tema por você", "Escrever a conclusão sozinho", "Ignorar detalhes técnicos"], answer: 0 },
      { id: 8, question: "Em relação às normas, Carlos André parecia:", options: ["Coautor secreto do manual da universidade", "Inimigo da ABNT", "Alérgico à formatação", "Desinformado"], answer: 0 },
      { id: 9, question: "Ele começou e terminou sua graduação porque:", options: ["Esteve no início e no último semestre", "Deu aula todos os semestres", "Era coordenador de tudo", "Era coincidência absoluta"], answer: 0 },
      { id: 10, question: "O sentimento ao entregar o TCC com ele foi:", options: ["Confiança técnica e maturidade acadêmica", "Desespero puro", "Improviso total", "Entrega feita no Paint"], answer: 0 }
    ],
    muralItems: [
      ...createMural('carlos-andre'),
      {
        id: 'letter-carlos-andre',
        type: 'note',
        content: "Professor Carlos André,\n\nÉ curioso perceber que o senhor começou e terminou minha graduação. Não esteve presente em todos os semestres, mas esteve nos dois mais simbólicos: no começo e no fim. E isso, para mim, não é coincidência.\n\nNa Matemática Fundamental, quando o senhor assumiu a terceira unidade, foi uma surpresa. Nunca tinha passado por uma troca de professor no meio da disciplina. E confesso que me pegou desprevenido. Mas não foi uma surpresa ruim. O senhor era mais técnico, mais direto. Parecia que a matemática tinha subido de nível do nada. Na minha cabeça, a gente saiu de operações básicas direto para algo muito mais profundo. Talvez fosse só a minha dificuldade, mas o fato é que o senhor explicava com clareza. Slides organizados, conteúdo estruturado, tudo muito bem fundamentado.\n\nE mesmo usando máscara naquela época — o que deixava o senhor quase misterioso — a didática era clara. Depois, quando finalmente vimos o sorriso completo, ficou evidente: além de técnico, o senhor era extremamente leve.\n\nEm Metodologia do Trabalho Científico, o senhor plantou a primeira semente do que viria a ser o TCC. A imensidão da ABNT deixou de ser um monstro abstrato e passou a ter lógica. Seus slides eram quase um manual completo. Não havia dúvida sem resposta. O senhor sempre estava disposto a explicar, revisar, detalhar.\n\nE então, anos depois, lá estava o senhor novamente. No momento mais importante do curso.\n\nNo TCC final, eu tive a sensação de estar sendo acompanhado por alguém que conhecia cada centímetro das normas, cada vírgula possível fora do lugar, cada recuo mal calculado. Parecia que o senhor tinha escrito o manual da ABNT junto com a universidade.\n\nMas, acima da técnica, o que mais me marcou foi a segurança. Reuniões individuais. Orientações claras. Prazos respeitados, mas com compreensão quando necessário. O senhor não reescrevia meu texto por mim. O senhor me ensinava a enxergar o que precisava ser ajustado.\n\nE quando algo fazia sentido, quando uma parte ficava bem construída, vinha aquele clássico:\n\"Olha aí!\"\n\nEsse \"olha aí\" virou bordão. Virou meme. Virou memória afetiva da turma.\n\nO senhor me deu segurança para apresentar. Me deu ferramentas. Me deu confiança. E o 9,5 que veio depois carrega muito do que o senhor construiu junto comigo.\n\nObrigado por ter estado no início e no fim.\n\nYuri (olha aí)",
        style: { x: 30, y: 20, rotation: -1 }
      },
      {
        id: 'photo-carlos-andre',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=60",
        meta: "O guardião das normas e do 9,5.",
        style: { x: 65, y: 60, rotation: 6 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 120,
      timeStudying: 70,
      timeUnderstanding: 50,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Recuo de 1,25 cm ajustado", cost: "1 correção cirúrgica" },
        { name: "Vírgula deslocada", cost: "1 observação técnica" },
        { name: "Normas ABNT aplicadas", cost: "100% conformidade" },
        { name: "Reuniões individuais", cost: "Segurança acadêmica" },
        { name: "Metodologia bem estruturada", cost: "Base sólida" },
        { name: "\"Olha aí!\" estratégico", cost: "Memória eterna" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Eu mesmo", emoji: "🏆", count: 10 },
        { name: "Foco", emoji: "🥈", count: 5 },
        { name: "Disciplina", emoji: "🥉", count: 3 },
        { name: "Café", emoji: "4️⃣", count: 2 },
        { name: "Desespero", emoji: "5️⃣", count: 1 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Metodologia", topic: "Entender ABNT pela primeira vez", level: 70 },
        { discipline: "TCC", topic: "Formatação milimétrica", level: 85 },
        { discipline: "TCC", topic: "Prazo final", level: 90 },
        { discipline: "Matemática Fundamental", topic: "Mudança de professor", level: 60 }
      ],

      peakSeason: { event: "Entrega final do TCC", intensity: "Revisão técnica total" },

      // Slide 6: Aura Docente
      aura: {
        color: "#1E293B",
        vibe: "Guardião das Normas",
        attributes: [
          { name: "Precisão", value: 100 },
          { name: "Organização", value: 98 },
          { name: "Clareza", value: 95 },
          { name: "Calma", value: 92 },
          { name: "Segurança", value: 97 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 92,
      bestSubject: { name: "Trabalho de Conclusão de Curso", grade: 9.5 },
      worstSubject: { name: "Matemática Fundamental (3ª unidade)", grade: 6.0 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "O Guardião das Normas",
        description: "Ele não escreve seu TCC por você. Ele ensina você a escrever corretamente. Observador, técnico e cirúrgico.",
        icon: "BookOpen"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Aqui recua quantos cm?", count: 110 },
        { word: "Esse cálculo não faz sentido...", count: 85 },
        { word: "ABNT é chata, visse?", count: 60 },
        { word: "Arial ou Times New Roman?", count: 95 },
        { word: "Olha aí", count: 120 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Tocando em Frente",
        artist: "Almir Sater",
        reason: "Porque cada um compõe sua própria história. Ele esteve no início e no fim, ensinando método, maturidade e construção. Um ciclo que foi sendo tocado em frente, passo a passo.",
        coverColor: "from-amber-700 to-stone-900",
        spotifyUrl: "https://open.spotify.com/embed/track/3ZRRIlSvOctKY5NqlRESgA"
      },

      // Slide 11: Badge Final
      finalBadge: "Guardião Oficial da ABNT"
    }
  },
  {
    id: 'bruno-cruz',
    name: 'Prof. Msc. Bruno Cruz de Oliveira',
    nickname: 'Bruno Cruz',
    gender: 'male',
    password: 'paralela',
    hint: 'Dono de toda ciência e de toda programação p____la',
    theme: 'sysop',
    codeName: 'vamos paralelizar',
    subjects: [
      'Programação Paralela'
    ],
    quiz: [
      { id: 1, question: "Programação Paralela é basicamente:", options: ["Fazer várias coisas ao mesmo tempo sem causar um desastre", "Abrir várias abas do Chrome", "Duplicar o código e torcer", "Rezar para o processador"], answer: 0 },
      { id: 2, question: "Qual conceito fazia a cabeça dar nó?", options: ["Deadlock", "Ctrl+C", "HTML semântico", "Banco relacional"], answer: 0 },
      { id: 3, question: "Spinlock é:", options: ["Esperar ocupando CPU como se estivesse ansioso demais", "Uma dança do processador", "Um erro do Linux", "Uma função do Arduino"], answer: 0 },
      { id: 4, question: "A Lei de Amdahl basicamente ensina que:", options: ["Nem tudo pode ser paralelizado infinitamente", "Quanto mais thread melhor sempre", "CPU é infinita", "O Windows é culpado"], answer: 0 },
      { id: 5, question: "O projeto do 10.0 envolvia:", options: ["Comparar versões sequenciais e paralelas no Linux", "Criar um site em React", "Treinar uma IA", "Montar um banco de dados"], answer: 0 },
      { id: 6, question: "O maior desafio do projeto foi:", options: ["Instalar e configurar tudo corretamente", "Escolher a cor do terminal", "Decorar código", "Formatar ABNT"], answer: 0 },
      { id: 7, question: "Speedup real acontece quando:", options: ["A paralelização realmente reduz o tempo de execução", "Você aumenta a fonte do código", "O professor gosta de você", "Você usa mais comentários"], answer: 0 },
      { id: 8, question: "Bruno em sala era:", options: ["Espontâneo, engraçado e técnico", "Totalmente formal e distante", "Silencioso o tempo todo", "Anti-feedback"], answer: 0 },
      { id: 9, question: "Quando alguém viajava demais na aula:", options: ["Ele soltava umas verdades necessárias", "Ignorava", "Cancelava a aula", "Passava outra prova"], answer: 0 },
      { id: 10, question: "O 10.0 foi fruto de:", options: ["Projeto bem executado + documentação + entendimento real", "Sorte absurda", "Milagre estatístico", "Bug no sistema"], answer: 0 }
    ],
    muralItems: [
      ...createMural('bruno-cruz'),
      {
        id: 'letter-bruno-cruz',
        type: 'note',
        content: "Professor Bruno,\n\nProgramação Paralela não era uma matéria. Era um teste de sanidade computacional.\n\nMas o senhor tinha um jeito curioso de transformar algo que parecia impossível em algo desafiador — e até divertido. Diferente de uma aula formal cheia de tensão, suas aulas pareciam quase um colega explicando o conteúdo, só que um colega que claramente sabia muito mais do que todo mundo.\n\nSpinlock, deadlock, sincronização, threads, MPI, Lei de Amdahl… parecia que Sistemas Operacionais tinha voltado com DLC avançado. Tudo aquilo que já era difícil agora precisava funcionar… ao mesmo tempo.\n\nE o projeto.\n\nRodar no Linux. Comparar versões. Medir tempo. Usar 2 threads. Depois 4. Depois 6. Ver o speedup acontecer — ou não acontecer — e entender por quê. Documentar tudo. Configurar ambiente. Instalar biblioteca. Compilar. Errar. Compilar de novo.\n\nNão foi simples.\n\nMas foi justo.\n\nE aquele 10.0 não veio por sorte. Veio porque o senhor explicou, ajudou, apareceu no laboratório quando precisou instalar e destravar tudo, deu feedback, corrigiu, puxou quando precisava puxar e soltou umas verdades quando alguém estava viajando demais.\n\nO senhor tem um estilo muito seu. Espontâneo. Engraçado. Gente como a gente. Mas também firme quando necessário. E isso equilibra tudo.\n\nProgramação Paralela me ensinou que dividir trabalho não significa simplificar. Significa coordenar. Pensar melhor. Estruturar melhor.\n\nE talvez esse tenha sido o maior aprendizado.\n\nSe for pra resolver, então…\n\nVamos paralelizar.\n\nIury (Yuri de um universo paralelo)",
        style: { x: 30, y: 18, rotation: -2 }
      },
      {
        id: 'photo-bruno',
        type: 'polaroid',
        content: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500&auto=format&fit=crop&q=60",
        meta: "Threads, Linux e um 10.0 rodando em múltiplos núcleos.",
        style: { x: 65, y: 60, rotation: 6 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 60,
      timeStudying: 40,
      timeUnderstanding: 20,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Deadlock identificado", cost: "1 dor de cabeça" },
        { name: "Spinlock entendido", cost: "CPU girando 100%" },
        { name: "Lei de Amdahl aceita", cost: "Expectativas ajustadas" },
        { name: "Projeto Linux configurado", cost: "3 reinstalações" },
        { name: "Speedup medido corretamente", cost: "Satisfação técnica" },
        { name: "Documentação detalhada", cost: "Nota 10.0" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Jefferson", emoji: "🏆", count: 3 },
        { name: "Rafael", emoji: "🥈", count: 2 },
        { name: "Inácio", emoji: "🥉", count: 1 },
        { name: "Maria Klara", emoji: "4️⃣", count: 1 },
        { name: "Emilly", emoji: "5️⃣", count: 1 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Programação Paralela", topic: "Entender deadlock", level: 85 },
        { discipline: "Programação Paralela", topic: "Lei de Amdahl", level: 78 },
        { discipline: "Programação Paralela", topic: "Configuração no Linux", level: 90 },
        { discipline: "Programação Paralela", topic: "Documentação do projeto", level: 70 }
      ],

      peakSeason: { event: "Entrega do Projeto Final", intensity: "Speedup máximo atingido" },

      // Slide 6: Aura Docente
      aura: {
        color: "#F59E0B",
        vibe: "Paralelizador Espontâneo",
        attributes: [
          { name: "Didática", value: 92 },
          { name: "Humor", value: 95 },
          { name: "Técnica", value: 94 },
          { name: "Feedback", value: 90 },
          { name: "Exigência", value: 88 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 97,
      bestSubject: { name: "Programação Paralela", grade: 10.0 },
      worstSubject: { name: "Programação Paralela", grade: 10.0 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "O Paralelizador Supremo",
        description: "Ele pega um problema sequencial e transforma em múltiplas threads organizadas. Ensina com leveza, cobra com firmeza e entrega performance real.",
        icon: "Cpu"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "O código tá travando...", count: 95 },
        { word: "ChatGPT bugou hoje", count: 70 },
        { word: "Quem djabo é Amdahl?", count: 55 },
        { word: "MEU PC NÃO TEM LINUX", count: 60 },
        { word: "O que é speedup?", count: 85 },
        { word: "MEU PC É SINGLE THREAD...", count: 90 },
        { word: "Tem que usar o QUÊ?!", count: 100 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Algorithm",
        artist: "Muse",
        reason: "Porque Programação Paralela é sobre controle, cálculo, otimização e intensidade. Cada thread precisa funcionar em perfeita coordenação.",
        coverColor: "from-indigo-700 to-black",
        spotifyUrl: "https://open.spotify.com/embed/track/7f0vVL3xi4i78Rv5Ptn2s1"
      },

      // Slide 11: Badge Final
      finalBadge: "Rei do Speedup 10.0"
    }
  },
  {
    id: 'wilfredo',
    name: 'Prof. Dr. Wilfredo Blanco Figuerola',
    nickname: 'Wilfredo Blanco',
    gender: 'male',
    password: 'requisitos',
    hint: 'Os re_____tos funcionales são indispensáveis.',
    theme: 'manager',
    codeName: 'aula de salsa',
    subjects: ['Análise de Sistemas'],
    quiz: [
      { id: 1, question: "Em Análise de Sistemas, o que vinha antes de qualquer “ideia genial”?", options: ["Escolher logo e paleta no Figma", "Levantar requisitos funcionais e não funcionais direito", "Codar primeiro e documentar nunca", "Abrir um Trello e chamar de metodologia"], answer: 1 },
      { id: 2, question: "O projeto da disciplina era sobre:", options: ["Um app de delivery de coxinha (prioridade acadêmica)", "Um sistema para escola com foco em pessoas com TEA", "Um sistema de apostas do GoRN", "Um clone do SIGAA (pra sofrer mais)"], answer: 1 },
      { id: 3, question: "O maior sofrimento do projeto foi:", options: ["Criar um slogan motivacional pro sistema", "Projetar o sistema inteiro com requisitos e casos de uso bem feitos", "Escolher a fonte do relatório", "Convencer o professor que 'tá na minha cabeça' é requisito"], answer: 1 },
      { id: 4, question: "Um requisito NÃO funcional normalmente fala de:", options: ["O que o sistema faz (função)", "Qualidade, restrições e desempenho", "Nome das telas e botões", "A opinião do usuário sobre a cor azul"], answer: 1 },
      { id: 5, question: "Casos de uso servem principalmente para:", options: ["Decorar a capa do documento", "Descrever interações entre ator e sistema", "Substituir a implementação", "Fazer o professor ter pena e dar nota"], answer: 1 },
      { id: 6, question: "O diferencial do professor Wilfredo em sala era:", options: ["Aulas em latim acadêmico", "Portunhol lendário + bom humor", "Provas sem nenhuma explicação", "Silêncio absoluto e medo coletivo"], answer: 1 },
      { id: 7, question: "O bordão que grudou na turma foi:", options: ["‘Requisitos’ em espanhol (e a turma repetindo pra sempre)", "‘Ctrl+S’ é para os fracos", "‘Deploy em produção na sexta’", "‘Isso aqui é banco de dados’"], answer: 0 },
      { id: 8, question: "Quando a turma vacilava, ele lembrava o básico:", options: ["Que a sala é um laboratório de caos", "Que precisava respeitar, prestar atenção e ter disciplina", "Que bagunça ajuda a fixar conteúdo", "Que requisito se resolve com fé"], answer: 1 },
      { id: 9, question: "O momento mais aleatório e inesquecível foi:", options: ["A prova surpresa de 20 páginas", "A aula que virou dança (salsa/tango, ninguém sabe)", "O dia que virou aula de Linux kernel", "A implementação completa do sistema em aula"], answer: 1 },
      { id: 10, question: "O que ficou de aprendizado real com Wilfredo?", options: ["Que dá pra criar sistema sem regra nenhuma", "Que disciplina e organização salvam projetos", "Que requisito é opcional se o grupo for bom de lábia", "Que um caso de uso bem escrito compila sozinho"], answer: 1 }
    ],
    muralItems: [
      ...createMural('wilfredo'),
      {
        id: 'letter-wilfredo',
        type: 'note',
        content: "Professor Wilfredo,\n\nAnálise de Sistemas foi, tecnicamente falando, Engenharia de Software 2.0.\n\nMesma essência, mesmo princípio ativo do remédio: requisitos funcionais, não funcionais, casos de uso, levantamento, validação, documentação… mas com aquele tempero especial do portunhol.\n\nE eu nunca tinha tido um professor estrangeiro antes. Um cubano explicando requisitos com sotaque latino transforma qualquer sala em experiência internacional.\n\n\"Requisitos\" nunca mais foi a mesma palavra.\n\nO projeto da escola para pessoas com TEA foi um dos trabalhos mais humanos que eu já fiz na graduação. Eu vi o quanto o senhor se empolgou com a ideia. Vi o brilho nos olhos. Vi o interesse genuíno. E isso marcou.\n\nPeço até desculpa por não ter seguido com o tema depois, mas foi bonito ver um professor acreditar no potencial do nosso projeto mais do que a gente às vezes acreditava.\n\nEntre idas e vindas, correções, ajustes, requisitos mal escritos, casos de uso reescritos três vezes… aprendemos disciplina. Organização. Estrutura.\n\nE no meio de tudo isso…\n\nA aula de salsa.\n\nEu até hoje não sei qual era o contexto técnico que levou a gente a aprender passos latinos no meio de uma disciplina de modelagem de sistemas. Mas eu sei que foi uma das aulas mais memoráveis da graduação.\n\nAli eu entendi uma coisa: sistema também é ritmo. Se cada parte não estiver coordenada, vira bagunça. Se cada passo não estiver sincronizado, alguém pisa no pé do outro.\n\nO senhor ensinou requisitos.\nMas também ensinou leveza.\n\nE sempre que eu encontrar o senhor no corredor, a única coisa possível de dizer é:\n\nE aí, professor… requisitos?\n\nCom respeito e um leve sotaque imaginário,\n\nYuri Alejandro Valdez Ramón Gutierrez de la Computación y los Requisitos Funcionales",
        style: { x: 35, y: 20, rotation: -2 }
      }
    ],
    wrapped: {
      // Slide 2: Carga Horária
      totalHours: 60,
      timeStudying: 25,
      timeUnderstanding: 35,

      // Slide 3: Extrato da Disciplina
      receiptItems: [
        { name: "Requisitos mal escritos", cost: "3 reenvios" },
        { name: "Casos de uso reestruturados", cost: "Inúmeras versões" },
        { name: "Correções detalhadas", cost: "Precisão cirúrgica" },
        { name: "Portunhol absorvido", cost: "Fluência parcial" },
        { name: "Aula de salsa inesperada", cost: "Memória eterna" }
      ],

      // Slide 4: Ranking de Grupos
      groupRanking: [
        { name: "Rafael", emoji: "🏆", count: 1 },
        { name: "Inácio", emoji: "🥈", count: 1 },
        { name: "Maria Klara", emoji: "🥉", count: 1 },
        { name: "Jefferson", emoji: "4️⃣", count: 1 },
        { name: "Emilly", emoji: "5️⃣", count: 1 }
      ],

      // Slide 5: Métricas de Estresse
      stressBars: [
        { discipline: "Análise de Sistemas", topic: "Definir requisitos corretamente", level: 78 },
        { discipline: "Análise de Sistemas", topic: "Organizar casos de uso", level: 65 },
        { discipline: "Análise de Sistemas", topic: "Empolgação do professor com o projeto", level: 40 }
      ],

      peakSeason: { event: "Entrega do Projeto da Escola", intensity: "Requisitos até na alma" },

      // Slide 6: Aura Docente
      aura: {
        color: "#2563EB",
        vibe: "Organizado e funcional",
        attributes: [
          { name: "Didática", value: 90 },
          { name: "Disciplina", value: 88 },
          { name: "Humor Latino", value: 92 },
          { name: "Exigência", value: 85 },
          { name: "Empolgação com boas ideias", value: 95 }
        ]
      },

      // Slide 7: Sobrevivência
      survivalRate: 100,
      bestSubject: { name: "Análise de Sistemas", grade: 9.2 },
      worstSubject: { name: "Análise de Sistemas", grade: 6.9 },

      // Slide 8: Arquétipo Tech
      techArchetype: {
        name: "El Arquitecto de Requisitos",
        description: "Constrói sistemas organizados, sincroniza partes como numa dança e garante que cada requisito tenha seu lugar.",
        icon: "ClipboardList"
      },

      // Slide 9: Frases Mais Faladas
      wordCloud: [
        { word: "Cadê os requisitos?", count: 120 },
        { word: "Quanto caso de uso, Jesus...", count: 85 },
        { word: "Minha cabeça tá doendo", count: 60 },
        { word: "Não funcional pra quê, amigo?", count: 58 },
        { word: "UML é chato", count: 52 },
        { word: "Organiza melhor os slides", count: 48 },
        { word: "Aumenta o tamanho da imagem", count: 40 }
      ],

      // Slide 10: Trilha Sonora
      soundtrack: {
        song: "Vivir Mi Vida",
        artist: "Marc Anthony",
        reason: "Porque no meio dos requisitos e da disciplina, ainda dá pra dançar e viver com leveza.",
        coverColor: "from-blue-500 to-yellow-400",
        spotifyUrl: "https://open.spotify.com/embed/track/3QHMxEOAGD51PDlbFPHLyJ"
      },

      // Slide 11: Badge Final
      finalBadge: "Mestre dos Requisitos Latinos"
    }
  }
];

export const getWelcomeText = (gender: 'male' | 'female') => gender === 'male' ? 'Bem-vindo' : 'Bem-vinda';
export const getAuthText = (gender: 'male' | 'female') => gender === 'male' ? 'do Professor' : 'da Professora';
export const getLoadingMessages = (theme: ProfessorTheme) => ["Carregando..."];
