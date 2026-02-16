
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface RetroTransitionProps {
  onComplete: () => void;
}

const RetroTransition: React.FC<RetroTransitionProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'black' | 'boot' | 'done'>('black');

  useEffect(() => {
    // Stage 1: Absolute Silence/Black
    setTimeout(() => {
      setPhase('boot');
    }, 1000);

    // Stage 2: Finish after progress bar runs
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5500);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center font-sans overflow-hidden">
      <AnimatePresence>
        {phase === 'boot' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="text-white text-4xl font-black mb-8 italic flex items-center gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-black font-serif not-italic">U</div>
              UERN XP
            </div>
            <div className="w-64 h-4 border-2 border-white/20 p-1 rounded-sm relative overflow-hidden">
              <motion.div
                initial={{ x: -60 }}
                animate={{ x: 260 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="h-full w-12 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-sm shadow-[0_0_10px_rgba(96,165,250,0.5)]"
              />
            </div>
            <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest font-mono">Iniciando ambiente de trabalho docente...</p>
            <p className="mt-2 text-[8px] text-gray-700 uppercase tracking-[0.2em] font-mono">Copyright (C) 2001-2025 Microsoft / UERN</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RetroTransition;
