
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, AlertTriangle } from 'lucide-react';
import { playSound } from '../utils/audio';
import { useUser } from '../context/UserContext';
import { useAchievements } from '../context/AchievementsContext';

interface BootSequenceProps {
  onComplete: () => void;
}

const TypedLine: React.FC<{ text: string; time: string; delay: number; onComplete?: () => void }> = ({ text, time, delay, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const totalDuration = 1000;
    const speed = totalDuration / text.length;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, onComplete]);

  return (
    <div className="flex gap-4">
      <span className="opacity-40 shrink-0 font-mono text-xs md:text-sm">[{time}]</span>
      <span className="whitespace-pre-wrap">{displayedText}</span>
    </div>
  );
};

const bootLines = [
  "XEXISBIOS 14/02/2026 VER 2.2 - COPYRIGHT (C) UERN SYSTEMS",
  "CPU: PROCESSADOR QUÂNTICO DE 128-BITS",
  "MEMÓRIA: 64GB RAM (98% RESERVADO PARA RODAR O SIGAA)",
  "VERIFICANDO INTEGRIDADE DOS SONHOS DOS ALUNOS... [OK]",
  "INICIALIZANDO ADAPTADOR DE VÍDEO (TECPIX 16 CORES)... [OK]",
  "CARREGANDO KERNEL 'SIGAA_v2'... [OK]",
  "  > TECLADO... [OK] (RESÍDUOS DE COMIDA ENCONTRADOS)",
  "  > MOUSE... [OK] (ESFERA DE ROLAGEM LIMPA)",
  "  > XÍCARA DE CAFÉ... [ERRO 444] (PODE ESTAR MEIO FRIO)",
  "  > VONTADE DE ESTUDAR... [ERRO 404]",
  "MONTANDO SISTEMA DE ARQUIVOS (MODO RÁPIDO)... [OK]",
  "CALIBRANDO NÍVEIS DE ESTRESSE ACADÊMICO... [OK]",
  "CARREGANDO INTERFACE LEGADA DO S.I.G.A.A (TRAVANDO UM POUCO)...",
  "ESTABELECENDO CONEXÃO DISCADA (TURBO 56kbps)...",
  "SISTEMA PRONTO (TALVEZ)..."
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const { setHasSkippedIntro } = useUser();
  const { unlock } = useAchievements();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [phase, setPhase] = useState<'prompt' | 'joke' | 'booting'>('prompt');
  const [visibleLinesCount, setVisibleLinesCount] = useState(0);
  const [noClicks, setNoClicks] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const loadingAudioRef = useRef<HTMLAudioElement | null>(null);

  // Play kernel-init only after interaction
  useEffect(() => {
    if (hasInteracted) {
      playSound('/sounds/kernel-init.mp3');
    }
  }, [hasInteracted]);

  const fixedTimestamps = useMemo(() => {
    const startTime = new Date();
    return bootLines.map((_, i) => {
      const time = new Date(startTime.getTime() + i * 1000);
      return time.toLocaleTimeString([], { hour12: false });
    });
  }, []);

  const requestFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      }
    } catch (e) { console.log('Fullscreen blocked'); }
  };

  const handleChoice = (choice: 'yes' | 'no') => {
    requestFullscreen();
    if (choice === 'yes') {
      setPhase('booting');
      playSound('/sounds/accept.mp3');
    } else {
      const newNoClicks = noClicks + 1;
      setNoClicks(newNoClicks);
      setPhase('joke');
      playSound('/sounds/error.mp3');
      if (newNoClicks === 1) unlock('funny_guy');
      if (newNoClicks >= 3) unlock('pedro_is_you');
    }
  };

  useEffect(() => {
    if (phase === 'booting') {
      // Play kernel-loading and keep reference to stop it later
      const audio = new Audio('/sounds/kernel-loading.mp3');
      audio.loop = true;
      audio.play().catch(() => { });
      loadingAudioRef.current = audio;

      const timer = setInterval(() => {
        setVisibleLinesCount(prev => {
          if (prev < bootLines.length) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        // Stop kernel-loading when leaving this phase
        audio.pause();
        audio.currentTime = 0;
        loadingAudioRef.current = null;
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'booting' && visibleLinesCount === bootLines.length) {
      const finalTimeout = setTimeout(() => {
        // Stop kernel-loading before transitioning
        if (loadingAudioRef.current) {
          loadingAudioRef.current.pause();
          loadingAudioRef.current.currentTime = 0;
          loadingAudioRef.current = null;
        }
        onComplete();
      }, 5000);
      return () => clearTimeout(finalTimeout);
    }
  }, [visibleLinesCount, phase, onComplete]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLinesCount]);

  const handleSkip = () => {
    requestFullscreen();
    setHasSkippedIntro(true);
    onComplete();
  };

  if (!hasInteracted) {
    return (
      <div
        onClick={() => setHasInteracted(true)}
        className="h-screen w-full bg-black flex items-center justify-center text-green-500 font-mono-tech cursor-pointer z-50 fixed inset-0"
      >
        <div className="text-center animate-pulse">
          <Terminal size={64} className="mx-auto mb-4" />
          <p className="text-xl tracking-widest uppercase">[ CLIQUE PARA INICIALIZAR ]</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white font-mono-tech relative overflow-hidden">
      <div className="crt-container"></div>

      <AnimatePresence mode="wait">
        {phase === 'prompt' && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-20 text-center max-w-lg border-2 border-green-500/50 p-10 bg-black shadow-[0_0_60px_rgba(0,255,0,0.2)]"
          >
            <Terminal size={48} className="mx-auto mb-6 text-green-500 animate-pulse" />
            <h1 className="text-2xl md:text-3xl text-green-500 mb-6 font-bold tracking-widest uppercase">SIGAA KERNEL v2</h1>
            <p className="mb-10 text-sm text-gray-400 leading-relaxed">
              Deseja inicializar o ambiente de simulação acadêmica e colocar à prova sua sanidade?
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={() => handleChoice('yes')}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                  className="px-10 py-3 border-2 border-green-500 text-green-500 font-bold uppercase tracking-widest transition-colors relative z-30"
                >
                  [ SIM ]
                </motion.button>
                <motion.button
                  onClick={() => noClicks < 3 && handleChoice('no')}
                  whileHover={noClicks < 3 ? { scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.2)" } : {}}
                  className={`px-10 py-3 border-2 border-red-500 text-red-500 font-bold uppercase tracking-widest transition-colors relative z-30 ${noClicks >= 3 ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
                >
                  [ NÃO ]
                </motion.button>
              </div>
              <button onClick={handleSkip} className="text-[10px] text-gray-600 hover:text-green-500 transition-colors uppercase tracking-[0.2em] relative z-30">Pular Intro</button>
            </div>
          </motion.div>
        )}

        {phase === 'joke' && (
          <motion.div
            key="joke"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-20 text-center max-w-lg p-10 bg-red-900/10 border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.2)]"
          >
            <AlertTriangle size={64} className="mx-auto mb-6 text-red-500" />
            <h1 className="text-2xl text-red-500 mb-4 font-bold uppercase">Erro de Permissão</h1>
            <p className="text-white mb-8 font-mono text-sm leading-relaxed">
              O SIGAA detectou uma tentativa de fuga da realidade acadêmica. O botão "NÃO" será desabilitado em <span className="text-red-400 font-bold text-lg">{Math.max(3 - noClicks, 0)}</span> tentativa{3 - noClicks !== 1 ? 's' : ''} por decreto da reitoria (mais conhecido como Yuri) para colocar em desafio sua sanidade.
            </p>
            <motion.button
              onClick={() => { playSound('/sounds/accept.mp3'); setPhase('prompt'); }}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-widest shadow-lg relative z-30"
            >
              Aceitar Meu Destino
            </motion.button>
          </motion.div>
        )}

        {phase === 'booting' && (
          <motion.div
            key="booting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full p-8 md:p-12 overflow-y-auto font-mono-tech text-green-500 text-sm md:text-lg scrollbar-retro"
          >
            <div className="max-w-4xl mx-auto flex flex-col gap-2">
              <div className="flex justify-between border-b border-green-900 pb-2 mb-4 opacity-30">
                <span className="flex items-center gap-2 uppercase tracking-widest">SEQUÊNCIA DE BOOT DO SIGAA</span>
                <span className="animate-pulse">CARREGANDO...</span>
              </div>

              {bootLines.slice(0, visibleLinesCount).map((line, i) => (
                <TypedLine
                  key={i}
                  text={line}
                  time={fixedTimestamps[i]}
                  delay={0}
                />
              ))}

              <div ref={bottomRef} className="h-20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BootSequence;
