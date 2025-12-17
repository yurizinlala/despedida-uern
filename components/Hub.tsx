
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Coffee, GraduationCap, Ghost, Lock, Clock, Compass, AlertCircle, Trophy, Sparkles, CloudRain, Sun, Moon, Wind
} from 'lucide-react';
import { playKeyClick, playTone, playMeow, playBiosBeep } from '../utils/audio';

const CampusCat: React.FC = () => {
    const { unlockAchievement, selectedProfessor } = useUser();
    const [clicks, setClicks] = useState(0);
    const [pos, setPos] = useState({ x: 25, y: 15 });
    const [bubble, setBubble] = useState<string | null>(null);

    const catQuotes = [
      "Miau. O TCC está pronto?",
      "Prefiro sachê a café.",
      "Cuidado com o ponteiro nulo.",
      "Dormir 18h por dia é o ideal.",
      "Prrru? Ah, é só um bug.",
      "O reitor me deve um peixe."
    ];

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setPos({ x: Math.random() * 70 + 15, y: Math.random() * 60 + 15 });
        }, 8000);
        return () => clearInterval(moveInterval);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        playMeow();
        const newClicks = clicks + 1;
        setClicks(newClicks);
        setBubble(catQuotes[Math.floor(Math.random() * catQuotes.length)]);
        setTimeout(() => setBubble(null), 2500);
        if (newClicks === 7) unlockAchievement('campus_cat', selectedProfessor || undefined);
    };

    return (
        <motion.div animate={{ left: `${pos.x}%`, top: `${pos.y}%` }} transition={{ duration: 6, ease: "linear" }} onClick={handleClick} className="absolute z-20 cursor-pointer w-12 h-12 flex items-center justify-center text-4xl filter drop-shadow-lg select-none hover:scale-125 transition-transform group">
            <AnimatePresence>
              {bubble && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.5 }} animate={{ opacity: 1, y: -50, scale: 1 }} exit={{ opacity: 0, y: -60, scale: 0.8 }} className="absolute whitespace-nowrap bg-white text-black text-[8px] font-pixel p-2 border-2 border-black rounded-lg shadow-xl z-[100]">
                  {bubble}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-black"></div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.span animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>🐈</motion.span>
        </motion.div>
    );
};

const PixelCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-[#e0e0e0] border-t-4 border-l-4 border-white border-b-4 border-r-4 border-gray-600 shadow-lg relative ${className}`}>
    <div className="p-2 h-full w-full font-pixel text-black">{children}</div>
  </div>
);

