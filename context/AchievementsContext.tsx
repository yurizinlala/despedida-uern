import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { playSound } from '../utils/audio';

interface AchievementsContextType {
    unlockedIds: string[];
    unlock: (id: string) => void;
    isUnlocked: (id: string) => boolean;
    /** The ID that was just unlocked (for toast display) */
    lastUnlocked: string | null;
    dismissToast: () => void;
}

const STORAGE_KEY = 'despedida_achievements';

const loadFromStorage = (): string[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const saveToStorage = (ids: string[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch { /* silently fail */ }
};

const AchievementsContext = createContext<AchievementsContextType | null>(null);

export const useAchievements = (): AchievementsContextType => {
    const ctx = useContext(AchievementsContext);
    if (!ctx) throw new Error('useAchievements must be used within AchievementsProvider');
    return ctx;
};

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [unlockedIds, setUnlockedIds] = useState<string[]>(loadFromStorage);
    const [lastUnlocked, setLastUnlocked] = useState<string | null>(null);
    const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const unlock = useCallback((id: string) => {
        if (unlockedIds.includes(id)) return;

        const next = [...unlockedIds, id];
        setUnlockedIds(next);
        saveToStorage(next);

        // Show toast
        setLastUnlocked(id);
        playSound('/sounds/achiviment.mp3');

        // Auto-dismiss after 5s
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => setLastUnlocked(null), 5000);
    }, [unlockedIds]);

    const isUnlocked = useCallback((id: string) => unlockedIds.includes(id), [unlockedIds]);

    const dismissToast = useCallback(() => {
        setLastUnlocked(null);
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    }, []);

    return (
        <AchievementsContext.Provider value={{ unlockedIds, unlock, isUnlocked, lastUnlocked, dismissToast }}>
            {children}
        </AchievementsContext.Provider>
    );
};
