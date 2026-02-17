import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PassportState {
    visitedPlaceIds: string[];
    scratchedPlaceIds: string[];
    gpsThreshold: number; // in meters

    unlockPlace: (placeId: string) => void;
    markPlaceAsScratched: (placeId: string) => void;
    isPlaceUnlocked: (placeId: string) => boolean;
    setGpsThreshold: (threshold: number) => void;
    resetProgress: () => void;
    resetScratchedStatus: () => void;
}

export const usePassportStore = create<PassportState>()(
    persist(
        (set, get) => ({
            visitedPlaceIds: [],
            scratchedPlaceIds: [],
            gpsThreshold: 200,

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

            isPlaceUnlocked: (placeId: string) => {
                return get().visitedPlaceIds.includes(placeId);
            },

            setGpsThreshold: (threshold: number) => {
                set({ gpsThreshold: threshold });
            },

            resetProgress: () => {
                set({ visitedPlaceIds: [], scratchedPlaceIds: [] });
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
