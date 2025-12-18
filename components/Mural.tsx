
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { X, FileText, Folder, Trash2, ArrowLeft, Clock, Monitor, HelpCircle, HardDrive, Star, Trophy } from 'lucide-react';
import { playKeyClick, playPaperSound, playBiosBeep, playGlitchSound } from '../utils/audio';

const Win95Window: React.FC<{title: string, children: React.ReactNode, onClose: () => void, z: number, onFocus: () => void}> = ({ title, children, onClose, z, onFocus }) => (
    <motion.div 
        drag 
        dragMomentum={false} 
        onPointerDown={onFocus}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ zIndex: z }}
        className="absolute w-[380px] md:w-[650px] bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-[12px_12px_0px_rgba(0,0,0,0.5)] flex flex-col font-sans select-none"
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
    </motion.div>
);

const DesktopIcon: React.FC<{icon: any, label: string, onClick: () => void, color?: string}> = ({ icon: Icon, label, onClick, color="text-yellow-400" }) => (
    <div onClick={onClick} className="w-24 flex flex-col items-center gap-2 cursor-pointer group">
        <div className="p-3 bg-white/0 group-hover:bg-blue-600/30 rounded-lg border border-transparent group-hover:border-white/20 transition-all">
            <Icon size={48} className={`${color} drop-shadow-md pixel-art transition-transform group-hover:scale-110`} />
        </div>
        <span className="text-white text-[9px] font-bold text-center bg-black/60 px-2 py-1 rounded shadow-sm group-hover:bg-blue-800 transition-colors tracking-tight uppercase">{label}</span>
    </div>
);

