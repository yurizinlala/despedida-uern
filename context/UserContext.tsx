
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Professor, Achievement } from '../types';

interface UserContextType {
  selectedProfessor: Professor | null;
  setSelectedProfessor: (professor: Professor | null) => void;
  unlockedAchievements: string[]; 
  unlockAchievement: (id: string, professorData?: Professor) => void;
  lastUnlocked: { title: string; description: string } | null;
  setLastUnlocked: (data: { title: string; description: string } | null) => void;
  gameStage: number; 
  advanceStage: (stage: number) => void;
  resetGame: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [lastUnlocked, setLastUnlocked] = useState<{ title: string; description: string } | null>(null);
  const [gameStage, setGameStage] = useState(0);

  // Load persistence
  useEffect(() => {
    const savedAchievements = localStorage.getItem('grad_adventure_achievements');
    const savedStage = localStorage.getItem('grad_adventure_stage');
    if (savedAchievements) setUnlockedAchievements(JSON.parse(savedAchievements));
    if (savedStage) setGameStage(parseInt(savedStage));
  }, []);

  // Save persistence
  useEffect(() => {
    localStorage.setItem('grad_adventure_achievements', JSON.stringify(unlockedAchievements));
    localStorage.setItem('grad_adventure_stage', gameStage.toString());
  }, [unlockedAchievements, gameStage]);

  const unlockAchievement = (id: string, professorData?: Professor) => {
    if (!unlockedAchievements.includes(id)) {
      setUnlockedAchievements(prev => [...prev, id]);
      let achievementInfo = { title: 'Conquista', description: 'Nova conquista desbloqueada!' };
      
      if (id === 'hackerman') achievementInfo = { title: 'HACKERMAN', description: 'Acertou a senha de primeira.' };
      else if (id === 'campus_cat') achievementInfo = { title: 'GATEIRO ACADÊMICO', description: 'Acariciou o gato do campus 7 vezes.' };
      else if (id === 'konami_god') achievementInfo = { title: 'LEGACY GOD', description: 'Você conhece os códigos antigos...' };
      else if (professorData) {
        const ach = professorData.wrapped.achievements.find(a => a.id === id);
        if (ach) achievementInfo = { title: ach.title, description: ach.description };
      }
      setLastUnlocked(achievementInfo);
    }
  };

  const advanceStage = (stage: number) => { 
    if (stage > gameStage) setGameStage(stage); 
  };

  const resetGame = () => {
    setUnlockedAchievements([]);
    setGameStage(0);
    localStorage.removeItem('grad_adventure_achievements');
    localStorage.removeItem('grad_adventure_stage');
  };

  return (
    <div className="cursor-pixel">
      <UserContext.Provider value={{ 
        selectedProfessor, setSelectedProfessor, unlockedAchievements, unlockAchievement,
        lastUnlocked, setLastUnlocked, gameStage, advanceStage, resetGame
      }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
