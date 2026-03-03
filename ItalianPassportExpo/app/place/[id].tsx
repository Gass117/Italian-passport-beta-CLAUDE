import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import { PLACES_DATA } from '@/src/data/places';
import { useLocationCheck } from '@/src/hooks/useLocationCheck';
import { usePassportStore } from '@/src/store/usePassportStore';
import ScratchCard from '@/src/components/ScratchCard';
import { LucideMapPin, LucideUnlock } from 'lucide-react-native';

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
    const gpsThreshold = usePassportStore((state) => state.gpsThreshold);

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
            <Stack.Screen options={{ title: place.name }} />

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
                            <View style={{
                                width: 280,
                                height: 280,
                                borderRadius: 140,
                                backgroundColor: 'white',
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.5,
                                shadowRadius: 12,
                                elevation: 15,
                            }}>
                                <View style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 140,
                                    overflow: 'hidden',
                                    borderWidth: 8,
                                    borderColor: 'white',
                                }}>
                                    {place.badge.imageAsset ? (
                                        <Image
                                            source={place.badge.imageAsset}
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <View className="flex-1 bg-green-100 items-center justify-center">
                                            <LucideUnlock size={80} color="#15803d" />
                                        </View>
                                    )}
                                </View>
                            </View>
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
                <Text className="text-xl font-bold text-slate-800 dark:text-white mb-4">5 Cose da fare</Text>
                {place.docTips.map((tip, index) => (
                    <View key={index} className="flex-row items-start mb-3 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                        <View className="bg-green-100 dark:bg-green-950 w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                            <Text className="text-green-700 dark:text-green-500 font-bold text-xs">{index + 1}</Text>
                        </View>
                        <Text className="text-slate-600 dark:text-slate-300 flex-1 leading-6">{tip}</Text>
                    </View>
                ))}

            </View>
        </ScrollView>
    );
}
