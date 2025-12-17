
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { playTone, playBiosBeep, playProcessingNoise, playShimmer, playSuccessChime } from '../utils/audio';
import { Download, LogOut, Printer, ShieldCheck, Fingerprint, FileSearch, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Certificate: React.FC = () => {
  const { selectedProfessor, advanceStage } = useUser();
  const navigate = useNavigate();
  const [customName, setCustomName] = useState(selectedProfessor?.name || '');
  const [step, setStep] = useState<'form' | 'biometric' | 'signatures' | 'issuance' | 'ready'>('form');
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Responsive scaling logic
  useEffect(() => {
    const updateScale = () => {
      const containerWidth = window.innerWidth * 0.9;
      const containerHeight = window.innerHeight * 0.7;
      const certWidth = 1000;
      const certHeight = 707;
      
      const scaleX = containerWidth / certWidth;
      const scaleY = containerHeight / certHeight;
      setScale(Math.min(scaleX, scaleY, 1));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const startProcess = () => {
    setStep('biometric');
    playProcessingNoise();
    setTimeout(() => {
        setStep('signatures');
        playBiosBeep();
        let p = 0;
        const interval = setInterval(() => {
            p += 4;
            setProgress(p);
            if (p % 20 === 0) playBiosBeep();
            if (p >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setStep('issuance');
                    playShimmer();
                    setTimeout(() => {
                        setStep('ready');
                        playSuccessChime();
                        advanceStage(3);
                    }, 3000);
                }, 1000);
            }
        }, 80);
    }, 3000);
  };

  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    const canvas = await html2canvas(certificateRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
    pdf.save(`Diploma_UERN_${customName.replace(/\s+/g, '_')}.pdf`);
    setIsExporting(false);
  };

  if (!selectedProfessor) return null;

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div key="form" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="bg-[#1a1a1a] p-8 rounded-xl border border-white/10 text-center max-w-md w-full z-10 shadow-2xl">
            <Printer size={48} className="mx-auto text-yellow-500 mb-6" />
            <h1 className="text-2xl text-white font-bold mb-4 uppercase">Identificação Final</h1>
            <p className="text-gray-400 text-sm mb-6">Como o seu nome deve ser lembrado pelas gerações futuras?</p>
            <input value={customName} onChange={(e) => setCustomName(e.target.value)} className="w-full bg-black border border-white/20 p-4 text-white text-center mb-6 focus:border-yellow-500 outline-none rounded" placeholder="Nome Completo" />
            <button onClick={startProcess} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded uppercase transition-all shadow-lg active:scale-95">Solicitar Diploma</button>
            <button onClick={() => navigate('/hub')} className="mt-4 text-gray-500 text-xs uppercase hover:underline">Voltar ao Campus</button>
          </motion.div>
        )}

        {step === 'biometric' && (
          <motion.div key="biometric" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
            <Fingerprint size={80} className="mx-auto text-cyan-500 mb-8 animate-pulse" />
            <h2 className="text-xl text-white font-bold mb-4 uppercase tracking-[0.3em]">Validando Identidade Digital...</h2>
            <div className="flex gap-2 justify-center">
                {[1,2,3].map(i => <div key={i} className="w-3 h-3 bg-cyan-500 animate-bounce" style={{ animationDelay: `${i*0.1}s` }} />)}
            </div>
          </motion.div>
        )}

        {step === 'signatures' && (
          <motion.div key="signatures" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-md">
            <FileSearch size={64} className="mx-auto text-yellow-500 mb-8" />
            <h2 className="text-xl text-white font-bold mb-8 uppercase tracking-widest">Coletando Assinaturas do Conselho...</h2>
            <div className="h-4 bg-gray-900 border border-white/10 rounded-full overflow-hidden mb-4">
                <motion.div className="h-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-gray-500 font-mono uppercase">Verificando integridade das arestas lógicas...</p>
          </motion.div>
        )}

        {step === 'issuance' && (
          <motion.div key="issuance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
            <CheckCircle size={80} className="mx-auto text-green-500 mb-8" />
            <h2 className="text-3xl text-white font-bold mb-4 uppercase tracking-tighter">EMITINDO DOCUMENTO...</h2>
            <div className="text-white/20 text-[80px] font-black animate-pulse uppercase">UERN</div>
          </motion.div>
        )}

        {step === 'ready' && (
          <motion.div key="ready" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full h-full flex flex-col items-center justify-center gap-6 relative">
            
            {/* The Diploma with Scale Wrapper */}
            <div className="relative group transition-transform duration-700 ease-out flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
              <div 
                ref={certificateRef}
                className="w-[1000px] h-[707px] bg-[#fdfbf7] p-16 relative flex flex-col items-center justify-between border-[16px] border-double border-[#d4af37] shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] text-yellow-600/5 text-[200px] font-black pointer-events-none uppercase">UERN</div>

                <div className="text-center w-full">
                  <p className="font-medieval text-2xl text-gray-800 mb-4 tracking-[0.3em]">REPÚBLICA FEDERATIVA DA GAMBIARRA</p>
                  <h1 className="font-gothic text-7xl text-[#3d2b1f] leading-none mb-4">Diploma de Sobrevivência</h1>
                  <div className="w-64 h-1 bg-[#d4af37] mx-auto mb-10"></div>
                </div>

                <div className="text-center space-y-8 px-12">
                  <p className="font-elegant text-4xl text-gray-600 italic">Concedemos solenemente a:</p>
                  <h2 className="font-ornate text-6xl text-[#1a1a1a] font-bold py-2 border-y-2 border-gray-100">{customName.toUpperCase()}</h2>
                  <p className="font-script text-4xl text-gray-700 leading-relaxed">
                    O título de <strong>Professor Imortal</strong>, por ter guiado mentes inquietas através de labirintos lógicos e bugs inexplicáveis, sob a égide da mentoria de <strong>{selectedProfessor.name}</strong>.
                  </p>
                </div>

                <div className="w-full flex justify-between items-end px-4">
                  <div className="text-left font-serif text-sm text-gray-400">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}<br/>{new Date().toLocaleDateString()}</div>
                  <div className="w-32 h-32 bg-[#c62828] rounded-full flex items-center justify-center text-white font-pixel text-[8px] text-center rotate-[-15deg] shadow-xl border-4 border-[#b71c1c]">SELADO<br/>UERN<br/>2025</div>
                  <div className="text-right font-elegant text-5xl text-gray-800 border-t border-gray-300 pt-2">Coordenação</div>
                </div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://media.giphy.com/media/l41lTfJvS8c8L3o9G/giphy.gif')] mix-blend-screen scale-150"></div>
            </div>

            {/* Controls Panel */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap justify-center gap-4 w-full max-w-2xl mt-4 z-20">
              <button onClick={downloadPDF} disabled={isExporting} className="flex-1 min-w-[200px] bg-white text-black py-4 font-bold rounded-lg flex items-center justify-center gap-3 hover:bg-gray-200 transition-all shadow-xl active:scale-95 disabled:opacity-50">
                <Download size={20}/> {isExporting ? 'GERANDO PDF...' : 'BAIXAR PDF OFICIAL'}
              </button>
              <button onClick={() => navigate('/hub')} className="flex-1 min-w-[200px] bg-yellow-600 text-black py-4 font-bold rounded-lg flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all shadow-xl active:scale-95">
                <LogOut size={20}/> VOLTAR AO HUB
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificate;
