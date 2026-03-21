import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PassportState {
    visitedPlaceIds: string[];
    scratchedPlaceIds: string[];
    gpsThreshold: number; // in meters
    theme: 'light' | 'dark';
    completedTips: Record<string, boolean>;

    unlockPlace: (placeId: string) => void;
    markPlaceAsScratched: (placeId: string) => void;
    toggleTip: (placeId: string, isNight: boolean, index: number) => void;
    isPlaceUnlocked: (placeId: string) => boolean;
    setGpsThreshold: (threshold: number) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    resetProgress: () => void;
    resetScratchedStatus: () => void;
}

export const usePassportStore = create<PassportState>()(
    persist(
        (set, get) => ({
            visitedPlaceIds: [],
            scratchedPlaceIds: [],
            gpsThreshold: 200,
            theme: 'light',
            completedTips: {},

            unlockPlace: (placeId: string) => {
                const { visitedPlaceIds } = get();
                if (!visitedPlaceIds.includes(placeId)) {
                    set({ visitedPlaceIds: [...visitedPlaceIds, placeId] });
                }
            },

            markPlaceAsScratched: (placeId: string) => {
                const { scratchedPlaceIds } = get();
                if (!scratchedPlaceIds.includes(placeId)) {
                    set({ scratchedPlaceIds: [...scratchedPlaceIds, placeId] });
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

            isPlaceUnlocked: (placeId: string) => {
                return get().visitedPlaceIds.includes(placeId);
            },

            setGpsThreshold: (threshold: number) => {
                set({ gpsThreshold: threshold });
            },

            setTheme: (theme: 'light' | 'dark') => {
                set({ theme });
            },

            resetProgress: () => {
                set({ visitedPlaceIds: [], scratchedPlaceIds: [], completedTips: {} });
            },

            resetScratchedStatus: () => {
                set({ scratchedPlaceIds: [] });
            },
        }),
        {
            name: 'passport-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
