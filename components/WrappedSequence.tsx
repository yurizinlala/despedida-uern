
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ChevronRight, Disc, Zap, Crown, 
  Swords, Clock, Skull, Cpu, Music, Pause, Play, FastForward
} from 'lucide-react';
import { playKeyClick } from '../utils/audio';
import Counter from './Counter';
import { useNavigate } from 'react-router-dom';

const TOTAL_SLIDES = 11; 
const AUTO_PLAY_DELAY = 6000;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1, duration: 0.5 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const WrappedSequence: React.FC = () => {
  const { selectedProfessor, unlockAchievement, hasSkippedIntro, setHasSkippedIntro } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);
  const navigate = useNavigate();

  if (!selectedProfessor) return null;

  const { wrapped, nickname, theme } = selectedProfessor;
  
  const palette = useMemo(() => {
    switch(theme) {
      case 'web': return ['#db2777', '#7c3aed', '#c026d3', '#4f46e5', '#be185d'];
      case 'logic': return ['#2563eb', '#1e40af', '#4338ca', '#3b82f6', '#1e3a8a'];
      case 'math': return ['#059669', '#047857', '#0d9488', '#10b981', '#064e3b'];
      case 'hardware': return ['#ea580c', '#b91c1c', '#c2410c', '#ef4444', '#7f1d1d'];
      case 'db': return ['#d97706', '#b45309', '#f59e0b', '#d97706', '#78350f'];
      default: return ['#4b5563', '#374151', '#1f2937', '#6b7280', '#111827'];
    }
  }, [theme]);

  const currentColor = palette[currentSlide % palette.length];

  // Achievement logic: only triggered on state changes, with anti-skip checks
  useEffect(() => {
    if (currentSlide === 5) {
        unlockAchievement('aura_check');
    }
    // Grant wrapped_pro ONLY if user reached the final slide and NEVER skipped anything
    if (currentSlide === TOTAL_SLIDES - 1 && !hasSkippedIntro) {
        unlockAchievement('wrapped_pro');
    }
  }, [currentSlide, unlockAchievement, hasSkippedIntro]);

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(p => p + 1);
      playKeyClick();
      setTimeLeft(0);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(p => p - 1);
      playKeyClick();
      setTimeLeft(0);
      // Manually going back/navigating skips the pure sequential experience
      setHasSkippedIntro(true);
    }
  }, [currentSlide, setHasSkippedIntro]);

  useEffect(() => {
    if (isPaused || currentSlide === TOTAL_SLIDES - 1) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / AUTO_PLAY_DELAY) * 100, 100);
      setTimeLeft(progress);
      if (elapsed >= AUTO_PLAY_DELAY) nextSlide();
    }, 100);
    return () => clearInterval(interval);
  }, [currentSlide, isPaused, nextSlide]);

  const handleManualFinish = () => {
    // Manually jumping to the end disqualifies the achievement
    setHasSkippedIntro(true);
    navigate('/transition');
  };

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden relative font-body select-none transition-colors duration-1000">
      <motion.div 
        className="absolute inset-0 z-0" 
        animate={{ backgroundColor: currentColor }} 
        style={{ opacity: 0.1, transition: 'background-color 1.5s ease' }} 
      />
      
      <div className="absolute top-6 left-6 right-6 z-50 flex gap-1.5 px-4">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm cursor-pointer" onClick={() => {
              setCurrentSlide(i); 
              setTimeLeft(0); 
              setHasSkippedIntro(true);
          }}>
             <motion.div 
                className="h-full bg-white" 
                initial={{ width: "0%" }} 
                animate={{ width: i < currentSlide ? "100%" : i === currentSlide ? `${timeLeft}%` : "0%" }} 
                transition={{ duration: 0.1, ease: "linear" }} 
             />
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-20 z-40 cursor-pointer" onClick={prevSlide} />
      <div className="absolute inset-y-0 right-0 w-20 z-40 cursor-pointer" onClick={nextSlide} />

      <button onClick={() => setIsPaused(!isPaused)} className="absolute top-10 right-10 z-50 text-white/30 hover:text-white transition-colors">
        {isPaused ? <Play size={20} /> : <Pause size={20} />}
      </button>

      <motion.button
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleManualFinish}
        className="absolute bottom-10 right-10 z-50 flex items-center gap-2 bg-white/5 border border-white/20 px-5 py-2.5 rounded-full font-display text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-all backdrop-blur-md"
      >
        <FastForward size={14} /> Finalizar Review
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.div key={currentSlide} variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="h-full w-full flex flex-col items-center justify-center p-8 relative z-10 pointer-events-none will-change-transform">
          {currentSlide === 0 && (
            <div className="text-center">
              <motion.div variants={itemVariants} className="text-[10px] font-mono-tech mb-6 text-white/50 tracking-[0.8em] uppercase">YEAR IN REVIEW {new Date().getFullYear()}</motion.div>
              <motion.h1 variants={itemVariants} className="font-display text-8xl md:text-[10rem] uppercase leading-[0.85] mb-4 tracking-tighter">Olá, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">{nickname.split(' ')[0]}</span></motion.h1>
              <motion.div variants={itemVariants} className="mt-8 text-lg md:text-xl font-light opacity-60 italic tracking-wide">O semestre passou voando, <br/>mas as pautas... essas ficaram.</motion.div>
            </div>
          )}
          {currentSlide === 1 && (
            <div className="text-center w-full max-w-2xl">
               <motion.div variants={itemVariants} className="mb-8"><Clock size={48} className="mx-auto text-white/40" /></motion.div>
               <motion.h2 variants={itemVariants} className="text-xs uppercase tracking-[0.4em] mb-4 opacity-50">Carga Horária de Sofrimento</motion.h2>
               <motion.div variants={itemVariants} className="font-display text-[10rem] md:text-[14rem] leading-none tracking-tighter text-white"><Counter value={wrapped.totalHours} /></motion.div>
               <motion.div variants={itemVariants} className="text-2xl font-bold mt-4 tracking-widest text-white/80">HORAS NO SIGAA</motion.div>
            </div>
          )}
          {currentSlide === 2 && (
            <motion.div variants={itemVariants} className="bg-[#f0f0f0] text-black p-10 max-w-sm w-full font-mono text-xs shadow-[15px_15px_0px_rgba(255,255,255,0.05)] rotate-1 relative border-t-[10px] border-blue-600">
               <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-400 border-2 border-black rotate-[-15deg] flex items-center justify-center font-bold">!</div>
               <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-8"><div><h1 className="text-2xl font-black italic">EXTRATO ACADÊMICO</h1><p className="text-[9px] opacity-60">REF: SEMESTRE_LOUCURA_25</p></div></div>
               <div className="space-y-4 mb-10">
                 {wrapped.receiptItems.map((item, i) => (
                   <div key={i} className="flex justify-between items-baseline"><span className="uppercase font-bold tracking-tighter">{item.name}</span><span className="dots flex-1 border-b border-dotted border-black/20 mx-2"></span><span>{item.cost}</span></div>
                 ))}
               </div>
               <div className="border-t-2 border-black border-dashed pt-4 flex justify-between text-xl font-black"><span>TOTAL</span><span>1 ALMA (USADA)</span></div>
               <div className="mt-6 text-[8px] opacity-40 text-center uppercase tracking-widest italic">Obrigado por não desistir (ainda).</div>
            </motion.div>
          )}
          {currentSlide === 3 && (
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-around gap-16 px-12">
               <motion.div variants={itemVariants} className="text-center group"><div className="w-40 h-40 rounded-full border-2 border-white/20 mx-auto mb-6 flex items-center justify-center bg-white/5 backdrop-blur-lg overflow-hidden relative"><span className="text-6xl z-10">🧑‍🎓</span></div><h3 className="text-sm font-bold uppercase opacity-50 mb-2">ALUNOS (MÉDIA)</h3><div className="text-6xl font-display"><Counter value={wrapped.comparison.studentValue} /></div></motion.div>
               <motion.div variants={itemVariants} className="text-center flex flex-col items-center"><h2 className="text-xl font-bold uppercase bg-white/10 px-6 py-3 border border-white/20 rounded-full backdrop-blur-md">{wrapped.comparison.label}</h2></motion.div>
               <motion.div variants={itemVariants} className="text-center group"><div className="w-40 h-40 rounded-full border-2 border-white/20 mx-auto mb-6 flex items-center justify-center bg-white/5 backdrop-blur-lg overflow-hidden relative"><span className="text-6xl z-10">👨‍🏫</span></div><h3 className="text-sm font-bold uppercase opacity-50 mb-2">VOCÊ (DOCENTE)</h3><div className="text-6xl font-display"><Counter value={wrapped.comparison.profValue} /></div></motion.div>
            </div>
          )}
          {currentSlide === 4 && (
            <div className="w-full max-w-4xl px-8">
              <motion.h2 variants={itemVariants} className="text-center text-[10px] uppercase tracking-[0.6em] mb-16 opacity-40">Métricas de Estresse Sazonal</motion.h2>
              <div className="relative h-72 flex items-end justify-between gap-3">
                 <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10"></div>
                 {[40, 60, 35, 80, 50, 95, 100, 70, 45].map((h, i) => (
                   <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }} className={`w-full rounded-t-lg relative group ${h === 100 ? 'bg-red-600' : 'bg-white/10'}`} />
                 ))}
              </div>
              <motion.div variants={itemVariants} className="text-center mt-16"><h1 className="font-display text-6xl md:text-8xl tracking-tight leading-none text-white/90">{wrapped.peakSeason.intensity}</h1></motion.div>
            </div>
          )}
          {currentSlide === 5 && (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
               <motion.div variants={itemVariants} className="z-10 bg-white/[0.03] backdrop-blur-3xl p-16 rounded-[4rem] border border-white/10 shadow-2xl text-center max-w-lg w-full">
                  <h3 className="text-[10px] uppercase tracking-[0.5em] mb-10 opacity-40 italic">Aura Docente Detectada</h3>
                  <div className="mb-10 inline-block p-10 rounded-full bg-white/5 border border-white/10 relative overflow-hidden group">
                    <Zap size={80} style={{ color: wrapped.aura.color }} className="relative z-10" />
                  </div>
                  <h1 className="font-display text-7xl md:text-9xl uppercase leading-none tracking-tighter" style={{ color: wrapped.aura.color }}>{wrapped.aura.vibe}</h1>
               </motion.div>
            </div>
          )}
          {currentSlide === 10 && (
            <div className="text-center pointer-events-auto">
               <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", duration: 1.0 }} className="w-48 h-48 bg-white text-black mx-auto mb-10 rounded-full flex items-center justify-center border-[8px] border-double border-gray-200 relative group">
                  <Crown size={96} />
               </motion.div>
               <motion.div variants={itemVariants}>
                 <p className="text-[10px] font-mono-tech uppercase tracking-[1em] mb-4 opacity-40">Status Final do Semestre</p>
                 <h1 className="font-display text-8xl md:text-[11rem] uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-800">{wrapped.finalBadge}</h1>
               </motion.div>
               <motion.div variants={itemVariants} className="mt-16">
                 <button onClick={handleManualFinish} className="group relative inline-flex items-center justify-center px-12 py-5 font-black text-white transition-all duration-300 bg-transparent font-display text-2xl tracking-[0.15em] uppercase overflow-hidden">
                    <span className="absolute inset-0 border-2 border-white/30 group-hover:border-white transition-all"></span>
                    <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                    <span className="relative z-10 flex items-center gap-4 group-hover:text-black transition-colors">CONTINUAR PARA O CAMPUS <ChevronRight size={24} /></span>
                 </button>
               </motion.div>
            </div>
          )}
          {(currentSlide > 5 && currentSlide < 10) && (
            <div className="text-center flex flex-col items-center max-w-2xl px-8">
               <motion.div variants={itemVariants} className="mb-12 p-8 rounded-full bg-white/5 border border-white/10">
                  {currentSlide === 6 && <Skull size={80} className="text-white/60" />}
                  {currentSlide === 7 && <Cpu size={80} className="text-white/60" />}
                  {currentSlide === 8 && <Music size={80} className="text-white/60" />}
                  {currentSlide === 9 && <Disc size={80} className="text-white/60 animate-spin-slow" />}
               </motion.div>
               <motion.h2 variants={itemVariants} className="text-[10px] uppercase tracking-[0.5em] mb-4 opacity-40">Métrica Analisada</motion.h2>
               <motion.h1 variants={itemVariants} className="font-display text-7xl md:text-8xl uppercase leading-none tracking-tighter mb-8">
                  {currentSlide === 6 && "Sobrevivência"}
                  {currentSlide === 7 && wrapped.techArchetype.name}
                  {currentSlide === 8 && "Palavras-Chave"}
                  {currentSlide === 9 && wrapped.soundtrack.song}
               </motion.h1>
               <motion.p variants={itemVariants} className="text-lg opacity-60 font-light max-w-md">
                  {currentSlide === 6 && `Apenas ${wrapped.survivalRate}% dos calouros chegaram à prova final com sanidade.`}
                  {currentSlide === 7 && wrapped.techArchetype.description}
                  {currentSlide === 8 && "As palavras que você mais ouviu (ou disse) enquanto debugava a alma."}
                  {currentSlide === 9 && `Sua trilha sonora oficial. Tocada repetidamente enquanto o código não compilava.`}
               </motion.p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WrappedSequence;
