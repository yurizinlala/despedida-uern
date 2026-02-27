
// Global Audio Engine
// Preloads all .mp3 sounds at app startup to eliminate first-play latency.

const audioCache: Record<string, HTMLAudioElement> = {};

// All sound files used across the project
const ALL_SOUNDS = [
    '/sounds/accept.mp3',
    '/sounds/achiviment.mp3',
    '/sounds/achviements-open.mp3',
    '/sounds/aproved.mp3',
    '/sounds/aura.mp3',
    '/sounds/bsod.mp3',
    '/sounds/close-folder.mp3',
    '/sounds/coin.mp3',
    '/sounds/crt-off.mp3',
    '/sounds/dot.mp3',
    '/sounds/drum-suspense.mp3',
    '/sounds/erase-recycle-bin.mp3',
    '/sounds/error.mp3',
    '/sounds/footsteps.mp3',
    '/sounds/glitch-transition-open.mp3',
    '/sounds/glitch.mp3',
    '/sounds/hit1.mp3',
    '/sounds/hit2.mp3',
    '/sounds/hit3.mp3',
    '/sounds/hub-day.mp3',
    '/sounds/hub-night.mp3',
    '/sounds/meow1.mp3',
    '/sounds/meow2.mp3',
    '/sounds/meow3.mp3',
    '/sounds/identity-established.mp3',
    '/sounds/kernel-init.mp3',
    '/sounds/kernel-loading.mp3',
    '/sounds/one-up.mp3',
    '/sounds/open-folder.mp3',
    '/sounds/postit.mp3',
    '/sounds/reproved.mp3',
    '/sounds/right-pen.mp3',
    '/sounds/sigaa-init.mp3',
    '/sounds/stamp.mp3',
    '/sounds/starwars-credits.mp3',
    '/sounds/uern-boot.mp3',
    '/sounds/uern95-logout.mp3',
    '/sounds/uern95-startup.mp3',
    '/sounds/uern-xp.mp3',
    '/sounds/wrapped-complete.mp3',
    '/sounds/wrapped-init.mp3',
    '/sounds/wrong-pen.mp3',
    '/sounds/wrong.mp3',
];

/** Preload all project sounds into memory. Call once at app startup. */
export const preloadAllSounds = () => {
    ALL_SOUNDS.forEach((src) => {
        if (!audioCache[src]) {
            const audio = new Audio(src);
            audio.preload = 'auto';
            audioCache[src] = audio;
        }
    });
};

/** Play a sound by path. Uses preloaded cache for instant playback. */
export const playSound = (src: string) => {
    const cached = audioCache[src];
    if (cached) {
        const clone = cached.cloneNode() as HTMLAudioElement;
        clone.play().catch(() => { });
        return clone;
    }
    const audio = new Audio(src);
    audio.play().catch(() => { });
    return audio;
};

/** Play a sound with custom playback rate (pitch). */
export const playSoundPitched = (src: string, playbackRate: number) => {
    const cached = audioCache[src];
    const audio = (cached ? cached.cloneNode() : new Audio(src)) as HTMLAudioElement;
    audio.playbackRate = Math.min(Math.max(playbackRate, 0.25), 4.0);
    audio.play().catch(() => { });
    return audio;
};
