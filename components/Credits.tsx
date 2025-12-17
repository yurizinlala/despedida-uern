
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Code, GraduationCap } from 'lucide-react';
import { playSuccessChime, playProcessingNoise, playBiosBeep } from '../utils/audio';

const Credits: React.FC = () => {
    const { selectedProfessor, resetGame } = useUser();
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        playSuccessChime();
        playProcessingNoise();
        setTimeout(() => setShowContent(true), 1000);
    }, []);

    const handleRestart = () => {
        playBiosBeep();
        resetGame();
        navigate('/');
    };

    if (!selectedProfessor) return null;

    return (
        <div className="h-screen w-full bg-black overflow-hidden relative flex flex-col items-center justify-center font-pixel">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]"></div>
            <div className="crt-container absolute inset-0 pointer-events-none opacity-40"></div>
            
            <AnimatePresence>
                {showContent && (
                    <motion.div 
                        initial={{ opacity: 0, y: 500 }}
                        animate={{ y: -1500 }}
                        transition={{ duration: 35, ease: "linear" }}
                        className="text-center text-white space-y-20 max-w-2xl px-8 z-10"
                    >
                        <div className="space-y-4">
                            <GraduationCap size={64} className="mx-auto text-yellow-500 mb-8" />
                            <h1 className="text-3xl text-yellow-500">MISSÃO CUMPRIDA</h1>
                            <p className="text-xs opacity-60">GRADUATION ADVENTURE 2025</p>
                        </div>

                        <div className="space-y-8">
                            <p className="text-sm">UM PRESENTE PARA O DOCENTE:</p>
                            <h2 className="text-2xl text-cyan-400">{selectedProfessor.name.toUpperCase()}</h2>
                            <p className="text-[10px] leading-loose opacity-80">
                                PELA PACIÊNCIA INFINITA,<br/>
                                PELO CONHECIMENTO COMPARTILHADO,<br/>
                                PELOS CAFÉS FRIOS E NOITES DE CÓDIGO,<br/>
                                POR CADA BUG RESOLVIDO NO QUADRO,<br/>
                                E POR TRANSFORMAR CURIOSIDADE EM CARREIRA.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <p className="text-sm">TECNOLOGIAS DE SOBREVIVÊNCIA:</p>
                            <ul className="text-xs space-y-2 text-gray-400">
                                <li>REACT 19</li>
                                <li>FRAMER MOTION</li>
                                <li>TAILWIND CSS</li>
                                <li>LUCIDE ICONS</li>
                                <li>CAFEÍNA PURA</li>
                                <li>VONTADE DE SE FORMAR</li>
                            </ul>
                        </div>

                        <div className="space-y-12">
                            <p className="text-sm">AGRADECIMENTOS ESPECIAIS:</p>
                            <p className="text-[10px] text-gray-500">
                                AOS INDIANOS DO YOUTUBE<br/>
                                AO STACK OVERFLOW<br/>
                                AOS GRUPOS DE WHATSAPP DA TURMA<br/>
                                E A TODOS OS PROFESSORES QUE NÃO DESISTIRAM.
                            </p>
                        </div>

                        <div className="space-y-4 pb-40">
                            <Heart size={32} className="mx-auto text-red-500 animate-pulse" />
                            <p className="text-xs">OBRIGADO POR TUDO, PROFESSOR.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-0 right-0 flex justify-center z-50"
            >
                <button 
                    onClick={handleRestart} 
                    className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 text-[10px] text-white flex items-center gap-3 transition-all uppercase tracking-widest active:scale-95"
                >
                    <Code size={16} /> REINICIAR UNIVERSO (WIPE DATA)
                </button>
            </motion.div>
        </div>
    );
};

export default Credits;
