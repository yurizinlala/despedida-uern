import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '../context/AchievementsContext';
import { achievements } from '../data/achievements';
import { Trophy } from 'lucide-react';

const AchievementToast: React.FC = () => {
  const { lastUnlocked, dismissToast } = useAchievements();
  const achievement = lastUnlocked ? achievements.find(a => a.id === lastUnlocked) : null;

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={achievement.id}
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={dismissToast}
          className="fixed top-6 right-6 z-[9999] cursor-pointer"
        >
          {/* Xbox 360-style achievement popup */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-yellow-500/40 px-5 py-3 shadow-[0_0_30px_rgba(234,179,8,0.3)] min-w-[320px] max-w-[420px] relative overflow-hidden"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            {/* Gold icon circle */}
            <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <achievement.icon size={22} className="text-black" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex items-center gap-2 mb-0.5">
                <Trophy size={10} className="text-yellow-500 shrink-0" />
                <span className="text-[9px] text-yellow-500 uppercase tracking-[0.3em] font-bold">Conquista Desbloqueada</span>
              </div>
              {/* Title */}
              <p className="text-white text-sm font-bold truncate">{achievement.title}</p>
              {/* Description */}
              <p className="text-gray-400 text-[10px] truncate">{achievement.description}</p>
            </div>

            {/* Animated glow bar at bottom */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;