
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Sun, Moon, ArrowRight, X, MapPin, ChevronDown,
  BookOpen, Trophy, GraduationCap, Star
} from 'lucide-react';
import { useAchievements } from '../context/AchievementsContext';

import { MuralLoading, ClassroomTransition } from './Transitions';
import { playSound } from '../utils/audio';

// Assets from public/assets/
// complexouern.png = UERN NATAL (mural), centroconvivencia.png = COMPLEXO (quiz)
const imgUernNatal = 'assets/complexouern.png';
const imgComplexo = 'assets/centroconvivencia.png';
const imgSecretaria = 'assets/secretaria.png';
const imgGato = 'assets/gato.png';
const imgArvore = 'assets/arvore.png';
const imgSol = 'assets/sol.png';
const imgLua = 'assets/lua.png';
const imgNuvemDia = 'assets/nuvem_dia.png';
const imgNuvemNoite = 'assets/nuvem_noite.png';

// --- Night Stars ---
const NightStars: React.FC = () => {
  const stars = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 45,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 1.5,
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// --- Sky ---
const CLOUD_SIZES = [1.0, 1.4, 0.9, 1.6, 1.2, 1.3];

const Sky: React.FC<{ isDay: boolean }> = ({ isDay }) => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Sky gradient */}
    <div className={`absolute inset-0 transition-all duration-[3000ms] ${isDay
      ? 'bg-gradient-to-b from-[#0066cc] via-[#3399ff] via-60% to-[#99ccff]'
      : 'bg-gradient-to-b from-[#000510] via-[#061428] via-60% to-[#152238]'
      }`} />

    <motion.div
      animate={{ y: [20, -10, 20], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[15%] top-[8%] w-20 h-20 md:w-28 md:h-28"
    >
      <img src={isDay ? imgSol : imgLua} alt="" className="w-full h-full object-contain pixel-art" />
    </motion.div>

    {CLOUD_SIZES.map((scale, i) => (
      <motion.div
        key={i}
        initial={{ x: -300 * scale }}
        animate={{ x: "110vw" }}
        transition={{ duration: 50 + (i * 16), repeat: Infinity, delay: i * 9, ease: "linear" }}
        style={{
          top: `${5 + (i * 7)}%`,
          width: `${scale * 14}rem`,
          height: `${scale * 8}rem`,
        }}
        className="absolute"
      >
        <img src={isDay ? imgNuvemDia : imgNuvemNoite} alt="" className="w-full h-full object-contain pixel-art" />
      </motion.div>
    ))}
  </div>
);

// --- Tree with gentle sway ---
const Tree: React.FC<{ x: number; y: number; delay: number; size?: number }> = ({ x, y, delay, size = 1 }) => (
  <motion.div
    className="absolute z-30 pointer-events-none select-none origin-bottom"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -100%)',
      width: `${size * 7}rem`,
      height: `${size * 8}rem`,
    }}
    animate={{ rotate: [-0.8, 1.2, -0.5, 0.8, -0.8] }}
    transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <img src={imgArvore} alt="" className="w-full h-full object-contain pixel-art" />
  </motion.div>
);

// --- Campus Cat (kept as-is per user request) ---
const CampusCat: React.FC = () => {
  const { unlock } = useAchievements();
  const [clicks, setClicks] = useState(0);
  const [pos, setPos] = useState({ x: 40, y: 72 });
  const [bubble, setBubble] = useState<string | null>(null);

  const catQuotes = [
    "Miau. O TCC já está pronto?",
    "O reitor me deve um sachê.",
    "Miau? Ah, é só um bug no seu código.",
    "O campus é meu, vocês só visitam.",
    "Salgado não é comida, tá?"
  ];

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPos({ x: Math.random() * 50 + 25, y: Math.random() * 20 + 60 });
    }, 15000);
    return () => clearInterval(moveInterval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newClicks = clicks + 1;
    setClicks(newClicks);
    setBubble(catQuotes[Math.floor(Math.random() * catQuotes.length)]);
    // Random meow sound
    const meowIdx = Math.floor(Math.random() * 3) + 1;
    playSound(`/sounds/meow${meowIdx}.mp3`);
    if (newClicks === 7) unlock('cat_lover');
    setTimeout(() => setBubble(null), 3500);
  };

  return (
    <>
      {/* Cat bubble — rendered outside cat container for z-index to work */}
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-[200] whitespace-nowrap bg-white text-black text-[9px] font-pixel p-3 border-4 border-black rounded shadow-[6px_6px_0_rgba(0,0,0,0.2)] pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-black"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, calc(-100% - 40px))' }}
          >
            {bubble}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Cat image */}
      <motion.div
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ duration: 12, ease: "easeInOut" }}
        onClick={handleClick}
        className="absolute z-[5] cursor-pointer w-16 h-16 md:w-20 md:h-20 flex items-center justify-center select-none group"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full group-hover:scale-110 transition-transform">
          <img src={imgGato} alt="Gato do Campus" className="w-full h-full object-contain pixel-art" />
        </div>
      </motion.div>
    </>
  );
};

