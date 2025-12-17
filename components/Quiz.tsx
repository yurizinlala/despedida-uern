
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { playTone, playPaperSound, playBiosBeep, playProcessingNoise, playGlitchSound, playSuccessChime } from '../utils/audio';
import { ArrowRight, Coffee, FileText, RotateCcw, LogOut, Loader2 } from 'lucide-react';

const quizQuestions = [
  { id: 1, question: "O que significa a sigla P.O.G.?", options: ["Processamento Gráfico", "Programação Orientada a Gambiarra", "Protocolo Global", "Pequenos Objetos"], answer: 1 },
  { id: 2, question: "Desculpa padrão nº 1 para atrasos?", options: ["Cachorro comeu SSD", "GitHub caiu", "Pneu do ônibus", "Windows atualizando"], answer: 2 },
  { id: 3, question: "Em qual semestre o aluno perde o brilho?", options: ["1º Dia (Cálculo)", "3º (ED)", "5º (SO)", "TCC"], answer: 0 },
  { id: 4, question: "Atalho salvador da graduação?", options: ["Alt+F4", "Ctrl+Z", "Ctrl+C/V", "Del"], answer: 2 },
  { id: 5, question: "O que acontece se compilar de primeira?", options: ["Premio Turing", "Servidor explode", "Não salvou arquivo", "Aprovado no TCC"], answer: 2 },
  { id: 6, question: "Combustível biológico da prova?", options: ["Água", "Café e Energético", "Lágrimas", "Sono"], answer: 1 },
  { id: 7, question: "Onde o aluno aprende a programar?", options: ["Documentação", "Livros", "Indianos no Youtube", "StackOverflow"], answer: 2 },
  { id: 8, question: "Sensação ao ver o slide de revisão?", options: ["Alívio", "Medo", "Vontade de trancar", "Desistência"], answer: 1 },
  { id: 9, question: "Nome do arquivo final do TCC?", options: ["tcc.pdf", "tcc_final.pdf", "tcc_final_agora_vai_PELOAMOR.pdf", "projeto.pdf"], answer: 2 },
  { id: 10, question: "Reação à prova com consulta?", options: ["Felicidade", "Desespero", "Indiferença", "Dúvida"], answer: 1 }
];

const gradingLines = [
  "Iniciando correção automática...",
  "Consultando gabarito secreto...",
  "Ignorando faltas no primeiro semestre...",
  "Verificando plágio no ChatGPT...",
  "Arredondando notas de 4.8 para 5.0...",
  "Finalizando diagnóstico emocional..."
];

const PenMark: React.FC<{ type: 'circle' | 'cross'; color: string }> = ({ type, color }) => (
  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} className="absolute -left-12 -top-2 z-20 pointer-events-none">
    <svg className="w-16 h-16" viewBox="0 0 100 100">
      {type === 'circle' ? (
        <motion.path d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" fill="none" stroke={color} strokeWidth="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
      ) : (
        <><motion.path d="M 20,20 L 80,80" stroke={color} strokeWidth="8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} /><motion.path d="M 80,20 L 20,80" stroke={color} strokeWidth="8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} /></>
      )}
    </svg>
  </motion.div>
);

