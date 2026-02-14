
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Lock, Star, Gamepad2, Cat, AlertTriangle, Terminal, ShieldAlert, Clock, Crown, Search, Skull, RotateCcw, Play, Trash2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface AchievementMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const IconMap: Record<string, any> = {
  Trophy, Lock, Star, Gamepad2, Cat, AlertTriangle, Terminal, ShieldAlert, Clock, Crown, Search,
  Skull, RotateCcw, Play, Trash2,
  Heart: Star, Layout: Star, GitGraph: Star, Binary: Star // Prof icons fallback
};

const AchievementMenu: React.FC<AchievementMenuProps> = ({ isOpen, onClose }) => {
  const { unlockedAchievements, masterAchievementsList } = useUser();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const totalPossible = masterAchievementsList.length;
  const currentUnlocked = unlockedAchievements.length;
  const totalGamerscore = currentUnlocked * 50;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-[#121212] w-full max-w-2xl rounded-2xl border-2 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 flex justify-between items-center border-b border-white/10">
              <div className="space-y-1">
                <h2 className="text-3xl font-display uppercase text-white tracking-widest flex items-center gap-3">
                  Registros de Honra
                </h2>
                <div className="flex items-center gap-4">
                  <p className="text-xs text-yellow-500 font-bold flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                    <Star size={14} fill="currentColor" /> {totalGamerscore}G ACUMULADOS
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">PROGRESSO: {currentUnlocked} / {totalPossible}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors group">
                <X size={28} className="text-gray-400 group-hover:text-white" />
              </button>
            </div>

            {/* List */}
            <div className="p-6 overflow-y-auto space-y-3 custom-scrollbar scrollbar-retro bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
              {masterAchievementsList.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                const Icon = IconMap[ach.icon] || Star;

                return (
                  <motion.div
                    key={ach.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`flex items-center gap-5 p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${isUnlocked
                      ? 'bg-gradient-to-r from-green-950/40 to-black border-green-500/40'
                      : 'bg-black/40 border-white/5 grayscale opacity-60'
                      }`}
                  >
                    {isUnlocked && (
                      <div className="absolute top-0 right-0 p-2">
                        <Star size={12} className="text-yellow-500 animate-pulse" fill="currentColor" />
                      </div>
                    )}

                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 transition-transform group-hover:scale-110 ${isUnlocked ? 'bg-green-500 border-white/20 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-gray-800 border-gray-700 text-gray-600'
                      }`}>
                      {isUnlocked ? <Icon size={28} /> : <Lock size={24} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className={`font-black text-sm uppercase tracking-wider truncate ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                          {isUnlocked ? ach.title : 'BLOQUEADO'}
                        </h3>
                        <span className={`text-[10px] font-bold font-mono ${isUnlocked ? 'text-yellow-500' : 'text-gray-800'}`}>+50G</span>
                      </div>
                      <p className={`text-[11px] leading-tight line-clamp-2 ${isUnlocked ? 'text-gray-400' : 'text-gray-800 font-mono italic'}`}>
                        {isUnlocked ? ach.description : 'Ainda não habilitado neste semestre...'}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="bg-black/80 p-4 text-center border-t border-white/10">
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
                Pressione <span className="text-white px-2 py-0.5 bg-gray-800 rounded mx-1">ESC</span> ou <span className="text-white px-2 py-0.5 bg-gray-800 rounded mx-1">9</span> para fechar
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AchievementMenu;
