import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Image, LayoutAnimation, Modal, Dimensions } from 'react-native';
import Animated, { LinearTransition, FadeIn } from 'react-native-reanimated';
import ConfettiCannon from 'react-native-confetti-cannon';
import { PLACES_DATA } from '@/src/data/places';
import { useLocationCheck } from '@/src/hooks/useLocationCheck';
import { usePassportStore } from '@/src/store/usePassportStore';
import ScratchCard from '@/src/components/ScratchCard';
import FlippableBadge from '@/src/components/FlippableBadge';
import TrophyViewer from '@/src/components/TrophyViewer';
import { LucideMapPin, LucideUnlock, LucideCircle, LucideCheckCircle2, LucideSun, LucideMoon, LucideStar, LucideShare2, LucideGem, LucideChevronLeft } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import PointsBadge from '@/src/components/PointsBadge';
import { Share } from 'react-native';

export default function PlaceScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const place = PLACES_DATA.places.find((p) => p.id === id);

    // Debug log
    useEffect(() => {
        if (place) {
            console.log("Place:", place.name, "Badge Asset:", place.badge.imageAsset);
        }
    }, [place]);

    const isUnlocked = usePassportStore((state) => state.isPlaceUnlocked(place?.id || ""));
    const markPlaceAsScratched = usePassportStore((state) => state.markPlaceAsScratched);
    const unlockPlace = usePassportStore((state) => state.unlockPlace);
    const scratchedPlaceIds = usePassportStore((state) => state.scratchedPlaceIds);
    const scratchedPlaceDates = usePassportStore((state) => state.scratchedPlaceDates);
    const favoritePlaceIds = usePassportStore((state) => state.favoritePlaceIds);
    const toggleFavorite = usePassportStore((state) => state.toggleFavorite);
    
    const isFavorite = favoritePlaceIds.includes(place?.id || "");
    const gpsThreshold = usePassportStore((state) => state.gpsThreshold);
    const completedTips = usePassportStore((state) => state.completedTips);
    const toggleTip = usePassportStore((state) => state.toggleTip);
    const unlockTrophy = usePassportStore((state) => state.unlockTrophy);
    const triggerSocialShare = usePassportStore((state) => state.triggerSocialShare);
    const unlockedTrophies = usePassportStore((state) => state.unlockedTrophies);
    
    const { colorScheme, setColorScheme } = useColorScheme();
    const isNight = colorScheme === 'dark';
    const currentTips = isNight && place?.nightTips ? place.nightTips : (place?.docTips || []);

    const currentDayTips = place?.docTips || [];
    const currentNightTips = place?.nightTips || place?.docTips || [];
    const isDayCompleted = currentDayTips.every((_, index) => completedTips[`${place?.id}-day-${index}`]);
    const isNightCompleted = currentNightTips.every((_, index) => completedTips[`${place?.id}-night-${index}`]);
    const isTrophyUnlocked = currentDayTips.length > 0 && isDayCompleted && isNightCompleted;
    
    const [showTrophyModal, setShowTrophyModal] = useState(false);
    const [showCelebrationModal, setShowCelebrationModal] = useState(false);
    const [wasUnlockedOnMount] = useState(isTrophyUnlocked);

    useEffect(() => {
        if (isTrophyUnlocked && !wasUnlockedOnMount) {
            setShowCelebrationModal(true);
            if (place) {
                unlockTrophy(place.id);
            }
        }
    }, [isTrophyUnlocked, wasUnlockedOnMount]);

    const handleCelebrationTap = () => {
        setShowCelebrationModal(false);
        setTimeout(() => {
            setShowTrophyModal(true);
        }, 500); // Wait for the fade out before sliding the trophy in
    };

    const handleReveal = () => {
        if (place) {
            markPlaceAsScratched(place.id);
            unlockPlace(place.id); // Ensure it's also marked as visited/unlocked
        }
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Ehi! Ho appena sbloccato il trofeo di ${place?.name} su Italian Passport! 🇮🇹✨`,
            });
            if (result.action === Share.sharedAction) {
                triggerSocialShare();
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    // We only check location if not unlocked
    const { distance, loading, errorMsg, refresh } = useLocationCheck(
        place?.latitude || 0,
        place?.longitude || 0
    );

    const [canScratch, setCanScratch] = useState(false);

    useEffect(() => {
        if (distance !== null && distance <= gpsThreshold) {
            setCanScratch(true);
        } else {
            setCanScratch(false);
        }
    }, [distance, gpsThreshold]);

    if (!place) return <View><Text>Luogo non trovato</Text></View>;

    return (
        <ScrollView className="flex-1 bg-white dark:bg-slate-900" contentContainerStyle={{ paddingBottom: 40 }}>
            <Stack.Screen 
                options={{ 
                    title: place.name,
                    headerBackVisible: false, // Hide default back button
                    headerLeft: () => (
                        <View className="flex-row items-center ml-1">
                            <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} className="mr-3">
                                <LucideChevronLeft size={32} color={isNight ? '#cbd5e1' : '#334155'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleShare} className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full border border-blue-200 dark:border-blue-700/50">
                                <LucideShare2 size={18} color="#3b82f6" />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerRight: () => (
                        <View className="flex-row items-center gap-4">
                            <PointsBadge />
                            <TouchableOpacity 
                                onPress={() => toggleFavorite(place.id)}
                                className="w-10 h-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
                                style={{ marginRight: -5 }} // Shift 5 points to the right
                            >
                                <LucideStar 
                                    size={22} 
                                    color={isFavorite ? '#fbbf24' : (isNight ? '#cbd5e1' : '#64748b')} 
                                    fill={isFavorite ? '#fbbf24' : 'transparent'} 
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }} 
            />

            {/* Header */}
            <View className="p-6 bg-green-50 dark:bg-green-950">
                <Text className="text-3xl font-bold text-slate-800 dark:text-white text-center">{place.name}</Text>
                <Text className="text-slate-500 dark:text-slate-400 text-center mt-2">{place.shortDescription}</Text>
            </View>

            {/* Main Content */}
            <View className="p-6">

                {/* Interaction Area */}
                <View
                    className="h-96 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 border border-slate-200 dark:border-slate-700 justify-center items-center overflow-hidden relative"
                    style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }}
                >
                    {/* Points indicator for Badge */}
                    {scratchedPlaceIds.includes(place.id) && (
                        <View className="absolute top-4 right-4 bg-green-100 dark:bg-green-900/50 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-700/50 z-10 shadow-sm flex-row items-center">
                            <LucideGem size={14} color="#16a34a" className="mr-1" />
                            <Text className="text-green-600 dark:text-green-400 font-bold text-sm">+50 pt</Text>
                        </View>
                    )}
                    {/* 
                        CONDITION 1: ALREADY SCRATCHED (Unlocked & Scratched)
                        Show the Big Sticker directly.
                    */}
                    {scratchedPlaceIds.includes(place.id) ? (
                        <View className="items-center justify-center p-4">
                            <View 
                                style={{
                                    shadowColor: PLACES_DATA.regions.find(r => r.id === place.regionId)?.themeColorHex || '#fbbf24',
                                    shadowOpacity: 0.6,
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowRadius: 20,
                                    elevation: 20
                                }}
                            >
                                <FlippableBadge
                                    size={260} // +20% visually massive!
                                    themeColorHex={'#fbbf24'} // Using the true gold internal gradient
                                    imageAsset={place.badge.imageAsset}
                                    unlockDate={scratchedPlaceDates?.[place.id]}
                                />
                            </View>
                            <Text className="text-slate-400 dark:text-slate-500 text-sm mt-4 italic">
                                Tocca il badge per girarlo!
                            </Text>
                        </View>
                    ) : (
                        /* 
                           CONDITION 2: NOT SCRATCHED YET
                           Check if user is allowed to scratch (Unlocked via GPS or Debug)
                        */
                        <>
                            {(isUnlocked || canScratch) ? (
                                /* SHOW SCRATCH CARD */
                                <ScratchCard
                                    imageSource={place.badge.imageAsset || require('@/assets/images/icon.png')}
                                    onReveal={handleReveal}
                                />
                            ) : (
                                /* LOCKED STATE (Too far) */
                                <View className="items-center p-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                    {loading ? (
                                        <ActivityIndicator size="large" color="#22c55e" />
                                    ) : (
                                        <>
                                            <LucideMapPin size={48} color="#94a3b8" />
                                            <Text className="text-lg font-semibold text-slate-700 dark:text-slate-200 mt-4 text-center">
                                                Sei troppo lontano
                                            </Text>
                                            <Text className="text-slate-500 dark:text-slate-400 text-center mt-2">
                                                Avvicinati a meno di {gpsThreshold}m per sbloccare.
                                            </Text>
                                            {distance !== null && (
                                                <Text className="text-slate-400 dark:text-slate-500 mt-2 font-mono">
                                                    Distanza: {Math.round(distance)}m
                                                </Text>
                                            )}

                                            {/* Debug Button */}
                                            {__DEV__ && (
                                                <TouchableOpacity
                                                    className="mt-4 bg-red-100 px-3 py-1 rounded"
                                                    onPress={() => setCanScratch(true)}
                                                >
                                                    <Text className="text-red-600 text-xs">Debug: Force Scratch</Text>
                                                </TouchableOpacity>
                                            )}
                                        </>
                                    )}
                                </View>
                            )}
                        </>
                    )}
                </View>

                {/* Trophy Button moved outside badge box */}
                {isTrophyUnlocked && (
                    <TouchableOpacity 
                        onPress={() => setShowTrophyModal(true)}
                        className="mb-8 w-full bg-amber-400 dark:bg-amber-500 px-6 py-4 rounded-xl flex-row justify-center items-center shadow-lg"
                    >
                        <LucideStar size={24} color="white" className="mr-3" />
                        <Text className="text-white font-bold text-lg uppercase tracking-wider text-shadow-sm">
                            Ispeziona Trofeo 3D
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Tips Section */}
                <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-xl font-bold text-slate-800 dark:text-white">
                        5 Cose da fare {isNight ? 'di sera' : 'di giorno'}
                    </Text>
                    
                    {/* Inline Theme Toggle */}
                    <TouchableOpacity 
                        onPress={() => {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            setColorScheme(isNight ? 'light' : 'dark');
                        }}
                        className="flex-row items-center bg-slate-200/50 dark:bg-slate-700/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700"
                    >
                        {isNight ? (
                            <LucideMoon size={16} color="#fbbf24" className="mr-1" />
                        ) : (
                            <LucideSun size={16} color="#f59e0b" className="mr-1" />
                        )}
                        <Text className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isNight ? 'Notte' : 'Giorno'}
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {!isTrophyUnlocked && (
                    <Text className="text-amber-500/80 dark:text-amber-400/80 text-sm font-medium mb-4 italic">
                        Completa tutte le attività giorno/notte per sbloccare il Trofeo.
                    </Text>
                )}

                <Animated.View key={isNight ? 'night-tips' : 'day-tips'} entering={FadeIn.duration(400)}>
                    {currentTips.map((tip, index) => {
                        const isCompleted = completedTips[`${place.id}-${isNight ? 'night' : 'day'}-${index}`];
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => toggleTip(place.id, isNight, index)}
                                activeOpacity={0.7}
                                className={`flex-row items-start mb-3 p-3 rounded-lg border ${
                                    isCompleted 
                                      ? 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-800' 
                                      : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-700'
                                }`}
                            >
                                <View className="mr-3 mt-0.5">
                                    {isCompleted ? (
                                        <LucideCheckCircle2 size={24} color="#22c55e" />
                                    ) : (
                                        <LucideCircle size={24} color="#94a3b8" />
                                    )}
                                </View>
                                <Text className={`flex-1 leading-6 ${
                                    isCompleted 
                                      ? 'text-slate-500 dark:text-slate-400 line-through' 
                                      : 'text-slate-600 dark:text-slate-300'
                                }`}>
                                    {tip}
                                </Text>
                                {isCompleted && (
                                    <View className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded ml-2 border border-green-200 dark:border-green-800">
                                        <Text className="text-green-600 dark:text-green-400 font-bold text-xs">+10 pt</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </Animated.View>

            </View>

            {/* Celebration Popup (Before Trophy) */}
            <Modal visible={showCelebrationModal} animationType="fade" transparent={true}>
                <TouchableOpacity 
                    activeOpacity={1} 
                    onPress={handleCelebrationTap}
                    className="flex-1 bg-black/95 justify-center items-center p-6"
                >
                    {/* Left Cannon */}
                    <ConfettiCannon
                        count={200}
                        origin={{x: Dimensions.get('window').width * 0.2, y: -20}} 
                        fallSpeed={3500}
                        explosionSpeed={600}
                        fadeOut={true}
                        autoStart={true}
                        colors={['#fbbf24', '#f59e0b', '#d97706', '#ef4444', '#3b82f6', '#22c55e', '#ffffff']}
                    />
                    {/* Right Cannon */}
                    <ConfettiCannon
                        count={200}
                        origin={{x: Dimensions.get('window').width * 0.8, y: -20}} 
                        fallSpeed={4000}
                        explosionSpeed={500}
                        fadeOut={true}
                        autoStart={true}
                        colors={['#fbbf24', '#f59e0b', '#d97706', '#ef4444', '#3b82f6', '#22c55e', '#ffffff']}
                    />
                    
                    <Animated.View entering={FadeIn.delay(300).springify()}>
                        <View className="items-center bg-amber-500/20 p-8 rounded-3xl border-2 border-amber-400">
                            <Text className="text-4xl font-black text-white text-center mb-2 tracking-widest shadow-xl" style={{ textShadowColor: 'black', textShadowRadius: 10, textShadowOffset: {width: 0, height: 2} }}>
                                GRANDIOSO!
                            </Text>
                            <Text className="text-xl font-bold text-amber-200 text-center mb-8 px-2" style={{ textShadowColor: 'black', textShadowRadius: 6, textShadowOffset: {width: 0, height: 1} }}>
                                Hai sbloccato il trofeo{'\n'}di {place.name}
                            </Text>
                            
                            <View className="bg-white/20 px-6 py-3 rounded-full border border-white/40 shadow-sm mt-4">
                                <Text className="text-white font-bold text-sm tracking-widest uppercase">
                                    Tocca lo schermo
                                </Text>
                            </View>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>

            {/* Trophy Viewer Modal */}
            <Modal visible={showTrophyModal} animationType="slide" transparent={true}>
                <View className="flex-1 bg-black/90 justify-center items-center">
                    <View className="w-[90%] h-[75%] bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 items-center pt-8 shadow-2xl relative">
                        {unlockedTrophies.includes(place.id) && (
                            <View className="absolute top-4 right-4 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30 flex-row items-center z-10">
                                <LucideGem size={14} color="#22c55e" className="mr-1" />
                                <Text className="text-green-400 font-bold text-sm">+100 pt</Text>
                            </View>
                        )}
                        <Text className="text-xl font-black text-amber-400 mb-2 tracking-widest uppercase mt-2">
                            TROFEO {place.name}
                        </Text>
                        <Text className="text-slate-300 text-center px-6 mb-4 text-sm">
                            Hai completato tutte le 10 sfide (Giorno e Notte) per questa città! Ecco la tua ricompensa animata.
                        </Text>
                        
                        <View className="flex-1 w-full relative bg-black/40">
                            {/* @ts-ignore - place.badge.trophyAsset will be added externally by user */}
                            <TrophyViewer trophyAsset={place.badge.trophyAsset} />
                            
                            <Text className="absolute bottom-6 w-full text-center text-slate-500 text-xs italic pointer-events-none">
                                Usa un dito per ruotare, due per trascinare.
                            </Text>
                        </View>

                        <View className="flex-row w-full border-t border-slate-700">
                            <TouchableOpacity 
                                onPress={() => setShowTrophyModal(false)}
                                className="bg-slate-800 px-6 py-5 flex-1 items-center justify-center border-r border-slate-700"
                            >
                                <Text className="text-white font-bold text-base uppercase tracking-wider">Chiudi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleShare}
                                className="bg-blue-600 px-6 py-5 flex-1 items-center justify-center flex-row"
                            >
                                <LucideShare2 size={20} color="white" className="mr-2" />
                                <Text className="text-white font-bold text-base uppercase tracking-wider">Condividi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
