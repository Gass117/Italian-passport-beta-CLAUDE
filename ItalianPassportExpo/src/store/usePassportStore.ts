import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PassportState {
    visitedPlaceIds: string[];
    gpsThreshold: number; // in meters

    unlockPlace: (placeId: string) => void;
    isPlaceUnlocked: (placeId: string) => boolean;
    setGpsThreshold: (threshold: number) => void;
    resetProgress: () => void;
}

export const usePassportStore = create<PassportState>()(
    persist(
        (set, get) => ({
            visitedPlaceIds: [],
            gpsThreshold: 200,

            unlockPlace: (placeId: string) => {
                const { visitedPlaceIds } = get();
                if (!visitedPlaceIds.includes(placeId)) {
                    set({ visitedPlaceIds: [...visitedPlaceIds, placeId] });
                }
            },

            isPlaceUnlocked: (placeId: string) => {
                return get().visitedPlaceIds.includes(placeId);
            },

            setGpsThreshold: (threshold: number) => {
                set({ gpsThreshold: threshold });
            },

            resetProgress: () => {
                set({ visitedPlaceIds: [] });
            },
        }),
        {
            name: 'passport-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
