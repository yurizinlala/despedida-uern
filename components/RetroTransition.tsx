
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playProcessingNoise, playXpStartup, playBiosBeep } from '../utils/audio';

interface RetroTransitionProps {
  onComplete: () => void;
}

const RetroTransition: React.FC<RetroTransitionProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'black' | 'boot' | 'welcome' | 'done'>('black');

  useEffect(() => {
    // Stage 1: Absolute Silence/Black
    setTimeout(() => {
        setPhase('boot');
        playBiosBeep();
    }, 1000);

    // Stage 2: Windows XP Boot Style
    setTimeout(() => {
        setPhase('welcome');
        playXpStartup();
    }, 4500);

    // Final Stage
    setTimeout(() => {
        setPhase('done');
        onComplete();
    }, 8500);
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
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="h-full w-12 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-sm"
                />
            </div>
            <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest font-mono">Copyright (C) 2001-2025 Microsoft / UERN</p>
          </motion.div>
        )}

        {phase === 'welcome' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 bg-gradient-to-b from-[#1084d0] via-[#000080] to-[#1084d0] flex flex-col items-center justify-center"
          >
             <div className="flex items-center gap-12 max-w-4xl w-full px-20">
                <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-blue-900 font-serif font-black text-4xl">U</div>
                </div>
                <div className="h-24 w-[2px] bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
                <div className="text-white">
                    <h1 className="text-6xl font-light tracking-tight mb-2">Bem-vindo</h1>
                    <p className="text-xl opacity-60">Para começar, clique no seu perfil de docente.</p>
                </div>
             </div>
             {/* Progress Dots */}
             <div className="absolute bottom-20 flex gap-2">
                {[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RetroTransition;
