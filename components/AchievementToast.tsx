import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Gamepad2 } from 'lucide-react';
import { useUser } from '../context/UserContext';


const AchievementToast: React.FC = () => {
  const { lastUnlocked, setLastUnlocked } = useUser();

  useEffect(() => {
    if (lastUnlocked) {
      const timer = setTimeout(() => {
        setLastUnlocked(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastUnlocked, setLastUnlocked]);

  return (
    <AnimatePresence>
      {lastUnlocked && (
        <motion.div
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 20, x: "-50%", opacity: 1 }}
          exit={{ y: -100, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-0 left-1/2 z-[9999] flex items-center gap-4 bg-gray-900 border-2 border-white text-white px-6 py-4 shadow-[0_10px_0_rgba(0,0,0,0.5)] font-pixel min-w-[350px] max-w-[90vw]"
          style={{ transform: 'translateX(-50%)' }} // Backup CSS transform
        >
          <div className="bg-yellow-500 p-2 border-2 border-white shadow-inner animate-pulse shrink-0">
            <Trophy size={24} className="text-black" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-widest text-yellow-400 mb-1 flex items-center gap-2 font-bold">
              <Gamepad2 size={12} /> Conquista Desbloqueada
            </span>
            <span className="text-sm text-white leading-tight mb-2 font-bold truncate">{lastUnlocked.title}</span>
            <div className="h-px w-full bg-white/20 mb-2"></div>
            <div className="text-[10px] text-gray-300 flex justify-between items-center w-full gap-4">
              <span className="truncate flex-1">{lastUnlocked.description}</span>
              <span className="text-yellow-400 font-bold whitespace-nowrap animate-bounce">+50G</span>
            </div>
          </div>

          {/* Decorative Corner Pixel */}
          <div className="absolute top-1 right-1 w-1 h-1 bg-white/50"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/50"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;