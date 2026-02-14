<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🎓 The Graduation Adventure

**Uma experiência interativa e gamificada de despedida para os professores da UERN**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer)](https://www.framer.com/motion)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-CDN-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 📖 Sobre o Projeto

**The Graduation Adventure** é uma aplicação web interativa criada como um presente de despedida para os professores do curso de **Ciência da Computação** da **UERN (Universidade do Estado do Rio Grande do Norte) — Campus Natal**.

A experiência simula uma jornada acadêmica completa — desde um boot de sistema retro, passando por um login fake no SIGAA, uma retrospectiva estilo "Spotify Wrapped", um mapa pixel-art do campus, um quiz humorístico, até a emissão de um diploma de sobrevivência em PDF.

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
| 4 | `/wrapped` | `WrappedSequence` | Retrospectiva animada estilo Spotify Wrapped com 11 slides: saudação, horas no SIGAA, extrato acadêmico, comparativo aluno vs. professor, métricas de estresse, aura docente, taxa de sobrevivência, arquétipo tech, word-cloud, trilha sonora, e badge final. |
| 5 | `/transition` | `RetroTransition` | Transição estilo "Windows XP boot" com logo da UERN e barra de loading. |
| 6 | `/hub` | `Hub` | Mapa pixel-art do campus com ciclo dia/noite real, nuvens animadas, árvores, um gato do campus interativo (miados sintetizados), e 3 prédios clicáveis: UERN Natal, Complexo e Secretaria. |
| 7 | `/mural` | `Mural` | Desktop Windows 95 com janelas arrastáveis: mensagem de despedida, foto polaroid, Meu Computador, Lixeira com arquivos deletados, e arquivo de Ajuda. Barra de tarefas retrô funcional. |
| 8 | `/quiz` | `Quiz` | Prova de 10 questões de múltipla escolha sobre a vida acadêmica, apresentada como um documento físico. Inclui animação de correção e resultado com diagnóstico humorístico. |
| 9 | `/certificado` | `Certificate` | Emissão de diploma com autenticação biométrica simulada, coleta de assinaturas e certificado final ornamentado. Suporta **download em PDF** (via `html2canvas` + `jsPDF`). |
| 10 | `/credits` | `Credits` | Créditos estilo Star Wars com agradecimentos e listagem das tecnologias. Botão para reiniciar a experiência. |

---

## 🏆 Sistema de Conquistas (Achievements)

A aplicação possui um sistema de **12 conquistas** desbloqueáveis ao longo da jornada:

| Conquista | Descrição | Como desbloquear |
|-----------|-----------|------------------|
| PEDRO, É VOCÊ? | Negou o sistema 3 vezes | Clicar "NÃO" 3x no boot |
| HACKERMAN | Acertou a senha de primeira | Login sem errar |
| LEGACY GOD | Inseriu o código Konami | ↑↑↓↓←→←→ na tela de BSOD |
| GATEIRO ACADÊMICO | Acariciou o gato 7 vezes | Clicar no gato do campus 7x |
| PACIÊNCIA DE JÓ | Esperou o loading troll | Não pular o loading |
| CINEASTA ACADÊMICO | Assistiu o Wrapped completo | Não pular nenhum slide |
| IMORTALIDADE ALCANÇADA | Emitiu o diploma | Completar a jornada |
| CURIOSIDADE ACADÊMICA | Explorou todos os ícones | Clicar no brasão ou 5+ ícones do desktop |
| ARQUEÓLOGO DE LIXO | Vasculhou arquivos deletados | Clicar nos itens da lixeira |
| FRACASSO ÉPICO | Tirou 0.0 na prova | Errar todas as questões |
| PERFEIÇÃO ACADÊMICA | Tirou 10.0 na prova | Acertar todas as questões |
| ESTUDANTE ETERNO | Refez a prova | Refazer o quiz já aprovado |

- Pressione a tecla **`9`** a qualquer momento para abrir o menu de conquistas
- As conquistas são salvas no `localStorage` e persistem entre sessões

---

## 👩‍🏫 Professores

O sistema suporta múltiplos perfis de professores com dados personalizados. Atualmente cadastrados:

| Professor | Tema | Matérias | Senha |
|-----------|------|----------|-------|
| **Prof. Dr. Raul Benites Paradeda** | `web` | Intro à Programação, IHC, Web Dev, Computação Afetiva | `afeto` |
| **Profa. Dra. Camila de Araújo Sena** | `logic` | Lógica Matemática, ED, Grafos, Compiladores | `grafo` |

Cada professor possui:
- Dados personalizados para o Wrapped (extrato, métricas, trilha sonora, aura, etc.)
- Itens de mural (mensagem de despedida + foto)
- Conquistas específicas (2 por professor)
- Paleta de cores e tema visual próprios

---

## 🎨 Estética e Design

- **Fontes**: Anton, Outfit, Caveat, Share Tech Mono, VT323, Press Start 2P, entre outras (via Google Fonts)
- **Efeito CRT**: Scanlines e ruído visual aplicados globalmente nas telas retro
- **Pixel Art**: Assets personalizados para o Hub (prédios, árvores, gato, sol/lua, nuvens)
- **Animações**: Todas via Framer Motion — transições de página, efeitos glitch, spring physics
- **Áudio**: Motor de som 100% sintetizado via **Web Audio API** — sem arquivos de áudio externos
  - `playKeyClick()` — som de teclado
  - `playBiosBeep()` — beep de BIOS
  - `playMeow()` — miado sintetizado do gato
  - `playGlitchSound()` — efeito de glitch
  - `playXpStartup()` — som de boot Windows XP
  - `playShimmer()` — efeito de brilho
  - `playSuccessChime()` — acorde de sucesso

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **React** | 19.2 | UI e componentes |
| **TypeScript** | 5.8 | Tipagem estática |
| **Vite** | 6.2 | Build e dev server |
| **Framer Motion** | 12.23 | Animações e transições |
| **TailwindCSS** | CDN | Estilização |
| **React Router DOM** | 7.10 | Roteamento (HashRouter) |
| **Lucide React** | 0.561 | Ícones |
| **html2canvas** | 1.4 | Captura de tela para PDF |
| **jsPDF** | 2.5 | Geração de PDF |
| **Web Audio API** | Nativa | Efeitos sonoros sintetizados |

---

## 📁 Estrutura do Projeto

```
despedida/
├── index.html              # HTML principal com fonts, estilos globais e import maps
├── index.tsx               # Entry point React
├── App.tsx                 # Layout principal, rotas e providers
├── types.ts                # Tipos TypeScript (Professor, WrappedData, Achievement, etc.)
├── vite.config.ts          # Configuração do Vite
├── package.json            # Dependências e scripts
├── metadata.json           # Metadados do projeto
│
├── assets/                 # Imagens pixel-art do Hub
│   ├── arvore.png
│   ├── centroconvivencia.png
│   ├── complexouern.png
│   ├── gato.png
│   ├── lua.png
│   ├── nuvem_dia.png
│   ├── nuvem_noite.png
│   ├── secretaria.png
│   └── sol.png
│
├── components/             # Componentes React (16 arquivos)
│   ├── AchievementMenu.tsx     # Menu de conquistas (tecla 9)
│   ├── AchievementToast.tsx    # Notificação toast de conquista
│   ├── BootSequence.tsx        # Tela de boot BIOS
│   ├── Certificate.tsx         # Emissão de diploma em PDF
│   ├── Counter.tsx             # Contador animado com spring physics
│   ├── Credits.tsx             # Tela de créditos final
│   ├── FakeLogin.tsx           # Login fake do SIGAA
│   ├── GlitchTransition.tsx    # Glitch + BSOD + Konami code
│   ├── Hub.tsx                 # Mapa pixel-art do campus
│   ├── MobileBlock.tsx         # Bloqueio para dispositivos móveis
│   ├── Mural.tsx               # Desktop Windows 95
│   ├── Quiz.tsx                # Prova acadêmica interativa
│   ├── RetroTransition.tsx     # Boot estilo Windows XP
│   ├── Transitions.tsx         # Transições de loading (MuralLoading, ClassroomTransition)
│   ├── WrappedPlaceholder.tsx  # Placeholder (não utilizado)
│   └── WrappedSequence.tsx     # Retrospectiva estilo Spotify Wrapped
│
├── context/
│   └── UserContext.tsx     # Estado global (professor, conquistas, progresso)
│
├── data/
│   └── professors.ts       # Dados dos professores e itens de mural
│
└── utils/
    └── audio.ts            # Engine de áudio sintetizado (Web Audio API)
```

---

## ⚡ Como Rodar Localmente

**Pré-requisitos:** [Node.js](https://nodejs.org) (v18+)

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação será aberta em `http://localhost:3000`.

### Build de Produção

```bash
npm run build
npm run preview
```

---

## 🎮 Dicas Secretas

- **Tecla `9`**: Abre/fecha o menu de conquistas em qualquer tela
- **Código Konami** (↑↑↓↓←→←→): Desbloqueia conquista na tela de BSOD
- **Clicar no brasão "U"**: Desbloqueia conquista na tela de login
- **Digitar `admin` ou `root`**: Easter egg na tela de login
- **Gato do campus**: Clique 7 vezes seguidas para conquista + frases aleatórias

---

## 📝 Licença

Projeto acadêmico criado com ❤️ como homenagem aos professores da UERN.

---

<div align="center">

*"Obrigado por tudo, professores. Pelo conhecimento, pela paciência e por cada bug resolvido no quadro."* 🎓

**UERN — Campus Natal — Ciência da Computação — 2025**

</div>
