
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { playTone, playPaperSound, playBiosBeep, playProcessingNoise, playGlitchSound, playSuccessChime } from '../utils/audio';
import { ArrowRight, RotateCcw, Loader2, AlertTriangle, Coffee, Skull, ClipboardCheck, Zap } from 'lucide-react';

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
  const { selectedProfessor, advanceStage, gameStage, unlockAchievement } = useUser();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

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
        triggerGrading();
      }
    }, 1000);
  };

  const triggerGrading = () => {
    setIsGrading(true);
    playProcessingNoise();
    // Drumroll suspense
    const interval = setInterval(() => {
        playBiosBeep();
    }, 400);

    setTimeout(() => {
        clearInterval(interval);
        setIsGrading(false);
        setShowResult(true);
        playSuccessChime();
        
        // Achievement Logic
        if (score === 10) unlockAchievement('ten_score');
        if (score === 0) unlockAchievement('zero_score');
        if (gameStage >= 2) unlockAchievement('eternal_student');
    }, 5000);
  };

  if (!selectedProfessor) return null;

  return (
    <div className="h-screen w-full bg-[#3d2b1f] overflow-hidden flex items-center justify-center p-4 cursor-auto relative font-sans">
      <div className="absolute inset-0 opacity-60 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>
      
      <AnimatePresence>
        {isGrading && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white text-center p-8 backdrop-blur-xl"
            >
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                >
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
                    "O sistema está verificando se você realmente aprendeu algo ou se foi apenas o café que respondeu por você..."
                </p>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showResult && !isGrading ? (
          <div className="perspective-1000 w-full max-w-2xl h-[95vh] mt-4">
            <motion.div 
                initial={{ rotateX: 20, y: 100, opacity: 0 }} 
                animate={{ rotateX: 5, y: 0, opacity: 1 }} 
                className="w-full h-full bg-[#fdfbf7] shadow-2xl p-8 md:p-12 relative font-serif border-t-[12px] border-blue-900 flex flex-col overflow-y-auto"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-24 h-24 border-4 border-gray-200 flex items-center justify-center text-gray-200 font-bold text-xs uppercase text-center italic rotate-12">FOTO<br/>MATRÍCULA</div>
              </div>

              {/* Cabeçalho Realista Aprimorado */}
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
                    <span className="flex items-center gap-2">MATRÍCULA ALUNO: 2025.1.{Math.floor(Math.random()*9999).toString().padStart(4, '0')}</span>
                    <span>DURAÇÃO: 4 ANOS (OU ATÉ ONDE O CAFÉ DURAR)</span>
                 </div>
                 <div className="bg-blue-900 text-white p-2 text-center font-black mt-3 text-sm tracking-widest uppercase">
                    PROVA FINAL DE INTEGRALIZAÇÃO DE SANIDADE ACADÊMICA
                 </div>
              </div>

              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-black mb-10 leading-tight border-b-2 border-black pb-4">QUESTÃO {current + 1}: {quizQuestions[current].question}</h2>
                <div className="space-y-6">
                  {quizQuestions[current].options.map((opt, i) => (
                    <div key={i} className="relative flex items-center cursor-pointer group" onClick={() => handleOption(i)}>
                      {selected === i && (selected === quizQuestions[current].answer ? <PenMark type="circle" color="#1e40af" /> : <PenMark type="cross" color="#dc2626" />)}
                      <div className="w-10 h-10 border-2 border-black mr-4 flex items-center justify-center font-black font-sans group-hover:bg-gray-100 transition-colors">{String.fromCharCode(65 + i)}</div>
                      <span className="text-base md:text-lg group-hover:font-bold transition-all">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-dotted border-gray-400 text-center text-[10px] opacity-40 uppercase font-bold tracking-widest">
                Esta avaliação é propriedade intelectual da UERN. Reprodução proibida (mesmo por prints).
              </div>
            </motion.div>
          </div>
        ) : showResult ? (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotate: -5 }} 
            animate={{ scale: 1, opacity: 1, rotate: 0 }} 
            className="w-full max-w-xl bg-white p-12 shadow-[30px_30px_0_rgba(0,0,0,0.8)] text-center font-serif relative z-50 border-[10px] border-black"
          >
            <div className="absolute -top-12 -left-12 bg-yellow-500 text-black p-8 rounded-full font-black text-3xl rotate-[-15deg] shadow-2xl border-4 border-white animate-pulse">
                STATUS:<br/>{score >= 5 ? "APROVADO" : "REPROVADO"}
            </div>

            <h1 className="text-5xl font-black mb-8 underline tracking-tighter uppercase italic leading-none">Resultado do Diagnóstico</h1>
            
            <div className="flex justify-around items-center mb-10 bg-gray-50 p-8 border-4 border-double border-gray-200">
                <div className="text-center">
                    <p className="text-xs uppercase font-black text-gray-500 tracking-widest mb-2">Nota de Integralização</p>
                    <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: [0, 1.8, 1] }} 
                        className={`text-[9rem] leading-none font-black ${score >= 5 ? 'text-blue-800' : 'text-red-600'}`}
                    >
                        {score.toFixed(1)}
                    </motion.div>
                </div>
                <div className="space-y-4 text-left border-l-4 border-gray-100 pl-8">
                    <div className="flex items-center gap-3 text-sm font-black"><Coffee size={18} className="text-brown-600"/> {score >= 8 ? "Café de Especialidade" : "Pó de Qualidade Duvidosa"}</div>
                    <div className="flex items-center gap-3 text-sm font-black"><Skull size={18} className="text-red-500"/> {score <= 3 ? "Risco de DP Eterna" : "Sanidade nos Limites"}</div>
                    <div className="flex items-center gap-3 text-sm font-black"><Zap size={18} className="text-yellow-500"/> {score === 10 ? "QI de Reitor" : "Nível Calouro"}</div>
                </div>
            </div>

            <div className="bg-black text-white p-8 mb-10 italic text-lg font-serif border-l-[12px] border-yellow-500 shadow-inner">
                "{score >= 8 ? "Impressionante. Você claramente hackeou o sistema ou é um gênio incompreendido." : 
                  score >= 5 ? "Passou raspando. O conselho de classe decidiu não te reprovar só para não ter que te ver no próximo semestre." : 
                  "O sistema sugere que você troque de curso para algo menos estressante, como 'Doma de Dragões' ou 'Vendedor de Picolé na Antártida'."}"
            </div>

            <div className="flex flex-col gap-5">
                {score >= 5 ? (
                    <button onClick={() => { advanceStage(2); navigate('/hub'); }} className="w-full bg-blue-900 text-white py-5 font-black flex items-center justify-center gap-4 hover:bg-black transition-all shadow-[8px_8px_0_rgba(0,0,0,0.3)] uppercase tracking-[0.2em] italic text-xl">
                        PROSEGUIR PARA A SECRETARIA <ArrowRight size={24} />
                    </button>
                ) : (
                    <button onClick={() => window.location.reload()} className="w-full bg-red-600 text-white py-5 font-black flex items-center justify-center gap-3 hover:bg-black transition-all shadow-[8px_8px_0_rgba(0,0,0,0.3)] uppercase tracking-widest text-xl">
                        <RotateCcw size={24}/> TENTAR NOVAMENTE (O EXAUSTO É REAL)
                    </button>
                )}
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
