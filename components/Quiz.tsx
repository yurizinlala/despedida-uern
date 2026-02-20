import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, Loader2, Coffee, Skull, Zap, FileSearch } from 'lucide-react';
import { playSound } from '../utils/audio';

interface RandomizedOption {
  text: string;
  isCorrect: boolean;
  originalIndex: number;
}

interface RandomizedQuestion {
  id: number;
  question: string;
  options: RandomizedOption[];
  userAnswerIndex: number | null; // index inside the randomized options array
}

const PenMark: React.FC<{ type: 'circle' | 'cross'; color: string; delay?: number }> = ({ type, color, delay = 0 }) => (
  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ delay }} className="absolute -left-12 -top-2 z-20 pointer-events-none">
    <svg className="w-16 h-16" viewBox="0 0 100 100">
      {type === 'circle' ? (
        <motion.path d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" fill="none" stroke={color} strokeWidth="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay }} />
      ) : (
        <><motion.path d="M 20,20 L 80,80" stroke={color} strokeWidth="8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay }} /><motion.path d="M 80,20 L 20,80" stroke={color} strokeWidth="8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay + 0.2 }} /></>
      )}
    </svg>
  </motion.div>
);

const Quiz: React.FC = () => {
  const { selectedProfessor, advanceStage } = useUser();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const paperRef = useRef<HTMLDivElement>(null);

  // Initialize randomized quiz
  const [quizData, setQuizData] = useState<RandomizedQuestion[]>([]);

  useEffect(() => {
    if (selectedProfessor?.quiz) {
      playSound('/sounds/postit.mp3');
      const shuffledQuestions = [...selectedProfessor.quiz].sort(() => Math.random() - 0.5).map(q => {
        const ops: RandomizedOption[] = q.options.map((opt, i) => ({
          text: opt,
          isCorrect: i === q.answer,
          originalIndex: i
        }));
        return {
          ...q,
          options: ops.sort(() => Math.random() - 0.5),
          userAnswerIndex: null
        };
      });
      setQuizData(shuffledQuestions);
    }
  }, [selectedProfessor]);

  const handleOptionSelect = (idx: number) => {
    if (isReviewing) return;
    if (quizData[current].userAnswerIndex !== null) return; // Wait, allow changing!

    // User wants to change answer before confirming
    setQuizData(prev => {
      const copy = [...prev];
      copy[current].userAnswerIndex = idx;
      return copy;
    });
  };

  const handleConfirm = () => {
    if (quizData[current].userAnswerIndex === null) return;

    const isCorrect = quizData[current].options[quizData[current].userAnswerIndex!].isCorrect;
    if (isCorrect) {
      playSound('/sounds/right-pen.mp3');
    } else {
      playSound('/sounds/wrong-pen.mp3');
    }

    setTimeout(() => {
      if (current < quizData.length - 1) {
        playSound('/sounds/postit.mp3');
        setCurrent(current + 1);
        // Scroll paper to top slightly
        if (paperRef.current) paperRef.current.scrollTop = 0;
      } else {
        triggerGrading();
      }
    }, 1200);
  };

  const triggerGrading = () => {
    setIsGrading(true);
    playSound('/sounds/drum-suspense.mp3');

    setTimeout(() => {
      setIsGrading(false);
      setShowResult(true);

      const rScore = quizData.filter(q => q.userAnswerIndex !== null && q.options[q.userAnswerIndex].isCorrect).length;
      if (rScore >= 5) {
        playSound('/sounds/aproved.mp3');
      } else {
        playSound('/sounds/reproved.mp3');
      }
    }, 5000);
  };

  if (!selectedProfessor || quizData.length === 0) return null;

  const score = quizData.filter(q => q.userAnswerIndex !== null && q.options[q.userAnswerIndex].isCorrect).length;
  const isAproved = score >= 5;

  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center p-4 relative font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/quiz-background.png')" }}
      />

      {/* Stationery decorations */}
      {(!isGrading && !showResult || isReviewing) && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[95vh]">
            <img src="/assets/black-pen.png" className="absolute top-[10%] -left-[10%] md:-left-[15%] w-32 md:w-48 rotate-[-15deg] drop-shadow-2xl" />
            <img src="/assets/pencil.png" className="absolute bottom-[20%] -left-[5%] md:-left-[12%] w-24 md:w-32 rotate-[25deg] drop-shadow-2xl" />
            <img src="/assets/eraser.png" className="absolute top-[5%] -right-[5%] md:-right-[10%] w-16 md:w-24 rotate-[45deg] drop-shadow-xl" />
            <img src="/assets/blue-pen.png" className="absolute bottom-[10%] -right-[10%] md:-right-[15%] w-32 md:w-48 rotate-[-35deg] drop-shadow-2xl" />
          </div>
        </div>
      )}

      {/* Screen Shake effect for grading result via global animation in React */}
      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .stamp-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      <AnimatePresence>
        {isGrading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center text-white text-center p-8 backdrop-blur-md"
          >
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
              <Loader2 size={100} className="animate-spin text-yellow-500 mb-8" />
            </motion.div>
            <h2 className="text-3xl font-pixel mb-6 uppercase tracking-tighter text-yellow-500">Protocolo de Correção Ativo</h2>
            <div className="w-full max-w-md h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-yellow-500 shadow-[0_0_20px_yellow]"
              />
            </div>
            <p className="font-mono text-cyan-400 text-lg italic max-w-md">
              "Computando erros lógicos e acertos acidentais..."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {(!showResult || isReviewing) && !isGrading ? (
          <div className="perspective-1000 w-full max-w-2xl h-[95vh] mt-4 z-20">
            <motion.div
              ref={paperRef}
              initial={{ rotateX: 20, y: 100, opacity: 0, rotateZ: -2 }}
              animate={{ rotateX: 5, y: 0, opacity: 1, rotateZ: isReviewing ? 0 : -2 }}
              className="w-full h-full bg-[#fdfbf7] shadow-[20px_20px_40px_rgba(0,0,0,0.5)] p-8 md:p-12 relative font-serif border-t-[12px] border-blue-900 flex flex-col overflow-y-auto"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-24 h-24 border-4 border-gray-200 flex items-center justify-center text-gray-200 font-bold text-xs uppercase text-center italic rotate-12">FOTO<br />MATRÍCULA</div>
              </div>

              {/* Cabeçalho */}
              <div className="border-2 border-black p-6 mb-8 space-y-2 text-[10px] md:text-xs">
                <div className="flex justify-between font-black text-sm">
                  <span>UERN - CAMPUS NATAL - SETOR IV (INFORMÁTICA)</span>
                  <span className="text-red-600">VIA ÚNICA DO DOCENTE</span>
                </div>
                <div className="flex justify-between border-t border-black pt-2">
                  <span>DOCENTE AVALIADOR: {selectedProfessor.name.toUpperCase()}</span>
                  <span>TURNO: {new Date().getHours() < 18 ? 'DIURNO' : 'NOTURNO'}</span>
                </div>
                <div className="flex justify-between border-t border-black pt-2">
                  <span className="flex items-center gap-2">MATRÍCULA ALUNO: 2025.1.{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</span>
                  <span>DURAÇÃO: 4 ANOS (OU ATÉ ONDE O CAFÉ DURAR)</span>
                </div>
                <div className="bg-blue-900 text-white p-2 text-center font-black mt-3 text-sm tracking-widest uppercase">
                  {isReviewing ? "GABARITO E RESULTADO DA AVALIAÇÃO" : "PROVA FINAL DE INTEGRALIZAÇÃO DE SANIDADE ACADÊMICA"}
                </div>
              </div>

              {/* Content */}
              {!isReviewing ? (
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl md:text-2xl font-black mb-10 leading-tight border-b-2 border-black pb-4">
                    QUESTÃO {current + 1}: {quizData[current].question}
                  </h2>
                  <div className="space-y-6 flex-1">
                    {quizData[current].options.map((opt, i) => (
                      <div key={i} className="relative flex items-center cursor-pointer group" onClick={() => handleOptionSelect(i)}>
                        {quizData[current].userAnswerIndex === i && (
                          <div className="absolute -left-12 -top-2 z-20 pointer-events-none opacity-50">
                            <svg className="w-16 h-16" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="#6b7280" strokeWidth="4" strokeDasharray="5,5" />
                            </svg>
                          </div>
                        )}
                        <div className={`w-10 h-10 border-2 border-black mr-4 flex items-center justify-center font-black font-sans transition-colors ${quizData[current].userAnswerIndex === i ? 'bg-gray-200' : 'group-hover:bg-gray-100'}`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className={`text-base md:text-lg transition-all ${quizData[current].userAnswerIndex === i ? 'font-bold' : 'group-hover:font-bold'}`}>{opt.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleConfirm}
                      disabled={quizData[current].userAnswerIndex === null}
                      className="px-6 py-3 bg-blue-900 text-white font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-colors"
                    >
                      {current === quizData.length - 1 ? "Finalizar Avaliação" : "Confirmar Resposta"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 space-y-12 pb-8">
                  {/* Review Mode View */}
                  {quizData.map((q, qIndex) => (
                    <div key={qIndex} className="border-b-2 border-black pb-8 last:border-0 relative">
                      {/* Result Stamp per question */}
                      <div className="absolute top-0 right-0 z-10 opacity-70 pointer-events-none">
                        {q.userAnswerIndex !== null && q.options[q.userAnswerIndex].isCorrect ? (
                          <div className="text-green-600 font-black text-2xl uppercase border-4 border-green-600 px-4 py-1 rotate-[-15deg] font-mono tracking-widest inline-block skew-x-12">
                            CORRETO
                          </div>
                        ) : (
                          <div className="text-red-600 font-black text-2xl uppercase border-4 border-red-600 px-4 py-1 rotate-[10deg] font-mono tracking-widest inline-block -skew-x-12">
                            ERRADO
                          </div>
                        )}
                      </div>

                      <h2 className="text-lg font-black mb-6 leading-tight pr-32">
                        {qIndex + 1}. {q.question}
                      </h2>
                      <div className="space-y-4">
                        {q.options.map((opt, i) => {
                          const isSelected = q.userAnswerIndex === i;
                          const isCorrect = opt.isCorrect;

                          return (
                            <div key={i} className="relative flex items-center">
                              {/* Render pen marks */}
                              {isSelected && isCorrect && <PenMark type="circle" color="#1e40af" />}
                              {isSelected && !isCorrect && <PenMark type="cross" color="#dc2626" />}
                              {!isSelected && isCorrect && <PenMark type="circle" color="#16a34a" delay={0.2} />}

                              <div className="w-8 h-8 border-2 border-black mr-4 flex items-center justify-center font-bold font-sans">
                                {String.fromCharCode(65 + i)}
                              </div>
                              <span className={`text-sm ${isSelected ? 'font-bold' : ''} ${isCorrect ? 'text-green-800' : ''}`}>
                                {opt.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-8 pt-4">
                    <button onClick={() => setIsReviewing(false)} className="px-8 py-4 bg-gray-900 text-white font-black uppercase tracking-widest hover:bg-black transition-colors shadow-lg">
                      Voltar ao Resultado
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-dotted border-gray-400 text-center text-[10px] opacity-40 uppercase font-bold tracking-widest">
                Esta avaliação é propriedade intelectual da UERN. Reprodução proibida (mesmo por prints).
              </div>
            </motion.div>
          </div>
        ) : showResult && !isReviewing ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            className={`w-full max-w-xl bg-white p-12 shadow-[30px_30px_0_rgba(0,0,0,0.8)] text-center font-serif relative z-50 border-[10px] border-black ${showResult ? 'stamp-shake' : ''}`}
            onAnimationStart={() => playSound('/sounds/stamp.mp3')}
          >
            <div className={`absolute -top-12 -left-12 text-black p-8 rounded-full font-black text-3xl rotate-[-15deg] shadow-2xl border-4 border-white ${isAproved ? 'bg-green-500' : 'bg-red-500'} bg-opacity-90`}>
              STATUS:<br />{isAproved ? "APROVADO" : "REPROVADO"}
            </div>

            <h1 className="text-5xl font-black mb-8 underline tracking-tighter uppercase italic leading-none">Resultado do Diagnóstico</h1>

            <div className="flex justify-around items-center mb-10 bg-gray-50 p-8 border-4 border-double border-gray-200">
              <div className="text-center">
                <p className="text-xs uppercase font-black text-gray-500 tracking-widest mb-2">Nota de Integralização</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.8, 1] }}
                  transition={{ delay: 0.3 }}
                  className={`text-[9rem] leading-none font-black ${isAproved ? 'text-blue-800' : 'text-red-600'}`}
                >
                  {score.toFixed(1)}
                </motion.div>
              </div>
              <div className="space-y-4 text-left border-l-4 border-gray-100 pl-8">
                <div className="flex items-center gap-3 text-sm font-black"><Coffee size={18} className="text-brown-600" /> {score >= 8 ? "Café de Especialidade" : "Pó de Qualidade Duvidosa"}</div>
                <div className="flex items-center gap-3 text-sm font-black"><Skull size={18} className="text-red-500" /> {score <= 3 ? "Risco de DP Eterna" : "Sanidade nos Limites"}</div>
                <div className="flex items-center gap-3 text-sm font-black"><Zap size={18} className="text-yellow-500" /> {score === 10 ? "QI de Reitor" : "Nível Calouro"}</div>
              </div>
            </div>

            <div className="bg-black text-white p-8 mb-10 italic text-lg font-serif border-l-[12px] border-yellow-500 shadow-inner">
              "{score >= 8 ? "Impressionante. Você claramente hackeou o sistema ou é um gênio incompreendido." :
                isAproved ? "Passou raspando. O conselho de classe decidiu não te reprovar só para não ter que te ver no próximo semestre." :
                  "O sistema sugere que você troque de curso para algo menos estressante, como 'Doma de Dragões' ou 'Vendedor de Picolé na Antártida'."}"
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                {isAproved ? (
                  <button onClick={() => { advanceStage(2); navigate('/hub'); }} className="flex-1 bg-blue-900 text-white py-5 font-black flex items-center justify-center gap-2 hover:bg-black transition-all shadow-[8px_8px_0_rgba(0,0,0,0.3)] uppercase tracking-[0.1em] italic text-sm md:text-base">
                    PROSSEGUIR <ArrowRight size={20} />
                  </button>
                ) : (
                  <button onClick={() => window.location.reload()} className="flex-1 bg-red-600 text-white py-5 font-black flex items-center justify-center gap-2 hover:bg-black transition-all shadow-[8px_8px_0_rgba(0,0,0,0.3)] uppercase tracking-widest text-sm md:text-base">
                    <RotateCcw size={20} /> TENTAR NOVAMENTE
                  </button>
                )}
                <button onClick={() => { playSound('/sounds/postit.mp3'); setIsReviewing(true); }} className="bg-gray-200 text-black border-4 border-gray-400 py-5 px-4 font-black flex items-center justify-center gap-2 hover:bg-gray-300 transition-all shadow-[8px_8px_0_rgba(0,0,0,0.3)] uppercase tracking-widest text-sm md:text-base">
                  <FileSearch size={20} /> REVISAR
                </button>
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-black uppercase italic mt-4">
                <span>Cód: UERN_2025_RES_{score}</span>
                <span className="animate-pulse">Sincronizando com SIGAA...</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
export default Quiz;
