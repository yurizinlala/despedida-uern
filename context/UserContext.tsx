
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Professor } from '../types';

interface AchievementInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
}

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
  masterAchievementsList: AchievementInfo[];
  hasSkippedIntro: boolean;
  setHasSkippedIntro: (val: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const GLOBAL_ACHIEVEMENTS: AchievementInfo[] = [];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [lastUnlocked, setLastUnlocked] = useState<{ title: string; description: string } | null>(null);
  const [gameStage, setGameStage] = useState(0);
  const [hasSkippedIntro, setHasSkippedIntro] = useState(false);

  useEffect(() => {
    const savedAchievements = localStorage.getItem('grad_adventure_achievements');
    const savedStage = localStorage.getItem('grad_adventure_stage');
    if (savedAchievements) setUnlockedAchievements(JSON.parse(savedAchievements));
    if (savedStage) setGameStage(parseInt(savedStage));
  }, []);

  useEffect(() => {
    localStorage.setItem('grad_adventure_achievements', JSON.stringify(unlockedAchievements));
    localStorage.setItem('grad_adventure_stage', gameStage.toString());
  }, [unlockedAchievements, gameStage]);

  const unlockAchievement = (id: string, professorData?: Professor) => {
    if (!unlockedAchievements.includes(id)) {
      let achievementInfo = { title: 'Conquista', description: 'Nova conquista desbloqueada!' };
      const globalMatch = GLOBAL_ACHIEVEMENTS.find(a => a.id === id);

      if (globalMatch) {
        achievementInfo = { title: globalMatch.title, description: globalMatch.description };
      } else if (professorData) {
        const ach = professorData.wrapped.achievements.find(a => a.id === id);
        if (ach) achievementInfo = { title: ach.title, description: ach.description };
      } else if (selectedProfessor) {
        const ach = selectedProfessor.wrapped.achievements.find(a => a.id === id);
        if (ach) achievementInfo = { title: ach.title, description: ach.description };
      }

      setUnlockedAchievements(prev => [...prev, id]);
      setLastUnlocked(achievementInfo);
    }
  };

  const advanceStage = (stage: number) => {
    if (stage > gameStage) setGameStage(stage);
  };

  const resetGame = () => {
    setUnlockedAchievements([]);
    setGameStage(0);
    setSelectedProfessor(null);
    setHasSkippedIntro(false);
    localStorage.removeItem('grad_adventure_achievements');
    localStorage.removeItem('grad_adventure_stage');
  };

  const masterAchievementsList = [
    ...GLOBAL_ACHIEVEMENTS,
    ...(selectedProfessor ? selectedProfessor.wrapped.achievements : [])
  ];

  return (
    <UserContext.Provider value={{
      selectedProfessor, setSelectedProfessor, unlockedAchievements, unlockAchievement,
      lastUnlocked, setLastUnlocked, gameStage, advanceStage, resetGame,
      masterAchievementsList, hasSkippedIntro, setHasSkippedIntro
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
