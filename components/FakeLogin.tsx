
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { professors, getAuthText } from '../data/professors';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Lock, Server, Terminal, Calendar, Trophy, Info, UserCheck, MessageSquare, Newspaper, Bell, ExternalLink, Search } from 'lucide-react';
import { playKeyClick, playPaperSound, playGlitchSound, playBiosBeep } from '../utils/audio';

interface FakeLoginProps {
  onSuccess: (isFirstTry: boolean) => void;
}

const FakeLogin: React.FC<FakeLoginProps> = ({ onSuccess }) => {
  const { selectedProfessor, setSelectedProfessor, unlockAchievement, unlockedAchievements } = useUser();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [easterEgg, setEasterEgg] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [clickedErrors, setClickedErrors] = useState<string[]>([]);

  const totalPossibleAchievements = 10;
  const MAX_ATTEMPTS_FOR_HINT = 6;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    playKeyClick();
    setError('');
    setEasterEgg(null);
  };

  const handleSideAction = (action: string) => {
    playGlitchSound();
    if (!clickedErrors.includes(action)) {
        const next = [...clickedErrors, action];
        setClickedErrors(next);
        if (next.length >= 4) unlockAchievement('burocrata_nato');
    }
    const jokes: Record<string, string> = {
      'turmas': 'ERRO: Fila de espera maior que a do SUS. Você é o número 1.452.890.',
      'lagrimas': 'LOG: Histórico exportado com sucesso. Volume total: 42 Litros (Média Acima da Turma).',
      'ru': 'AVISO: O cardápio de hoje é SURPRESA (Dica: Envolve algo que já foi um sapato).',
      'sanidade': 'ERRO 404: Sanidade Docente não encontrada nos arquivos deste servidor.',
      'trancar': 'NEGADO: O trancamento só é permitido se você apresentar um atestado de imortalidade assinado pela reitoria.'
    };
    setError(jokes[action] || 'SISTEMA EM MANUTENÇÃO (ETERNA).');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfessor) {
      setError('SISTEMA: Selecione um docente para validar a existência.');
      playGlitchSound();
      return;
    }
    
    const lowerPass = password.toLowerCase().trim();

    if (lowerPass === 'admin' || lowerPass === 'root') {
        setEasterEgg('Acesso negado. O admin está de férias (desde 2012).');
        playGlitchSound();
        return;
    }

    if (lowerPass === selectedProfessor.password.toLowerCase()) {
      const isFirstTry = failedAttempts === 0;
      if (isFirstTry) unlockAchievement('hackerman');
      playBiosBeep();
      onSuccess(isFirstTry);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setError(newAttempts < 3 ? 'ACESSO NEGADO: Credenciais inválidas.' : 'ERRO CRÍTICO: Consulte o Post-it de emergência.');
      playGlitchSound();
      if (newAttempts <= MAX_ATTEMPTS_FOR_HINT) playPaperSound();
      setPassword('');
    }
  };

  const progress = Math.min(failedAttempts, MAX_ATTEMPTS_FOR_HINT) / MAX_ATTEMPTS_FOR_HINT;

  return (
    <div className="min-h-screen bg-[#d4d4d4] font-sans flex flex-col relative overflow-hidden border-t-[24px] border-blue-900 shadow-inner">
      
      <div className="bg-gray-200 py-1 px-4 text-[9px] text-gray-500 border-b border-gray-400 flex justify-between font-mono font-bold tracking-tighter">
        <span>GOVERNO FEDERAL | UERN - PORTAL DE SISTEMAS</span>
        <span className="flex gap-4"><span>PORTUGUÊS (PT-BR)</span> <span>ACESSIBILIDADE</span></span>
      </div>

      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-6 shadow-lg border-b-8 border-yellow-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div onClick={() => unlockAchievement('secret_click')} className="w-20 h-20 bg-white p-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] cursor-pointer hover:rotate-12 transition-transform active:scale-90">
                <div className="w-full h-full border-2 border-blue-900 flex items-center justify-center font-serif font-black text-4xl text-blue-900 italic">U</div>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight font-serif italic">S.I.G.A.A.</h1>
              <p className="text-[10px] text-blue-200 uppercase tracking-[0.3em] font-mono font-bold">Sistema Integrado de Gestão de Atividades Acadêmicas</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-blue-100">
             <div className="text-right border-r border-blue-700 pr-4">
                <p>USUÁRIO ANÔNIMO</p>
                <p className="text-[9px] opacity-60">IP: 127.0.0.1 (LOCALHOST)</p>
             </div>
             <UserCheck size={24} />
          </div>
        </div>
      </header>

      <div className="bg-yellow-100 border-b border-yellow-400 text-yellow-800 py-1 overflow-hidden whitespace-nowrap font-mono text-[11px] font-bold shadow-inner">
        <motion.div animate={{ x: ["100%", "-100%"] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="inline-block">
          *** AVISO: O sistema ficará indisponível para manutenção preventiva (e espiritual) entre 02:00 e 05:00. *** URGENTE: Aulas de sábado agora são obrigatórias para quem não usa o SIGAA em modo escuro. *** NOTA: Favor não confundir a carne do RU com a sola do sapato do estagiário. *** DICA: Editais de bolsa agora pagam em coxinhas (limite de 2 por mês). ***
        </motion.div>
      </div>

      <main className="flex-1 container mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="hidden md:block col-span-3 space-y-4">
          <div className="bg-white border-2 border-gray-400 shadow-md">
            <div className="bg-blue-800 text-white p-2 font-bold text-xs uppercase flex items-center gap-2"><MessageSquare size={14}/> Menu do Sistema</div>
            <ul className="text-[10px] space-y-1 p-2 font-bold text-blue-900 divide-y divide-gray-100">
              <li onClick={() => handleSideAction('turmas')} className="p-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center group"><span>Inscrição em Turmas</span> <Lock size={10} className="group-hover:text-red-500"/></li>
              <li onClick={() => handleSideAction('lagrimas')} className="p-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center group"><span>Histórico de Lágrimas</span> <Lock size={10} className="group-hover:text-red-500"/></li>
              <li onClick={() => handleSideAction('ru')} className="p-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center group"><span>Reclamações do RU</span> <ExternalLink size={10} className="opacity-40" /></li>
              <li onClick={() => handleSideAction('sanidade')} className="p-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center group"><span>Atestado de Sanidade</span> <ExternalLink size={10} className="opacity-40" /></li>
              <li onClick={() => handleSideAction('trancar')} className="p-2 hover:bg-blue-50 cursor-pointer text-red-600 font-black italic">TRANCAR CURSO (BLOQUEADO)</li>
            </ul>
          </div>

          <div 
            className="bg-white border-2 border-gray-400 p-4 shadow-md relative overflow-hidden cursor-default group"
          >
            <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold text-xs uppercase">
                <Trophy size={16} className="text-yellow-600 animate-bounce" /> Registros de Honra
            </div>
            <div className="space-y-4 relative z-10">
                <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase">
                    <span>PROGRESSO:</span>
                    <span className="bg-black text-green-500 px-2 font-mono">{unlockedAchievements.length} / {totalPossibleAchievements}</span>
                </div>
                <div className="h-4 bg-gray-200 border-2 border-gray-400 p-[2px]">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${(unlockedAchievements.length / totalPossibleAchievements) * 100}%` }} 
                        className="h-full bg-green-600 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    />
                </div>
                <div className="bg-blue-50 p-2 border border-blue-200 rounded text-[9px] text-blue-800 font-bold leading-tight flex items-start gap-2">
                    <Info size={16} className="shrink-0" />
                    <span>DICA: Pressione a tecla <span className="underline font-black">9</span> em qualquer momento para gerenciar suas conquistas.</span>
                </div>
            </div>
          </div>

          <div className="bg-blue-900/5 border-2 border-blue-900/10 p-4 space-y-3">
             <div className="flex items-center gap-2 text-blue-900 font-black text-[10px] uppercase border-b border-blue-900/20 pb-1">
                <Bell size={12}/> Notificações do Campus
             </div>
             <div className="space-y-2">
                <div className="text-[9px] leading-tight border-l-2 border-yellow-500 pl-2">
                    <p className="font-bold text-yellow-700 uppercase">Edital de Monitoria Relâmpago</p>
                    <p className="text-gray-500 italic">Requisito: Ter 10 anos de experiência em tecnologias que foram lançadas na semana passada.</p>
                </div>
                <div className="text-[9px] leading-tight border-l-2 border-blue-500 pl-2">
                    <p className="font-bold text-blue-700 uppercase">Secretaria fechada</p>
                    <p className="text-gray-500 italic">Horário de funcionamento: Terças e quintas, das 14:15 às 14:16, mediante oferenda de café.</p>
                </div>
             </div>
          </div>
        </aside>

        <div className="col-span-1 md:col-span-6 flex flex-col items-center">
            <div className="w-full bg-white p-8 border-2 border-gray-400 shadow-[10px_10px_0px_rgba(0,0,0,0.1)] relative">
                <div className="bg-gray-50 border-b-2 border-gray-200 p-3 -mx-8 -mt-8 mb-8 flex justify-between items-center px-6">
                    <h2 className="text-gray-800 text-sm font-black flex items-center gap-2 uppercase italic"><Lock size={16} /> Acesso Restrito</h2>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Servidor Online</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence>
                        {error && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 text-xs flex items-center gap-3 font-bold shadow-sm"><AlertCircle size={16} className="shrink-0"/>{error}</motion.div>}
                        {easterEgg && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-purple-50 border-l-4 border-purple-600 text-purple-700 px-4 py-3 text-xs flex items-center gap-3 italic font-mono shadow-sm"><Terminal size={16} className="shrink-0" />"{easterEgg}"</motion.div>}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest">Identificação do Docente:</label>
                        <select className="block w-full p-4 text-sm border-2 border-gray-300 bg-white rounded-none shadow-inner focus:border-blue-800 outline-none font-bold" value={selectedProfessor?.id || ''} onChange={(e) => {
                            const prof = professors.find(p => p.id === e.target.value) || null;
                            setSelectedProfessor(prof);
                            setFailedAttempts(0);
                            setError('');
                            setEasterEgg(null);
                            playKeyClick();
                        }}>
                        <option value="">-- SELECIONE O PERFIL PARA VALIDAR --</option>
                        {professors.map((p) => <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest">Senha {selectedProfessor ? getAuthText(selectedProfessor.gender).toUpperCase() : 'DE SEGURANÇA'}:</label>
                        <input type="password" className="block w-full p-4 text-sm border-2 border-gray-300 rounded-none shadow-inner focus:border-blue-800 outline-none font-bold" placeholder="Digite a chave secreta..." value={password} disabled={!selectedProfessor} onChange={handlePasswordChange} autoComplete="off" />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="flex-1 bg-blue-900 text-white font-black py-4 text-sm shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-blue-800 transition-all uppercase tracking-[0.2em]">AUTENTICAR</motion.button>
                        <button type="button" onClick={() => {setPassword(''); setError(''); playKeyClick();}} className="px-8 bg-gray-100 text-gray-600 font-bold text-xs hover:bg-gray-200 transition-all uppercase border border-gray-300">LIMPAR</button>
                    </div>
                </form>

                {selectedProfessor && failedAttempts > 0 && (
                  <motion.div 
                    animate={{ opacity: 1, y: 0, rotate: -5 }} 
                    initial={{ opacity: 0, y: 50, rotate: 0 }} 
                    className="absolute -right-24 top-1/2 w-56 bg-[#ffff88] shadow-xl p-6 flex flex-col items-center text-center z-50 font-hand text-gray-800"
                  >
                      <div className="absolute top-[-10px] w-12 h-6 bg-blue-400/20 blur-[1px]"></div>
                      <p className="font-bold text-lg mb-2 underline decoration-red-400 decoration-2">DICA DO SIGAA:</p>
                      <p className="text-xl rotate-1" style={{ filter: `blur(${(1 - progress) * 8}px)` }}>"{selectedProfessor.hint}"</p>
                      <p className="text-[9px] mt-4 opacity-40 uppercase font-sans tracking-widest font-bold">Lembrete de Segurança</p>
                  </motion.div>
                )}
            </div>
            
            <p className="mt-8 text-gray-500 text-[10px] font-bold uppercase tracking-widest">SISTEMA v4.21.0 - BUILD_2025_RELEASE</p>
        </div>

        <aside className="hidden md:block col-span-3 space-y-4">
             <div className="bg-white border-2 border-gray-400 p-4 shadow-md">
                <div className="bg-gray-100 p-2 font-bold text-[10px] text-gray-500 border-b border-gray-300 flex items-center gap-2 uppercase mb-4"><Calendar size={14}/> Calendário Acadêmico</div>
                <div className="text-center">
                    <div className="font-black text-4xl text-red-600 font-serif italic">SET</div>
                    <div className="text-6xl font-black text-gray-800">20</div>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-tight italic">Previsão: Matrícula com 100% de instabilidade nos servidores.</p>
                </div>
             </div>

             <div className="bg-white border-2 border-gray-400 shadow-md">
                <div className="bg-blue-900 text-white p-2 font-bold text-[10px] uppercase flex items-center gap-2">
                    <Newspaper size={14}/> Notícias do Campus
                </div>
                <div className="p-3 space-y-4">
                    <div className="border-b border-gray-100 pb-2">
                        <h4 className="text-[9px] font-black text-blue-800 uppercase">Café do Lab Antigo</h4>
                        <p className="text-[8px] text-gray-500 leading-tight">Arqueólogos encontram café de 2012 na cafeteira. A bebida criou consciência e está tentando codificar em COBOL.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                        <h4 className="text-[9px] font-black text-blue-800 uppercase">Greve de Arrastão</h4>
                        <p className="text-[8px] text-gray-500 leading-tight">Os ratos do laboratório antigo exigem upgrades de hardware e queijo artesanal da serra.</p>
                    </div>
                    <div>
                        <h4 className="text-[9px] font-black text-blue-800 uppercase">Vaga no RU</h4>
                        <p className="text-[8px] text-gray-500 leading-tight">Novo recorde: Fila do RU atinge a BR-110. Alunos levam barracas para jantar na próxima semana.</p>
                    </div>
                </div>
             </div>
        </aside>
      </main>

      <footer className="bg-blue-900 text-white p-4 text-center text-[9px] border-t-4 border-yellow-500 font-bold uppercase tracking-widest">
        DTI - DEPARTAMENTO DE TECNOLOGIA DA INFORMAÇÃO | UNIVERSIDADE DO ESTADO DO RIO GRANDE DO NORTE | © 2025
      </footer>
    </div>
  );
};

export default FakeLogin;