// --- Map Building ---
const MapBuilding: React.FC<{
  id: string;
  imgSrc: string;
  label: string;
  x: number;
  y: number;
  onClick: (isLocked: boolean) => void;
  isLocked?: boolean;
  isCurrentObjective?: boolean;
  buildingSize?: string;
}> = ({ id, imgSrc, label, x, y, onClick, isLocked = false, isCurrentObjective = false, buildingSize = 'w-52 h-52 md:w-72 md:h-72' }) => (
  <div
    className="absolute flex flex-col items-center z-20 cursor-pointer group"
    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    onClick={(e) => { e.stopPropagation(); onClick(isLocked); }}
  >
    {/* Bouncing arrow indicator for current objective */}
    {isCurrentObjective && !isLocked && (
      <motion.div
        className="absolute -top-4 z-50"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={24} className="text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
      </motion.div>
    )}

    <div className={`${buildingSize} relative flex items-center justify-center transition-all duration-500 ${isLocked ? 'grayscale-[70%]' : ''}`}>
      <img src={imgSrc} alt={label} className="w-full h-full object-contain pixel-art" />
    </div>
    {/* Label */}
    <div className={`mt-0 text-[8px] px-2 py-1 font-pixel border-2 uppercase whitespace-nowrap shadow-[3px_3px_0_rgba(0,0,0,0.3)] transition-all
      ${isLocked
        ? 'bg-gray-800 text-gray-500 border-gray-600 opacity-0 group-hover:opacity-100'
        : isCurrentObjective
          ? 'bg-yellow-400 text-black border-yellow-600'
          : 'bg-black text-white border-white opacity-0 group-hover:opacity-100'
      }`}
    >
      {isLocked ? `🔒 ${label}` : isCurrentObjective ? `📍 ${label}` : label}
    </div>
  </div>
);

// --- Stage config ---
const STAGES = [
  { label: "Mural", icon: BookOpen, desc: "Visite o campus para ver seu mural" },
  { label: "Quiz", icon: Trophy, desc: "Teste seus conhecimentos acerca do seu aluno" },
  { label: "Diploma", icon: GraduationCap, desc: "Receba seu diploma de despedida" },
];

