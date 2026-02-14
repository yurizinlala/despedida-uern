
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, AlertTriangle } from 'lucide-react';
import { playBiosBeep, playProcessingNoise, playKeyClick, playGlitchSound } from '../utils/audio';
import { useUser } from '../context/UserContext';

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
        if (i % 3 === 0) playKeyClick();
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
  "BIOS DATA 20/09/2025 VER 1.0.2 - COPYRIGHT (C) UERN SYSTEMS",
  "CPU: PROCESSADOR QUÂNTICO DE 128-BITS (MODO GAMBIARRA ATIVO)",
  "MEMÓRIA: 64GB RAM (98% RESERVADO PARA INDEXAÇÃO DO SIGAA)",
  "VERIFICANDO INTEGRIDADE DOS SONHOS DOS ALUNOS... [OK]",
  "INICIALIZANDO ADAPTADOR DE VÍDEO (VGA 256 CORES)... OK",
  "CARREGANDO KERNEL 'DESESPERO_v4'... FEITO",
  "  > TECLADO... DETECTADO (RESÍDUOS DE PÃO DE QUEIJO ENCONTRADOS)",
  "  > MOUSE... DETECTADO (ESFERA DE ROLAGEM LIMPA)",
  "  > CAFETEIRA... ERRO 418 (SOU UM BULE E ESTOU EXAUSTA)",
  "  > VONTADE DE ESTUDAR... 404 NOT FOUND",
  "MONTANDO SISTEMA DE ARQUIVOS [MODO PÂNICO]... FEITO",
  "CALIBRANDO NÍVEIS DE ESTRESSE ACADÊMICO... [EXTREMO]",
  "CARREGANDO INTERFACE LEGADA DO S.I.G.A.A (IE6 COMPATIBLE)...",
  "ESTABELECENDO CONEXÃO DISCADA (TURBO 56kbps)...",
  "SISTEMA PRONTO PARA SOFRER."
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const { unlockAchievement, setHasSkippedIntro } = useUser();
  const [phase, setPhase] = useState<'prompt' | 'joke' | 'booting'>('prompt');
  const [visibleLinesCount, setVisibleLinesCount] = useState(0);
  const [noClicks, setNoClicks] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

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
      playBiosBeep();
    } else {
      const newNoClicks = noClicks + 1;
      setNoClicks(newNoClicks);
      if (newNoClicks >= 3) {
        unlockAchievement('pedro_denial');
      }
      setPhase('joke');
      playGlitchSound();
    }
  };

  useEffect(() => {
    if (phase === 'booting') {
      playProcessingNoise();
      const timer = setInterval(() => {
        setVisibleLinesCount(prev => {
          if (prev < bootLines.length) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'booting' && visibleLinesCount === bootLines.length) {
      const finalTimeout = setTimeout(() => {
        onComplete();
      }, 5000);
      return () => clearTimeout(finalTimeout);
    }
  }, [visibleLinesCount, phase, onComplete]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLinesCount]);

  const handleSkip = () => {
    setHasSkippedIntro(true);
    onComplete();
  };

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
            <h1 className="text-2xl md:text-3xl text-green-500 mb-6 font-bold tracking-widest uppercase">Kernel UERN v9.0.2</h1>
            <p className="mb-10 text-sm text-gray-400 leading-relaxed">
              Deseja inicializar o ambiente de simulação acadêmica e restaurar a sanidade do docente?
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
              O SIGAA detectou uma tentativa de fuga da realidade acadêmica. O botão "NÃO" foi desabilitado por decreto da reitoria para preservar sua produtividade.
            </p>
            <motion.button
              onClick={() => setPhase('prompt')}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-widest shadow-lg relative z-30"
            >
              Entendido (Aceitar Destino)
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
                <span className="flex items-center gap-2 uppercase tracking-widest">System Boot Sequence</span>
                <span className="animate-pulse">LOADING...</span>
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
