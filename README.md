# 🎓 The Graduation Adventure

**Uma experiência interativa e gamificada de despedida para os professores da UERN**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer)](https://www.framer.com/motion)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-CDN-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## 📖 Sobre o Projeto

**The Graduation Adventure** é uma aplicação web interativa criada como um presente de despedida para os professores do curso de **Ciência da Computação** da **UERN (Universidade do Estado do Rio Grande do Norte) — Campus Natal**.

A experiência simula uma jornada acadêmica completa — desde um boot de sistema retro, passando por um login fake no SIGAA, uma retrospectiva estilo "Spotify Wrapped", um mapa pixel-art do campus, um quiz humorístico, até a emissão de um diploma de sobrevivência em PDF — tudo acompanhado de um sistema completo de **25 conquistas** inspirado no Xbox 360.

Todo o tom é de **humor ácido e nostálgico**, repleto de piadas internas sobre a vida universitária, o SIGAA, cafés frios, bugs, e a rotina caótica de alunos e professores.

> **⚠️ Apenas Desktop:** A aplicação foi projetada exclusivamente para telas com largura ≥ 1024px. Em dispositivos móveis, uma tela de bloqueio estilizada é exibida.

---

## 🚀 Fluxo da Experiência

A jornada é dividida em **10 telas/rotas**, navegadas sequencialmente:

```
Boot → Login → Glitch/BSOD → Wrapped → Retro Transition → Hub → Mural → Quiz → Certificado → Créditos
```

### Etapa por Etapa

| # | Rota | Componente | Descrição |
|---|------|-----------|-----------| 
| 1 | `/` | `BootSequence` | Simulação de boot BIOS estilo terminal (texto verde em fundo preto), com mensagens humorísticas. O usuário pode negar o boot 3x para ganhar uma conquista. |
| 2 | `/login` | `FakeLogin` | Réplica satírica do SIGAA com menu lateral, notícias falsas do campus e ticker de avisos. O usuário seleciona um professor e insere uma senha (com dica via post-it). |
| 3 | `/processing` | `GlitchTransition` | Tela de loading troll (com barra que regride), seguida de uma BSOD (tela azul da morte) com erros humorísticos. Suporta o código Konami para uma conquista secreta. |
| 4 | `/wrapped` | `WrappedSequence` | Retrospectiva animada estilo Spotify Wrapped com 11 slides: saudação, horas no SIGAA, extrato acadêmico, comparativo aluno vs. professor, métricas de estresse, aura docente, taxa de sobrevivência, arquétipo tech, word-cloud, trilha sonora, e badge final. Auto-play com barra de progresso e controle manual. |
| 5 | `/transition` | `RetroTransition` | Transição estilo "Windows XP boot" com logo da UERN e barra de loading. |
| 6 | `/hub` | `Hub` | Mapa pixel-art do campus com ciclo dia/noite automático, nuvens animadas, árvores, um gato do campus interativo (com frases aleatórias e miados), e 3 prédios clicáveis que desbloqueiam sequencialmente. |
| 7 | `/mural` | `Mural` | Desktop Windows 95 completo com janelas arrastáveis: mensagem de despedida, foto polaroid, Meu Computador (com specs), Lixeira com arquivos deletados da vida acadêmica, e arquivo de Ajuda. Barra de tarefas retrô funcional com relógio e menu Iniciar. |
| 8 | `/quiz` | `Quiz` | Prova de 10 questões de múltipla escolha sobre a vida acadêmica, apresentada como um documento físico com caneta e marcações. Inclui animação de correção com mensagens humorísticas e resultado com diagnóstico. |
| 9 | `/certificado` | `Certificate` | Emissão de diploma com 3 minigames: autenticação biométrica (segurar o dedo), digitação de código, e coleta de carimbo. Certificado ornamentado com **download em PDF** (via `html2canvas` + `jsPDF`). Aceita dedicatória personalizada. |
| 10 | `/credits` | `Credits` | Créditos estilo Star Wars com trilha sonora temática, vídeo de despedida opcional, e tela final de conquistas mostrando todas as 25 achievements e progresso. Opção de reiniciar a experiência. |

---

## 🏆 Sistema de Conquistas (25 Achievements)

A aplicação possui um sistema completo de **25 conquistas** com pontuação individual baseada em dificuldade, notificações Xbox 360-style e persistência via `localStorage`.

### Infraestrutura

| Componente | Arquivo | Função |
|---|---|---|
| **Definições** | `data/achievements.ts` | 25 achievements com id, título, descrição, ícone (Lucide) e pontos |
| **Estado Global** | `context/AchievementsContext.tsx` | Provider React com `unlock()`, `isUnlocked()`, persistência localStorage |
| **Notificação** | `components/AchievementToast.tsx` | Toast popup com slide-in, barra de progresso e efeito sonoro |
| **Menu** | `components/AchievementMenu.tsx` | Tela completa de conquistas (tecla `9`), com gamerscore e progresso |

### Tabela de Conquistas

| Pts | Conquista | Descrição | Gatilho | Componente |
|-----|-----------|-----------|---------|------------|
| 10G | 🤣 Engraçadinho | Clicou em "Não" logo de cara | 1° clique em "Não" no boot | `BootSequence` |
| 25G | 🙅 Pedro, é você? | Negou 3 vezes seguidas | 3 cliques em "Não" | `BootSequence` |
| 5G | 📍 Eu conheço esse lugar | Entrou na tela de login | Montagem do componente | `FakeLogin` |
| 30G | 🏅 Orgulho acadêmico | Clicou na logo do SIGAA | Clicar no brasão "U" | `FakeLogin` |
| 40G | 🔍 Curioso | Explorou todas as opções do menu | Clicar nos 4 menus laterais | `FakeLogin` |
| 50G | 💻 Hackerman | Acertou a senha de primeira | Senha correta sem errar | `FakeLogin` |
| 15G | 📡 Tá achando que é roteador? | Tentou "admin" como senha | Digitar admin/root | `FakeLogin` |
| 75G | 🕹️ Nerd dos anos 80 | Digitou o Código Konami | ↑↑↓↓←→←→ na BSOD | `GlitchTransition` |
| 10G | ✨ Virou RPG agora? | Viu o card de aura do professor | Chegar no slide 6 | `WrappedSequence` |
| 10G | 🎵 Som na caixa, DJ! | Chegou na trilha sonora | Chegar no slide 10 | `WrappedSequence` |
| 30G | 🎧 Spotify, não me processe | Assistiu o review completo | Completar sem pular | `WrappedSequence` |
| 35G | 🐱 Acariciador compulsivo | Clicou no gato 7 vezes | 7 cliques no gato do campus | `Hub` |
| 5G | 🖥️ Máquina do tempo | Entrou no desktop retrô | Montagem do Mural | `Mural` |
| 20G | 🗑️ Limpando o lixo | Esvaziou a lixeira | Esvaziar lixeira no Win95 | `Mural` |
| 40G | 💾 Torturador de RAM | Abriu todas as janelas | Abrir todas 5 janelas | `Mural` |
| 100G | 🎓 CDF | Tirou 10 na prova final | 10/10 no quiz | `Quiz` |
| 50G | 🤖 Consulte o ChatGPT | Errou tudo na prova | 0/10 no quiz | `Quiz` |
| 60G | 📈 Raspando | Tirou exatamente 5 | Nota mínima 5/10 | `Quiz` |
| 15G | 📖 Depois devolva, ok? | Usou o botão de revisar | Clicar em "Revisar" | `Quiz` |
| 25G | ❤️ Sentimental | Escreveu uma dedicatória | Preencher dedicatória no diploma | `Certificate` |
| 15G | ⏱️ Ansioso | Soltou o dedo na biometria | Soltar antes de 100% | `Certificate` |
| 20G | 📥 Mais um pra conta | Baixou o diploma em PDF | Download do certificado | `Certificate` |
| 10G | ⏩ Sem tempo, irmão | Pulou os créditos | Botão "Pular" no crawl | `Credits` |
| 10G | 💔 Insensível | Pulou o vídeo de despedida | Botão "Pular Vídeo" | `Credits` |
| 20G | 🔄 E lá vamos nós... | Reiniciou a experiência | Botão "Reiniciar" | `Credits` |

**Total possível: 790G** · Pressione **`9`** a qualquer momento para ver o menu de conquistas.

---

## 👩‍🏫 Professores

O sistema suporta múltiplos perfis de professores com dados totalmente personalizados:

| Professor(a) | Tema | Matérias | Senha |
|-------------|------|----------|-------|
| **Prof. Dr. Raul Benites Paradeda** | `web` | Intro à Programação, IHC, Web Dev, Computação Afetiva | `afeto` |
| **Profa. Dra. Camila de Araújo Sena** | `logic` | Lógica Matemática, ED, Eng. Software, Linguagens Formais, Grafos, Compiladores | `dijkstra` |
| **Profa. Dra. Adriana Takahashi** | `math` | Álgebra Linear, Cálculo Numérico, IA, Computação Gráfica | `codelab` |
| **Profa. Msc. Gláucia Melissa Medeiros Campos** | `sysop` | Sistemas Operacionais, Computadores e Sociedade | `podcast` |
| **Profa. Dra. Rosiery da Silva Maia** | `math` | Matemática Fundamental, Desafios de Programação, Complexidade, TGA e Empreendedorismo | `crianças` |
| **Profa. Dra. Bartira Paraguaçu Falcão Dantas Rocha** | `db` | Banco de Dados, Métodos Formais, Projeto de TCC | `orientadora` |
| **Prof. Msc. André Gustavo Pereira da Silva** | `web` | Paradigmas, Sist. Distribuídos, Projeto de Graduação, Prática II | `notadez` |
| **Prof. Dr. Anderson Abner de Santana Souza** | `hardware` | Circuitos Digitais, Sistemas Digitais, Arquitetura, Arq. Avançada, Robótica | `theconstruct` |
| **Prof. Dr. Felipe Denis Mendonça de Oliveira** | `sysop` | Geometria Analítica, Redes, Transmissão de Dados, Sistemas Embarcados | `vampirao` |
| **Prof. Dr. Carlos André Guerra Fonseca** | `manager` | Matemática Fundamental, Metodologia Científica, TCC | `normas` |
| **Prof. Msc. Bruno Cruz de Oliveira** | `parallel` | Programação Paralela | `paralela` |
| **Prof. Dr. Wilfredo Blanco Figuerola** | `manager` | Análise de Sistemas | `requisitos` |

Cada professor possui:
- **Wrapped personalizado**: extrato acadêmico, métricas de estresse, aura, trilha sonora, word-cloud, arquétipo tech
- **Mural**: mensagem de despedida + foto polaroid
- **Quiz**: 10 questões exclusivas sobre o convívio com aquele professor
- **Paleta de cores** e tema visual próprios (slides, gradientes, cores de acento)

---

## 🔊 Sistema de Áudio

O projeto utiliza um **motor de áudio pré-carregado** com **43 efeitos sonoros** em `.mp3`:

### Arquitetura (`utils/audio.ts`)

- **Preload global**: Todos os sons são pré-carregados na inicialização via `preloadAllSounds()` para eliminar latência no primeiro play
- **`playSound(src)`**: Reproduz clonando o áudio do cache para permitir sobreposição
- **`playSoundPitched(src, rate)`**: Reproduz com taxa de pitch customizada (ex: notas musicais no Konami code)

### Sons por Contexto

| Contexto | Sons |
|---|---|
| **Boot/Login** | `uern-boot`, `sigaa-init`, `accept`, `error`, `wrong` |
| **Glitch/BSOD** | `glitch`, `glitch-transition-open`, `bsod`, `coin`, `one-up` |
| **Wrapped** | `wrapped-init`, `wrapped-complete`, `aura`, `dot` |
| **Hub** | `hub-day`, `hub-night`, `footsteps`, `meow1-3` |
| **Mural (Win95)** | `uern95-startup`, `open-folder`, `close-folder`, `erase-recycle-bin`, `uern95-logout` |
| **Quiz** | `postit`, `right-pen`, `wrong-pen`, `drum-suspense`, `aproved`, `reproved`, `stamp` |
| **Certificate** | `identity-established`, `kernel-init`, `kernel-loading`, `crt-off` |
| **Credits** | `starwars-credits` (música dos créditos com fade-out), `achviements-open` |
| **Conquistas** | `achiviment` (toast de achievement desbloqueado) |

---

## 🎨 Estética e Design

### Fontes
- **Display**: Anton, Cinzel (títulos ornamentados)
- **Body**: Outfit, Inter (textos gerais)
- **Handwriting**: Caveat (dedicatórias e post-its)
- **Mono**: Share Tech Mono, VT323, Press Start 2P (terminais e retro)
- **Win95**: W95FA (desktop Windows 95)

### Efeitos Visuais
- **CRT Scanlines**: Filtro retrô aplicado globalmente nas telas de terminal e BSOD
- **Pixel Art**: Assets personalizados para o Hub (prédios UERN, árvores, gato, sol/lua, nuvens)
- **Glitch Effects**: Distorção visual na transição pós-login
- **Ciclo dia/noite**: Hub alterna automaticamente baseado na hora real do sistema

### Animações (Framer Motion)
- Transições de página com spring physics
- Efeitos de entrada/saída com slide, fade e scale
- Micro-animações em botões, ícones e badges
- Barra de progresso animada nos slides Wrapped
- Stamp/carimbo com shake no resultado do Quiz
- Star Wars crawl nos créditos com perspectiva 3D

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **React** | 19.2 | UI e componentes |
| **TypeScript** | 5.8 | Tipagem estática |
| **Vite** | 6.2 | Build e dev server |
| **Framer Motion** | 12.23 | Animações e transições |
| **TailwindCSS** | CDN | Estilização utility-first |
| **React Router DOM** | 7.10 | Roteamento (HashRouter) |
| **Lucide React** | 0.561 | Ícones SVG |
| **Recharts** | 2.12 | Gráficos no Wrapped |
| **html2canvas** | 1.4 | Captura de tela para PDF |
| **jsPDF** | 2.5 | Geração de PDF |

---

## 📁 Estrutura do Projeto

```
despedida/
├── index.html                 # HTML com fonts, estilos globais e TailwindCSS CDN
├── index.tsx                  # Entry point React
├── App.tsx                    # Layout principal, rotas, providers e achievement menu
├── types.ts                   # Tipos TypeScript (Professor, WrappedData, etc.)
├── vite.config.ts             # Configuração do Vite
├── package.json               # Dependências e scripts
├── metadata.json              # Metadados do projeto
│
├── components/                # Componentes React (15 arquivos)
│   ├── AchievementMenu.tsx       # Menu de conquistas Xbox-style (tecla 9)
│   ├── AchievementToast.tsx      # Toast popup de conquista desbloqueada
│   ├── BootSequence.tsx          # Tela de boot BIOS com terminal verde
│   ├── Certificate.tsx           # Diploma com minigames + export PDF
│   ├── Counter.tsx               # Contador animado com spring physics
│   ├── Credits.tsx               # Créditos Star Wars + vídeo + tela de conquistas
│   ├── FakeLogin.tsx             # Login fake SIGAA completo
│   ├── GlitchTransition.tsx      # Glitch + BSOD + Konami code
│   ├── Hub.tsx                   # Mapa pixel-art com dia/noite + gato interativo
│   ├── MobileBlock.tsx           # Tela de bloqueio para mobile
│   ├── Mural.tsx                 # Desktop Windows 95 com janelas arrastáveis
│   ├── Quiz.tsx                  # Prova acadêmica estilo folha física
│   ├── RetroTransition.tsx       # Boot estilo Windows XP
│   ├── Transitions.tsx           # Animações de loading (MuralLoading, Classroom)
│   └── WrappedSequence.tsx       # Retrospectiva Spotify Wrapped (11 slides)
│
├── context/
│   ├── AchievementsContext.tsx    # Estado global de conquistas + localStorage
│   └── UserContext.tsx           # Estado do jogador (professor, progresso, stage)
│
├── data/
│   ├── achievements.ts           # 25 conquistas com pontuação e ícones
│   └── professors.ts             # Dados dos professores (wrapped, quiz, mural)
│
├── utils/
│   └── audio.ts                  # Engine de áudio com preload e playback
│
└── public/
    ├── assets/                   # 30 imagens (pixel-art, fotos, ícones Win95)
    ├── fonts/                    # Fonte W95FA para o desktop retro
    └── sounds/                   # 43 efeitos sonoros em .mp3
```

---

## ⚡ Como Rodar Localmente

**Pré-requisitos:** [Node.js](https://nodejs.org) (v18+)

```bash
# 1. Clonar o repositório
git clone https://github.com/yurizinlala/despedida-uern.git
cd despedida-uern

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação será aberta em `http://localhost:5173`.

### Build de Produção

```bash
npm run build
npm run preview
```

---

## 🎮 Dicas Secretas & Easter Eggs

| Atalho | O que faz |
|--------|-----------|
| **Tecla `9`** | Abre/fecha o menu de conquistas completo (em qualquer tela) |
| **↑↑↓↓←→←→** | Código Konami na tela de BSOD — desbloqueia "Nerd dos anos 80" (75G) |
| **Clicar no "U"** | Clicar na logo SIGAA na tela de login — desbloqueia "Orgulho acadêmico" (30G) |
| **Digitar `admin`/`root`** | Easter egg com mensagem especial na tela de login |
| **Explorar os 4 menus** | Clicar em todos os itens do menu lateral do SIGAA — desbloqueia "Curioso" (40G) |
| **Gato do campus** | Clicar 7x no gato no Hub — frases aleatórias + conquista (35G) |
| **Esvaziar lixeira** | No desktop Win95, esvaziar a lixeira — reconhece "Limpando o lixo" (20G) |
| **Abrir tudo** | Abrir as 5 janelas do Win95 ao mesmo tempo — "Torturador de RAM" (40G) |
| **Dedicatória** | Escrever dedicatória no diploma — "Sentimental" (25G) |
| **Soltar biometria** | Tirar o dedo antes de 100% — "Ansioso" (15G) |

---

## 🔧 Arquitetura de Estado

```
┌─────────────────────────────┐
│        App.tsx               │
│  ┌───────────────────────┐  │
│  │    UserProvider        │  │  → Professor selecionado, progresso do jogo, stage
│  │  ┌─────────────────┐  │  │
│  │  │ AchievementsProvider│  │  → 25 conquistas, localStorage, toast
│  │  │  ┌─────────────┐│  │  │
│  │  │  │  AppLayout   ││  │  │  → Rotas, MobileBlock, AchievementMenu
│  │  │  │  + Toast     ││  │  │
│  │  │  └─────────────┘│  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Persistência

| Dado | Chave localStorage | Descrição |
|------|-------------------|-----------|
| Conquistas | `despedida_achievements` | Array de IDs das conquistas desbloqueadas |
| Stage do jogo | `grad_adventure_stage` | Progresso sequencial (0-3) |

---

## 📝 Licença

Projeto acadêmico criado com ❤️ como homenagem aos professores da UERN.

---

<div align="center">

*"Obrigado por tudo, professores. Pelo conhecimento, pela paciência e por cada bug resolvido no quadro."* 🎓

**UERN — Campus Natal — Ciência da Computação — 2026**

</div>
