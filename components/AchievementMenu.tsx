import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Lock, Terminal } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface AchievementMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AchievementMenu: React.FC<AchievementMenuProps> = ({ isOpen, onClose }) => {
  const { selectedProfessor, unlockedAchievements } = useUser();

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !selectedProfessor) return null;

  // Combine global achievements with professor specific ones for the list
  const allAchievements = [
    { id: 'hackerman', title: 'HACKERMAN', description: 'Acertou a senha de primeira.', icon: 'Terminal', unlocked: unlockedAchievements.includes('hackerman') },
    ...selectedProfessor.wrapped.achievements
  ];

  const totalGamerscore = allAchievements.filter(a => a.unlocked).length * 50;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 w-full max-w-2xl rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="bg-gray-800 p-6 flex justify-between items-center border-b border-white/10">
          <div>
            <h2 className="text-2xl font-display uppercase text-white">Minhas Conquistas</h2>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <Trophy size={14} className="text-yellow-500" /> 
              Gamerscore: <span className="text-white font-bold">{totalGamerscore}G</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {allAchievements.map((ach) => (
            <div 
              key={ach.id} 
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                ach.unlocked 
                  ? 'bg-green-900/20 border-green-500/30' 
                  : 'bg-gray-800/50 border-white/5 opacity-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                ach.unlocked ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-500'
              }`}>
                {ach.unlocked ? <Trophy size={24} /> : <Lock size={24} />}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold uppercase ${ach.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {ach.title}
                  </h3>
                  {ach.unlocked && <span className="text-yellow-400 text-xs font-bold">+50G</span>}
                </div>
                <p className="text-sm text-gray-400">{ach.description}</p>
                {ach.unlocked && (
                  <p className="text-[10px] text-green-400 mt-1 uppercase tracking-wider">Desbloqueado</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 p-4 text-center text-xs text-gray-500 border-t border-white/10 font-mono">
          Pressione ESC para fechar
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementMenu;