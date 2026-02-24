import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, Coffee, Skull, Zap, FileSearch, CheckCircle2, XCircle } from 'lucide-react';
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
  userAnswerIndex: number | null;
  confirmed: boolean;
}

// Professor photo map
const professorPhotos: Record<string, string> = {
  raul: '/assets/raul_photo.png',
  camila: '/assets/camila_photo.png',
};

const PenMark: React.FC<{ type: 'circle' | 'cross'; color: string }> = ({ type, color }) => (
  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.85 }} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center" style={{ overflow: 'visible' }}>
    <svg className="w-14 h-14" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      {type === 'circle' ? (
        <motion.path d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
      ) : (
        <>
          <motion.path d="M 15,15 L 85,85" stroke={color} strokeWidth="6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
          <motion.path d="M 85,15 L 15,85" stroke={color} strokeWidth="6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.15, duration: 0.3 }} />
        </>
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
  const [isTransitioning, setIsTransitioning] = useState(false); // prevent double-click
  const [quizData, setQuizData] = useState<RandomizedQuestion[]>([]);
  const [gradingStep, setGradingStep] = useState(0);
  const paperRef = useRef<HTMLDivElement>(null);

  // Grading messages that cycle
  const gradingMessages = [
    "Analisando caligrafia suspeita...",
    "Comparando com gabarito secreto...",
    "Consultando oráculo acadêmico...",
    "Verificando cola no punho...",
    "Calculando probabilidade de chute...",
  ];

  useEffect(() => {
    if (selectedProfessor?.quiz) {
      playSound('/sounds/postit.mp3');
      const shuffled = [...selectedProfessor.quiz]
        .sort(() => Math.random() - 0.5)
        .map(q => {
          const ops: RandomizedOption[] = q.options.map((opt, i) => ({
            text: opt,
            isCorrect: i === q.answer,
            originalIndex: i
          }));
          return { ...q, options: ops.sort(() => Math.random() - 0.5), userAnswerIndex: null, confirmed: false };
        });
      setQuizData(shuffled);
    }
  }, [selectedProfessor]);

  // Cycle grading messages
  useEffect(() => {
    if (!isGrading) return;
    const iv = setInterval(() => setGradingStep(s => (s + 1) % gradingMessages.length), 1200);
    return () => clearInterval(iv);
  }, [isGrading]);

  const handleOptionSelect = (idx: number) => {
    if (isReviewing || isTransitioning) return;
    if (quizData[current].confirmed) return; // already confirmed, can't change
    // Allow changing before confirm
    setQuizData(prev => {
      const copy = [...prev];
      copy[current] = { ...copy[current], userAnswerIndex: idx };
      return copy;
    });
  };

  const handleConfirm = () => {
    if (quizData[current].userAnswerIndex === null || isTransitioning) return;
    if (quizData[current].confirmed) return;

    // Lock answer
    setQuizData(prev => {
      const copy = [...prev];
      copy[current] = { ...copy[current], confirmed: true };
      return copy;
    });
    setIsTransitioning(true);

    const isCorrect = quizData[current].options[quizData[current].userAnswerIndex!].isCorrect;
    playSound(isCorrect ? '/sounds/right-pen.mp3' : '/sounds/wrong-pen.mp3');

    setTimeout(() => {
      if (current < quizData.length - 1) {
        playSound('/sounds/postit.mp3');
        setCurrent(current + 1);
        if (paperRef.current) paperRef.current.scrollTop = 0;
      } else {
        triggerGrading();
      }
      setIsTransitioning(false);
    }, 1200);
  };

  const triggerGrading = () => {
    setIsGrading(true);
    setGradingStep(0);
    playSound('/sounds/drum-suspense.mp3');

    setTimeout(() => {
      setIsGrading(false);
      setShowResult(true);
      const rScore = quizData.filter(q => q.confirmed && q.userAnswerIndex !== null && q.options[q.userAnswerIndex].isCorrect).length;
      playSound(rScore >= 5 ? '/sounds/aproved.mp3' : '/sounds/reproved.mp3');
    }, 5000);
  };

  const handleRetry = () => {
    // Reset state instead of reloading
    setCurrent(0);
    setShowResult(false);
    setIsGrading(false);
    setIsReviewing(false);
    setIsTransitioning(false);
    if (selectedProfessor?.quiz) {
      playSound('/sounds/postit.mp3');
      const shuffled = [...selectedProfessor.quiz]
        .sort(() => Math.random() - 0.5)
        .map(q => {
          const ops: RandomizedOption[] = q.options.map((opt, i) => ({
            text: opt,
            isCorrect: i === q.answer,
            originalIndex: i
          }));
          return { ...q, options: ops.sort(() => Math.random() - 0.5), userAnswerIndex: null, confirmed: false };
        });
      setQuizData(shuffled);
    }
  };

  if (!selectedProfessor || quizData.length === 0) return null;

  const score = quizData.filter(q => q.confirmed && q.userAnswerIndex !== null && q.options[q.userAnswerIndex].isCorrect).length;
  const isAproved = score >= 5;
  const profPhoto = professorPhotos[selectedProfessor.id];

  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center p-2 relative font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/quiz-background.png')" }} />

      {/* Stationery - bigger sizes */}
      {(!isGrading && !showResult || isReviewing) && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[95vh]">
            <img src="/assets/black-pen.png" className="absolute top-[5%] -left-[8%] md:-left-[18%] w-48 md:w-72 rotate-[-20deg] drop-shadow-[4px_8px_12px_rgba(0,0,0,0.6)]" alt="" />
            <img src="/assets/pencil.png" className="absolute bottom-[15%] -left-[3%] md:-left-[14%] w-40 md:w-56 rotate-[30deg] drop-shadow-[4px_8px_12px_rgba(0,0,0,0.6)]" alt="" />
            <img src="/assets/eraser.png" className="absolute top-[3%] -right-[3%] md:-right-[12%] w-28 md:w-40 rotate-[40deg] drop-shadow-[3px_6px_10px_rgba(0,0,0,0.5)]" alt="" />
            <img src="/assets/blue-pen.png" className="absolute bottom-[8%] -right-[8%] md:-right-[18%] w-48 md:w-72 rotate-[-30deg] drop-shadow-[4px_8px_12px_rgba(0,0,0,0.6)]" alt="" />
          </div>
        </div>
      )}

      {/* Shake keyframes */}
      <style>{`
        @keyframes stamp-slam {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-4px, -3px) rotate(-1deg); }
          20% { transform: translate(4px, 2px) rotate(1deg); }
          30% { transform: translate(-3px, 3px) rotate(0deg); }
          40% { transform: translate(3px, -2px) rotate(1deg); }
          50% { transform: translate(-2px, 1px); }
          60% { transform: translate(2px, -1px); }
          70% { transform: translate(-1px, 1px); }
        }
        .stamp-shake { animation: stamp-slam 0.6s ease-out; }
      `}</style>

      {/* ═══ Grading Screen ═══ */}
      <AnimatePresence>
        {isGrading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-center p-8"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('/assets/quiz-background.png')", backgroundSize: 'cover' }} />

            {/* Red pen drawing an animated checkmark */}
            <motion.div className="mb-6">
              <svg width="100" height="100" viewBox="0 0 120 120" style={{ overflow: 'visible' }}>
                {/* Paper circle */}
                <circle cx="60" cy="60" r="55" fill="#fdfbf7" stroke="#c0c0c0" strokeWidth="2" />
                {/* Red pen correction marks */}
                <motion.path
                  d="M 30 55 L 50 75 L 95 30"
                  fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.4, 0.7, 1] }}
                />
                <motion.path
                  d="M 25 40 L 95 40"
                  fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" opacity="0.3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              </svg>
            </motion.div>

            <h2 className="text-2xl md:text-3xl mb-2 uppercase tracking-wide text-white/90 font-serif italic">
              Corrigindo sua prova...
            </h2>
            <p className="text-sm text-white/40 font-serif mb-6">Protocolo de Correção Ativo</p>

            {/* Progress bar styled like a pencil line */}
            <div className="w-full max-w-md h-1 bg-white/10 mb-8 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="h-full bg-red-500"
              />
              <div className="absolute -top-3 left-0 right-0 flex justify-between text-[9px] text-white/20 font-serif">
                <span>Questão 1</span>
                <span>Questão {quizData.length}</span>
              </div>
            </div>

            {/* Cycling messages */}
            <AnimatePresence mode="wait">
              <motion.p
                key={gradingStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-serif text-base text-white/50 italic max-w-md"
              >
                "{gradingMessages[gradingStep]}"
              </motion.p>
            </AnimatePresence>

            {/* Question dots */}
            <div className="mt-8 flex gap-2">
              {quizData.map((q, i) => {
                const answered = q.confirmed && q.userAnswerIndex !== null;
                const correct = answered && q.options[q.userAnswerIndex!].isCorrect;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (i * 4.5) / quizData.length }}
                    className={`w-3 h-3 rounded-full border ${answered ? (correct ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400') : 'bg-white/10 border-white/20'
                      }`}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Main Content ═══ */}
      <AnimatePresence mode="wait">
        {/* ─── Paper View (Quiz + Review) ─── */}
        {(!showResult || isReviewing) && !isGrading ? (
          <div className="perspective-1000 w-full max-w-xl h-[92vh] z-20">
            <motion.div
              ref={paperRef}
              initial={{ rotateX: 15, y: 80, opacity: 0, rotateZ: -3 }}
              animate={{ rotateX: 4, y: 0, opacity: 1, rotateZ: isReviewing ? 0 : -3 }}
              className="w-full h-full bg-[#fdfbf7] shadow-[15px_15px_30px_rgba(0,0,0,0.5)] px-6 py-5 md:px-8 md:py-6 relative font-serif border-t-[10px] border-blue-900 flex flex-col overflow-y-auto"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Professor photo */}
              <div className="absolute top-2 right-3 z-10">
                {profPhoto ? (
                  <img src={profPhoto} className="w-16 h-20 md:w-20 md:h-24 object-cover border-2 border-gray-300 rotate-[8deg] shadow-md" alt="foto docente" />
                ) : (
                  <div className="w-16 h-20 md:w-20 md:h-24 border-2 border-gray-200 flex items-center justify-center text-gray-300 font-bold text-[8px] uppercase text-center italic rotate-[8deg]">FOTO<br />DOCENTE</div>
                )}
              </div>

              {/* Header - more compact */}
              <div className="border-2 border-black p-3 md:p-4 mb-4 space-y-1 text-[8px] md:text-[10px]">
                <div className="flex justify-between font-black text-[10px] md:text-xs">
                  <span>UERN - CAMPUS NATAL - SETOR IV</span>
                  <span className="text-red-600">VIA ÚNICA</span>
                </div>
                <div className="flex justify-between border-t border-black pt-1">
                  <span>DOCENTE: {selectedProfessor.name.toUpperCase()}</span>
                  <span>TURNO: {new Date().getHours() < 18 ? 'DIURNO' : 'NOTURNO'}</span>
                </div>
                <div className="bg-blue-900 text-white p-1.5 text-center font-black mt-2 text-[9px] md:text-[11px] tracking-wider uppercase">
                  {isReviewing ? "GABARITO DA AVALIAÇÃO" : "PROVA FINAL — SANIDADE ACADÊMICA"}
                </div>
              </div>

              {/* ─── Quiz Questions ─── */}
              {!isReviewing ? (
                <div className="flex-1 flex flex-col min-h-0">
                  <h2 className="text-base md:text-lg font-black mb-4 leading-tight border-b-2 border-black pb-2">
                    QUESTÃO {current + 1}/{quizData.length}: {quizData[current].question}
                  </h2>
                  <div className="space-y-3 flex-1">
                    {quizData[current].options.map((opt, i) => {
                      const isSelected = quizData[current].userAnswerIndex === i;
                      const isConfirmed = quizData[current].confirmed;
                      const isCorrectOption = opt.isCorrect;

                      return (
                        <div
                          key={i}
                          className={`relative flex items-center cursor-pointer group ${isConfirmed ? 'pointer-events-none' : ''}`}
                          onClick={() => handleOptionSelect(i)}
                        >
                          {/* Letter square wrapper - relative so marks overlay it */}
                          <div className="relative w-8 h-8 mr-3 shrink-0">
                            {/* Visual feedback AFTER confirm - on top of square */}
                            {isConfirmed && isSelected && isCorrectOption && <PenMark type="circle" color="#1e40af" />}
                            {isConfirmed && isSelected && !isCorrectOption && <PenMark type="cross" color="#dc2626" />}

                            {/* Selection indicator BEFORE confirm - on top of square */}
                            {isSelected && !isConfirmed && (
                              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center opacity-50">
                                <svg className="w-10 h-10" viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="42" fill="none" stroke="#4b5563" strokeWidth="3" strokeDasharray="8,6" />
                                </svg>
                              </div>
                            )}

                            <div className={`w-full h-full border-2 border-black flex items-center justify-center font-black font-sans text-sm transition-colors
                            ${isSelected && !isConfirmed ? 'bg-blue-100' : ''}
                            ${isConfirmed && isSelected && isCorrectOption ? 'bg-green-100' : ''}
                            ${isConfirmed && isSelected && !isCorrectOption ? 'bg-red-100' : ''}
                            ${!isSelected && !isConfirmed ? 'group-hover:bg-gray-100' : ''}
                          `}>
                              {String.fromCharCode(65 + i)}
                            </div>
                          </div>
                          <span className={`text-sm md:text-base transition-all ${isSelected ? 'font-bold' : 'group-hover:font-semibold'}`}>
                            {opt.text}
                          </span>

                          {/* Correct/Wrong icon after confirm */}
                          {isConfirmed && isSelected && (
                            <span className="ml-auto shrink-0">
                              {isCorrectOption
                                ? <CheckCircle2 size={18} className="text-green-600" />
                                : <XCircle size={18} className="text-red-500" />
                              }
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleConfirm}
                      disabled={quizData[current].userAnswerIndex === null || isTransitioning || quizData[current].confirmed}
                      className="px-5 py-2 bg-blue-900 text-white text-sm font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black transition-colors"
                    >
                      {current === quizData.length - 1 ? "Finalizar" : "Confirmar"}
                    </button>
                  </div>
                </div>
              ) : (
                /* ─── Review Mode ─── */
                <div className="flex-1 space-y-6 pb-4">
                  {quizData.map((q, qIndex) => (
                    <div key={qIndex} className="border-b border-gray-300 pb-4 last:border-0 relative">
                      <div className="absolute top-0 right-0 z-10 opacity-60 pointer-events-none">
                        {q.userAnswerIndex !== null && q.options[q.userAnswerIndex].isCorrect ? (
                          <div className="text-green-600 font-black text-sm uppercase border-2 border-green-600 px-2 py-0.5 rotate-[-12deg] font-mono tracking-wider">CORRETO</div>
                        ) : (
                          <div className="text-red-600 font-black text-sm uppercase border-2 border-red-600 px-2 py-0.5 rotate-[8deg] font-mono tracking-wider">ERRADO</div>
                        )}
                      </div>
                      <h3 className="text-sm font-black mb-3 leading-tight pr-20">{qIndex + 1}. {q.question}</h3>
                      <div className="space-y-2">
                        {q.options.map((opt, i) => {
                          const isSel = q.userAnswerIndex === i;
                          const isCor = opt.isCorrect;
                          return (
                            <div key={i} className="flex items-center gap-2 text-xs md:text-sm pl-2">
                              <div className={`w-6 h-6 border border-black flex items-center justify-center font-bold font-sans text-xs shrink-0 ${isCor ? 'bg-green-100' : ''} ${isSel && !isCor ? 'bg-red-100' : ''}`}>
                                {String.fromCharCode(65 + i)}
                              </div>
                              <span className={`${isSel ? 'font-bold' : ''} ${isCor ? 'text-green-700' : ''} ${isSel && !isCor ? 'line-through text-red-500' : ''}`}>
                                {opt.text}
                              </span>
                              {isSel && isCor && <CheckCircle2 size={14} className="text-green-600 ml-auto shrink-0" />}
                              {isSel && !isCor && <XCircle size={14} className="text-red-500 ml-auto shrink-0" />}
                              {!isSel && isCor && <CheckCircle2 size={14} className="text-green-400 ml-auto shrink-0 opacity-50" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center pt-2">
                    <button onClick={() => setIsReviewing(false)} className="px-6 py-2 bg-gray-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors">
                      Voltar ao Resultado
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-dotted border-gray-300 text-center text-[8px] opacity-30 uppercase font-bold tracking-widest">
                Propriedade intelectual da UERN. Reprodução proibida.
              </div>
            </motion.div>
          </div>

        ) : showResult && !isReviewing ? (
          /* ─── Result Screen — inside same paper style ─── */
          <div className="perspective-1000 w-full max-w-xl h-[92vh] z-20">
            <motion.div
              initial={{ rotateX: 15, y: 80, opacity: 0, rotateZ: -3 }}
              animate={{ rotateX: 4, y: 0, opacity: 1, rotateZ: -3 }}
              className="w-full h-full bg-[#fdfbf7] shadow-[15px_15px_30px_rgba(0,0,0,0.5)] px-6 py-5 md:px-8 md:py-6 relative font-serif border-t-[10px] border-blue-900 flex flex-col overflow-y-auto stamp-shake"
              style={{ transformStyle: 'preserve-3d' }}
              onAnimationStart={() => playSound('/sounds/stamp.mp3')}
            >
              {/* Stamp badge */}
              <motion.div
                initial={{ scale: 3, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: -15 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 15 }}
                className={`absolute top-4 right-4 text-white px-4 py-3 rounded-full font-black text-lg shadow-2xl border-4 border-white/50 z-10 ${isAproved ? 'bg-green-600' : 'bg-red-600'}`}
              >
                {isAproved ? "✓ APROVADO" : "✗ REPROVADO"}
              </motion.div>

              {/* Header */}
              <div className="border-2 border-black p-3 md:p-4 mb-6 space-y-1 text-[8px] md:text-[10px]">
                <div className="flex justify-between font-black text-[10px] md:text-xs">
                  <span>UERN - CAMPUS NATAL - SETOR IV</span>
                  <span className="text-red-600">RESULTADO</span>
                </div>
                <div className="flex justify-between border-t border-black pt-1">
                  <span>DOCENTE: {selectedProfessor.name.toUpperCase()}</span>
                </div>
                <div className="bg-blue-900 text-white p-1.5 text-center font-black mt-2 text-[9px] md:text-[11px] tracking-wider uppercase">
                  RESULTADO FINAL DA AVALIAÇÃO
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-black mb-6 underline tracking-tight uppercase italic leading-none text-center">Resultado do Diagnóstico</h1>

              <div className="flex items-center justify-center gap-6 mb-6 bg-gray-50 p-5 border-4 border-double border-gray-200">
                <div className="text-center">
                  <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">Nota de Integralização</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1] }}
                    transition={{ delay: 0.3 }}
                    className={`text-7xl md:text-8xl leading-none font-black ${isAproved ? 'text-blue-800' : 'text-red-600'}`}
                  >
                    {score.toFixed(1)}
                  </motion.div>
                </div>
                <div className="space-y-3 text-left border-l-4 border-gray-100 pl-5">
                  <div className="flex items-center gap-2 text-sm font-bold"><Coffee size={16} /> {score >= 8 ? "Café de Especialidade" : "Pó de Qualidade Duvidosa"}</div>
                  <div className="flex items-center gap-2 text-sm font-bold"><Skull size={16} className="text-red-500" /> {score <= 3 ? "Risco de DP Eterna" : "Sanidade nos Limites"}</div>
                  <div className="flex items-center gap-2 text-sm font-bold"><Zap size={16} className="text-yellow-500" /> {score === 10 ? "QI de Reitor" : "Nível Calouro"}</div>
                </div>
              </div>

              <div className="bg-black text-white p-5 mb-6 italic text-base font-serif border-l-[8px] border-yellow-500 text-left">
                "{score >= 8 ? "Impressionante. Você claramente hackeou o sistema ou é um gênio incompreendido." :
                  isAproved ? "Passou raspando. O conselho decidiu não te reprovar pra não ter que te ver de novo." :
                    "Sugestão: troque de curso para algo como 'Doma de Dragões' ou 'Vendedor de Picolé na Antártida'."}"
              </div>

              <div className="flex gap-3 mt-auto">
                {isAproved ? (
                  <button onClick={() => { advanceStage(2); navigate('/hub'); }} className="flex-1 bg-blue-900 text-white py-4 font-black flex items-center justify-center gap-2 hover:bg-black transition-all shadow-[6px_6px_0_rgba(0,0,0,0.3)] uppercase tracking-wider text-sm">
                    PROSSEGUIR <ArrowRight size={18} />
                  </button>
                ) : (
                  <button onClick={handleRetry} className="flex-1 bg-red-600 text-white py-4 font-black flex items-center justify-center gap-2 hover:bg-black transition-all shadow-[6px_6px_0_rgba(0,0,0,0.3)] uppercase tracking-wider text-sm">
                    <RotateCcw size={18} /> TENTAR NOVAMENTE
                  </button>
                )}
                <button onClick={() => { playSound('/sounds/postit.mp3'); setIsReviewing(true); }} className="bg-gray-200 text-black border-2 border-gray-400 py-4 px-4 font-black flex items-center justify-center gap-2 hover:bg-gray-300 transition-all shadow-[6px_6px_0_rgba(0,0,0,0.3)] uppercase tracking-wider text-sm">
                  <FileSearch size={18} /> REVISAR
                </button>
              </div>

              <div className="flex justify-between items-center text-[8px] text-gray-400 font-bold uppercase italic mt-4 pt-2 border-t border-dotted border-gray-300">
                <span>UERN_2025_RES_{score}</span>
                <span className="animate-pulse">Sincronizando com SIGAA...</span>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
export default Quiz;
