
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Code, GraduationCap, SkipForward, Trophy, Star, Award, Zap, Coffee, Skull, Medal, RotateCcw } from 'lucide-react';
import { playSound } from '../utils/audio';
import { useAchievements } from '../context/AchievementsContext';
import { achievements as allAchievements } from '../data/achievements';

// ═══════════════════════════════════
// ─── STAR FIELD BACKGROUND ────────
// ═══════════════════════════════════
const StarField: React.FC = () => {
    const stars = React.useMemo(() =>
        Array.from({ length: 200 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.7 + 0.3,
            twinkle: Math.random() * 3 + 2,
        })), []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Deep space gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#000011] via-[#000022] to-[#0a0020]" />
            {/* Stars */}
            {stars.map(s => (
                <div
                    key={s.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${s.x}%`, top: `${s.y}%`,
                        width: `${s.size}px`, height: `${s.size}px`,
                        opacity: s.opacity,
                        animation: `twinkle ${s.twinkle}s ease-in-out infinite alternate`,
                        animationDelay: `${Math.random() * 3}s`,
                    }}
                />
            ))}
            {/* Nebula glow */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-900/10 rounded-full blur-[100px]" />
        </div>
    );
};

// ═══════════════════════════════════
// ─── CREDITS COMPONENT ───────────
// ═══════════════════════════════════
const Credits: React.FC = () => {
    const { selectedProfessor, resetGame } = useUser();
    const navigate = useNavigate();
    const [phase, setPhase] = useState<'crawl' | 'video' | 'achievements'>('crawl');
    const [crawlDone, setCrawlDone] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { unlock, isUnlocked } = useAchievements();

    // Crawl duration
    const CRAWL_DURATION = 80; // seconds

    useEffect(() => {
        // Auto-advance after crawl finishes
        const timer = setTimeout(() => {
            setCrawlDone(true);
            setTimeout(() => setPhase('video'), 1500);
        }, (CRAWL_DURATION + 2) * 1000);
        return () => clearTimeout(timer);
    }, []);

    const skipToVideo = () => {
        setCrawlDone(true);
        unlock('no_time');
        setTimeout(() => setPhase('video'), 500);
    };

    const skipVideo = () => {
        unlock('heartless');
        setPhase('achievements');
        playSound('/sounds/achviements-open.mp3');
    };

    const handleVideoEnd = () => {
        setPhase('achievements');
        playSound('/sounds/achviements-open.mp3');
    };

    const handleRestart = () => {
        unlock('here_we_go');
        resetGame();
        navigate('/');
    };

    if (!selectedProfessor) return null;

    // Real achievements from data + context
    const achievementsList = allAchievements.map(a => ({
        icon: <a.icon size={24} />,
        title: a.title,
        desc: a.description,
        unlocked: isUnlocked(a.id),
    }));

    return (
        <div className="h-screen w-full overflow-hidden relative font-body">
            <StarField />

            {/* Twinkle keyframes */}
            <style>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes star-wars-crawl {
          0% { transform: rotateX(25deg) translateY(300vh); opacity: 0; }
          3% { opacity: 1; transform: rotateX(25deg) translateY(280vh); }
          100% { transform: rotateX(25deg) translateY(-350vh); opacity: 1; }
        }
      `}</style>

            <AnimatePresence mode="wait">
                {/* ═══ PHASE 1: STAR WARS CRAWL ═══ */}
                {phase === 'crawl' && (
                    <motion.div
                        key="crawl"
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-end overflow-hidden"
                        style={{ perspective: '400px' }}
                    >
                        {/* Crawling text */}
                        <div
                            className="text-center text-yellow-400/90 max-w-2xl px-8 space-y-24"
                            style={{
                                animation: `star-wars-crawl ${CRAWL_DURATION}s linear 2s forwards`,
                                transformOrigin: '50% 100%',
                                opacity: 0,
                            }}
                        >
                            {/* Opening */}
                            <div className="space-y-4">
                                <p className="text-lg tracking-[0.5em] uppercase text-blue-300/60">Uma produção Yurizinlala</p>
                                <h1 className="font-cinzel text-6xl md:text-7xl text-yellow-400 leading-tight">
                                    DESPEDIDA<br />ACADÊMICA
                                </h1>
                                <p className="text-base tracking-[0.3em] text-yellow-500/50">GRADUATION ADVENTURE 2025</p>
                            </div>

                            {/* Dedication */}
                            <div className="space-y-6">
                                <p className="text-lg tracking-widest uppercase text-yellow-500/70">Um presente especial para</p>
                                <h2 className="text-4xl md:text-5xl font-cinzel text-cyan-300">{selectedProfessor.name.toUpperCase()}</h2>
                                <div className="text-lg leading-loose text-yellow-400/70 space-y-2">
                                    <p>Pela paciência infinita,</p>
                                    <p>pelo conhecimento compartilhado,</p>
                                    <p>pelos cafés frios e noites de código,</p>
                                    <p>por cada bug resolvido no quadro,</p>
                                    <p>e por transformar curiosidade em carreira.</p>
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="space-y-6">
                                <p className="text-lg tracking-widest uppercase text-yellow-500/70">Tecnologias de Sobrevivência</p>
                                <div className="text-base space-y-3 text-gray-400">
                                    <p>React 19 · TypeScript · Vite</p>
                                    <p>Framer Motion · Tailwind CSS</p>
                                    <p>Lucide Icons · html2canvas · jsPDF</p>
                                    <p>Cafeína Pura · Vontade de se Formar</p>
                                </div>
                            </div>

                            {/* Disciplines */}
                            <div className="space-y-6">
                                <p className="text-lg tracking-widest uppercase text-yellow-500/70">Disciplinas Lecionadas</p>
                                <div className="text-base space-y-3 text-gray-400">
                                    {selectedProfessor.subjects.map((s, i) => (
                                        <p key={i}>{s}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Special Thanks */}
                            <div className="space-y-6">
                                <p className="text-lg tracking-widest uppercase text-yellow-500/70">Agradecimentos Especiais</p>
                                <div className="text-base text-gray-500 space-y-3">
                                    <p>Aos indianos do YouTube</p>
                                    <p>Ao Stack Overflow</p>
                                    <p>Aos grupos de WhatsApp da turma</p>
                                    <p>Ao café da cantina (mesmo sendo fraco)</p>
                                    <p>À padaria do Seu Jorge</p>
                                    <p>E a todos os professores que não desistiram</p>
                                </div>
                            </div>

                            {/* Developer */}
                            <div className="space-y-6">
                                <p className="text-lg tracking-widest uppercase text-yellow-500/70">Desenvolvido por</p>
                                <h3 className="text-3xl font-cinzel text-white">YURI ZINLALA</h3>
                                <p className="text-base text-gray-500">Ciência da Computação — UERN 2025</p>
                                <p className="text-base text-gray-600 italic">Campus Natal — Setor IV</p>
                            </div>

                            {/* Closing */}
                            <div className="space-y-8 pb-60">
                                <Heart size={44} className="mx-auto text-red-500" />
                                <p className="text-xl text-yellow-400/80">Obrigado por tudo, {selectedProfessor.nickname}.</p>
                                <p className="text-lg text-yellow-400/50 font-script">Você fez a diferença.</p>
                                <p className="text-base text-gray-600 tracking-widest mt-8">FIM</p>
                            </div>
                        </div>

                        {/* Skip button */}
                        {!crawlDone && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3 }}
                                onClick={skipToVideo}
                                className="absolute bottom-6 right-6 z-50 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-[10px] text-white/50 hover:text-white flex items-center gap-2 transition-all uppercase tracking-widest backdrop-blur-sm"
                            >
                                <SkipForward size={12} /> Pular Créditos
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {/* ═══ PHASE 2: VIDEO ═══ */}
                {phase === 'video' && (
                    <motion.div
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-10"
                    >
                        <div className="relative w-full max-w-3xl aspect-video bg-black/80 border border-white/10 shadow-2xl">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-contain"
                                onEnded={handleVideoEnd}
                                autoPlay
                                playsInline
                            >
                                <source src="/assets/farewell-video.mp4" type="video/mp4" />
                                {/* Fallback if no video found */}
                            </video>

                            {/* Skip video button */}
                            <button
                                onClick={skipVideo}
                                className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 border border-white/20 px-4 py-2 text-[10px] text-white/60 hover:text-white flex items-center gap-2 transition-all uppercase tracking-widest backdrop-blur-sm z-20"
                            >
                                <SkipForward size={12} /> Pular Vídeo
                            </button>

                            {/* If video doesn't load, show placeholder */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 pointer-events-none">
                                <GraduationCap size={48} className="mb-4 opacity-20" />
                                <p className="text-xs opacity-20 font-mono">farewell-video.mp4</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ PHASE 3: ACHIEVEMENTS / LEADERBOARD ═══ */}
                {phase === 'achievements' && (
                    <motion.div
                        key="achievements"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4"
                    >
                        <div className="w-full max-w-lg">
                            {/* Header */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center mb-8"
                            >
                                <Trophy size={48} className="mx-auto text-yellow-400 mb-3" />
                                <h1 className="text-2xl font-cinzel text-white uppercase tracking-widest mb-1">Conquistas</h1>
                                <p className="text-xs text-gray-500 font-body">
                                    {achievementsList.filter(a => a.unlocked).length}/{achievementsList.length} desbloqueadas
                                </p>
                            </motion.div>

                            {/* Achievement list */}
                            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 mb-8">
                                {achievementsList.map((ach, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 * i }}
                                        className={`flex items-center gap-4 p-3 border transition-all ${ach.unlocked
                                            ? 'bg-yellow-500/5 border-yellow-500/20 text-white'
                                            : 'bg-white/[0.02] border-white/5 text-gray-600'
                                            }`}
                                    >
                                        <div className={`shrink-0 w-10 h-10 flex items-center justify-center ${ach.unlocked ? 'text-yellow-400' : 'text-gray-700'
                                            }`}>
                                            {ach.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-bold truncate ${ach.unlocked ? '' : 'text-gray-600'}`}>{ach.title}</p>
                                            <p className={`text-[10px] truncate ${ach.unlocked ? 'text-gray-400' : 'text-gray-700'}`}>{ach.desc}</p>
                                        </div>
                                        {ach.unlocked && (
                                            <div className="shrink-0 text-yellow-500 text-[10px] font-bold uppercase tracking-wider">✓</div>
                                        )}
                                        {!ach.unlocked && (
                                            <div className="shrink-0 text-gray-700 text-lg">🔒</div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Restart button */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex justify-center"
                            >
                                <button
                                    onClick={handleRestart}
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 text-[10px] text-white/60 hover:text-white flex items-center gap-3 transition-all uppercase tracking-widest"
                                >
                                    <RotateCcw size={14} /> Reiniciar Experiência
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Credits;
