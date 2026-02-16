import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { PLACES_DATA } from '@/src/data/places';
import { LucideChevronRight, LucideMapPin } from 'lucide-react-native';
import { usePassportStore } from '@/src/store/usePassportStore';

export default function RegionScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const region = PLACES_DATA.regions.find((r) => r.id === id);
    const places = PLACES_DATA.places.filter((p) => p.regionId === id);
    const isPlaceUnlocked = usePassportStore((state) => state.isPlaceUnlocked);

    if (!region) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Regione non trovata</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen options={{ title: region.displayName }} />

            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                ListHeaderComponent={() => (
                    <View className="mb-6">
                        <Text className="text-3xl font-bold text-slate-800">{region.displayName}</Text>
                        <Text className="text-slate-500 mt-2">Capitale: {region.capitalCity}</Text>
                    </View>
                )}
                renderItem={({ item }) => {
                    const unlocked = isPlaceUnlocked(item.id);
                    return (
                        <TouchableOpacity
                            className="bg-slate-50 p-4 rounded-xl mb-3 flex-row items-center border border-slate-200"
                            onPress={() => router.push(`/place/${item.id}`)}
                        >
                            <View className="bg-green-100 p-3 rounded-full mr-4">
                                <LucideMapPin size={24} color="#16a34a" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-semibold text-lg text-slate-800">{item.name}</Text>
                                <Text className="text-slate-500 text-sm" numberOfLines={1}>
                                    {item.shortDescription}
                                </Text>
                            </View>
                            {unlocked && (
                                <View className="bg-yellow-100 px-2 py-1 rounded mr-2">
                                    <Text className="text-xs font-bold text-yellow-700">VISITATO</Text>
                                </View>
                            )}
                            <LucideChevronRight size={20} color="#94a3b8" />
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={() => (
                    <Text className="text-center text-slate-400 mt-10">
                        Nessun luogo disponibile in questa regione.
                    </Text>
                )}
            />
        </View>
    );
}