const Mural: React.FC = () => {
    const { selectedProfessor, advanceStage, unlockAchievement } = useUser();
    const navigate = useNavigate();
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [focusedWindow, setFocusedWindow] = useState('');
    const [zIndices, setZIndices] = useState<Record<string, number>>({});
    const [clickCount, setClickCount] = useState<Set<string>>(new Set());

    const handleOpen = (id: string) => {
        if (!openWindows.includes(id)) {
            setOpenWindows([...openWindows, id]);
            playPaperSound();
        }
        setFocusedWindow(id);
        setZIndices(prev => ({ ...prev, [id]: Math.max(...(Object.values(prev) as number[]), 10) + 1 }));
        playKeyClick();

        const newSet = new Set(clickCount).add(id);
        setClickCount(newSet);
        if (newSet.size >= 5) unlockAchievement('secret_click');
    };

    const handleTrashClick = () => {
        unlockAchievement('arqueologo');
        playGlitchSound();
    };

    if (!selectedProfessor) return null;

    return (
        <div className="h-screen w-full bg-[#008080] relative overflow-hidden font-sans select-none">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]"></div>

            <div className="absolute top-10 left-10 grid grid-cols-1 gap-12">
                <DesktopIcon icon={FileText} label="Mensagens.txt" onClick={() => handleOpen('note')} />
                <DesktopIcon icon={Folder} label="Imagens.zip" onClick={() => handleOpen('photo')} />
                <DesktopIcon icon={HardDrive} label="Meu Computador" onClick={() => handleOpen('pc')} color="text-gray-300" />
                <DesktopIcon icon={Trash2} label="Lixeira" onClick={() => handleOpen('trash')} color="text-gray-400" />
                <DesktopIcon icon={HelpCircle} label="Suporte.hlp" onClick={() => handleOpen('help')} color="text-blue-400" />
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
                        const photoItem = selectedProfessor.muralItems.find(m => m.type === 'polaroid');
                        content = (
                            <div className="flex flex-col items-center gap-6">
                                <div className="p-5 bg-white shadow-2xl border-4 border-gray-100 transform -rotate-1">
                                    <img src={photoItem?.content} className="max-w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000" />
                                    <div className="mt-6 border-t-2 border-gray-100 pt-4 flex justify-between items-center">
                                        <p className="font-hand text-2xl text-blue-900">{photoItem?.meta}</p>
                                        <div className="text-[10px] text-gray-300 font-mono">20/09/2025</div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else if (id === 'trash') {
                        title = "Lixeira - Itens Deletados";
                        content = (
                            <div className="space-y-4 font-mono text-xs">
                                <p className="text-red-600 font-bold border-b border-red-200 pb-2">AVISO: Arquivos aguardando expurgo burocrático.</p>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="p-2 flex items-center gap-3 bg-gray-100 border border-gray-300 cursor-help" onClick={handleTrashClick}>
                                        <FileText size={16} className="text-gray-500"/> Pauta_Excluida_Semana_04.bak
                                    </div>
                                    <div className="p-2 flex items-center gap-3 bg-gray-100 border border-gray-300 cursor-help" onClick={handleTrashClick}>
                                        <FileText size={16} className="text-gray-500"/> Sonhos_De_Calouro_2024.zip
                                    </div>
                                    <div className="p-2 flex items-center gap-3 bg-gray-100 border border-gray-300 cursor-help" onClick={handleTrashClick}>
                                        <Trash2 size={16} className="text-red-500"/> Sanidade_Mental_v2.sys
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-[10px] italic">
                                    "O que cai na lixeira do docente, na lixeira do docente permanece (até o fim do semestre)."
                                </div>
                            </div>
                        );
                    } else if (id === 'pc') {
                        title = "Meu Computador - Disco Local (C:)";
                        content = (
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 border-b pb-6">
                                    <HardDrive size={48} className="text-gray-400" />
                                    <div className="flex-1">
                                        <p className="font-bold text-lg">Disco Local (C:)</p>
                                        <div className="h-6 bg-gray-200 border-2 border-gray-400 p-[1px] mt-2 shadow-inner">
                                            <div className="h-full bg-[#000080] w-[99%]" />
                                        </div>
                                        <p className="text-[10px] mt-2 font-bold uppercase tracking-widest text-red-600">Espaço Crítico: 1KB livre de 1TB</p>
                                    </div>
                                </div>
                                <p className="text-xs">Conteúdo oculto detectado. Recomendamos a desinstalação de "preocupacoes.exe" para liberar espaço.</p>
                            </div>
                        );
                    } else if (id === 'help') {
                        title = "Windows Help - Guia do Docente v1.0";
                        content = (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-blue-900 border-b pb-3">
                                    <HelpCircle size={32} />
                                    <h3 className="font-bold text-xl uppercase">Índice de Ajuda</h3>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center gap-2 hover:underline cursor-pointer"><Star size={12}/> Como lidar com pautas de 10 anos atrás</li>
                                    <li className="flex items-center gap-2 hover:underline cursor-pointer"><Star size={12}/> Tutorial: Café Frio vs. Produtividade</li>
                                    <li className="flex items-center gap-2 hover:underline cursor-pointer text-red-600 font-bold"><Star size={12}/> BOTÃO DE EMERGÊNCIA (RETORNO AO HUB)</li>
                                </ul>
                            </div>
                        );
                    }
                    return (
                        <Win95Window key={id} title={title} onClose={() => setOpenWindows(openWindows.filter(w => w !== id))} z={zIndices[id] || 10} onFocus={() => setZIndices(prev => ({ ...prev, [id]: Math.max(...(Object.values(prev) as number[]), 10) + 1 }))}>{content}</Win95Window>
                    );
                })}
            </AnimatePresence>

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#c0c0c0] border-t-2 border-white flex items-center p-2 gap-3 z-[1000] shadow-[0_-4px_15px_rgba(0,0,0,0.4)]">
                <button 
                    onClick={() => { playBiosBeep(); advanceStage(1); navigate('/hub'); }}
                    className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black flex items-center gap-3 px-5 h-full font-black text-sm active:border-inset shadow-md hover:bg-gray-200 transition-colors group"
                >
                    <div className="bg-blue-800 p-1.5 rounded-sm group-hover:scale-110 transition-transform"><ArrowLeft size={16} className="text-white"/></div>
                    <span className="tracking-tighter uppercase italic text-blue-900">RETORNAR AO CAMPUS</span>
                </button>
                <div className="h-full w-[2px] bg-gray-500 mx-2 shadow-sm"></div>
                {openWindows.map(id => (
                    <div key={id} onClick={() => setFocusedWindow(id)} className={`flex-1 max-w-[180px] h-full border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-[9px] px-3 flex items-center gap-2 truncate bg-[#c0c0c0] font-bold shadow-sm cursor-pointer ${focusedWindow === id ? 'bg-[#dfdfdf] border-inset shadow-inner' : ''}`}>
                        <div className={`w-3 h-3 rounded-full ${focusedWindow === id ? 'bg-blue-700 shadow-[0_0_8px_blue]' : 'bg-gray-400'}`}></div>
                        {id.toUpperCase()}
                    </div>
                ))}
                <div className="ml-auto bg-[#c0c0c0] border-t-2 border-l-2 border-gray-500 border-b-2 border-r-2 border-white px-6 h-full flex items-center gap-4 text-[12px] font-mono font-black shadow-inner">
                    <Clock size={18} className="text-blue-900"/> {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
        </div>
    );
};
export default Mural;
