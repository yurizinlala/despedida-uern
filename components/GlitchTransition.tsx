
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { getLoadingMessages } from '../data/professors';
import { playGlitchSound, playSuccessChime, playProcessingNoise, playBiosBeep } from '../utils/audio';
import { Scan, Fingerprint, Activity, Wifi, Battery, Database, Trophy, FastForward, Terminal, Ghost } from 'lucide-react';

interface GlitchTransitionProps {
  onComplete: () => void;
  isFirstTry?: boolean;
}

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

const fakeErrorLogs = [
  "KERNEL_SECURITY_CHECK_FAILURE: O sistema detectou excesso de IHC no sangue.",
  "DPC_WATCHDOG_VIOLATION: O monitor do laboratório está cansado de ver você debugar.",
  "SYSTEM_THREAD_EXCEPTION_NOT_HANDLED: Uma thread de desespero escapou do controle.",
  "IRQL_NOT_LESS_OR_EQUAL: O nível de cafeína está abaixo do necessário para o boot.",
  "CRITICAL_PROCESS_DIED: O processo 'vontade_de_estudar.exe' parou de responder.",
  "VIDEO_TDR_FAILURE: Sua placa de vídeo não aguenta o brilho do seu futuro.",
  "PAGE_FAULT_IN_NONPAGED_AREA: A memória de onde você deixou a chave do gabinete falhou.",
  "FAULTY_HARDWARE_CORRUPTED_PAGE: O hardware do RU corrompeu seu sistema digestivo.",
  "MEMORY_MANAGEMENT: O SIGAA esqueceu onde guardou sua nota final.",
  "BAD_POOL_HEADER: O pool de bolsas de pesquisa está vazio.",
  "REGISTRY_ERROR: O registro de presença tem buracos negros lógicos.",
  "WHEA_UNCORRECTABLE_ERROR: Um erro que nem o Stack Overflow consegue resolver.",
  "FAT_FILE_SYSTEM: O sistema de arquivos está pesado demais para uma segunda-feira.",
  "DUMP_STACK: Student.RequestExtension() -> Professor.Deny() -> Student.Cry()",
  "DUMP_STACK: Professor.Brain.Overflow() -> Coffee.Refill() -> Logic.Restored()",
  "DEBUG: Tentando encontrar o ponto-vírgula que falta desde 2018..."
];

