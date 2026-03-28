import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import Animated, { LinearTransition, FadeIn } from 'react-native-reanimated';
import { PLACES_DATA } from '@/src/data/places';
import { useLocationCheck } from '@/src/hooks/useLocationCheck';
import { usePassportStore } from '@/src/store/usePassportStore';
import ScratchCard from '@/src/components/ScratchCard';
import FlippableBadge from '@/src/components/FlippableBadge';
import { LucideMapPin, LucideUnlock, LucideCircle, LucideCheckCircle2, LucideSun, LucideMoon, LucideStar } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

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
    
    const { colorScheme, setColorScheme } = useColorScheme();
    const isNight = colorScheme === 'dark';
    const currentTips = isNight && place?.nightTips ? place.nightTips : (place?.docTips || []);

    const handleReveal = () => {
        if (place) {
            markPlaceAsScratched(place.id);
            unlockPlace(place.id); // Ensure it's also marked as visited/unlocked
            Alert.alert("Complimenti!", `Hai sbloccato il badge: ${place.badge.title}`);
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
                    // @ts-ignore - headerBackTitleVisible is valid in React Navigation but missing in Expo Router types
                    headerBackTitleVisible: false,
                    headerBackTitle: '',
                    headerRight: () => (
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
                    className="h-96 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 border border-slate-200 dark:border-slate-700 justify-center items-center overflow-hidden"
                    style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }}
                >
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

                {/* Tips Section */}
                <View className="flex-row justify-between items-center mb-4">
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
                            </TouchableOpacity>
                        );
                    })}
                </Animated.View>

            </View>
        </ScrollView>
    );
}
