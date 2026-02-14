
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { playTone, playBiosBeep, playProcessingNoise, playShimmer, playSuccessChime } from '../utils/audio';
import { Download, LogOut, Printer, ShieldCheck, Fingerprint, FileSearch, CheckCircle, Star } from 'lucide-react';
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
        p += 2;
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
      }, 50);
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
          <motion.div key="form" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="bg-[#1a1a1a] p-10 rounded-xl border-4 border-yellow-500 text-center max-w-md w-full z-10 shadow-2xl">
            <Printer size={64} className="mx-auto text-yellow-500 mb-6 animate-bounce" />
            <h1 className="text-3xl text-white font-black mb-4 uppercase tracking-tighter italic">Secretaria Virtual</h1>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Você chegou ao fim do labirinto. Como deseja ser imortalizado neste documento oficial?</p>
            <div className="relative group mb-8">
              <input value={customName} onChange={(e) => setCustomName(e.target.value)} className="w-full bg-black border-2 border-white/20 p-5 text-white text-center font-bold focus:border-yellow-500 outline-none transition-all" placeholder="NOME DO DOCENTE" />
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black px-2 py-0.5 text-[8px] font-black uppercase">Campo Obrigatório</div>
            </div>
            <button onClick={startProcess} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-5 text-lg shadow-[8px_8px_0_rgba(0,0,0,0.5)] uppercase transition-all active:scale-95 italic">Emitir Diploma de Sobrevivência</button>
            <button onClick={() => navigate('/hub')} className="mt-8 text-gray-500 text-[10px] uppercase font-bold hover:text-white transition-colors tracking-widest">[ Cancelar e Voltar ao Campus ]</button>
          </motion.div>
        )}

        {step === 'biometric' && (
          <motion.div key="biometric" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
            <Fingerprint size={100} className="mx-auto text-cyan-500 mb-8 animate-pulse" />
            <h2 className="text-2xl text-white font-black mb-4 uppercase tracking-[0.4em]">Autenticação Biométrica...</h2>
            <p className="text-cyan-900 font-mono text-xs uppercase animate-pulse">Escaneando nível de exaustão ocular...</p>
          </motion.div>
        )}

        {step === 'signatures' && (
          <motion.div key="signatures" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-lg">
            <FileSearch size={80} className="mx-auto text-yellow-500 mb-8" />
            <h2 className="text-2xl text-white font-black mb-8 uppercase tracking-widest italic">Coletando Firmas da Reitoria</h2>
            <div className="h-6 bg-gray-900 border-2 border-white/20 p-1 mb-6 shadow-inner">
              <motion.div className="h-full bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.8)]" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-[9px] font-mono uppercase text-gray-600 font-bold">
              <span>Processando: {progress}%</span>
              <span className="animate-pulse">Aguardando carimbo físico...</span>
            </div>
          </motion.div>
        )}

        {step === 'issuance' && (
          <motion.div key="issuance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
            <CheckCircle size={100} className="mx-auto text-green-500 mb-8 animate-in zoom-in" />
            <h2 className="text-4xl text-white font-black mb-4 uppercase tracking-tighter italic">DOCUMENTO PRONTO!</h2>
            <div className="text-white/10 text-[120px] font-black animate-pulse leading-none">UERN</div>
          </motion.div>
        )}

        {step === 'ready' && (
          <motion.div key="ready" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full h-full flex flex-col items-center justify-center gap-6 relative">

            <div className="relative group transition-transform duration-700 ease-out flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
              <div
                ref={certificateRef}
                className="w-[1000px] h-[707px] bg-[#fdfbf7] p-16 relative flex flex-col items-center justify-between border-[20px] border-double border-[#d4af37] shadow-[0_50px_150px_rgba(0,0,0,0.9)]"
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] text-yellow-600/5 text-[220px] font-black pointer-events-none uppercase">CERTIFICADO</div>

                <div className="text-center w-full relative z-10">
                  <p className="font-medieval text-3xl text-gray-800 mb-6 tracking-[0.4em] uppercase">Estado do Rio Grande do Norte</p>
                  <h1 className="font-gothic text-8xl text-[#3d2b1f] leading-none mb-6">Carta de Imortalidade</h1>
                  <div className="w-80 h-1.5 bg-[#d4af37] mx-auto mb-10"></div>
                </div>

                <div className="text-center space-y-10 px-16 relative z-10">
                  <p className="font-elegant text-5xl text-gray-600 italic">Certificamos com honras que o(a) ilustre docente:</p>
                  <h2 className="font-ornate text-7xl text-[#1a1a1a] font-black py-4 border-y-4 border-gray-100 uppercase tracking-tighter">{customName}</h2>
                  <p className="font-script text-5xl text-gray-700 leading-relaxed max-w-3xl">
                    Finalizou com maestria o ciclo acadêmico de 2025, superando instabilidades de pauta, cafés insossos e IHCs complexas, sob a tutela direta de <strong>{selectedProfessor.name}</strong>.
                  </p>
                </div>

                <div className="w-full flex justify-between items-end px-8 relative z-10">
                  <div className="text-left font-serif text-xs text-gray-400 uppercase tracking-widest font-bold">
                    CHAVE: {Math.random().toString(36).substr(2, 12).toUpperCase()}<br />
                    EMITIDO EM: {new Date().toLocaleDateString('pt-BR')}
                  </div>

                  {/* Selo Dinâmico de Nota */}
                  <div className="w-40 h-40 bg-[#c62828] rounded-full flex flex-col items-center justify-center text-white font-pixel text-[10px] text-center rotate-[-12deg] shadow-2xl border-[6px] border-[#b71c1c] scale-110">
                    <div className="text-[8px] mb-1">QUALIDADE</div>
                    <div className="text-3xl font-black italic">UERN</div>
                    <div className="mt-1 text-[7px] border-t border-white pt-1">APROVADO 2025</div>
                  </div>

                  <div className="text-right flex flex-col items-center">
                    <div className="w-48 border-t-2 border-gray-400"></div>
                    <p className="font-elegant text-6xl text-gray-800 mt-2 leading-none">A Coordenação</p>
                    <p className="text-[8px] font-mono uppercase tracking-[0.2em] mt-1">Selo de Autenticidade Digital</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://media.giphy.com/media/l41lTfJvS8c8L3o9G/giphy.gif')] mix-blend-screen scale-125"></div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex flex-wrap justify-center gap-6 w-full max-w-3xl mt-6 z-20">
              <button onClick={downloadPDF} disabled={isExporting} className="flex-1 min-w-[280px] bg-white text-black py-5 font-black rounded-sm flex items-center justify-center gap-4 hover:bg-gray-100 transition-all shadow-[10px_10px_0_rgba(255,255,255,0.1)] active:translate-x-1 active:translate-y-1 disabled:opacity-50 uppercase tracking-widest">
                <Download size={24} /> {isExporting ? 'Processando Exportação...' : 'Download Diploma (PDF)'}
              </button>
              <button onClick={() => navigate('/credits')} className="flex-1 min-w-[280px] bg-yellow-600 text-black py-5 font-black rounded-sm flex items-center justify-center gap-4 hover:bg-yellow-500 transition-all shadow-[10px_10px_0_rgba(234,179,8,0.2)] active:translate-x-1 active:translate-y-1 uppercase tracking-widest">
                <Star size={24} /> Finalizar Experiência
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificate;
