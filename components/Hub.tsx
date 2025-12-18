
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Sun, Moon, Lock, ArrowRight, X
} from 'lucide-react';
import { playKeyClick, playMeow, playBiosBeep } from '../utils/audio';
import { MuralLoading, ClassroomTransition } from './Transitions';

const ASSETS = {
  uern_natal: "assets/uern_natal.png",
  complexo: "assets/complexo.png",
  secretaria: "assets/secretaria.png",
  gato: "assets/gato.png",
  arvore: "assets/arvore.png",
  sol: "assets/sol.png",
  lua: "assets/lua.png",
  nuvem_dia: "assets/nuvem_dia.png",
  nuvem_noite: "assets/nuvem_noite.png"
};

const Sky: React.FC<{ isDay: boolean }> = ({ isDay }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        animate={{ 
            y: [20, -10, 20],
            rotate: [0, 5, -5, 0] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[15%] top-[10%] w-24 h-24 md:w-32 md:h-32"
      >
        <img src={isDay ? ASSETS.sol : ASSETS.lua} alt={isDay ? "Sol" : "Lua"} className="w-full h-full object-contain pixel-art" />
      </motion.div>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -300 }}
          animate={{ x: "110vw" }}
          transition={{ 
            duration: 50 + (i * 15), 
            repeat: Infinity, 
            delay: i * 8, 
            ease: "linear" 
          }}
          style={{ top: `${8 + (i * 14)}%` }}
          className="absolute w-32 h-20 md:w-56 md:h-32"
        >
          <img src={isDay ? ASSETS.nuvem_dia : ASSETS.nuvem_noite} alt="Nuvem" className="w-full h-full object-contain pixel-art" />
        </motion.div>
      ))}
    </div>
  );
};

const Tree: React.FC<{ x: number, y: number }> = ({ x, y }) => (
  <div 
    className="absolute z-10 w-24 h-28 pointer-events-none select-none"
    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -100%)' }}
  >
    <img src={ASSETS.arvore} alt="Árvore" className="w-full h-full object-contain pixel-art" />
  </div>
);

const CampusCat: React.FC = () => {
    const { unlockAchievement, selectedProfessor } = useUser();
    const [clicks, setClicks] = useState(0);
    const [pos, setPos] = useState({ x: 30, y: 80 });
    const [bubble, setBubble] = useState<string | null>(null);

    const catQuotes = [
      "Miau. O TCC está pronto?",
      "O reitor me deve um sachê.",
      "Prrru? Ah, é só um bug no seu código.",
      "O campus é meu, vocês só visitam.",
      "A pauta está aberta, mas minha fome também."
    ];

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setPos({ x: Math.random() * 70 + 15, y: Math.random() * 40 + 45 });
        }, 15000);
        return () => clearInterval(moveInterval);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        playMeow();
        const newClicks = clicks + 1;
        setClicks(newClicks);
        setBubble(catQuotes[Math.floor(Math.random() * catQuotes.length)]);
        setTimeout(() => setBubble(null), 3500);
        if (newClicks === 7) unlockAchievement('campus_cat', selectedProfessor || undefined);
    };

    return (
        <motion.div 
            animate={{ left: `${pos.x}%`, top: `${pos.y}%` }} 
            transition={{ duration: 12, ease: "easeInOut" }} 
            onClick={handleClick} 
            className="absolute z-30 cursor-pointer w-24 h-24 flex items-center justify-center select-none group"
            style={{ transform: 'translate(-50%, -50%)' }}
        >
            <AnimatePresence>
              {bubble && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 0 }} 
                    animate={{ opacity: 1, scale: 1, y: -70 }} 
                    exit={{ opacity: 0 }} 
                    className="absolute whitespace-nowrap bg-white text-black text-[9px] font-pixel p-3 border-4 border-black rounded shadow-[6px_6px_0_rgba(0,0,0,0.2)] z-50 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-black"
                >
                  {bubble}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-full h-full group-hover:scale-110 transition-transform">
                <img src={ASSETS.gato} alt="Gato do Campus" className="w-full h-full object-contain pixel-art" />
            </div>
        </motion.div>
    );
};

