
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Download, Printer, Fingerprint, CheckCircle, Star, Shield, Stamp, type LucideIcon } from 'lucide-react';
import { playSound } from '../utils/audio';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// ═══════════════════════════════════
// ─── MINIGAME 1: BIOMETRIC HOLD ───
// ═══════════════════════════════════
const BiometricGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const done = progress >= 100;

  useEffect(() => {
    if (done) {
      playSound('/sounds/identity-established.mp3');
      const t = setTimeout(onComplete, 1200);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  const startHold = () => {
    if (done) return;
    setHolding(true);
    playSound('/sounds/accept.mp3');
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + 2, 100);
        return next;
      });
    }, 100);
  };

  const stopHold = () => {
    setHolding(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <motion.div key="biometric" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center z-10 max-w-sm w-full">
      <h2 className="text-xl text-white font-cinzel mb-2 uppercase tracking-widest">Autenticação Biométrica</h2>
      <p className="text-gray-500 text-xs mb-8 font-body">Segure o dedo no sensor até completar a leitura</p>

      <div className="relative mx-auto w-32 h-32 mb-8">
        {/* Progress ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="6" />
          <motion.circle cx="50" cy="50" r="45" fill="none" stroke={done ? '#22c55e' : '#06b6d4'} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
          />
        </svg>
        {/* Fingerprint button */}
        <button
          onMouseDown={startHold} onMouseUp={stopHold} onMouseLeave={stopHold}
          onTouchStart={startHold} onTouchEnd={stopHold}
          className={`absolute inset-0 flex items-center justify-center transition-all ${holding ? 'scale-95' : ''} ${done ? 'pointer-events-none' : ''}`}
        >
          <Fingerprint size={56} className={`transition-colors duration-300 ${done ? 'text-green-400' : holding ? 'text-cyan-400' : 'text-gray-500'}`} />
        </button>
      </div>

      <p className="text-xs font-mono text-gray-600">{done ? '✓ Identidade Confirmada' : `${progress}% — ${holding ? 'Escaneando...' : 'Toque e segure'}`}</p>
    </motion.div>
  );
};

