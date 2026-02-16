import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { PLACES_DATA } from '@/src/data/places';
import { useLocationCheck } from '@/src/hooks/useLocationCheck';
import { usePassportStore } from '@/src/store/usePassportStore';
import ScratchCard from '@/src/components/ScratchCard';
import { LucideMapPin, LucideUnlock } from 'lucide-react-native';

export default function PlaceScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const place = PLACES_DATA.places.find((p) => p.id === id);

    const isUnlocked = usePassportStore((state) => state.isPlaceUnlocked(id as string));
    const unlockPlace = usePassportStore((state) => state.unlockPlace);
    const gpsThreshold = usePassportStore((state) => state.gpsThreshold);

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

    const handleReveal = () => {
        unlockPlace(id as string);
        Alert.alert("Complimenti!", `Hai sbloccato il badge: ${place?.badge.title}`);
    };

    if (!place) return <View><Text>Luogo non trovato</Text></View>;

    return (
        <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 40 }}>
            <Stack.Screen options={{ title: place.name }} />

            {/* Header */}
            <View className="p-6 bg-green-50">
                <Text className="text-3xl font-bold text-slate-800 text-center">{place.name}</Text>
                <Text className="text-slate-500 text-center mt-2">{place.shortDescription}</Text>
            </View>

            {/* Main Content */}
            <View className="p-6">

                {/* Interaction Area */}
                <View className="h-80 w-full bg-slate-100 rounded-2xl overflow-hidden mb-8 shadow-sm border border-slate-200 justify-center items-center">
                    {isUnlocked ? (
                        <View className="items-center p-4">
                            <View className="w-32 h-32 bg-yellow-100 rounded-full items-center justify-center mb-4">
                                {/* TODO: Render Icon properly. For now text/lucide */}
                                <LucideUnlock size={64} color="#eab308" />
                            </View>
                            <Text className="text-xl font-bold text-yellow-700">{place.badge.title}</Text>
                            <Text className="text-center text-slate-500 mt-2">{place.badge.description}</Text>
                        </View>
                    ) : (
                        <>
                            {loading ? (
                                <ActivityIndicator size="large" color="#22c55e" />
                            ) : (
                                <>
                                    {canScratch ? (
                                        <ScratchCard
                                            imageSource={require('@/assets/images/icon.png')} // TODO: Badge Image
                                            onReveal={handleReveal}
                                        />
                                    ) : (
                                        <View className="items-center p-6">
                                            <LucideMapPin size={48} color="#94a3b8" />
                                            <Text className="text-lg font-semibold text-slate-700 mt-4 text-center">
                                                Sei troppo lontano
                                            </Text>
                                            <Text className="text-slate-500 text-center mt-2">
                                                Avvicinati a meno di {gpsThreshold}m per sbloccare.
                                            </Text>
                                            {distance !== null && (
                                                <Text className="text-slate-400 mt-2 font-mono">
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
                                        </View>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </View>

                {/* Tips Section */}
                <Text className="text-xl font-bold text-slate-800 mb-4">5 Cose da fare</Text>
                {place.docTips.map((tip, index) => (
                    <View key={index} className="flex-row items-start mb-3">
                        <View className="bg-green-100 w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                            <Text className="text-green-700 font-bold text-xs">{index + 1}</Text>
                        </View>
                        <Text className="text-slate-600 flex-1 leading-6">{tip}</Text>
                    </View>
                ))}

            </View>
        </ScrollView>
    );
}
