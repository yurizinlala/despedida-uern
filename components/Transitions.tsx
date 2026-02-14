
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBiosBeep, playProcessingNoise, playGlitchSound } from '../utils/audio';
import { Folder, Loader2, Monitor } from 'lucide-react';

export const MuralLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const logLines = [
    "C:\> ATTRIB -R -S -H G:\SECRET_DATA\*.*",
    "Acessando setor de armazenamento legado...",
    "Montando imagem de disco: MURAL_DOCENTE_V1.ISO",
    "Descomprimindo memórias acadêmicas...",
    "Ignorando erros de CRC (Dados corrompidos por café)...",
    "Abrindo Explorer.exe..."
  ];

  useEffect(() => {
    playProcessingNoise();
    let i = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, logLines[i]]);
      playBiosBeep();
      i++;
      if (i >= logLines.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#008080] z-[200] flex flex-col items-center justify-center p-10 font-mono text-white">
      <div className="w-full max-w-md bg-black border-2 border-gray-400 p-6 shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 mb-6 text-green-500">
          <Folder size={24} />
          <span className="text-xs uppercase font-bold tracking-widest">File Manager Access</span>
        </div>
        <div className="space-y-2 text-[10px] md:text-xs">
          {lines.map((l, i) => (
            <p key={i} className="text-green-400 animate-in fade-in slide-in-from-left-2">&gt; {l}</p>
          ))}
          <div className="pt-4 flex items-center gap-2">
            <Loader2 className="animate-spin text-yellow-500" size={14} />
            <span className="text-yellow-500 animate-pulse">PROCESSANDO...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClassroomTransition: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    playGlitchSound();
    const t = setTimeout(onComplete, 3000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[200] flex items-center justify-center overflow-hidden">
      {/* CRT Turn Off Effect */}
      <motion.div
        initial={{ height: "100%", width: "100%" }}
        animate={{ height: "2px", width: "100%", opacity: [1, 1, 0] }}
        transition={{ duration: 0.5, times: [0, 0.8, 1] }}
        className="bg-white z-50 absolute"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 2 }}
        className="text-center"
      >
        <Monitor size={64} className="text-white/20 mx-auto mb-6" />
        <h2 className="text-white font-pixel text-lg animate-pulse tracking-tighter">ENTRANDO NO COMPLEXO...</h2>
        <p className="text-white/40 font-mono text-xs mt-4 italic">"Por favor, guarde seus pertences e sua esperança."</p>
      </motion.div>
    </div>
  );
};
