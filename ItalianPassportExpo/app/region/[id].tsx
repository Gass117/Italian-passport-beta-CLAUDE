import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { PLACES_DATA } from '@/src/data/places';
import { LucideChevronLeft, LucideChevronRight, LucideMapPin } from 'lucide-react-native';
import { usePassportStore } from '@/src/store/usePassportStore';
import Svg, { Path } from 'react-native-svg';
import { REGION_PATHS } from '@/src/components/Map/RegionPaths';
import { getMacroRegion } from '@/src/components/Map/ItalyMap';
import { REGION_BBOXES } from '@/src/components/Map/RegionBBoxes';

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

    const macroMode = getMacroRegion(region.id);
    const regionBBox = REGION_BBOXES[region.id];

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <Stack.Screen 
                options={{ 
                    title: region.displayName,
                    headerLeft: () => (
                        <TouchableOpacity 
                            onPress={() => router.back()} 
                            style={{ marginLeft: 8, marginRight: 16, padding: 4 }}
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        >
                            <LucideChevronLeft size={32} color="#3b82f6" />
                        </TouchableOpacity>
                    )
                }} 
            />

            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                ListHeaderComponent={() => (
                    <View className="mb-6">
                        {/* MAP HIGHLIGHT */}
                        <View className="items-center justify-center mb-6">
                            <View
                                className="bg-slate-50 dark:bg-slate-800 rounded-2xl items-center justify-center border border-slate-100 dark:border-slate-700 overflow-hidden"
                                style={{
                                    width: '100%',
                                    // Use aspectRatio so height is strictly derived from width
                                    aspectRatio: regionBBox ? regionBBox.aspectRatio : 1,
                                    maxHeight: 260, // Ensure very tall regions don't occupy too much height
                                    elevation: 2,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowRadius: 2,
                                    shadowOffset: { width: 0, height: 1 }
                                }}
                            >
                                <Svg
                                    // Expand internal SVG slightly so the outline stroke isn't cropped by viewBox margins
                                    viewBox={regionBBox ? regionBBox.viewBox : "0 0 610 800"}
                                    style={{ width: '92%', height: '92%' }}
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <Path
                                        d={REGION_PATHS[region.id]}
                                        fill={region.themeColorHex}
                                        stroke="white"
                                        strokeWidth="3"
                                        transform=""
                                    />
                                </Svg>
                            </View>
                        </View>

                        <Text className="text-3xl font-bold text-slate-800 dark:text-white">{region.displayName}</Text>
                        <Text className="text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wide">CAPOLUOGO: {region.capitalCity.toUpperCase()}</Text>
                    </View>
                )}
                renderItem={({ item }) => {
                    const unlocked = isPlaceUnlocked(item.id);
                    return (
                        <TouchableOpacity
                            className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-3 flex-row items-center border border-slate-200 dark:border-slate-700"
                            onPress={() => router.push(`/place/${item.id}`)}
                        >
                            <View className="bg-green-100 dark:bg-green-950 p-3 rounded-full mr-4">
                                <LucideMapPin size={24} color="#16a34a" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-semibold text-lg text-slate-800 dark:text-white">{item.name}</Text>
                                <Text className="text-slate-500 dark:text-slate-400 text-sm" numberOfLines={1}>
                                    {item.shortDescription}
                                </Text>
                            </View>
                            {unlocked && (
                                <View className="bg-yellow-100 dark:bg-yellow-950 px-2 py-1 rounded mr-2 border border-yellow-200 dark:border-yellow-800">
                                    <Text className="text-xs font-bold text-yellow-700 dark:text-yellow-500">VISITATO</Text>
                                </View>
                            )}
                            <LucideChevronRight size={20} color="#94a3b8" />
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={() => (
                    <Text className="text-center text-slate-400 dark:text-slate-500 mt-10">
                        Nessun luogo disponibile in questa regione.
                    </Text>
                )}
            />
        </View>
    );
}
