import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { usePassportStore } from '@/src/store/usePassportStore';
import { PLACES_DATA } from '@/src/data/places';
import { LucideUnlock, LucideLock } from 'lucide-react-native';

export default function CollectionScreen() {
    const visitedPlaceIds = usePassportStore((state) => state.visitedPlaceIds);

    const allPlaces = PLACES_DATA.places;

    return (
        <View className="flex-1 bg-white pt-12 px-4">
            <Text className="text-3xl font-bold text-slate-800 mb-6">La tua Collezione</Text>

            <View className="bg-green-50 p-4 rounded-xl mb-6 flex-row justify-between items-center">
                <Text className="text-slate-600 font-medium">Progressi</Text>
                <Text className="text-2xl font-bold text-green-600">
                    {visitedPlaceIds.length} <Text className="text-base text-slate-400">/ {allPlaces.length}</Text>
                </Text>
            </View>

            <FlatList
                data={allPlaces}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => {
                    const isUnlocked = visitedPlaceIds.includes(item.id);
                    return (
                        <View className="flex-1 items-center mb-6">
                            <View
                                className={`w-24 h-24 rounded-full items-center justify-center mb-2 shadow-sm ${isUnlocked ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                {/* Placeholder for badge image */}
                                {isUnlocked ? (
                                    <LucideUnlock size={32} color="#eab308" />
                                ) : (
                                    <LucideLock size={32} color="#cbd5e1" />
                                )}
                            </View>
                            <Text className="text-xs text-center font-medium text-slate-700 w-24" numberOfLines={2}>
                                {item.badge.title}
                            </Text>
                            {isUnlocked && (
                                <Text className="text-[10px] text-center text-slate-400 w-24">
                                    {item.name}
                                </Text>
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
}
