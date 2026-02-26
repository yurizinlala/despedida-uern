
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Professor } from '../types';

interface UserContextType {
  selectedProfessor: Professor | null;
  setSelectedProfessor: (professor: Professor | null) => void;
  gameStage: number;
  advanceStage: (stage: number) => void;
  resetGame: () => void;
  hasSkippedIntro: boolean;
  setHasSkippedIntro: (val: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [gameStage, setGameStage] = useState(0);
  const [hasSkippedIntro, setHasSkippedIntro] = useState(false);

  useEffect(() => {
    const savedStage = localStorage.getItem('grad_adventure_stage');
    if (savedStage) setGameStage(parseInt(savedStage));
  }, []);

  useEffect(() => {
    localStorage.setItem('grad_adventure_stage', gameStage.toString());
  }, [gameStage]);

  const advanceStage = (stage: number) => {
    if (stage > gameStage) setGameStage(stage);
  };

  const resetGame = () => {
    setGameStage(0);
    setSelectedProfessor(null);
    setHasSkippedIntro(false);
    // Keep restart behavior consistent by clearing achievement progress too
    // (current + legacy storage keys).
    localStorage.removeItem('despedida_achievements');
    localStorage.removeItem('grad_adventure_achievements');
    localStorage.removeItem('grad_adventure_stage');
  };

  return (
    <UserContext.Provider value={{
      selectedProfessor,
      setSelectedProfessor,
      gameStage,
      advanceStage,
      resetGame,
      hasSkippedIntro,
      setHasSkippedIntro,
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
