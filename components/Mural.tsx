
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Square, FileText, Folder, Trash2, ArrowLeft, Clock, Monitor, HelpCircle, Code, Database, Globe, Layers, Binary, Cpu } from 'lucide-react';
import { playKeyClick, playPaperSound, playBiosBeep } from '../utils/audio';

const Win95Window: React.FC<{title: string, children: React.ReactNode, onClose: () => void, z: number, onFocus: () => void}> = ({ title, children, onClose, z, onFocus }) => (
    <motion.div 
        drag 
        dragMomentum={false} 
        onPointerDown={onFocus}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ zIndex: z }}
        className="absolute w-[380px] md:w-[650px] bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-[8px_8px_0px_rgba(0,0,0,0.4)] flex flex-col font-sans select-none"
    >
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] p-1.5 flex justify-between items-center px-3">
            <div className="flex items-center gap-2 overflow-hidden">
                <Monitor size={14} className="text-white shrink-0" />
                <span className="text-white text-[12px] font-bold truncate tracking-tight">{title}</span>
            </div>
            <div className="flex gap-1.5 shrink-0">
                <button className="w-5 h-5 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-black text-[10px] flex items-center justify-center shadow-sm">_</button>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-5 h-5 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-black text-[12px] flex items-center justify-center font-bold shadow-sm hover:bg-red-500 hover:text-white transition-colors">X</button>
            </div>
        </div>
        <div className="flex-1 p-2 bg-[#c0c0c0]">
            <div className="bg-white border-t-2 border-l-2 border-[#404040] border-b-2 border-r-2 border-white p-8 min-h-[250px] max-h-[500px] overflow-y-auto text-sm text-black font-mono leading-relaxed shadow-inner">
                {children}
            </div>
        </div>
        <div className="bg-[#c0c0c0] px-3 py-1.5 text-[10px] text-gray-700 border-t border-gray-400 flex justify-between items-center italic">
            <span>MODIFICADO: {new Date().toLocaleDateString()}</span>
            <span className="font-bold uppercase tracking-widest">Acesso Autorizado</span>
        </div>
    </motion.div>
);

const SubjectIcon: React.FC<{type: string, x: number, y: number}> = ({ type, x, y }) => {
    const Icon = useMemo(() => {
        const lower = type.toLowerCase();
        if (lower.includes('web')) return Globe;
        if (lower.includes('data') || lower.includes('db')) return Database;
        if (lower.includes('logic') || lower.includes('grafos')) return Binary;
        if (lower.includes('hardware') || lower.includes('intro')) return Cpu;
        if (lower.includes('program')) return Code;
        return Layers;
    }, [type]);

    return (
        <motion.div 
            drag
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute z-0 opacity-20 hover:opacity-100 cursor-grab active:cursor-grabbing group"
            whileHover={{ scale: 1.2, rotate: 10 }}
        >
            <div className="p-4 bg-white/10 rounded-xl border border-white/5 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                <Icon size={48} className="text-white" />
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
                {type}
            </span>
        </motion.div>
    );
};

const PostIt: React.FC<{content: string, x: number, y: number, color: string, rotate: number}> = ({ content, x, y, color, rotate }) => (
    <motion.div 
        drag
        style={{ left: `${x}%`, top: `${y}%`, backgroundColor: color, rotate: `${rotate}deg` }}
        className="absolute w-40 p-4 shadow-xl border-b-4 border-black/10 font-hand text-black text-sm z-10 cursor-move"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
    >
        <div className="absolute top-0 left-0 w-full h-4 bg-black/5"></div>
        <p className="pt-2 leading-tight">{content}</p>
    </motion.div>
);

