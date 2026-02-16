
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
import { preloadAllSounds, playSound } from './utils/audio';

const AppLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [firstTrySuccess, setFirstTrySuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload all sounds globally on first mount
  useEffect(() => {
    preloadAllSounds();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut "9" for Achievements - works globally
      if (e.key === '9') {
        const activeEl = document.activeElement;
        const isInput = activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement || activeEl instanceof HTMLSelectElement;

        if (!isInput) {
          e.preventDefault();
          setIsMenuOpen(prev => {
            const next = !prev;
            if (next) {
              playSound('/sounds/achviements-open.mp3');
            }
            return next;
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
