
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, FastForward, AlertTriangle, Terminal } from 'lucide-react';
import { playBiosBeep, playProcessingNoise, playKeyClick, playGlitchSound } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

interface LogLine {
  text: string;
  time: string;
}

const bootLines = [
  "BIOS DATA 20/09/2025 VER 1.0.2 - COPYRIGHT (C) UERN SYSTEMS",
  "CPU: PROCESSADOR QUÂNTICO DE 128-BITS (MODO GAMBIARRA ATIVO)",
  "MEMÓRIA: 64GB RAM (98% RESERVADO PARA INDEXAÇÃO DO SIGAA)",
  "VERIFICANDO INTEGRIDADE DOS SONHOS DOS ALUNOS... [OK]",
  "INICIALIZANDO ADAPTADOR DE VÍDEO (VGA 256 CORES)... OK",
  "CARREGANDO KERNEL 'DESESPERO_v4'... FEITO",
  "VERIFICANDO PERIFÉRICOS...",
  "  > TECLADO... DETECTADO (RESÍDUOS DE PÃO DE QUEIJO ENCONTRADOS)",
  "  > MOUSE... DETECTADO (ESFERA DE ROLAGEM LIMPA)",
  "  > CAFETEIRA... ERRO 418 (SOU UM BULE E ESTOU EXAUSTA)",
  "  > VONTADE DE ESTUDAR... 404 NOT FOUND",
  "MONTANDO SISTEMA DE ARQUIVOS [MODO PÂNICO]... FEITO",
  "LIMPANDO CACHE DE RECLAMAÇÕES... [ERRO: DISCO CHEIO]",
  "ALIMENTANDO OS HAMSTERS DO SERVIDOR... OK",
  "CALIBRANDO NÍVEIS DE ESTRESSE ACADÊMICO... [EXTREMO]",
  "CARREGANDO INTERFACE LEGADA DO S.I.G.A.A (IE6 COMPATIBLE)...",
  "ESTABELECENDO CONEXÃO DISCADA (TURBO 56kbps)...",
  "SISTEMA PRONTO PARA SOFRER."
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'prompt' | 'joke' | 'booting'>('prompt');
  const [lines, setLines] = useState<LogLine[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const requestFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      }
    } catch (e) { console.log('Fullscreen error'); }
  };

  const handleChoice = (choice: 'yes' | 'no') => {
    requestFullscreen();
    if (choice === 'yes') {
      setPhase('booting');
      playBiosBeep();
    } else {
      setPhase('joke');
      playGlitchSound();
    }
  };

  const handleSkip = () => {
    requestFullscreen();
    playBiosBeep();
    onComplete();
  };

  useEffect(() => {
    if (phase === 'booting') {
      let delay = 0;
      playProcessingNoise();
      
      bootLines.forEach((line, index) => {
        const lineDelay = Math.random() * 400 + 100;
        delay += lineDelay;
        
        setTimeout(() => {
          setLines((prev) => [...prev, {
            text: line,
            time: new Date().toLocaleTimeString() 
          }]);
          playKeyClick(); 
          if (index === bootLines.length - 1) setTimeout(onComplete, 1500);
        }, delay);
      });
    }
  }, [phase, onComplete]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white font-mono-tech relative overflow-hidden">
      <div className="crt-container z-50"></div>
      
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
                  onClick={() => handleChoice('no')} 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.2)" }} 
                  className="px-10 py-3 border-2 border-red-500 text-red-500 font-bold uppercase tracking-widest transition-colors relative z-30"
                >
                  [ NÃO ]
                </motion.button>
              </div>
              <button onClick={handleSkip} className="text-[10px] text-gray-600 hover:text-green-500 transition-colors uppercase tracking-[0.2em] relative z-30">Pular e forçar tela cheia</button>
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
              <div className="flex justify-between border-b border-green-900 pb-2 mb-4 opacity-50">
                 <span className="flex items-center gap-2"><Cpu size={16}/> SYSTEM_LOADER_v2.1</span>
                 <span className="animate-pulse">MEM_CHECK: 65536KB [OK]</span>
              </div>
              {lines.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="opacity-40 mr-4">[{line.time}]</span>
                  {line.text}
                </motion.div>
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
