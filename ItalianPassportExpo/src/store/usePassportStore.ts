import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/src/lib/supabase';

export interface PointTransaction {
    id: string;
    amount: number;
    reason: string;
    timestamp: string;
}

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
    
    // Auth & Profile
    user: { id: string; email: string; firstName: string; lastName: string } | null;
    isGuest: boolean;
    appOpenCount: number;
    
    // Gamification
    totalPoints: number;
    pointsHistory: PointTransaction[];
    loginStreak: number;
    lastLoginDate: string | null;
    unlockedTrophies: string[];
    weeklyMissionProgress: number; // Num of activities completed this week
    monthlyMissionProgress: number; // Num of trophies unlocked this month
    lastWeeklyResetDate: string | null;
    lastMonthlyResetDate: string | null;
    awardedPointKeys: string[]; // Tracks keys of items that already awarded points

    unlockPlace: (placeId: string) => void;
    markPlaceAsScratched: (placeId: string) => void;
    toggleTip: (placeId: string, isNight: boolean, index: number) => void;
    toggleFavorite: (placeId: string) => void;
    isPlaceUnlocked: (placeId: string) => boolean;
    setGpsThreshold: (threshold: number) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    
    completeOnboarding: () => void;
    setUnlockedRegions: (regions: string[]) => void;

    // Auth Actions
    setUser: (user: any | null) => void;
    setGuest: (isGuest: boolean) => void;
    incrementAppOpen: () => void;
    syncProgressToCloud: () => Promise<void>;
    loadProgressFromCloud: () => Promise<void>;

    resetProgress: () => void;
    resetScratchedStatus: () => void;
    resetOnboarding: () => void;

    // Gamification Actions
    addPoints: (amount: number, reason: string) => void;
    processDailyLogin: () => void;
    unlockTrophy: (placeId: string) => void;
    triggerSocialShare: () => void;

    // Hydration
    hasHydrated: boolean;
    setHasHydrated: (hydrated: boolean) => void;
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
            
            user: null,
            isGuest: true,
            appOpenCount: 0,
            
            totalPoints: 0,
            pointsHistory: [],
            loginStreak: 0,
            lastLoginDate: null,
            unlockedTrophies: [],
            weeklyMissionProgress: 0,
            monthlyMissionProgress: 0,
            lastWeeklyResetDate: null,
            lastMonthlyResetDate: null,
            awardedPointKeys: [],

            hasHydrated: false,
            setHasHydrated: (hasHydrated) => set({ hasHydrated }),

            unlockPlace: (placeId: string) => {
                const { visitedPlaceIds } = get();
                if (!visitedPlaceIds.includes(placeId)) {
                    set({ visitedPlaceIds: [...visitedPlaceIds, placeId] });
                }
            },

            markPlaceAsScratched: (placeId: string) => {
                const { scratchedPlaceIds, scratchedPlaceDates, addPoints } = get();
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

                    // Add points for scratching
                    addPoints(50, "Badge grattato");
                }
            },

            toggleTip: (placeId: string, isNight: boolean, index: number) => {
                const { completedTips, addPoints, weeklyMissionProgress, lastWeeklyResetDate, awardedPointKeys } = get();
                const tipKey = `${placeId}-${isNight ? 'night' : 'day'}-${index}`;
                const isAlreadyCompleted = completedTips[tipKey];
                
                set({
                    completedTips: {
                        ...completedTips,
                        [tipKey]: !isAlreadyCompleted
                    }
                });

                // Award points only if it hasn't been awarded before
                if (!isAlreadyCompleted && !awardedPointKeys.includes(tipKey)) {
                    set({ awardedPointKeys: [...awardedPointKeys, tipKey] });
                    addPoints(10, "Attività completata");
                    
                    // Update Weekly Mission
                    const now = new Date();
                    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1))).toISOString().split('T')[0];
                    
                    let newProgress = weeklyMissionProgress + 1;
                    if (lastWeeklyResetDate !== startOfWeek) {
                        newProgress = 1; // Reset for new week
                    }
                    
                    set({ 
                        weeklyMissionProgress: newProgress,
                        lastWeeklyResetDate: startOfWeek
                    });

                    if (newProgress === 5) {
                        addPoints(50, "Missione settimanale");
                    }
                }
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
                const currentRegions = get().unlockedRegions;
                const newRegions = regions.filter(r => !currentRegions.includes(r));
                
                set({ unlockedRegions: regions });

                if (newRegions.length > 0) {
                    get().addPoints(30 * newRegions.length, "Regione sbloccata");
                }
            },

            // Auth Implementations
            setUser: (user) => set({ user, isGuest: !user }),
            setGuest: (isGuest) => set({ isGuest }),
            incrementAppOpen: () => {
                const { appOpenCount } = get();
                set({ appOpenCount: appOpenCount + 1 });
            },

            syncProgressToCloud: async () => {
                const state = get();
                if (!state.user) return; // Only sync if logged in

                const dataToSave = {
                    visitedPlaceIds: state.visitedPlaceIds,
                    scratchedPlaceIds: state.scratchedPlaceIds,
                    scratchedPlaceDates: state.scratchedPlaceDates,
                    gpsThreshold: state.gpsThreshold,
                    theme: state.theme,
                    completedTips: state.completedTips,
                    favoritePlaceIds: state.favoritePlaceIds,
                    hasCompletedOnboarding: state.hasCompletedOnboarding,
                    unlockedRegions: state.unlockedRegions,
                    appOpenCount: state.appOpenCount,
                    totalPoints: state.totalPoints,
                    pointsHistory: state.pointsHistory,
                    loginStreak: state.loginStreak,
                    lastLoginDate: state.lastLoginDate,
                    unlockedTrophies: state.unlockedTrophies,
                    weeklyMissionProgress: state.weeklyMissionProgress,
                    monthlyMissionProgress: state.monthlyMissionProgress,
                    lastWeeklyResetDate: state.lastWeeklyResetDate,
                    lastMonthlyResetDate: state.lastMonthlyResetDate,
                    awardedPointKeys: state.awardedPointKeys,
                };

                const { error } = await supabase.from('user_progress').upsert({ 
                    id: state.user.id, 
                    state: dataToSave 
                });

                if (error) {
                    console.error("Errore sync cloud:", error);
                } else {
                    console.log("Sincronizzazione cloud completata per", state.user.email);
                }
            },

            loadProgressFromCloud: async () => {
                const { user } = get();
                if (!user) return;
                
                const { data, error } = await supabase.from('user_progress').select('state').eq('id', user.id).single();
                
                if (data && data.state) {
                    set({ ...data.state });
                    console.log("Download dal cloud completato per", user.email);
                } else if (error && error.code !== 'PGRST116') {
                    console.error("Errore caricamento cloud:", error);
                }
            },

            resetProgress: () => {
                set({ 
                    visitedPlaceIds: [], 
                    scratchedPlaceIds: [], 
                    completedTips: {}, 
                    scratchedPlaceDates: {},
                    totalPoints: 0,
                    pointsHistory: [],
                    loginStreak: 0,
                    lastLoginDate: null,
                    unlockedTrophies: [],
                    weeklyMissionProgress: 0,
                    monthlyMissionProgress: 0,
                    lastWeeklyResetDate: null,
                    lastMonthlyResetDate: null,
                    awardedPointKeys: [],
                    user: null,
                    isGuest: true,
                    appOpenCount: 0
                });
            },

            resetScratchedStatus: () => {
                set({ scratchedPlaceIds: [] });
            },

            resetOnboarding: () => {
                set({ hasCompletedOnboarding: false, unlockedRegions: [] });
            },

            addPoints: (amount: number, reason: string) => {
                const { totalPoints, pointsHistory } = get();
                const newTransaction: PointTransaction = {
                    id: Math.random().toString(36).substring(7),
                    amount,
                    reason,
                    timestamp: new Date().toISOString()
                };
                set({ 
                    totalPoints: totalPoints + amount,
                    pointsHistory: [newTransaction, ...pointsHistory]
                });
            },

            processDailyLogin: () => {
                const { lastLoginDate, loginStreak, addPoints } = get();
                const today = new Date().toISOString().split('T')[0];

                if (lastLoginDate !== today) {
                    let newStreak = loginStreak;
                    
                    if (lastLoginDate) {
                        const lastDate = new Date(lastLoginDate);
                        const currentDate = new Date(today);
                        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

                        if (diffDays === 1) {
                            newStreak += 1;
                        } else {
                            newStreak = 1;
                        }
                    } else {
                        newStreak = 1;
                    }

                    set({ lastLoginDate: today, loginStreak: newStreak });
                    
                    addPoints(5, "Login giornaliero");

                    if (newStreak > 0 && newStreak % 7 === 0) {
                        addPoints(50, "Striscia settimanale 7 giorni");
                    }
                }
            },

            unlockTrophy: (placeId: string) => {
                const { unlockedTrophies, addPoints, monthlyMissionProgress, lastMonthlyResetDate } = get();
                if (!unlockedTrophies.includes(placeId)) {
                    set({ unlockedTrophies: [...unlockedTrophies, placeId] });
                    addPoints(100, "Trofeo Sbloccato");

                    // Update Monthly Mission
                    const now = new Date();
                    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

                    let newProgress = monthlyMissionProgress + 1;
                    if (lastMonthlyResetDate !== startOfMonth) {
                        newProgress = 1;
                    }

                    set({ 
                        monthlyMissionProgress: newProgress,
                        lastMonthlyResetDate: startOfMonth
                    });

                    if (newProgress === 2) {
                        addPoints(150, "Missione mensile");
                    }
                }
            },

            triggerSocialShare: () => {
                get().addPoints(20, "Condivisione Social");
            }
        }),
        {
            name: 'passport-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state, error) => {
                if (!error && state) {
                    state.setHasHydrated(true);
                }
            }
        }
    )
);
