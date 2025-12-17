
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import MobileBlock from './components/MobileBlock';
import BootSequence from './components/BootSequence';
import FakeLogin from './components/FakeLogin';
import GlitchTransition from './components/GlitchTransition';
import WrappedSequence from './components/WrappedSequence';
import AchievementToast from './components/AchievementToast';
import AchievementMenu from './components/AchievementMenu';
import Hub from './components/Hub';
import Mural from './components/Mural';
import RetroTransition from './components/RetroTransition';
import Quiz from './components/Quiz';
import Certificate from './components/Certificate';
import Credits from './components/Credits';

const AppLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [firstTrySuccess, setFirstTrySuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { unlockedAchievements } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && unlockedAchievements.length > 0) {
        e.preventDefault(); 
        setIsMenuOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unlockedAchievements]);

  if (isMobile) return <MobileBlock />;

  return (
    <div className="w-full h-screen relative bg-black">
      <AchievementToast />
      <AchievementMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Routes>
        <Route path="/" element={<BootSequence onComplete={() => navigate('/login')} />} />
        <Route path="/login" element={<FakeLogin onSuccess={(f) => { setFirstTrySuccess(f); navigate('/processing'); }} />} />
        <Route path="/processing" element={<GlitchTransition isFirstTry={firstTrySuccess} onComplete={() => navigate('/wrapped')} />} />
        <Route path="/wrapped" element={<WrappedSequence />} />
        <Route path="/transition" element={<RetroTransition onComplete={() => navigate('/hub')} />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/mural" element={<Mural />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/certificado" element={<Certificate />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => (
  <UserProvider>
    <HashRouter>
      <AppLayout />
    </HashRouter>
  </UserProvider>
);

export default App;
