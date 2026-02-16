
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ChevronRight, Zap, Crown, Clock, Skull, Cpu, Music,
  Pause, Play, FastForward, Users, TrendingUp, TrendingDown,
  MessageCircle, Star, Shield, Wand2, SkipForward, Volume2
} from 'lucide-react';
import { playSound } from '../utils/audio';
import Counter from './Counter';
import { useNavigate } from 'react-router-dom';

const TOTAL_SLIDES = 11;
const AUTO_PLAY_DELAY = 8000;

// --- Animated background shapes ---
const FloatingShapes: React.FC<{ color: string; slide: number }> = ({ color, slide }) => {
  const shapes = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 30,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 8 + 6,
      type: ['circle', 'square', 'triangle'][i % 3],
      opacity: Math.random() * 0.12 + 0.03,
    })), [slide]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((s) => (
        <motion.div
          key={`${slide}-${s.id}`}
          className={`absolute ${s.type === 'circle' ? 'rounded-full' : s.type === 'square' ? 'rounded-lg rotate-45' : ''}`}
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            backgroundColor: color,
            opacity: s.opacity,
            ...(s.type === 'triangle' ? {
              backgroundColor: 'transparent',
              borderLeft: `${s.size / 2}px solid transparent`,
              borderRight: `${s.size / 2}px solid transparent`,
              borderBottom: `${s.size}px solid ${color}`,
              width: 0,
              height: 0,
            } : {})
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.15, 0.9, 1.05, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// --- Slide gradients per index ---
const slideGradients = [
  'from-black via-gray-900 to-black',                         // 0: Intro
  'from-indigo-950 via-purple-950 to-black',                  // 1: Carga Horária
  'from-gray-900 via-gray-800 to-gray-900',                   // 2: Extrato
  'from-emerald-950 via-teal-950 to-black',                   // 3: Ranking
  'from-red-950 via-orange-950 to-black',                     // 4: Estresse
  'from-violet-950 via-fuchsia-950 to-black',                 // 5: Aura
  'from-slate-950 via-zinc-900 to-black',                     // 6: Sobrevivência
  'from-cyan-950 via-blue-950 to-black',                      // 7: Arquétipo
  'from-amber-950 via-yellow-950 to-black',                   // 8: Frases
  'from-green-950 via-emerald-950 to-black',                  // 9: Trilha
  'from-yellow-950 via-amber-950 to-black',                   // 10: Badge Final
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15, duration: 0.5 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants: Variants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

// --- Slide captions (rendered at root level, not inside slides) ---
const slideCaptions = [
  'Toque nas laterais para navegar • Use ▶/⏸ para controlar',
  'A diferença? Chama-se "olhar o celular durante a aula".',
  'Nenhum reembolso disponível para neurônios perdidos.',
  'Se algum nome não apareceu aqui, foi porque não respondia no grupo do WhatsApp.',
  'Passe o mouse em cima das barras para ver o motivo do meu sofrimento.',
  'Se a barra de paciência está alta, agradeça ao café.',
  'A média é 7, né? É o suficiente pra não ficar maluco.',
  'Classe rara. Poucos sobrevivem à fase de evolução.',
  'Se a frase mais repetida fosse "Entendi", estaríamos mentindo.',
  'Essa música tocou infinitamente em minha cabeça.',
  'Agora é oficial. Não tem como voltar atrás.'
];

// --- Main Component ---
const WrappedSequence: React.FC = () => {
  const { selectedProfessor, hasSkippedIntro, setHasSkippedIntro } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const [auraRevealed, setAuraRevealed] = useState(false);
  const [auraText, setAuraText] = useState("Iniciando scan...");
  const auraTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  if (!selectedProfessor) return null;

  const { wrapped, nickname, theme } = selectedProfessor;

  const palette = useMemo(() => {
    switch (theme) {
      case 'web': return ['#db2777', '#7c3aed', '#c026d3', '#4f46e5', '#be185d'];
      case 'logic': return ['#2563eb', '#1e40af', '#4338ca', '#3b82f6', '#1e3a8a'];
      case 'math': return ['#059669', '#047857', '#0d9488', '#10b981', '#064e3b'];
      case 'hardware': return ['#ea580c', '#b91c1c', '#c2410c', '#ef4444', '#7f1d1d'];
      case 'db': return ['#d97706', '#b45309', '#f59e0b', '#d97706', '#78350f'];
      default: return ['#4b5563', '#374151', '#1f2937', '#6b7280', '#111827'];
    }
  }, [theme]);

  const currentColor = palette[currentSlide % palette.length];

  // Aura reveal animation
  useEffect(() => {
    if (currentSlide === 5) {
      playSound('/sounds/aura.mp3');
      setAuraRevealed(false);
      const texts = ["Verificando sua aura...", "Calculando seus títulos...", "Anotando seu IR...", "Medindo sua paciência...", "Resultado encontrado!"];
      let i = 0;
      const step = () => {
        setAuraText(texts[i]);
        i++;
        if (i < texts.length) {
          auraTimerRef.current = setTimeout(step, 1600);
        } else {
          setTimeout(() => setAuraRevealed(true), 400);
        }
      };
      step();
      return () => { if (auraTimerRef.current) clearTimeout(auraTimerRef.current); };
    }
  }, [currentSlide]);

  // Sound: wrapped-init on mount
  useEffect(() => {
    playSound('/sounds/wrapped-init.mp3');
  }, []);

  // Sound: wrapped-complete on final slide
  useEffect(() => {
    if (currentSlide === TOTAL_SLIDES - 1) {
      playSound('/sounds/wrapped-complete.mp3');
    }
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(p => p + 1);
      setTimeLeft(0);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(p => p - 1);
      setTimeLeft(0);
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
    setHasSkippedIntro(true);
    navigate('/transition');
  };

  // --- Render helpers for each slide ---

  const renderSlide0 = () => (
    <div className="text-center">
      <motion.div variants={itemVariants} className="text-[10px] font-mono-tech mb-6 text-white/50 tracking-[0.8em] uppercase">UERN WRAPPED {new Date().getFullYear()}</motion.div>
      <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-8xl uppercase leading-[0.9] mb-6 tracking-tighter">Olá, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">{nickname.split(' ')[0]}</span></motion.h1>
      <motion.div variants={itemVariants} className="mt-6 text-sm md:text-base font-light opacity-60 italic tracking-wide max-w-md mx-auto">Os semestres passaram voando, né? <br />Mas as lembranças... essas ficaram! <br /> (e talvez alguns traumas, mas da matéria, viu? Nada pessoal...).</motion.div>
    </div>
  );

  const renderSlide1 = () => (
    <div className="text-center w-full max-w-2xl">
      <motion.div variants={itemVariants} className="mb-4"><Clock size={36} className="mx-auto text-white/40" /></motion.div>
      <motion.h2 variants={itemVariants} className="text-[10px] uppercase tracking-[0.4em] mb-2 opacity-50">Carga Horária de Sofrimento</motion.h2>
      <motion.div variants={itemVariants} className="font-display text-[8rem] md:text-[12rem] leading-none tracking-tighter text-white"><Counter value={wrapped.totalHours} /></motion.div>
      <motion.div variants={itemVariants} className="text-xl font-bold tracking-widest text-white/80 mb-8">HORAS NAS SUAS DISCIPLINAS</motion.div>
      <motion.div variants={itemVariants} className="flex justify-center gap-12 mt-4">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-display text-emerald-400"><Counter value={wrapped.timeStudying} /></div>
          <div className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Horas Estudando</div>
        </div>
        <div className="text-xs text-white/20 self-center font-bold">VS</div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-display text-red-400"><Counter value={wrapped.timeUnderstanding} /></div>
          <div className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Horas Entendendo</div>
        </div>
      </motion.div>

    </div>
  );

  const renderSlide2 = () => (
    <motion.div variants={itemVariants} className="bg-[#f0f0f0] text-black p-8 max-w-sm w-full font-mono text-xs shadow-[15px_15px_0px_rgba(255,255,255,0.05)] rotate-3 relative border-t-[10px] border-blue-600">
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-400 border-2 border-black rotate-[-15deg] flex items-center justify-center font-bold text-sm">!</div>
      <div className="flex justify-between items-end border-b-2 border-black pb-3 mb-6"><div><h1 className="text-xl font-black italic">EXTRATO DAS DISCIPLINAS</h1><p className="text-[8px] opacity-60">REF: {selectedProfessor.subjects[0]?.toUpperCase()}</p></div></div>
      <div className="space-y-2.5 mb-8">
        {wrapped.receiptItems.map((item, i) => (
          <div key={i} className="flex justify-between items-baseline text-[11px]"><span className="uppercase font-bold tracking-tighter">{item.name}</span><span className="dots flex-1 border-b border-dotted border-black/20 mx-2"></span><span className="font-mono">{item.cost}</span></div>
        ))}
      </div>
      <div className="border-t-2 border-black border-dashed pt-3 flex justify-between text-base font-black"><span>TOTAL</span><span>1 ALMA (USADA)</span></div>
      <div className="mt-4 text-[7px] opacity-40 text-center uppercase tracking-widest italic">Obrigado por não desistir de mim.</div>
    </motion.div>
  );

  const renderSlide3 = () => (
    <div className="w-full max-w-lg px-8 text-center">
      <motion.div variants={itemVariants} className="mb-4"><Users size={36} className="mx-auto text-white/40" /></motion.div>
      <motion.h2 variants={itemVariants} className="text-[10px] uppercase tracking-[0.5em] mb-2 opacity-50">Parceiros de Sofrimento</motion.h2>
      <motion.p variants={itemVariants} className="text-xs opacity-40 mb-8 italic">Ranking de quem mais fez grupo com Yuri nas matérias {selectedProfessor.gender === 'male' ? 'do' : 'da'} {nickname.split(' ')[0]}</motion.p>
      <div className="space-y-3">
        {wrapped.groupRanking.map((person, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all ${i === 0 ? 'bg-white/10 border border-white/20 scale-105' : 'bg-white/[0.03] border border-white/5'}`}
          >
            <span className="text-2xl">{person.emoji}</span>
            <span className="font-bold text-base flex-1 text-left">{person.name}</span>
            <span className="font-mono text-sm text-white/60">{person.count} vezes</span>
          </motion.div>
        ))}
      </div>

    </div>
  );

  const renderSlide4 = () => (
    <div className="w-full max-w-3xl px-8 text-center">
      <motion.div variants={itemVariants} className="mb-4"><TrendingUp size={36} className="mx-auto text-white/40" /></motion.div>
      <motion.h2 variants={itemVariants} className="text-xs uppercase tracking-[0.4em] mb-8 opacity-50">Métricas de Estresse Sazonal</motion.h2>
      <motion.div variants={itemVariants} className="relative pointer-events-auto" style={{ height: '200px' }}>
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10"></div>
        <div className="flex items-end h-full gap-1.5 md:gap-2">
          {wrapped.stressBars.map((bar, i) => (
            <div key={i} className="flex-1 h-full relative" onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
              {hoveredBar === i && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 px-3 py-2 rounded-lg text-[9px] text-center w-32 z-50 backdrop-blur-md">
                  <div className="font-bold text-white">{bar.discipline}</div>
                  <div className="text-white/60 mt-0.5">{bar.topic}</div>
                  <div className="text-red-400 font-mono mt-1">Estresse: {bar.level}%</div>
                </motion.div>
              )}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${bar.level}%` }}
                transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute bottom-0 left-0 right-0 rounded-t-md cursor-pointer transition-all ${hoveredBar === i ? 'brightness-125' : ''} ${bar.level >= 90 ? 'bg-red-600' : bar.level >= 70 ? 'bg-orange-500' : bar.level >= 50 ? 'bg-yellow-500' : 'bg-white/15'}`}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center mt-8">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Maior Estresse</p>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight leading-none text-white/90">{wrapped.peakSeason.intensity}</h1>
        <p className="text-xs text-white/40 mt-2 italic">{wrapped.peakSeason.event}</p>
      </motion.div>
    </div>
  );

  const renderSlide5 = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!auraRevealed ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-white/10 border-t-white/60 rounded-full mx-auto mb-8" />
            <motion.p key={auraText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.3em] text-white/50">{auraText}</motion.p>
          </motion.div>
        ) : (
          <motion.div key="revealed" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", duration: 0.8 }} className="z-10 bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl text-center max-w-md w-full">
            <h3 className="text-[9px] uppercase tracking-[0.5em] mb-4 opacity-40 italic">Aura Docente Detectada</h3>
            <div className="mb-4 inline-block p-5 rounded-full bg-white/5 border border-white/10"><Zap size={40} style={{ color: wrapped.aura.color }} /></div>
            <h1 className="font-display text-3xl md:text-4xl uppercase leading-none tracking-tighter mb-5" style={{ color: wrapped.aura.color }}>{wrapped.aura.vibe}</h1>
            <div className="space-y-2 text-left">
              {wrapped.aura.attributes.map((attr, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 w-24 text-right">{attr.name}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${attr.value}%` }}
                      transition={{ duration: 1.2, delay: i * 0.15 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: wrapped.aura.color }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 w-8">+{Math.floor(attr.value / 10)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderSlide6 = () => (
    <div className="w-full max-w-lg px-8 text-center">
      <motion.div variants={itemVariants} className="mb-4"><Skull size={36} className="mx-auto text-white/40" /></motion.div>
      <motion.h2 variants={itemVariants} className="text-[10px] uppercase tracking-[0.5em] mb-2 opacity-50">Taxa de Sobrevivência</motion.h2>
      <motion.div variants={itemVariants} className="font-display text-7xl md:text-8xl leading-none tracking-tighter text-white my-6"><Counter value={wrapped.survivalRate} suffix="%" /></motion.div>
      <motion.p variants={itemVariants} className="text-xs opacity-40 mb-8">de chance de Yuri chegar as provas finais com sanidade</motion.p>
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <TrendingUp size={24} className="mx-auto text-emerald-400 mb-2" />
          <div className="text-[9px] uppercase tracking-wider text-emerald-400/70 mb-1">Melhor Nota</div>
          <div className="text-2xl font-display text-emerald-400">{wrapped.bestSubject.grade.toFixed(1)}</div>
          <div className="text-[10px] text-white/50 mt-1">{wrapped.bestSubject.name}</div>
        </div>
        <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <TrendingDown size={24} className="mx-auto text-red-400 mb-2" />
          <div className="text-[9px] uppercase tracking-wider text-red-400/70 mb-1">Pior Nota</div>
          <div className="text-2xl font-display text-red-400">{wrapped.worstSubject.grade.toFixed(1)}</div>
          <div className="text-[10px] text-white/50 mt-1">{wrapped.worstSubject.name}</div>
        </div>
      </motion.div>

    </div>
  );

  const renderSlide7 = () => (
    <div className="text-center flex flex-col items-center max-w-md px-8">
      <motion.div variants={itemVariants} className="mb-4 p-5 rounded-full bg-white/5 border border-white/10">
        <Cpu size={40} className="text-cyan-400" />
      </motion.div>
      <motion.h2 variants={itemVariants} className="text-[9px] uppercase tracking-[0.5em] mb-2 opacity-40">Sua Classe de Combate</motion.h2>
      <motion.h1 variants={itemVariants} className="font-display text-4xl md:text-6xl uppercase leading-none tracking-tighter mb-4">{wrapped.techArchetype.name}</motion.h1>
      <motion.p variants={itemVariants} className="text-sm opacity-50 font-light max-w-sm mb-8">{wrapped.techArchetype.description}</motion.p>
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 w-full max-w-xs">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-cyan-400">ATK</div>
          <div className="text-xs text-white/40 mt-1">{Math.floor(Math.random() * 30 + 70)}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-emerald-400">DEF</div>
          <div className="text-xs text-white/40 mt-1">{Math.floor(Math.random() * 30 + 60)}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-amber-400">INT</div>
          <div className="text-xs text-white/40 mt-1">{Math.floor(Math.random() * 20 + 80)}</div>
        </div>
      </motion.div>

    </div>
  );

  const renderSlide8 = () => {
    const sorted = [...wrapped.wordCloud].sort((a, b) => b.count - a.count);
    const topWord = sorted[0];
    const others = sorted.slice(1);
    // Nearby positions around center (offsets in px from center)
    const nearbyOffsets = [
      { x: -320, y: -90 },
      { x: 180, y: -70 },
      { x: -370, y: 110 },
      { x: 180, y: 110 },
      { x: -70, y: -140 },
      { x: -90, y: 180 },
    ];

    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto">
        <motion.div variants={itemVariants} className="mb-2"><MessageCircle size={28} className="mx-auto text-white/40" /></motion.div>
        <motion.h2 variants={itemVariants} className="text-xs uppercase tracking-[0.4em] mb-6 opacity-50">Frases Mais Faladas</motion.h2>

        {/* Central main phrase */}
        <motion.div
          variants={itemVariants}
          className="relative z-10"
          onMouseEnter={() => setHoveredWord(-1)}
          onMouseLeave={() => setHoveredWord(null)}
        >
          <h1 className="font-display text-2xl md:text-4xl text-center leading-tight tracking-tight text-white">"{topWord.word}"</h1>
          {hoveredWord === -1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 px-3 py-1 rounded-lg text-[10px] text-white/70 font-mono whitespace-nowrap">{topWord.count}x falada</motion.div>
          )}
        </motion.div>

        {/* Floating nearby phrases — always visible, just gently floating */}
        {others.map((w, i) => {
          const offset = nearbyOffsets[i % nearbyOffsets.length];
          return (
            <motion.div
              key={i}
              className="absolute cursor-pointer z-20"
              style={{ left: `calc(50% + ${offset.x}px)`, top: `calc(50% + ${offset.y}px)`, transform: 'translate(-50%, -50%)', textAlign: 'center' }}
              animate={{
                y: [0, Math.sin(i * 1.3) * 8, 0],
                x: [0, Math.cos(i * 0.9) * 6, 0],
              }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={() => setHoveredWord(i)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <span className={`px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${hoveredWord === i ? 'bg-white/15 border-white/30 text-white' : 'bg-white/[0.03] border-white/10 text-white/40'}`}>{w.word}</span>
              {hoveredWord === i && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 px-2 py-0.5 rounded text-[9px] text-white/70 font-mono whitespace-nowrap">{w.count}x</motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderSlide9 = () => {
    const trackId = wrapped.soundtrack.spotifyUrl?.split('/track/')[1]?.split('?')[0];
    return (
      <div className="text-center flex flex-col items-center max-w-md px-8 pointer-events-auto">
        <motion.div variants={itemVariants} className="mb-3"><Music size={36} className="mx-auto text-white/40" /></motion.div>
        <motion.h2 variants={itemVariants} className="text-xs uppercase tracking-[0.4em] mb-6 opacity-50">Nossa Trilha Sonora</motion.h2>

        {/* Spotify embed */}
        {trackId ? (
          <motion.div variants={itemVariants} className="w-full max-w-sm">
            <iframe
              style={{ borderRadius: 12 }}
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="text-white/50 text-sm">
            <p className="font-bold text-lg text-white">{wrapped.soundtrack.song}</p>
            <p className="text-xs mt-1">{wrapped.soundtrack.artist}</p>
          </motion.div>
        )}

        <motion.p variants={itemVariants} className="text-xs opacity-40 mt-6 italic max-w-xs">{wrapped.soundtrack.reason}</motion.p>

      </div>
    );
  };

  const renderSlide10 = () => (
    <div className="text-center pointer-events-auto">
      <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", duration: 1.0 }} className="w-32 h-32 md:w-40 md:h-40 bg-white text-black mx-auto mb-8 rounded-full flex items-center justify-center border-[6px] border-double border-gray-200 relative group">
        <Crown size={64} className="md:hidden" />
        <Crown size={72} className="hidden md:block" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <p className="text-[9px] font-mono-tech uppercase tracking-[1em] mb-3 opacity-40">Status Final do Semestre</p>
        <h1 className="font-display text-6xl md:text-8xl uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-800">{wrapped.finalBadge}</h1>
      </motion.div>
      <motion.div variants={itemVariants} className="mt-4 text-xs text-white/40 italic max-w-sm mx-auto">
        Você sobreviveu a {wrapped.totalHours} horas de aula, {wrapped.stressBars.length} picos de estresse de Yuri e {wrapped.receiptItems.length} cobranças no extrato. Parabéns.
      </motion.div>
      <motion.div variants={itemVariants} className="mt-10">
        <button onClick={handleManualFinish} className="group relative inline-flex items-center justify-center px-10 py-4 font-black text-white transition-all duration-300 bg-transparent font-display text-xl tracking-[0.15em] uppercase overflow-hidden">
          <span className="absolute inset-0 border-2 border-white/30 group-hover:border-white transition-all"></span>
          <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
          <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors">CONTINUAR PARA O CAMPUS <ChevronRight size={20} /></span>
        </button>
      </motion.div>

    </div>
  );

  const slides = [renderSlide0, renderSlide1, renderSlide2, renderSlide3, renderSlide4, renderSlide5, renderSlide6, renderSlide7, renderSlide8, renderSlide9, renderSlide10];

  return (
    <div className={`h-screen w-full text-white overflow-hidden relative font-body select-none bg-gradient-to-b ${slideGradients[currentSlide]} transition-all duration-1000`}>
      <FloatingShapes color={currentColor} slide={currentSlide} />

      {/* Progress bars */}
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

      {/* Click zones */}
      <div className="absolute inset-y-0 left-0 w-20 z-40 cursor-pointer" onClick={prevSlide} />
      <div className="absolute inset-y-0 right-0 w-20 z-40 cursor-pointer" onClick={nextSlide} />

      {/* Pause/Play */}
      <button onClick={() => setIsPaused(!isPaused)} className="absolute top-10 right-10 z-50 text-white/30 hover:text-white transition-colors">
        {isPaused ? <Play size={18} /> : <Pause size={18} />}
      </button>

      {/* Skip button */}
      <motion.button
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleManualFinish}
        className="absolute bottom-10 right-10 z-50 flex items-center gap-2 bg-white/5 border border-white/20 px-5 py-2.5 rounded-full font-display text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-all backdrop-blur-md"
      >
        <FastForward size={14} /> Finalizar Review
      </motion.button>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div key={currentSlide} variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="h-full w-full flex flex-col items-center justify-center p-8 relative z-10 pointer-events-none will-change-transform">
          {slides[currentSlide]?.()}
        </motion.div>
      </AnimatePresence>

      {/* Caption — always at root level for proper positioning and white text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`caption-${currentSlide}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-8 left-0 right-0 text-center text-[10px] md:text-xs text-white/30 font-mono-tech uppercase tracking-widest italic px-8 z-20"
        >
          {slideCaptions[currentSlide]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default WrappedSequence;
