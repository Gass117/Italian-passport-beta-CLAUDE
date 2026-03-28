import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PassportState {
    visitedPlaceIds: string[];
    scratchedPlaceIds: string[];
    scratchedPlaceDates: Record<string, string>; // Maps placeId -> "15 maggio 2026"
    gpsThreshold: number; // in meters
    theme: 'light' | 'dark';
    completedTips: Record<string, boolean>;
    favoritePlaceIds: string[];
    hasCompletedOnboarding: boolean;
    unlockedRegions: string[];

    unlockPlace: (placeId: string) => void;
    markPlaceAsScratched: (placeId: string) => void;
    toggleTip: (placeId: string, isNight: boolean, index: number) => void;
    toggleFavorite: (placeId: string) => void;
    isPlaceUnlocked: (placeId: string) => boolean;
    setGpsThreshold: (threshold: number) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    
    completeOnboarding: () => void;
    setUnlockedRegions: (regions: string[]) => void;

    resetProgress: () => void;
    resetScratchedStatus: () => void;
    resetOnboarding: () => void;
}

export const usePassportStore = create<PassportState>()(
    persist(
        (set, get) => ({
            visitedPlaceIds: [],
            scratchedPlaceIds: [],
            scratchedPlaceDates: {},
            gpsThreshold: 200,
            theme: 'light',
            completedTips: {},
            favoritePlaceIds: [],
            hasCompletedOnboarding: false,
            unlockedRegions: [],

            unlockPlace: (placeId: string) => {
                const { visitedPlaceIds } = get();
                if (!visitedPlaceIds.includes(placeId)) {
                    set({ visitedPlaceIds: [...visitedPlaceIds, placeId] });
                }
            },

            markPlaceAsScratched: (placeId: string) => {
                const { scratchedPlaceIds, scratchedPlaceDates } = get();
                if (!scratchedPlaceIds.includes(placeId)) {
                    const formatter = new Intl.DateTimeFormat('it-IT', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                    });
                    const today = formatter.format(new Date());

                    set({ 
                        scratchedPlaceIds: [...scratchedPlaceIds, placeId],
                        scratchedPlaceDates: {
                            ...(scratchedPlaceDates || {}),
                            [placeId]: today
                        }
                    });
                }
            },

            toggleTip: (placeId: string, isNight: boolean, index: number) => {
                const { completedTips } = get();
                const tipKey = `${placeId}-${isNight ? 'night' : 'day'}-${index}`;
                set({
                    completedTips: {
                        ...completedTips,
                        [tipKey]: !completedTips[tipKey]
                    }
                });
            },

            toggleFavorite: (placeId: string) => {
                const { favoritePlaceIds } = get();
                if (favoritePlaceIds.includes(placeId)) {
                    set({ favoritePlaceIds: favoritePlaceIds.filter(id => id !== placeId) });
                } else {
                    set({ favoritePlaceIds: [...favoritePlaceIds, placeId] });
                }
            },

            isPlaceUnlocked: (placeId: string) => {
                return get().visitedPlaceIds.includes(placeId);
            },

            setGpsThreshold: (threshold: number) => {
                set({ gpsThreshold: threshold });
            },

            setTheme: (theme: 'light' | 'dark') => {
                set({ theme });
            },

            completeOnboarding: () => {
                set({ hasCompletedOnboarding: true });
            },

            setUnlockedRegions: (regions: string[]) => {
                set({ unlockedRegions: regions });
            },

            resetProgress: () => {
                set({ visitedPlaceIds: [], scratchedPlaceIds: [], completedTips: {}, scratchedPlaceDates: {} });
            },

            resetScratchedStatus: () => {
                set({ scratchedPlaceIds: [] });
            },

            resetOnboarding: () => {
                set({ hasCompletedOnboarding: false, unlockedRegions: [] });
            },
        }),
        {
            name: 'passport-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
