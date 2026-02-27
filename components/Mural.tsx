
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
    X, FileText, Folder, Trash2, Clock, Monitor, HelpCircle,
    HardDrive, Star, ChevronRight, Power
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { playSound } from '../utils/audio';
import { useAchievements } from '../context/AchievementsContext';

// ─── Win95 Window ───
const Win95Window: React.FC<{
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    z: number;
    onFocus: () => void;
    width?: string;
}> = ({ title, children, onClose, z, onFocus, width = 'w-[380px] md:w-[650px]' }) => (
    <motion.div
        drag
        dragMomentum={false}
        onPointerDown={onFocus}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{ zIndex: z }}
        className={`absolute ${width} flex flex-col font-sans select-none`}
    >
        {/* Outer bevel border */}
        <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] shadow-[8px_8px_0px_rgba(0,0,0,0.4)]">
            {/* Title bar */}
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex justify-between items-center cursor-move">
                <div className="flex items-center gap-2 overflow-hidden">
                    <Monitor size={14} className="text-white shrink-0" />
                    <span className="text-white text-[11px] font-bold truncate">{title}</span>
                </div>
                <div className="flex gap-[3px] shrink-0">
                    <button className="w-[16px] h-[14px] bg-[#c0c0c0] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] text-black text-[9px] flex items-center justify-center leading-none active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white">_</button>
                    <button className="w-[16px] h-[14px] bg-[#c0c0c0] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] text-black text-[9px] flex items-center justify-center leading-none active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white">□</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); playSound('/sounds/close-folder.mp3'); onClose(); }}
                        className="w-[16px] h-[14px] bg-[#c0c0c0] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] text-black text-[10px] flex items-center justify-center font-bold leading-none hover:bg-red-600 hover:text-white active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white"
                    >×</button>
                </div>
            </div>
            {/* Menu bar */}
            <div className="bg-[#c0c0c0] border-b border-[#808080] px-1 py-[2px] flex gap-1">
                {['Arquivo', 'Editar', 'Exibir'].map(m => (
                    <span key={m} className="text-[11px] px-2 py-[1px] hover:bg-[#000080] hover:text-white cursor-default font-w95">{m}</span>
                ))}
            </div>
            {/* Content area with inset border */}
            <div className="p-2 bg-[#c0c0c0]">
                <div className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-4 min-h-[200px] max-h-[420px] overflow-y-auto text-[13px] text-black font-sans leading-relaxed">
                    {children}
                </div>
            </div>
            {/* Status bar */}
            <div className="bg-[#c0c0c0] border-t border-[#808080] px-3 py-[2px] flex items-center">
                <div className="flex-1 border border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-2 py-[1px]">
                    <span className="text-[10px] text-[#404040]">Pronto</span>
                </div>
            </div>
        </div>
    </motion.div>
);

// ─── Desktop Icon ───
const DesktopIcon: React.FC<{
    icon: string;
    label: string;
    onClick: () => void;
    delay?: number;
}> = ({ icon, label, onClick, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
        onClick={onClick}
        onDoubleClick={onClick}
        className="w-[75px] flex flex-col items-center gap-1 cursor-pointer group"
    >
        <div className="p-2 group-hover:bg-[#000080]/30 group-hover:outline group-hover:outline-1 group-hover:outline-dashed group-hover:outline-white/50 transition-colors">
            <img src={icon} className="w-8 h-8 object-contain drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]" />
        </div>
        <span className="text-white text-[10px] text-center px-1 py-[1px] leading-tight group-hover:bg-[#000080] group-hover:text-white transition-colors select-none font-w95">{label}</span>
    </motion.div>
);

// ─── Sticker Widget (themed Lucide icons from createMural) ───
const StickerWidget: React.FC<{ iconName: string; x: number; y: number; delay: number }> = ({ iconName, x, y, delay }) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Star;
    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 1.5, duration: 0.3 }}
            className="absolute cursor-grab active:cursor-grabbing z-[8] select-none"
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            <div className="bg-[#c0c0c0] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-1 py-[1px] flex justify-between items-center">
                    <span className="text-white text-[7px] font-bold">Widget</span>
                </div>
                <div className="px-3 py-2 flex items-center justify-center">
                    <IconComponent size={24} className="text-[#000080]" />
                </div>
            </div>
        </motion.div>
    );
};