const MapBuilding: React.FC<{type: any, label: string, x: number, y: number, onClick: (isLocked: boolean) => void, isLocked?: boolean}> = ({ type, label, x, y, onClick, isLocked = false }) => {
  const style = useMemo(() => {
    switch(type) {
      case 'dept': return { bg: 'bg-blue-600', border: 'border-blue-900', icon: <Brain size={32} className="text-white" /> };
      case 'tavern': return { bg: 'bg-orange-600', border: 'border-orange-900', icon: <Coffee size={32} className="text-white" /> };
      case 'castle': return { bg: 'bg-yellow-500', border: 'border-yellow-800', icon: <GraduationCap size={32} className="text-white" /> };
      case 'grave': return { bg: 'bg-gray-600', border: 'border-gray-800', icon: <Ghost size={32} className="text-white" /> };
      default: return { bg: 'bg-gray-400', border: 'border-gray-500', icon: null };
    }
  }, [type]);

  return (
    <motion.div className={`absolute flex flex-col items-center z-10 cursor-pointer group`} style={{ left: `${x}%`, top: `${y}%` }} whileHover={{ scale: 1.1, y: -5 }} onClick={(e) => { e.stopPropagation(); onClick(isLocked); }}>
      <div className={`w-20 h-20 md:w-24 md:h-24 ${style.bg} border-b-8 ${style.border} relative shadow-2xl flex items-center justify-center transition-all ${isLocked ? 'grayscale opacity-70' : ''}`}>
         {isLocked && <div className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center"><Lock size={24} className="text-white/80 animate-pulse" /></div>}
         <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[24px] border-b-black opacity-30 scale-110"></div>
         <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[24px] ${style.border}`}></div>
         <div className="relative z-10 drop-shadow-md pixel-art">{style.icon}</div>
      </div>
      <div className={`mt-2 bg-black text-white text-[8px] md:text-[9px] px-2 py-1 font-pixel border border-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg uppercase`}>{isLocked ? `Locked: ${label}` : label}</div>
    </motion.div>
  );
};

const Hub: React.FC = () => {
  const { selectedProfessor, gameStage } = useUser();
  const navigate = useNavigate();
  const [dialogue, setDialogue] = useState<{ open: boolean, text: string, targetRoute?: string, title?: string, type?: 'locked' | 'normal' } | null>(null);
  const [typedText, setTypedText] = useState('');
  const [sysTime, setSysTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  
  useEffect(() => {
    const t = setInterval(() => setSysTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (dialogue?.open && typedText.length < dialogue.text.length) {
      const timeout = setTimeout(() => {
        setTypedText(dialogue.text.slice(0, typedText.length + 1));
        if (typedText.length % 3 === 0) playKeyClick(); 
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [dialogue, typedText]);

  const handleBuildingClick = (id: string, isLocked: boolean) => {
    if (isLocked) {
      let reason = "Você ainda não possui as permissões necessárias.";
      if (id === 'quiz') reason = "Pré-requisito: Você deve primeiro acessar seu GABINETE e processar os recados dos alunos.";
      if (id === 'cert') reason = "Pré-requisito: A Secretaria exige que você sobreviva ao EXAME FINAL na Sala 304 antes da formatura.";
      setDialogue({ open: true, text: `ACESSO NEGADO: ${reason}`, title: "ERRO DE SEGURANÇA", type: 'locked' });
    } else {
      if (id === 'mural') setDialogue({ open: true, text: "O terminal de mensagens está piscando. Muitos alunos deixaram feedbacks sobre o semestre. Deseja processar os dados agora?", targetRoute: "/mural", title: "GABINETE DO DOCENTE" });
      if (id === 'quiz') setDialogue({ open: true, text: "Os alunos estão em silêncio absoluto. O cheiro de café e nervosismo paira no ar. Iniciar a correção do Exame Final?", targetRoute: "/quiz", title: "SALA 304" });
      if (id === 'cert') setDialogue({ open: true, text: "A burocracia final te aguarda. Todas as pautas foram fechadas. Pronto para emitir o Diploma de Sobrevivência Acadêmica?", targetRoute: "/certificado", title: "SECRETARIA GERAL" });
    }
    setTypedText('');
  };

  if (!selectedProfessor) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-screen w-full bg-[#3ea042] overflow-hidden relative font-pixel pointer-events-auto select-none">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2f7a32_12%,transparent_13%)] bg-[size:32px_32px]"></div>
      
      {/* Roads */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-28 bg-[#d8c59a] border-y-8 border-[#bca87b] shadow-inner"></div>
      <div className="absolute top-0 bottom-0 left-[25%] w-28 bg-[#d8c59a] border-x-8 border-[#bca87b] shadow-inner"></div>

      <CampusCat />

      {/* Interface Overlay */}
      <div className="absolute top-4 left-4 z-50 flex flex-col gap-3">
        <PixelCard className="w-64 !bg-[#000080] !border-white text-white shadow-2xl">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 bg-white border-2 border-gray-400 p-1 shrink-0 shadow-md pixel-art"><img src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${selectedProfessor.nickname}`} alt="Avatar" className="w-full h-full" /></div>
            <div className="flex-1 space-y-1 min-w-0">
              <div className="text-[9px] text-yellow-300 uppercase truncate font-bold">{selectedProfessor.nickname}</div>
              <div className="text-[7px] text-blue-200 flex justify-between uppercase"><span>LVL 99</span><span>{selectedProfessor.theme}</span></div>
              <div className="flex items-center gap-1"><span className="text-[6px] text-red-500 font-bold">SAN</span><div className="flex-1 h-1.5 bg-black border border-white/20"><motion.div animate={{ width: ['15%', '18%', '15%'] }} transition={{ repeat: Infinity, duration: 2 }} className="h-full bg-red-600 shadow-[0_0_5px_red]"></motion.div></div></div>
              <div className="flex items-center gap-1"><span className="text-[6px] text-green-500 font-bold">CUR</span><div className="flex-1 h-1.5 bg-black border border-white/20"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(1, (gameStage / 3)) * 100}%` }} className="h-full bg-green-500 shadow-[0_0_5px_green]"></motion.div></div></div>
            </div>
          </div>
        </PixelCard>
        
        <PixelCard className="w-64 !bg-gray-800/90 !border-gray-500 text-white !p-3">
            <div className="flex justify-between items-center text-[8px] font-bold">
                <div className="flex items-center gap-2 text-cyan-400"><Clock size={12}/> {sysTime}</div>
                <div className="flex items-center gap-2 text-orange-400"><Sun size={12}/> 32°C</div>
            </div>
            <div className="mt-2 text-[7px] text-gray-400 uppercase leading-tight border-t border-white/10 pt-2 italic">Clima: Tensão de Final de Período com rajadas de desespero.</div>
        </PixelCard>
      </div>

      <div className="absolute top-4 right-4 z-40 w-72">
          <div className="bg-yellow-400 border-4 border-black p-3 shadow-2xl">
              <div className="flex items-center gap-3 font-bold text-[9px] mb-2 border-b-2 border-black/10 pb-1">
                <AlertCircle size={14} className="animate-bounce" /> MISSÃO ATUAL
              </div>
              <div className="text-[8px] leading-relaxed uppercase">
                {gameStage === 0 && (
                    <><span className="text-blue-900 font-black">LOG:</span> Acesse o Gabinete e processe os feedbacks pendentes dos seus alunos.</>
                )}
                {gameStage === 1 && (
                    <><span className="text-blue-900 font-black">LOG:</span> Dirija-se à Sala 304. O Exame Final aguarda correção manual.</>
                )}
                {gameStage === 2 && (
                    <><span className="text-blue-900 font-black">LOG:</span> Vá até a Secretaria Geral para formalizar sua imortalidade acadêmica.</>
                )}
                {gameStage >= 3 && (
                    <><span className="text-green-700 font-black">COMPLETE:</span> Parabéns! Clique no ícone de Sparkles para finalizar a experiência.</>
                )}
              </div>
          </div>
      </div>

      {gameStage >= 3 && (
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate('/credits')} className="absolute bottom-10 right-10 z-[60] bg-white border-4 border-black p-5 font-pixel text-xs flex items-center gap-3 shadow-[8px_8px_0_rgba(0,0,0,0.5)]"><Sparkles className="animate-pulse text-yellow-500" /> FINALIZAR JORNADA</motion.button>
      )}

      <MapBuilding type="dept" label="GABINETE" x={20} y={30} onClick={(L) => handleBuildingClick('mural', L)} />
      <MapBuilding type="tavern" label="SALA 304" x={65} y={30} isLocked={gameStage < 1} onClick={(L) => handleBuildingClick('quiz', L)} />
      <MapBuilding type="castle" label="SECRETARIA" x={65} y={65} isLocked={gameStage < 2} onClick={(L) => handleBuildingClick('cert', L)} />
      <MapBuilding type="grave" label="LAB. ANTIGO" x={15} y={70} onClick={() => { setDialogue({ open: true, text: "Aqui jazem os computadores com Windows 95 que ainda rodam o kernel original do curso. R.I.P.", title: "CEMITÉRIO DE HARDWARE" }); setTypedText(''); }} />

      <AnimatePresence>
        {dialogue?.open && (
          <motion.div initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} className="fixed bottom-0 left-0 right-0 p-8 z-[100] flex justify-center pointer-events-none">
            <div className={`pointer-events-auto w-full max-w-4xl border-[4px] border-white shadow-[16px_16px_0_rgba(0,0,0,0.6)] p-8 relative ${dialogue.type === 'locked' ? 'bg-red-800' : 'bg-[#0000AA]'} text-white`}>
              <div className={`absolute -top-6 left-8 px-8 py-1 text-xs font-bold border-4 border-black shadow-xl uppercase ${dialogue.type === 'locked' ? 'bg-white text-red-800' : 'bg-yellow-400 text-black'}`}>{dialogue.title}</div>
              <div className="min-h-[100px] text-lg leading-relaxed mb-8 font-mono tracking-wide">{typedText}</div>
              {typedText.length === dialogue.text.length && (
                <div className="flex justify-end gap-6">
                   {dialogue.targetRoute && <button onClick={() => navigate(dialogue.targetRoute!)} className="px-8 py-3 bg-white text-black border-b-4 border-gray-400 hover:bg-yellow-300 transition-all uppercase font-bold text-sm">[ PROCEDER ]</button>}
                   <button onClick={() => setDialogue(null)} className="px-8 py-3 bg-black text-white border-b-4 border-gray-700 hover:bg-gray-900 transition-all uppercase font-bold text-sm">[ FECHAR ]</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default Hub;