const Quiz: React.FC = () => {
  const { selectedProfessor, advanceStage } = useUser();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradingLineIdx, setGradingLineIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [enteringRoom, setEnteringRoom] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setEnteringRoom(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOption = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quizQuestions[current].answer) {
      setScore(s => s + 1);
      playTone(600, 'sine', 0.1);
    } else {
      playTone(200, 'sawtooth', 0.2);
    }
    setTimeout(() => {
      if (current < 9) {
        setCurrent(current + 1);
        setSelected(null);
        playPaperSound();
      } else {
        startGrading();
      }
    }, 1000);
  };

  const startGrading = () => {
    setIsGrading(true);
    playProcessingNoise();
    let line = 0;
    const interval = setInterval(() => {
      if (line < gradingLines.length - 1) {
        line++;
        setGradingLineIdx(line);
        playBiosBeep();
        if (line % 2 === 0) playGlitchSound();
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsGrading(false);
          setShowResult(true);
          playBiosBeep();
          if (score >= 5) playSuccessChime(); else playGlitchSound();
        }, 1500);
      }
    }, 1200); // Slower for more suspense
  };

  if (!selectedProfessor) return null;

  return (
    <div className="h-screen w-full bg-[#3d2b1f] overflow-hidden flex items-center justify-center p-4 cursor-auto relative font-sans">
      <div className="absolute inset-0 opacity-60 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>
      
      <AnimatePresence>
        {enteringRoom && (
            <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
                <h1 className="text-xl md:text-3xl font-pixel text-white animate-pulse">SILÊNCIO: PROVA EM CURSO</h1>
            </motion.div>
        )}
        {isGrading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-white text-center p-8 backdrop-blur-md">
                <Loader2 size={80} className="animate-spin text-yellow-500 mb-8" />
                <h2 className="text-2xl font-pixel mb-6 uppercase tracking-tighter">Corrigindo sua Prova...</h2>
                <motion.p key={gradingLineIdx} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-mono text-cyan-400 text-lg italic h-12">
                    {gradingLines[gradingLineIdx]}
                </motion.p>
                <div className="w-80 h-3 bg-gray-800 border-2 border-white/20 rounded-full mt-10 overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(gradingLineIdx + 1) * (100 / gradingLines.length)}%` }} className="h-full bg-yellow-500" />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showResult && !isGrading ? (
          <div className="perspective-1000 w-full max-w-2xl h-[90vh]">
            <motion.div initial={{ rotateX: 20, y: 100, opacity: 0 }} animate={{ rotateX: 10, y: 0, opacity: 1 }} className="w-full h-full bg-[#fdfbf7] shadow-2xl p-6 md:p-10 relative font-serif border-t-8 border-gray-300 flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
              <h1 className="text-sm md:text-lg font-bold border-b-2 border-black mb-6 pb-2">EXAME FINAL: {selectedProfessor.subjects[0]}</h1>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold mb-8 leading-tight">{current + 1}. {quizQuestions[current].question}</h2>
                <div className="space-y-6">
                  {quizQuestions[current].options.map((opt, i) => (
                    <div key={i} className="relative flex items-center cursor-pointer group" onClick={() => handleOption(i)}>
                      {selected === i && (selected === quizQuestions[current].answer ? <PenMark type="circle" color="#1e40af" /> : <PenMark type="cross" color="#dc2626" />)}
                      <div className="w-8 h-8 border-2 border-black mr-4 flex items-center justify-center font-bold">{String.fromCharCode(65 + i)}</div>
                      <span className="text-sm md:text-base group-hover:underline">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ) : showResult ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-xl bg-white p-12 shadow-2xl text-center font-serif relative z-50">
            <h1 className="text-3xl font-bold mb-6 underline">NOTA FINAL</h1>
            <motion.div animate={{ scale: [1, 1.2, 1] }} className="text-9xl font-black mb-8">{score.toFixed(1)}</motion.div>
            <div className={`text-4xl font-black mb-10 border-8 p-4 ${score >= 5 ? 'border-blue-800 text-blue-800' : 'border-red-600 text-red-600'}`}>
              {score >= 5 ? 'APROVADO' : 'REPROVADO'}
            </div>
            <div className="flex flex-col gap-3">
                {score >= 5 ? (
                    <button onClick={() => { advanceStage(2); navigate('/hub'); }} className="w-full bg-blue-900 text-white py-4 font-bold flex items-center justify-center gap-3 hover:bg-blue-800 shadow-xl transition-all">SOLICITAR DIPLOMA <ArrowRight /></button>
                ) : (
                    <button onClick={() => window.location.reload()} className="w-full bg-red-600 text-white py-4 font-bold flex items-center justify-center gap-2 hover:bg-red-500 shadow-xl transition-all"><RotateCcw size={18}/> RECOMEÇAR JORNADA</button>
                )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
export default Quiz;