// --- Main Component ---
const Hub: React.FC = () => {
  const { selectedProfessor, gameStage } = useUser();
  const navigate = useNavigate();
  const [transitioningTo, setTransitioningTo] = useState<'mural' | 'quiz' | null>(null);
  const [dialogue, setDialogue] = useState<{ open: boolean; text: string; targetRoute?: string; title?: string; type?: 'locked' | 'normal' } | null>(null);
  const [typedText, setTypedText] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const treePositions = useMemo(() => [
    { x: 8, y: 55, d: 0, s: 1.0 },
    { x: 92, y: 58, d: 1.2, s: 0.85 },
    { x: 15, y: 82, d: 0.5, s: 1.1 },
    { x: 85, y: 80, d: 2, s: 0.9 },
    { x: 50, y: 85, d: 0.8, s: 1.05 },
    { x: 70, y: 56, d: 1.5, s: 0.8 },
    { x: 35, y: 55, d: 0.3, s: 0.95 },
    { x: 60, y: 83, d: 1.8, s: 1.15 },
    { x: 5, y: 68, d: 0.7, s: 0.9 },
    { x: 95, y: 72, d: 2.2, s: 1.0 },
  ], []);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const isDay = currentTime.getHours() >= 6 && currentTime.getHours() < 18;

  // Ambient hub sound on mount
  useEffect(() => {
    const src = isDay ? '/sounds/hub-day.mp3' : '/sounds/hub-night.mp3';
    const audio = playSound(src);
    return () => { if (audio) { audio.pause(); audio.currentTime = 0; } };
  }, []);

  useEffect(() => {
    if (dialogue?.open && typedText.length < dialogue.text.length) {
      const timeout = setTimeout(() => {
        setTypedText(dialogue.text.slice(0, typedText.length + 1));
        playSound('/sounds/dot.mp3');
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [dialogue, typedText]);

  const handleBuildingClick = (id: string, isLocked: boolean) => {
    if (isLocked) {
      setDialogue({ open: true, text: "ERRO DE PROTOCOLO: Este setor está sob manutenção acadêmica preventiva. Continue seu progresso para liberar o acesso.", title: "SISTEMA UERN", type: 'locked' });
    } else {
      if (id === 'mural') setDialogue({ open: true, text: "Bem-vindo à UERN NATAL. Os registros da sua jornada estão armazenados aqui.", targetRoute: "/mural", title: "UERN CAMPUS NATAL" });
      if (id === 'quiz') setDialogue({ open: true, text: "O COMPLEXO está pronto para a sua avaliação final de sanidade. Pronto para os testes?", targetRoute: "/quiz", title: "O COMPLEXO" });
      if (id === 'certificado') setDialogue({ open: true, text: "A SECRETARIA finalizou o processamento do seu diploma. A imortalidade o aguarda.", targetRoute: "/certificado", title: "SECRETARIA" });
    }
    setTypedText('');
  };

  const dismissDialogue = () => {
    setDialogue(null);
    setTypedText('');
  };

  const closeDialogue = () => {
    if (dialogue?.targetRoute) {
      if (dialogue.targetRoute === '/mural') setTransitioningTo('mural');
      else if (dialogue.targetRoute === '/quiz') setTransitioningTo('quiz');
      else navigate(dialogue.targetRoute);
    }
    setDialogue(null);
    setTypedText('');
  };

  const currentObj = gameStage === 0 ? 'mural' : gameStage === 1 ? 'quiz' : gameStage === 2 ? 'certificado' : null;

  return (
    <div className={`h-screen w-full relative overflow-hidden font-pixel transition-all duration-[3000ms] ease-in-out`}>
      {transitioningTo === 'mural' && <MuralLoading onComplete={() => navigate('/mural')} />}
      {transitioningTo === 'quiz' && <ClassroomTransition onComplete={() => navigate('/quiz')} />}

      {/* Night overlay */}
      <div className={`absolute inset-0 pointer-events-none z-[40] transition-opacity duration-[3000ms] ${isDay ? 'opacity-0' : 'opacity-20 bg-blue-950/20'}`} />

      {/* Stars at night */}
      {!isDay && <NightStars />}

      <Sky isDay={isDay} />

      {/* Ground */}
      <div className={`absolute bottom-0 left-0 right-0 h-1/2 z-0 transition-colors duration-[3000ms]`}>
        <div className={`absolute inset-0 transition-all duration-[3000ms] ${isDay
          ? 'bg-gradient-to-b from-[#4ca64c] via-[#56b356] via-40% to-[#3d8c3d]'
          : 'bg-gradient-to-b from-[#1a3a1a] via-[#1a331a] via-40% to-[#122812]'
          }`} />
        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]" />
      </div>

      {/* Trees — in front of buildings */}
      {treePositions.map((p, i) => (
        <Tree key={i} x={p.x} y={p.y} delay={p.d} size={p.s} />
      ))}

      <CampusCat />

      {/* Buildings */}
      <MapBuilding
        id="mural" imgSrc={imgUernNatal} label="UERN NATAL"
        x={22} y={55}
        onClick={(locked) => handleBuildingClick('mural', locked)}
        isCurrentObjective={currentObj === 'mural'}
        buildingSize="w-60 h-60 md:w-80 md:h-80"
      />
      <MapBuilding
        id="quiz" imgSrc={imgComplexo} label="COMPLEXO"
        x={78} y={58}
        isLocked={gameStage < 1}
        onClick={(locked) => handleBuildingClick('quiz', locked)}
        isCurrentObjective={currentObj === 'quiz'}
      />
      <MapBuilding
        id="certificado" imgSrc={imgSecretaria} label="SECRETARIA"
        x={50} y={72}
        isLocked={gameStage < 2}
        onClick={(locked) => handleBuildingClick('certificado', locked)}
        isCurrentObjective={currentObj === 'certificado'}
        buildingSize="w-44 h-44 md:w-60 md:h-60"
      />

      {/* ===== HUD — compact top bar ===== */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-start pointer-events-none gap-3">
        {/* Left: Professor + time */}
        <div className="bg-black/80 backdrop-blur-sm px-3 py-2 border-2 border-white/20 shadow-[4px_4px_0_rgba(0,0,0,0.4)] pointer-events-auto flex items-center gap-3">
          <div className={`p-1.5 border border-white/20 rounded-sm ${isDay ? 'bg-blue-600' : 'bg-indigo-700'}`}>
            {isDay ? <Sun size={16} /> : <Moon size={16} />}
          </div>
          <div className="text-white">
            <h2 className="text-[10px] font-black uppercase tracking-wider leading-none">{selectedProfessor?.nickname}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[9px] text-yellow-400 font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-[7px] text-white/30 uppercase">{isDay ? 'Dia' : 'Noite'}</span>
            </div>
          </div>
        </div>

        {/* Right: Mission progress */}
        <div className="bg-black/80 backdrop-blur-sm px-3 py-2 border-2 border-white/20 shadow-[4px_4px_0_rgba(0,0,0,0.4)] pointer-events-auto">
          <div className="flex items-center gap-2 text-white">
            {/* Stage dots */}
            {STAGES.map((stage, i) => {
              const StageIcon = stage.icon;
              const done = i < gameStage;
              const active = i === gameStage;
              return (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-1 px-1.5 py-1 rounded-sm text-[7px] font-bold uppercase ${done ? 'bg-emerald-600/40 text-emerald-400 border border-emerald-500/30'
                    : active ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-white/5 text-white/20 border border-white/10'
                    }`}>
                    <StageIcon size={10} />
                    <span className="hidden md:inline">{stage.label}</span>
                  </div>
                  {i < 2 && <div className={`w-2 h-[2px] ${done ? 'bg-emerald-500/50' : 'bg-white/10'}`} />}
                </React.Fragment>
              );
            })}
          </div>
          {/* Current objective */}
          {gameStage < 3 && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <MapPin size={10} className="text-yellow-400 shrink-0" />
              <p className="text-[8px] text-yellow-400 font-bold uppercase tracking-tight">{STAGES[gameStage].desc}</p>
            </div>
          )}
          {gameStage >= 3 && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <Star size={10} className="text-emerald-400" />
              <p className="text-[8px] text-emerald-400 font-bold uppercase">Completo!</p>
            </div>
          )}
        </div>
      </div>

      {/* ===== Dialogue ===== */}
      <AnimatePresence>
        {dialogue?.open && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-8 bg-black/50 backdrop-blur-md" onClick={dismissDialogue}>
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="w-full max-w-4xl bg-black border-[6px] border-white p-8 relative shadow-[16px_16px_0_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-7 left-8 bg-white text-black px-5 py-1.5 font-black uppercase text-sm border-4 border-black">
                {dialogue.title || "TERMINAL ACADÊMICO"}
              </div>
              <button onClick={dismissDialogue} className="absolute top-3 right-3 text-white/30 hover:text-white"><X size={28} /></button>

              <div className={`text-sm md:text-base leading-relaxed min-h-[60px] flex items-center ${dialogue.type === 'locked' ? 'text-red-500' : 'text-white'}`}>
                {typedText}<span className="inline-block w-3 h-5 bg-white ml-2 animate-pulse" />
              </div>

              {typedText === dialogue.text && dialogue.targetRoute && (
                <div className="mt-8 flex justify-end">
                  <button onClick={closeDialogue} className="flex items-center gap-3 text-yellow-400 animate-bounce text-[10px] uppercase font-black tracking-widest">
                    [ Avançar ] <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hub;