const GlitchTransition: React.FC<GlitchTransitionProps> = ({ onComplete, isFirstTry = false }) => {
  const { selectedProfessor, unlockAchievement } = useUser();
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState("Iniciando compressão de alma...");
  const [phase, setPhase] = useState<'loading' | 'error' | 'hack'>('loading');
  const [isRegressing, setIsRegressing] = useState(false);
  const [konamiIdx, setKonamiIdx] = useState(0);
  
  const messagesRef = useRef<string[]>([]);

  useEffect(() => {
    if (selectedProfessor) {
      messagesRef.current = [
        ...getLoadingMessages(selectedProfessor.theme),
        "Sincronizando pautas de 2015...",
        "Ignorando reclamações da ouvidoria...",
        "Formatando sonhos de calouros...",
        "Convertendo café em código C++...",
        "Limpando migalhas do teclado do docente...",
        "Otimizando o algoritmo de 'vista grossa'...",
        "Verificando se o projetor vai funcionar (Dica: Não vai)...",
        "Calculando o tempo de vida perdido em reuniões..."
      ];
    }
  }, [selectedProfessor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'error') return;
      if (e.key === KONAMI_CODE[konamiIdx]) {
        const nextIdx = konamiIdx + 1;
        if (nextIdx === KONAMI_CODE.length) {
          unlockAchievement('konami_god');
          playSuccessChime();
          setKonamiIdx(0);
        } else {
          setKonamiIdx(nextIdx);
          playBiosBeep();
        }
      } else { setKonamiIdx(0); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, konamiIdx, unlockAchievement]);

  useEffect(() => {
    if (phase === 'loading') {
      const updateProgress = () => {
        setProgress((prev) => {
          if (prev >= 100) {
             setPhase('error');
             playGlitchSound();
             return 100;
          }
          const chaos = Math.random();
          if (chaos < 0.12 && prev > 30) {
            setIsRegressing(true);
            playGlitchSound();
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
        const nextSpeed = Math.random() * 500 + 100; 
        if (phase === 'loading') timerRef.current = setTimeout(updateProgress, nextSpeed);
      };
      let timerRef = { current: setTimeout(updateProgress, 500) };
      return () => clearTimeout(timerRef.current);
    }

    if (phase === 'error') {
      const timeout = setTimeout(() => {
        playProcessingNoise();
        setPhase('hack');
      }, 10000);
      return () => clearTimeout(timeout);
    }

    if (phase === 'hack') {
      playSuccessChime();
      const delay = isFirstTry ? 6000 : 4000;
      setTimeout(onComplete, delay);
    }
  }, [phase, onComplete, isFirstTry]);

  if (phase === 'loading') {
    return (
      <div className="min-h-screen bg-[#dcdcdc] flex items-center justify-center flex-col p-12 font-sans border-8 border-white">
        <button onClick={() => setPhase('error')} className="absolute top-6 right-6 text-[10px] text-gray-500 hover:text-blue-700 flex items-center gap-2 uppercase font-black border-2 border-gray-400 px-3 py-1 shadow-sm">
            <FastForward size={14}/> Ignorar Troll Loading
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
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="min-h-screen bg-[#0000AA] text-white font-mono flex items-center justify-center p-12 cursor-none select-none relative overflow-hidden">
        <div className="max-w-4xl w-full space-y-8 relative z-10">
          <div className="bg-white text-[#0000AA] inline-block px-4 py-1 font-black text-2xl mb-8">UERN_HALT_RECOVERY</div>
          <p className="text-3xl font-bold leading-tight">
            :( <br/>
            Ocorreu um erro fatal no seu semestre acadêmico e o sistema precisa ser reiniciado para evitar o trancamento compulsório.
          </p>
          
          <div className="bg-white/5 border-2 border-white/20 p-8 space-y-4 font-mono text-sm md:text-base overflow-hidden">
             <h3 className="text-yellow-400 font-bold uppercase">Relatório de Desastre:</h3>
             <div className="h-40 overflow-hidden relative">
                <motion.div animate={{ y: [0, -400] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="space-y-1 opacity-80">
                    {fakeErrorLogs.map((log, i) => <p key={i}>> {log}</p>)}
                    {fakeErrorLogs.map((log, i) => <p key={i+100}>> {log}</p>)}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0000AA] via-transparent to-[#0000AA] pointer-events-none"></div>
             </div>
          </div>

          <div className="flex items-center gap-6 pt-10 border-t border-white/20">
             <div className="w-24 h-24 bg-white p-2">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UERN_LEGACY_SYSTEM&color=0000AA`} alt="QR" className="w-full h-full" />
             </div>
             <div className="text-xs space-y-2 opacity-70 uppercase tracking-widest font-bold">
                <p>Para mais informações, procure por: "DIP_EXAUSTION_SYS_042"</p>
                <p>O sistema será restaurado em breve... talvez.</p>
                <p className="text-yellow-400 animate-pulse">DICA: Uma sequência de setas mística pode purificar o Kernel...</p>
             </div>
          </div>
        </div>
        
        {/* Ghost background elements */}
        <div className="absolute top-20 right-20 opacity-5 -rotate-12"><Ghost size={300} /></div>
        <div className="absolute bottom-10 left-10 opacity-5 rotate-45"><Terminal size={200} /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono-tech overflow-hidden p-8">
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
        {isFirstTry && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} className="text-yellow-400 text-lg font-bold border-2 border-yellow-500 p-4 inline-flex items-center gap-3 bg-yellow-500/5">
                <Trophy className="animate-bounce" /> CONQUISTA DESBLOQUEADA: HACKERMAN NATO
            </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GlitchTransition;