const Mural: React.FC = () => {
    const { selectedProfessor, advanceStage } = useUser();
    const navigate = useNavigate();
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [focusedWindow, setFocusedWindow] = useState('');
    const [zIndices, setZIndices] = useState<Record<string, number>>({});

    const handleOpen = (id: string) => {
        if (!openWindows.includes(id)) {
            setOpenWindows([...openWindows, id]);
            playPaperSound();
        }
        setFocusedWindow(id);
        setZIndices(prev => ({ ...prev, [id]: Math.max(...(Object.values(prev) as number[]), 10) + 1 }));
        playKeyClick();
    };

    if (!selectedProfessor) return null;

    return (
        <div className="h-screen w-full bg-[#008080] relative overflow-hidden font-sans cursor-default select-none">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]"></div>

            {/* Background Subject Icons */}
            {selectedProfessor.subjects.map((sub, i) => (
                <SubjectIcon key={i} type={sub} x={15 + (i * 15)} y={20 + (Math.sin(i) * 30 + 30)} />
            ))}

            {/* Post-it Widgets */}
            <PostIt color="#ffff88" content="Não esquecer de postar o material no SIGAA!" x={70} y={15} rotate={-5} />
            <PostIt color="#ff99cc" content="Correção da Prova 2: Média da turma está... preocupante." x={80} y={40} rotate={5} />
            <PostIt color="#99ffff" content="Avisar que a aula de amanhã será no lab 04." x={75} y={65} rotate={-2} />

            {/* Desktop Icons */}
            <div className="absolute top-10 left-10 space-y-12">
                <div onClick={() => handleOpen('note')} className="w-24 flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="p-3 bg-white/0 group-hover:bg-blue-600/30 rounded-lg border border-transparent group-hover:border-white/20 transition-all">
                        <FileText size={48} className="text-yellow-400 drop-shadow-md pixel-art" />
                    </div>
                    <span className="text-white text-[10px] font-bold text-center bg-black/40 px-3 py-1 rounded shadow-sm group-hover:bg-blue-800 transition-colors tracking-tight uppercase">Mensagens.txt</span>
                </div>
                <div onClick={() => handleOpen('photo')} className="w-24 flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="p-3 bg-white/0 group-hover:bg-blue-600/30 rounded-lg border border-transparent group-hover:border-white/20 transition-all">
                        <Folder size={48} className="text-yellow-400 drop-shadow-md pixel-art" />
                    </div>
                    <span className="text-white text-[10px] font-bold text-center bg-black/40 px-3 py-1 rounded shadow-sm group-hover:bg-blue-800 transition-colors tracking-tight uppercase">Imagens.zip</span>
                </div>
                <div onClick={() => handleOpen('help')} className="w-24 flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="p-3 bg-white/0 group-hover:bg-blue-600/30 rounded-lg border border-transparent group-hover:border-white/20 transition-all">
                        <HelpCircle size={48} className="text-blue-400 drop-shadow-md pixel-art" />
                    </div>
                    <span className="text-white text-[10px] font-bold text-center bg-black/40 px-3 py-1 rounded shadow-sm group-hover:bg-blue-800 transition-colors tracking-tight uppercase">Suporte.hlp</span>
                </div>
            </div>

            <AnimatePresence>
                {openWindows.map(id => {
                    let content: React.ReactNode = "";
                    let title = "";
                    if (id === 'note') {
                        title = "Mensagens_Recuperadas.txt - Bloco de Notas";
                        content = <div className="whitespace-pre-wrap">{selectedProfessor.muralItems.find(m => m.type === 'note')?.content}</div>;
                    } else if (id === 'photo') {
                        title = "Visualizador de Imagens - Polaroid_vFinal.jpg";
                        content = (
                            <div className="flex flex-col items-center gap-6">
                                <div className="p-5 bg-white shadow-2xl border-4 border-gray-100 transform -rotate-1">
                                    <img src={selectedProfessor.muralItems.find(m => m.type === 'polaroid')?.content} className="max-w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 cursor-zoom-in" />
                                    <div className="mt-6 border-t-2 border-gray-100 pt-4 flex justify-between items-center">
                                        <p className="font-hand text-2xl text-blue-900">{selectedProfessor.muralItems.find(m => m.type === 'polaroid')?.meta}</p>
                                        <div className="text-[10px] text-gray-300 font-mono">20/09/2025</div>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 font-mono italic">"Um momento de paz antes da prova final..."</p>
                            </div>
                        );
                    } else if (id === 'help') {
                        title = "Manual de Instruções do Docente";
                        content = (
                            <div className="space-y-6">
                                <h3 className="font-bold border-b-2 border-gray-300 pb-3 text-lg uppercase">Protocolos de Sobrevivência:</h3>
                                <ul className="list-disc pl-6 space-y-3 text-sm">
                                    <li>Mantenha o café acima de 70°C para manter o foco lógico.</li>
                                    <li>Não tente encontrar lógica onde existe apenas gambiarra (P.O.G).</li>
                                    <li>Os alunos são movidos a desespero e prazos expirados.</li>
                                    <li>Clique em <span className="bg-blue-800 text-white px-2 py-0.5 rounded">INICIAR</span> para voltar ao Campus.</li>
                                </ul>
                                <div className="bg-blue-50 p-4 border-l-4 border-blue-500 italic text-[12px] text-blue-800">"Um professor inspira a eternidade; ele nunca pode dizer onde sua influência para." - Henry Adams</div>
                            </div>
                        );
                    }
                    return (
                        <Win95Window key={id} title={title} onClose={() => setOpenWindows(openWindows.filter(w => w !== id))} z={zIndices[id] || 10} onFocus={() => setZIndices(prev => ({ ...prev, [id]: Math.max(...(Object.values(prev) as number[]), 10) + 1 }))}>{content}</Win95Window>
                    );
                })}
            </AnimatePresence>

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#c0c0c0] border-t-2 border-white flex items-center p-2 gap-3 z-[1000] shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
                <button 
                    onClick={() => { playBiosBeep(); advanceStage(1); navigate('/hub'); }}
                    className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black flex items-center gap-3 px-4 h-full font-bold text-sm active:border-inset shadow-md hover:bg-gray-200 group"
                >
                    <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-1.5 rounded-sm group-hover:scale-110 transition-transform shadow-inner"><ArrowLeft size={16} className="text-white"/></div>
                    <span className="tracking-tighter uppercase italic text-[#333]">LOGOUT / HUB</span>
                </button>
                <div className="h-full w-[2px] bg-gray-500 mx-2 shadow-sm"></div>
                {openWindows.map(id => (
                    <div key={id} className={`flex-1 max-w-[180px] h-full border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-[11px] px-4 flex items-center gap-3 truncate bg-[#c0c0c0] font-bold shadow-sm cursor-pointer ${focusedWindow === id ? 'bg-[#dfdfdf] border-inset' : ''}`}>
                        <div className={`w-3.5 h-3.5 rounded-full ${focusedWindow === id ? 'bg-blue-700 shadow-[0_0_5px_blue]' : 'bg-gray-400'}`}></div>
                        {id === 'note' ? 'Mensagens.txt' : id === 'photo' ? 'Imagens.zip' : 'Suporte.hlp'}
                    </div>
                ))}
                <div className="ml-auto bg-[#c0c0c0] border-t-2 border-l-2 border-gray-500 border-b-2 border-r-2 border-white px-6 h-full flex items-center gap-4 text-[12px] font-mono font-bold shadow-inner">
                    <Clock size={18} className="text-gray-600"/> {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
        </div>
    );
};
export default Mural;