// ═══════════════════════════════════
// ─── MINIGAME 2: TYPE THE CODE ────
// ═══════════════════════════════════
const CodeGame: React.FC<{ onComplete: () => void; code: string }> = ({ onComplete, code }) => {
  const targetCode = code.toUpperCase().replace(/\s+/g, '');
  const displayCode = code.toUpperCase();
  const [typed, setTyped] = useState('');
  const [error, setError] = useState(false);
  const done = typed === targetCode;

  useEffect(() => {
    if (done) {
      playSound('/sounds/accept.mp3');
      const t = setTimeout(onComplete, 1200);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/\s+/g, '');
    if (targetCode.startsWith(val)) {
      setTyped(val);
      setError(false);
    } else {
      setError(true);
      playSound('/sounds/error.mp3');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div key="code" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center z-10 max-w-md w-full">
      <Shield size={56} className="mx-auto text-yellow-500 mb-4" />
      <h2 className="text-xl text-white font-cinzel mb-2 uppercase tracking-widest">Verificação de Segurança</h2>
      <p className="text-gray-500 text-xs mb-8 font-body">Digite o código de autenticação exibido abaixo:</p>

      <div className="flex justify-center gap-1 mb-6 flex-wrap">
        {displayCode.split('').map((char, i) => {
          // Map display index to typed index (skipping spaces)
          const typedIdx = displayCode.slice(0, i + 1).replace(/\s+/g, '').length - 1;
          const isFilled = typedIdx < typed.length;
          const isSpace = char === ' ';
          if (isSpace) return <div key={i} className="w-3" />;
          return (
            <div key={i} className={`w-8 h-11 border-2 flex items-center justify-center text-base font-mono font-bold transition-all ${isFilled ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10' : 'border-gray-700 text-gray-600'}`}>
              {char}
            </div>
          );
        })}
      </div>

      <input
        value={typed}
        onChange={handleInput}
        maxLength={targetCode.length}
        autoFocus
        className={`w-full max-w-[240px] bg-black border-2 p-3 text-white text-center font-mono text-lg tracking-[0.5em] outline-none transition-all ${error ? 'border-red-500 animate-shake' : done ? 'border-green-500' : 'border-gray-600 focus:border-yellow-500'
          }`}
        placeholder="_ _ _ _ _ _ _ _"
      />
      <p className="text-xs font-mono text-gray-600 mt-4">{done ? '✓ Código Aceito' : 'Digite na caixa acima'}</p>

      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} } .animate-shake{animation:shake 0.3s}`}</style>
    </motion.div>
  );
};

// ═══════════════════════════════════
// ─── MINIGAME 3: STAMP IT ─────────
// ═══════════════════════════════════
const StampGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stamped, setStamped] = useState(false);

  const handleStamp = () => {
    if (stamped) return;
    setStamped(true);
    playSound('/sounds/stamp.mp3');
    setTimeout(onComplete, 1500);
  };

  return (
    <motion.div key="stamp" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center z-10 max-w-md w-full">
      <h2 className="text-xl text-white font-cinzel mb-2 uppercase tracking-widest">Carimbo Oficial</h2>
      <p className="text-gray-500 text-xs mb-8 font-body">Clique no documento para aplicar o carimbo da reitoria</p>

      <div className="relative mx-auto w-64 h-40 bg-[#fdfbf7] border-4 border-double border-[#d4af37] flex items-center justify-center cursor-pointer group" onClick={handleStamp}>
        {!stamped ? (
          <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
            <Stamp size={40} className="text-gray-300 group-hover:text-red-500 transition-colors" />
            <span className="text-xs text-gray-400 font-body uppercase tracking-widest">Clique aqui</span>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 3, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: -12, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-28 h-28 bg-[#c62828] rounded-full flex flex-col items-center justify-center text-white border-4 border-[#b71c1c] shadow-xl"
          >
            <div className="text-[7px] font-bold">APROVADO</div>
            <div className="text-xl font-black">UERN</div>
            <div className="text-[6px] border-t border-white/50 pt-0.5 mt-0.5">2025</div>
          </motion.div>
        )}
      </div>
      <p className="text-xs font-mono text-gray-600 mt-4">{stamped ? '✓ Carimbo Aplicado' : 'Aguardando carimbo...'}</p>
    </motion.div>
  );
};


// ═══════════════════════════════════
// ─── MAIN CERTIFICATE COMPONENT ───
// ═══════════════════════════════════
const Certificate: React.FC = () => {
  const { selectedProfessor, advanceStage } = useUser();
  const navigate = useNavigate();
  const [customName, setCustomName] = useState(selectedProfessor?.name || '');
  const [dedicatoria, setDedicatoria] = useState('');
  const [step, setStep] = useState<'form' | 'biometric' | 'code' | 'stamp' | 'issuance' | 'ready'>('form');
  const [isExporting, setIsExporting] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Stable key
  const authKey = useMemo(() => Math.random().toString(36).substr(2, 12).toUpperCase(), []);

  useEffect(() => {
    const updateScale = () => {
      const cw = window.innerWidth * 0.92;
      const ch = window.innerHeight * 0.65;
      setScale(Math.min(cw / 1000, ch / 707, 1));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const startProcess = () => {
    if (!customName.trim()) return;
    playSound('/sounds/accept.mp3');
    setStep('biometric');
  };

  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    try {
      // Wait for all fonts to be loaded
      await document.fonts.ready;

      // Temporarily remove the parent's scale transform for a clean capture
      const parent = certificateRef.current.parentElement;
      const originalTransform = parent?.style.transform || '';
      if (parent) parent.style.transform = 'scale(1)';

      // Small delay for re-render
      await new Promise(r => setTimeout(r, 200));

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fdfbf7',
        logging: false,
        width: 1000,
        height: 707,
        windowWidth: 1000,
        windowHeight: 707,
      });

      // Restore transform
      if (parent) parent.style.transform = originalTransform;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save(`Diploma_UERN_${customName.replace(/\s+/g, '_')}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  if (!selectedProfessor) return null;

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-4 overflow-hidden relative font-body">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />

      <AnimatePresence mode="wait">
        {/* ─── STEP 1: FORM ─── */}
        {step === 'form' && (
          <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="bg-[#111] p-8 md:p-10 border border-gray-800 text-center max-w-md w-full z-10 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
            <Printer size={48} className="mx-auto text-yellow-500 mb-6" />
            <h1 className="text-2xl text-white font-cinzel mb-2 uppercase tracking-widest">Secretaria Virtual</h1>
            <p className="text-gray-500 text-xs mb-8 font-body leading-relaxed">Preencha os campos para emitir o diploma oficial de sobrevivência acadêmica.</p>

            <div className="space-y-4 mb-8 text-left">
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 block">Nome do Docente Homenageado</label>
                <input value={customName} onChange={(e) => setCustomName(e.target.value)} className="w-full bg-black border border-gray-700 p-3 text-white text-sm font-body focus:border-yellow-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 block">Dedicatória Personalizada <span className="text-gray-700">(opcional)</span></label>
                <textarea value={dedicatoria} onChange={(e) => setDedicatoria(e.target.value)} rows={3} maxLength={200} className="w-full bg-black border border-gray-700 p-3 text-white text-sm font-body focus:border-yellow-500 outline-none transition-all resize-none" placeholder="Escreva uma mensagem especial..." />
                <div className="text-right text-[9px] text-gray-700 mt-1">{dedicatoria.length}/200</div>
              </div>
            </div>

            <button onClick={startProcess} disabled={!customName.trim()} className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-4 text-sm shadow-lg uppercase transition-all active:scale-[0.98] tracking-widest font-cinzel">
              Emitir Diploma
            </button>
            <button onClick={() => navigate('/hub')} className="mt-6 text-gray-600 text-[10px] uppercase font-bold hover:text-white transition-colors tracking-widest">
              Cancelar
            </button>
          </motion.div>
        )}

        {/* ─── STEP 2: BIOMETRIC MINIGAME ─── */}
        {step === 'biometric' && <BiometricGame onComplete={() => setStep('code')} />}

        {/* ─── STEP 3: CODE MINIGAME ─── */}
        {step === 'code' && <CodeGame code={selectedProfessor.codeName} onComplete={() => setStep('stamp')} />}

        {/* ─── STEP 4: STAMP MINIGAME ─── */}
        {step === 'stamp' && <StampGame onComplete={() => { setStep('issuance'); playSound('/sounds/identity-established.mp3'); setTimeout(() => { setStep('ready'); advanceStage(3); }, 3000); }} />}

        {/* ─── STEP 5: ISSUANCE ─── */}
        {step === 'issuance' && (
          <motion.div key="issuance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center z-10">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
            </motion.div>
            <h2 className="text-2xl text-white font-cinzel mb-3 uppercase tracking-widest">Documento Pronto!</h2>
            <p className="text-gray-500 text-xs font-body">Preparando visualização do diploma...</p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'linear' }}
              className="h-0.5 bg-green-500 mt-8 max-w-xs mx-auto"
            />
          </motion.div>
        )}

        {/* ─── STEP 6: CERTIFICATE READY ─── */}
        {step === 'ready' && (
          <motion.div key="ready" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full h-full flex flex-col items-center justify-center gap-0 relative">

            <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
              <div
                ref={certificateRef}
                className="w-[1000px] h-[707px] bg-[#fdfbf7] p-14 relative flex flex-col items-center justify-between border-[16px] border-double border-[#d4af37] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                {/* Paper texture — local */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "url('/assets/handmade-paper.png')" }} />
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <div className="rotate-[-45deg] text-[120px] font-bold uppercase select-none" style={{ color: 'rgba(212,175,55,0.05)', fontFamily: 'Cinzel, serif' }}>CERTIFICADO</div>
                </div>

                {/* Top section */}
                <div style={{ textAlign: 'center', width: '100%', position: 'relative', zIndex: 10, paddingTop: '10px' }}>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '12px', color: '#6b7280', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '8px' }}>Estado do Rio Grande do Norte</p>
                  <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '42px', color: '#3d2b1f', lineHeight: 1.1, marginBottom: '8px', fontStyle: 'italic' }}>Carta de Imortalidade</h1>
                  <div style={{ width: '200px', height: '3px', background: '#d4af37', margin: '0 auto 16px' }} />
                </div>

                {/* Middle section */}
                <div style={{ textAlign: 'center', padding: '0 60px', position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', color: '#6b7280', fontStyle: 'italic' }}>Certificamos com honras que o(a) ilustre docente:</p>
                  <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '28px', color: '#1a1a1a', fontWeight: 700, padding: '10px 0', borderTop: '2px solid rgba(212,175,55,0.3)', borderBottom: '2px solid rgba(212,175,55,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{customName}</h2>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', color: '#4b5563', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto', fontStyle: 'italic' }}>
                    Finalizou com maestria o ciclo acadêmico de 2025, superando instabilidades de pauta, cafés insossos e provas impossíveis, sob a tutela direta da turma de Ciência da Computação.
                  </p>
                  {dedicatoria && (
                    <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '20px', color: '#6b7280', maxWidth: '480px', margin: '4px auto 0', lineHeight: 1.5 }}>
                      "{dedicatoria}"
                    </p>
                  )}
                </div>

                {/* Bottom section */}
                <div className="w-full flex justify-between items-end px-6 relative z-10">
                  <div style={{ fontFamily: 'monospace', fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.8 }}>
                    CHAVE: {authKey}<br />
                    EMITIDO: {new Date().toLocaleDateString('pt-BR')}
                  </div>

                  {/* Seal */}
                  <div style={{ width: '112px', height: '112px', background: '#c62828', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', transform: 'rotate(-12deg)', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: '4px solid #b71c1c' }}>
                    <div style={{ fontSize: '6px', fontWeight: 'bold', letterSpacing: '0.1em' }}>QUALIDADE</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'Cinzel, serif' }}>UERN</div>
                    <div style={{ fontSize: '5px', borderTop: '1px solid rgba(255,255,255,0.4)', paddingTop: '2px', marginTop: '2px', letterSpacing: '0.1em' }}>APROVADO 2025</div>
                  </div>

                  <div className="text-right flex flex-col items-center">
                    <div style={{ width: '160px', borderTop: '2px solid #9ca3af' }} />
                    <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', color: '#374151', marginTop: '8px', fontStyle: 'italic' }}>A Coordenação</p>
                    <p style={{ fontFamily: 'monospace', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginTop: '4px' }}>Selo de Autenticidade Digital</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap justify-center gap-3 z-20" style={{ transform: `scale(${Math.min(scale * 1.1, 1)})`, marginTop: `${-8 * scale}px`, maxWidth: '640px', width: '100%' }}>
              <button onClick={downloadPDF} disabled={isExporting} className="flex-1 min-w-[220px] bg-white text-black py-4 font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest text-xs font-cinzel">
                <Download size={18} /> {isExporting ? 'Exportando...' : 'Download PDF'}
              </button>
              <button onClick={() => navigate('/credits')} className="flex-1 min-w-[220px] bg-yellow-600 text-black py-4 font-bold flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all shadow-lg active:scale-[0.98] uppercase tracking-widest text-xs font-cinzel">
                <Star size={18} /> Finalizar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificate;