// ─── Start Menu ───
const StartMenu: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onExit: () => void;
}> = ({ isOpen, onClose, onExit }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <div className="fixed inset-0 z-[998]" onClick={onClose} />
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-14 left-2 z-[999] overflow-hidden"
                >
                    <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] shadow-[4px_-4px_8px_rgba(0,0,0,0.3)] w-[200px] flex">
                        {/* Blue sidebar */}
                        <div className="w-6 bg-gradient-to-t from-[#000080] to-[#1084d0] flex items-end justify-center pb-2">
                            <span className="text-white text-[8px] font-bold [writing-mode:vertical-lr] rotate-180 tracking-widest">UERN 95</span>
                        </div>
                        {/* Menu items */}
                        <div className="flex-1 py-1">
                            <div className="px-3 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white cursor-default text-[12px] group">
                                <Monitor size={16} className="text-gray-600 group-hover:text-white" />
                                <span>Programas</span>
                                <ChevronRight size={12} className="ml-auto" />
                            </div>
                            <div className="px-3 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white cursor-default text-[12px] group">
                                <FileText size={16} className="text-gray-600 group-hover:text-white" />
                                <span>Documentos</span>
                                <ChevronRight size={12} className="ml-auto" />
                            </div>
                            <div className="px-3 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white cursor-default text-[12px] group">
                                <HelpCircle size={16} className="text-gray-600 group-hover:text-white" />
                                <span>Ajuda</span>
                            </div>
                            <div className="h-[1px] bg-[#808080] mx-2 my-1 shadow-[0_1px_0_white]" />
                            <div
                                onClick={() => { playSound('/sounds/uern95-logout.mp3'); onExit(); }}
                                className="px-3 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white cursor-pointer text-[12px] group"
                            >
                                <Power size={16} className="text-red-600 group-hover:text-white" />
                                <span className="font-bold">Desligar...</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

