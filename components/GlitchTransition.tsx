
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { getLoadingMessages } from '../data/professors';
import { playSound, playSoundPitched } from '../utils/audio';

import { Scan, Fingerprint, Activity, Wifi, Battery, Database, Trophy, FastForward, Terminal, Ghost } from 'lucide-react';

interface GlitchTransitionProps {
  onComplete: () => void;
  isFirstTry?: boolean;
}

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

const fakeErrorLogs = [
  "KERNEL_SECURITY_CHECK_FAILURE: O sistema detectou excesso de IHC no sangue.",
  "DPC_WATCHDOG_VIOLATION: Os seguranças do laboratório estão cansados de ver você jogar.",
  "SYSTEM_THREAD_EXCEPTION_NOT_HANDLED: Uma thread de desespero escapou do controle.",
  "IRQL_NOT_LESS_OR_EQUAL: O nível de desespero está acima do necessário para o boot.",
  "CRITICAL_PROCESS_DIED: O processo 'vontade_de_estudar.exe' parou de responder.",
  "VIDEO_TDR_FAILURE: Sua bomba feita de ESP32 acabou detonando por acidente.",
  "MEMORY_MANAGEMENT: O SIGAA dividiu sua nota final por zero.",
  "REGISTRY_ERROR: O registro de presença está negativo.",
  "DUMP_STACK: Student.RequestExtension() -> Professor.Deny() -> Student.Cry()",
  "DEBUG: Tentando encontrar o ponto-vírgula que falta desde 2018..."
];

const playCoinSound = (konamiStep: number) => {
  // Aggressive pitch ramp: starts at 0.8x, goes up to ~2.24x across 8 steps
  const playbackRate = 0.8 + (konamiStep * 0.18);
  playSoundPitched('/sounds/coin.mp3', playbackRate);
};