const MapBuilding: React.FC<{id: string, label: string, x: number, y: number, onClick: (isLocked: boolean) => void, isLocked?: boolean}> = ({ id, label, x, y, onClick, isLocked = false }) => {
  const assetUrl = id === 'mural' ? ASSETS.uern_natal : id === 'quiz' ? ASSETS.complexo : ASSETS.secretaria;

  return (
    <motion.div 
        className="absolute flex flex-col items-center z-20 cursor-pointer group" 
        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }} 
        whileHover={{ scale: 1.05, y: -15 }} 
        onClick={(e) => { e.stopPropagation(); onClick(isLocked); }}
    >
      <div className="w-56 h-56 md:w-80 md:h-80 relative flex items-center justify-center transition-all">
         <img src={assetUrl} alt={label} className="w-full h-full object-contain pixel-art" />
         {isLocked && (
            <div className="absolute top-0 right-0 bg-white border-4 border-black p-2">
                <Lock size={24} className="text-black" />
            </div>
         )}
      </div>
      <div className="mt-2 bg-black text-white text-[9px] px-3 py-2 font-pixel border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity uppercase whitespace-nowrap shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
        {label}
      </div>
    </motion.div>
  );
};

const Hub: React.FC = () => {
  const { selectedProfessor, gameStage } = useUser();
  const navigate = useNavigate();
  const [transitioningTo, setTransitioningTo] = useState<'mural' | 'quiz' | null>(null);
  const [dialogue, setDialogue] = useState<{ open: boolean, text: string, targetRoute?: string, title?: string, type?: 'locked' | 'normal' } | null>(null);
  const [typedText, setTypedText] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const treePositions = useMemo(() => [
    { x: 10, y: 20 }, { x: 85, y: 15 }, { x: 45, y: 10 }, 
    { x: 15, y: 85 }, { x: 82, y: 90 }, { x: 55, y: 95 },
    { x: 35, y: 35 }, { x: 65, y: 30 }, { x: 5, y: 55 },
    { x: 92, y: 60 }, { x: 48, y: 28 }, { x: 22, y: 12 }
  ], []);
  
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const isDay = currentTime.getHours() >= 6 && currentTime.getHours() < 18;

  useEffect(() => {
    if (dialogue?.open && typedText.length < dialogue.text.length) {
      const timeout = setTimeout(() => {
        setTypedText(dialogue.text.slice(0, typedText.length + 1));
        if (typedText.length % 3 === 0) playKeyClick(); 
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [dialogue, typedText]);

  const handleBuildingClick = (id: string, isLocked: boolean) => {
    if (isLocked) {
      setDialogue({ 
        open: true, 
        text: "ERRO DE PROTOCOLO: Este setor está sob manutenção acadêmica preventiva. Continue seu progresso para liberar o acesso.", 
        title: "SISTEMA UERN", 
        type: 'locked' 
      });
    } else {
      if (id === 'mural') setDialogue({ open: true, text: "Bem-vindo à UERN NATAL. Os registros da sua jornada estão armazenados aqui.", targetRoute: "/mural", title: "UERN CAMPUS NATAL" });
      if (id === 'quiz') setDialogue({ open: true, text: "O COMPLEXO está pronto para a sua avaliação final de sanidade. Pronto para os testes?", targetRoute: "/quiz", title: "O COMPLEXO" });
      if (id === 'certificado') setDialogue({ open: true, text: "A SECRETARIA finalizou o processamento do seu diploma. A imortalidade o aguarda.", targetRoute: "/certificado", title: "SECRETARIA" });
    }
    setTypedText('');
  };

  const closeDialogue = () => {
      if (dialogue?.targetRoute) {
          playBiosBeep();
          if (dialogue.targetRoute === '/mural') setTransitioningTo('mural');
          else if (dialogue.targetRoute === '/quiz') setTransitioningTo('quiz');
          else navigate(dialogue.targetRoute);
      }
      setDialogue(null);
      setTypedText('');
  };

  return (
    <div className={`h-screen w-full relative overflow-hidden font-pixel transition-all duration-[3000ms] ease-in-out ${
      isDay ? 'bg-[#4da6ff]' : 'bg-[#001a33]'
    }`}>
      {transitioningTo === 'mural' && <MuralLoading onComplete={() => navigate('/mural')} />}
      {transitioningTo === 'quiz' && <ClassroomTransition onComplete={() => navigate('/quiz')} />}

      <div className={`absolute inset-0 pointer-events-none z-[40] transition-opacity duration-[3000ms] ${
        isDay ? 'opacity-0' : 'opacity-30 bg-blue-950/10'
      }`}></div>

      <Sky isDay={isDay} />
      
      <div className={`absolute bottom-0 left-0 right-0 h-1/2 z-0 transition-colors duration-[3000ms] ${
        isDay ? 'bg-[#56b356]' : 'bg-[#1a331a]'
      }`}>
        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]"></div>
      </div>

      {treePositions.map((p, i) => (
        <Tree key={i} x={p.x} y={p.y} />
      ))}

      <CampusCat />

      <MapBuilding 
        id="mural" 
        label="UERN NATAL" 
        x={22} y={50} 
        onClick={(locked) => handleBuildingClick('mural', locked)} 
      />
      <MapBuilding 
        id="quiz" 
        label="COMPLEXO" 
        x={78} y={45} 
        isLocked={gameStage < 1}
        onClick={(locked) => handleBuildingClick('quiz', locked)} 
      />
      <MapBuilding 
        id="certificado" 
        label="SECRETARIA" 
        x={50} y={75} 
        isLocked={gameStage < 2}
        onClick={(locked) => handleBuildingClick('certificado', locked)} 
      />

      <div className="absolute top-8 left-8 right-8 z-50 flex justify-between items-start pointer-events-none">
        <div className="bg-black p-5 border-4 border-white shadow-[10px_10px_0_rgba(0,0,0,0.5)] pointer-events-auto">
          <div className="flex items-center gap-4 text-white">
            <div className="p-2 bg-blue-700 border-2 border-white rounded-sm">
                <Clock size={24} />
            </div>
            <div>
              <p className="text-[8px] opacity-60 uppercase tracking-tighter">Identificação Docente</p>
              <h2 className="text-xs font-black uppercase tracking-widest leading-none mt-1">{selectedProfessor?.nickname}</h2>
              <div className="flex items-center gap-2 mt-2">
                 <span className="text-[10px] text-yellow-400 font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                 <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                 <span className="text-[8px] text-white/40 uppercase">{isDay ? 'Ciclo Diurno' : 'Ciclo Noturno'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black p-5 border-4 border-white shadow-[10px_10px_0_rgba(0,0,0,0.5)] text-white text-right pointer-events-auto min-w-[200px]">
           <p className="text-[8px] opacity-40 uppercase mb-2">Protocolo Atual:</p>
           <h3 className="text-[10px] font-black uppercase tracking-tighter text-cyan-400">
             {gameStage === 0 ? "Acessar UERN NATAL" : 
              gameStage === 1 ? "Entrar no COMPLEXO" : 
              gameStage === 2 ? "Protocolo SECRETARIA" : "Status: Graduado(a)"}
           </h3>
           <div className="mt-2 h-1 bg-white/10 w-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(gameStage / 3) * 100}%` }} 
                    className="h-full bg-cyan-400" 
                />
           </div>
        </div>
      </div>

      <AnimatePresence>
        {dialogue?.open && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-10 bg-black/50 backdrop-blur-md" onClick={closeDialogue}>
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="w-full max-w-5xl bg-black border-[8px] border-white p-10 relative shadow-[20px_20px_0_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-8 left-10 bg-white text-black px-6 py-2 font-black uppercase text-xs border-4 border-black">
                {dialogue.title || "TERMINAL ACADÊMICO"}
              </div>
              <button onClick={closeDialogue} className="absolute top-4 right-4 text-white/30 hover:text-white"><X size={32}/></button>
              
              <div className={`text-xl md:text-3xl leading-relaxed min-h-[100px] flex items-center ${dialogue.type === 'locked' ? 'text-red-500' : 'text-white'}`}>
                {typedText}<span className="inline-block w-4 h-8 bg-white ml-3 animate-pulse"></span>
              </div>

              {typedText === dialogue.text && (
                <div className="mt-10 flex justify-end">
                   <button onClick={closeDialogue} className="flex items-center gap-4 text-yellow-400 animate-bounce text-xs uppercase font-black tracking-widest">
                      [ Pressione para Avançar ] <ArrowRight size={24} />
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