// ═══════════════════════════════════
// ─── MAIN COMPONENT ───
// ═══════════════════════════════════
const Mural: React.FC = () => {
    const { selectedProfessor, advanceStage } = useUser();
    const { unlock } = useAchievements();
    const navigate = useNavigate();
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [focusedWindow, setFocusedWindow] = useState('');
    const [zIndices, setZIndices] = useState<Record<string, number>>({});
    const [clickCount, setClickCount] = useState<Set<string>>(new Set());
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [trashEmpty, setTrashEmpty] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [booted, setBooted] = useState(false);

    // Boot animation
    useEffect(() => {
        playSound('/sounds/uern95-startup.mp3');
        const t = setTimeout(() => {
            setBooted(true);
            unlock('time_machine');
        }, 400);
        return () => clearTimeout(t);
    }, []);

    // Clock update
    useEffect(() => {
        const t = setInterval(() => setCurrentTime(new Date()), 30000);
        return () => clearInterval(t);
    }, []);

    // Stickers from muralItems
    const stickers = useMemo(() =>
        selectedProfessor?.muralItems.filter(m => m.type === 'sticker') || [],
        [selectedProfessor]
    );

    const handleOpen = (id: string) => {
        playSound('/sounds/open-folder.mp3');
        if (!openWindows.includes(id)) {
            const nextWindows = [...openWindows, id];
            setOpenWindows(nextWindows);
            // Check if all 5 windows are now open
            const allIds = ['note', 'photo', 'trash', 'pc', 'help'];
            if (allIds.every(wid => nextWindows.includes(wid))) {
                unlock('ram_torturer');
            }
        }
        bringToFront(id);
        setClickCount(prev => new Set(prev).add(id));
    };

    const handleClose = (id: string) => {
        setOpenWindows(prev => prev.filter(w => w !== id));
        if (focusedWindow === id) setFocusedWindow('');
    };

    const bringToFront = (id: string) => {
        setFocusedWindow(id);
        setZIndices(prev => ({ ...prev, [id]: Math.max(...(Object.values(prev) as number[]), 10) + 1 }));
    };

    const handleExit = () => {
        advanceStage(1);
        navigate('/hub');
    };

    const handleEmptyTrash = () => {
        playSound('/sounds/erase-recycle-bin.mp3');
        setTrashEmpty(true);
        unlock('trash_cleaner');
    };

    if (!selectedProfessor) return null;

    const noteItem = selectedProfessor.muralItems.find(m => m.type === 'note');
    const photoItem = selectedProfessor.muralItems.find(m => m.type === 'polaroid');
    const today = currentTime.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // ─── Window content renderers ───
    const renderNoteContent = () => (
        <div className="space-y-4">
            {/* Post-its on top */}
            <div className="flex gap-3 flex-wrap mb-4">
                {[
                    { color: 'bg-yellow-200', text: 'Não esquecer de salvar!' },
                    { color: 'bg-pink-200', text: 'Lembrete: ser grato' },
                    { color: 'bg-blue-200', text: 'Prazo: ♾️' },
                ].map((postit, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, rotate: -10 }}
                        animate={{ opacity: 1, rotate: (i - 1) * 3 }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                        className={`${postit.color} p-3 shadow-md border border-black/10 text-[11px] font-w95 max-w-[140px] leading-tight text-black`}
                        style={{ transform: `rotate(${(i - 1) * 3}deg)` }}
                    >
                        {postit.text}
                    </motion.div>
                ))}
            </div>
            <div className="border-b border-gray-200 mb-4" />
            {/* Letter content */}
            <div className="whitespace-pre-wrap font-w95 text-[13px] leading-relaxed text-gray-800">
                {noteItem?.content}
            </div>
        </div>
    );

    const renderPhotoContent = () => (
        <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white shadow-lg border border-gray-200 transform -rotate-1">
                <img
                    src={photoItem?.content}
                    alt="Foto da turma"
                    className="max-w-full max-h-[280px] h-auto grayscale hover:grayscale-0 transition-all duration-1000 cursor-pointer"
                />
                <div className="mt-4 border-t border-gray-200 pt-3 flex justify-between items-center">
                    <p className="font-serif text-lg italic text-blue-900">{photoItem?.meta}</p>
                    <div className="text-[10px] text-gray-400 font-w95">{today}</div>
                </div>
            </div>
        </div>
    );

    const renderTrashContent = () => (
        <div className="space-y-4">
            {!trashEmpty ? (
                <>
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <p className="text-[11px] text-gray-500 font-w95">3 objeto(s) — 2,7 KB</p>
                        <button
                            onClick={handleEmptyTrash}
                            className="text-[10px] bg-[#c0c0c0] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] px-3 py-1 font-w95 hover:bg-[#d4d4d4] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-black"
                        >
                            Esvaziar Lixeira
                        </button>
                    </div>
                    <div className="space-y-1">
                        {[
                            { icon: 'small-notepad.png', name: 'Pauta_Excluida_Semana_04.bak', size: '1,2 KB' },
                            { icon: 'small-folder.png', name: 'Sonhos_De_Calouro_2024.zip', size: '0,8 KB' },
                            { icon: 'small-recicle-bin.png', name: 'Sanidade_Mental_v2.sys', size: '0,7 KB' },
                        ].map((file, i) => (
                            <div key={i} className="p-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white cursor-default group text-[12px] font-w95 text-black">
                                <img src={`/assets/${file.icon}`} className="w-4 h-4 object-contain" />
                                <span className="flex-1">{file.name}</span>
                                <span className="text-[10px] text-gray-400 group-hover:text-white/60">{file.size}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-[10px] italic text-gray-600 font-w95">
                        "O que cai na lixeira do docente, na lixeira do docente permanece (até o fim do semestre)."
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-gray-400 font-w95"
                >
                    <img src="/assets/recycle-bin-empty.png" className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-[12px]">A lixeira está vazia.</p>
                    <p className="text-[10px] mt-2 italic">Seus arrependimentos foram eliminados com sucesso.</p>
                </motion.div>
            )}
        </div>
    );

    const renderPCContent = () => (
        <div className="space-y-5 font-w95 text-black">
            <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                <img src="/assets/hard-drive-icon.png" className="w-10 h-10 object-contain" />
                <div className="flex-1">
                    <p className="font-bold text-sm">Disco Local (C:)</p>
                    <div className="h-5 bg-gray-200 border border-[#808080] p-[1px] mt-2">
                        <div className="h-full bg-[#000080]" style={{ width: '99%' }} />
                    </div>
                    <p className="text-[9px] mt-1.5 font-bold uppercase tracking-wider text-red-600">Espaço Crítico: 1KB livre de 1TB</p>
                </div>
            </div>
            <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 p-2 hover:bg-[#000080] hover:text-white cursor-default group">
                    <img src="/assets/small-folder.png" className="w-4 h-4" />
                    <span>C:\Semestres\2022-2025</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#000080] hover:text-white cursor-default group">
                    <img src="/assets/small-folder.png" className="w-4 h-4" />
                    <span>C:\Provas\Não_Estudadas</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#000080] hover:text-white cursor-default group">
                    <img src="/assets/small-folder.png" className="w-4 h-4" />
                    <span>C:\Café\Emergencial</span>
                </div>
            </div>
            <p className="text-[10px] text-gray-500 italic border-t border-gray-200 pt-3">
                Conteúdo oculto detectado. Recomendamos a desinstalação de "preocupacoes.exe" para liberar espaço.
            </p>
        </div>
    );

    const renderHelpContent = () => (
        <div className="space-y-4 font-w95 text-black">
            <div className="flex items-center gap-3 text-[#000080] border-b border-gray-200 pb-3">
                <img src="/assets/help-book.png" className="w-8 h-8" />
                <h3 className="font-bold text-base">Tópicos de Ajuda</h3>
            </div>
            <ul className="space-y-1 text-[12px]">
                {[
                    'Como lidar com pautas de 10 anos atrás',
                    'Tutorial: Café Frio vs. Produtividade',
                    'FAQ: Por que o SIGAA trava às 23:59?',
                    'Guia: Sobrevivendo ao período letivo',
                    'Manual: Como não chorar ao corrigir provas',
                ].map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 hover:bg-[#000080] hover:text-white cursor-default group">
                        <img src="/assets/help-icon.png" className="w-3 h-3" />
                        <span>{topic}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    // Map window IDs to content
    const windowConfig: Record<string, { title: string; content: React.ReactNode; width?: string }> = {
        note: { title: 'Mensagens_Recuperadas.txt — Bloco de Notas', content: renderNoteContent() },
        photo: { title: 'Visualizador de Imagens — Polaroid.jpg', content: renderPhotoContent() },
        trash: { title: 'Lixeira', content: renderTrashContent() },
        pc: { title: 'Meu Computador', content: renderPCContent() },
        help: { title: 'Ajuda do UERN 95', content: renderHelpContent() },
    };

    return (
        <div className="h-screen w-full relative overflow-hidden font-w95 select-none text-black">
            {/* Wallpaper */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: "url('/assets/walpaper.png')" }}
            />

            {/* Desktop icons — left column */}
            {booted && (
                <div className="absolute top-4 left-4 grid grid-cols-1 gap-4 z-[9]">
                    <DesktopIcon icon="/assets/notepad.png" label="Mensagens.txt" onClick={() => handleOpen('note')} delay={0.1} />
                    <DesktopIcon icon="/assets/folder.png" label="Imagens.zip" onClick={() => handleOpen('photo')} delay={0.2} />
                    <DesktopIcon icon="/assets/computer.png" label="Meu Computador" onClick={() => handleOpen('pc')} delay={0.3} />
                    <DesktopIcon
                        icon={trashEmpty ? "/assets/recycle-bin-empty.png" : "/assets/recycle-bin-full.png"}
                        label="Lixeira"
                        onClick={() => handleOpen('trash')}
                        delay={0.4}
                    />
                    <DesktopIcon icon="/assets/info.png" label="Suporte.hlp" onClick={() => handleOpen('help')} delay={0.5} />
                </div>
            )}

            {/* Sticker widgets from professor data */}
            {booted && stickers.map((s, i) => (
                <StickerWidget
                    key={s.id}
                    iconName={s.content}
                    x={s.style?.x ?? 50 + i * 10}
                    y={s.style?.y ?? 20 + i * 8}
                    delay={i * 0.1}
                />
            ))}

            {/* Windows */}
            <AnimatePresence>
                {openWindows.map(id => {
                    const config = windowConfig[id];
                    if (!config) return null;
                    return (
                        <Win95Window
                            key={id}
                            title={config.title}
                            onClose={() => handleClose(id)}
                            z={zIndices[id] || 10}
                            onFocus={() => bringToFront(id)}
                            width={config.width}
                        >
                            {config.content}
                        </Win95Window>
                    );
                })}
            </AnimatePresence>

            {/* Start Menu */}
            <StartMenu
                isOpen={startMenuOpen}
                onClose={() => setStartMenuOpen(false)}
                onExit={handleExit}
            />

            {/* ═══ Taskbar ═══ */}
            <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 gap-1 z-[1000]">
                {/* Start button */}
                <button
                    onClick={() => setStartMenuOpen(!startMenuOpen)}
                    className={`h-[22px] px-2 flex items-center gap-1.5 text-[11px] font-bold border border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white ${startMenuOpen ? 'border-t-[#404040] border-l-[#404040] border-b-white border-r-white bg-[#b0b0b0]' : ''}`}
                >
                    <img src="/assets/windows-icon.png" className="w-4 h-4 object-contain" />
                    <span className="text-black font-w95">Iniciar</span>
                </button>

                {/* Divider */}
                <div className="w-[2px] h-[20px] border-l border-[#808080] border-r border-r-white" />

                {/* Open window tabs */}
                <div className="flex-1 flex gap-[2px] overflow-hidden">
                    {openWindows.map(id => (
                        <button
                            key={id}
                            onClick={() => bringToFront(id)}
                            className={`h-[22px] max-w-[160px] flex-1 flex items-center gap-1.5 px-2 text-[10px] font-bold truncate border cursor-pointer ${focusedWindow === id
                                ? 'border-t-[#404040] border-l-[#404040] border-b-white border-r-white bg-[#dfdfdf]'
                                : 'border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#c0c0c0]'
                                }`}
                        >
                            <img
                                src={
                                    id === 'note' ? '/assets/small-notepad.png' :
                                        id === 'photo' ? '/assets/folder.png' :
                                            id === 'pc' ? '/assets/computer.png' :
                                                id === 'trash' ? (trashEmpty ? '/assets/small-recicle-bin.png' : '/assets/recycle-bin-full.png') :
                                                    '/assets/help-book.png'
                                }
                                className="w-3 h-3 object-contain"
                            />
                            <span className="truncate text-black font-w95">{windowConfig[id]?.title.split('—')[0].trim() || id}</span>
                        </button>
                    ))}
                </div>

                {/* Clock */}
                <div className="h-[22px] border border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-3 flex items-center gap-2 text-[11px] bg-[#c0c0c0]">
                    <span className="text-black font-w95">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
        </div>
    );
};

export default Mural;