// --- Component ---
const GlitchTransition: React.FC<GlitchTransitionProps> = ({ onComplete, isFirstTry = false }) => {
  const { selectedProfessor, setHasSkippedIntro } = useUser();
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState("Iniciando processamento de despedida...");
  const [phase, setPhase] = useState<'loading' | 'error' | 'hack'>('loading');
  const [isRegressing, setIsRegressing] = useState(false);
  const [shakeKey, setShakeKey] = useState(0); // incremented to trigger shake animation
  const [konamiIdx, setKonamiIdx] = useState(0);
  const skipTriggered = useRef(false);

  const messagesRef = useRef<string[]>([]);

  // Play opening sound on mount (preloading is handled globally in App.tsx)
  useEffect(() => {
    playSound('/sounds/glitch-transition-open.mp3');
  }, []);

  useEffect(() => {
    if (selectedProfessor) {
      messagesRef.current = [
        ...getLoadingMessages(selectedProfessor.theme),
        "Sincronizando <Include> de 2022...",
        "Retirando loops das Máquinas de Estados Finitos...",
        "Excluindo a pasta System32 do PC do professor...",
        "Convertendo lágrimas em código Python...",
        "Limpando migalhas do teclado do professor...",
        "Deixando o algoritmo mais complexo...",
        "Calculando horas de sono perdidas..."
      ];
    }
  }, [selectedProfessor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'error') return;
      if (e.key === KONAMI_CODE[konamiIdx]) {
        const nextIdx = konamiIdx + 1;
        if (nextIdx === KONAMI_CODE.length) {
          // Konami complete!
          playSound('/sounds/one-up.mp3');
          setKonamiIdx(0);
        } else {
          playCoinSound(nextIdx);
          setKonamiIdx(nextIdx);
        }
      } else { setKonamiIdx(0); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, konamiIdx]);

  useEffect(() => {
    if (phase === 'loading') {
      const updateProgress = () => {
        setProgress((prev) => {
          if (prev >= 100) {
            setPhase('error');
            return 100;
          }
          const chaos = Math.random();
          if (chaos < 0.12 && prev > 30) {
            setIsRegressing(true);
            setShakeKey(k => k + 1); // trigger shake
            playSound('/sounds/glitch.mp3');
            setCurrentLine("ERRO: O sistema detectou cansaço excessivo!");
            return Math.max(0, prev - 18);
          }
          setIsRegressing(false);
          const increment = Math.random() * 6 + 1;
          if (Math.random() < 0.25) {
            const lines = messagesRef.current;
            if (lines.length) setCurrentLine(lines[Math.floor(Math.random() * lines.length)]);
          }
          return Math.min(100, prev + increment);
        });
        // Slower speed so users can read the jokes
        const nextSpeed = Math.random() * 700 + 250;
        if (phase === 'loading') timerRef.current = setTimeout(updateProgress, nextSpeed);
      };
      let timerRef = { current: setTimeout(updateProgress, 500) };
      return () => clearTimeout(timerRef.current);
    }

    if (phase === 'error') {
      // Play BSOD sound
      playSound('/sounds/bsod.mp3');
      // Longer BSOD duration (12s)
      const timeout = setTimeout(() => {
        setPhase('hack');
      }, 12000);
      return () => clearTimeout(timeout);
    }

    if (phase === 'hack') {
      const delay = isFirstTry ? 6000 : 4000;
      setTimeout(onComplete, delay);
    }
  }, [phase, onComplete, isFirstTry]);

  const handleSkip = () => {
    skipTriggered.current = true;
    setHasSkippedIntro(true);
    setPhase('error');
  };

  if (phase === 'loading') {
    return (
      <motion.div
        key={`shake-${shakeKey}`}
        className="h-screen bg-[#dcdcdc] flex items-center justify-center flex-col p-12 font-sans border-8 border-white overflow-hidden"
        {...(shakeKey > 0 ? {
          initial: { x: 0, y: 0 },
          animate: { x: [0, -10, 10, -8, 8, -4, 4, 0], y: [0, 5, -5, 4, -4, 2, -2, 0] },
          transition: { duration: 0.4, ease: "easeInOut" }
        } : {})}
      >
        <button onClick={handleSkip} className="absolute top-6 right-6 text-[10px] text-gray-500 hover:text-blue-700 flex items-center gap-2 uppercase font-black border-2 border-gray-400 px-3 py-1 shadow-sm">
          <FastForward size={14} /> Ignorar Loading
        </button>
        <div className="w-full max-w-lg space-y-4">
          <div className="flex justify-between text-xs text-gray-700 font-black uppercase tracking-tighter">
            <span className={isRegressing ? "text-red-600 animate-pulse" : ""}>{currentLine}</span>
            <span className="font-mono">{Math.floor(progress)}%</span>
          </div>
          <div className="h-10 bg-white border-4 border-gray-500 p-1 shadow-inner">
            <motion.div
              className={`h-full transition-all duration-300 ${isRegressing ? 'bg-red-600' : 'bg-blue-700'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-[9px] text-gray-400 font-bold uppercase">Aviso: Não desligue o seu cérebro durante este processo.</p>
        </div>
      </motion.div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="h-screen bg-[#0000AA] text-white font-mono flex flex-col justify-center px-6 py-4 md:px-12 md:py-6 select-none relative overflow-hidden">
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-3 md:gap-4 relative z-10">
          {/* Title bar */}
          <div className="bg-white text-[#0000AA] inline-block px-3 py-0.5 font-black text-lg md:text-xl self-start">UERN_HALT_RECOVERY</div>

          {/* Big sad face + description */}
          <div>
            <span className="text-[80px] md:text-[120px] leading-none block">:(</span>
            <p className="text-sm md:text-base font-bold leading-snug mt-2">
              Ocorreu um erro fatal no processamento do seu semestre e o sistema precisa ser reiniciado para evitar o trancamento compulsório (de novo).
            </p>
          </div>

          {/* Error log panel */}
          <div className="bg-white/5 border border-white/20 p-4 md:p-6 font-mono text-xs md:text-sm overflow-hidden">
            <h3 className="text-yellow-400 font-bold uppercase text-xs mb-2">Relatório de Desastre:</h3>
            <div className="h-24 md:h-28 overflow-hidden relative">
              <motion.div animate={{ y: [0, -300] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="space-y-0.5 opacity-80">
                {fakeErrorLogs.map((log, i) => <p key={i}>&gt; {log}</p>)}
                {fakeErrorLogs.map((log, i) => <p key={i + 100}>&gt; {log}</p>)}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0000AA] via-transparent to-[#0000AA] pointer-events-none"></div>
            </div>
          </div>

          {/* Bottom info bar */}
          <div className="flex items-center gap-4 pt-3 border-t border-white/20">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white p-1.5 shrink-0">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UERN_LEGACY_SYSTEM&color=0000AA`} alt="QR" className="w-full h-full" />
            </div>
            <div className="text-[9px] md:text-[10px] space-y-1 opacity-70 uppercase tracking-wider font-bold">
              <p>Para mais informações, procure por: "QUERO_TRANCAR_ELETRICIDADE_E_MAGNETISMO.log"</p>
              <p>O sistema será restaurado em breve... talvez.</p>
              <p className="text-yellow-400 animate-pulse">DICA: Uma sequência antiga de botões pode ajudar a purificar o sistema...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex items-center justify-center font-mono-tech overflow-hidden p-8">
      <div className="crt-container absolute inset-0 pointer-events-none z-50"></div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-4xl p-12 border-4 border-cyan-500/50 bg-black/80 text-center shadow-[0_0_100px_rgba(6,182,212,0.3)]"
      >
        <Fingerprint size={100} className="mx-auto text-cyan-400 mb-8 animate-pulse" />
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">IDENTIDADE <span className="text-cyan-400">RESTABELECIDA</span></h1>
        <div className="h-2 w-full bg-cyan-900/30 mb-8">
          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} className="h-full bg-cyan-400 shadow-[0_0_15px_cyan]" />
        </div>
      </motion.div>
    </div>
  );
};

export default GlitchTransition;
