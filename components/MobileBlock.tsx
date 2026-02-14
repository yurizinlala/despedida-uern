import React from 'react';
import { ShieldAlert, MonitorX, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBlock: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black text-red-600 font-mono-tech overflow-hidden">
      {/* Background Noise & Grid - Fixed position to stay static */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-10 pointer-events-none bg-cover mix-blend-overlay z-0"></div>

      {/* Centered Content Container */}
      <div className="h-full w-full flex flex-col items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="border border-red-800 bg-black/95 p-6 max-w-md w-full relative shadow-[0_0_50px_rgba(220,38,38,0.2)] backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-6 border-b border-red-900 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="animate-pulse shrink-0" />
              <span className="uppercase tracking-[0.1em] text-[10px] md:text-xs font-bold whitespace-nowrap">Protocolo Omega-7</span>
            </div>
            <span className="text-[9px] md:text-[10px] bg-red-900/30 px-2 py-1 rounded border border-red-900 shrink-0">ERR_RES_LOW</span>
          </div>

          {/* Main Icon */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
            <MonitorX size={64} className="relative z-10 text-red-500" />
          </div>

          {/* Big Text */}
          <motion.div
            animate={{ textShadow: ["0 0 0px red", "0 0 10px red", "0 0 0px red"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-black mb-1 tracking-tighter leading-tight">ACESSO BLOQUEADO</h1>
            <p className="text-red-400 text-xs uppercase tracking-widest">Resolução Insuficiente</p>
          </motion.div>

          {/* Technical Data */}
          <div className="bg-red-950/20 border border-red-900/50 p-3 mb-5 text-[10px] md:text-xs font-mono space-y-2">
            <p className="flex justify-between">
              <span>&gt; DISPOSITIVO:</span>
              <span className="text-red-400 font-bold">MOBILE</span>
            </p>
            <p className="flex justify-between">
              <span>&gt; LARGURA:</span>
              <span className="text-red-400 font-bold">{window.innerWidth}px</span>
            </p>
            <p className="flex justify-between">
              <span>&gt; NECESSÁRIO:</span>
              <span className="text-green-500 font-bold animate-pulse">1024px</span>
            </p>
          </div>

          {/* Message */}
          <div className="space-y-3 text-xs md:text-sm font-mono leading-relaxed text-red-300/80 text-justify">
            <p>
              <AlertTriangle className="inline mr-1 mb-1 text-yellow-500 align-text-bottom" size={14} />
              Caro usuário, este sistema contém gráficos de alta densidade e uma dose letal de nostalgia acadêmica.
            </p>
            <p>
              Seu dispositivo atual não possui a "grandeza horizontal" necessária.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-red-900 text-center">
            <p className="text-[10px] md:text-xs text-white animate-pulse font-bold tracking-widest uppercase">
              Acesse via Computador
            </p>
          </div>

          {/* Decorators */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600 rounded-tr-lg opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600 rounded-bl-lg opacity-50"></div>
        </motion.div>

        <div className="text-[9px] text-red-900 opacity-50 font-mono mt-4 text-center">
          SYSTEM_ID: GRADUATION_ADVENTURE_BUILD_9921
        </div>
      </div>
    </div>
  );
};

export default MobileBlock;