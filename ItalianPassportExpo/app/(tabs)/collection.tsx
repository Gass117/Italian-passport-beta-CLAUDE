import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { usePassportStore } from '@/src/store/usePassportStore';
import { PLACES_DATA } from '@/src/data/places';
import { LucideUnlock, LucideLock } from 'lucide-react-native';
import Badge3DViewer from '@/src/components/Badge3DViewer';
import { Place } from '@/src/types';

export default function CollectionScreen() {
    const visitedPlaceIds = usePassportStore((state) => state.visitedPlaceIds);
    const scratchedPlaceIds = usePassportStore((state) => state.scratchedPlaceIds);
    const allPlaces = PLACES_DATA.places;
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    return (
        <View className="flex-1 bg-white dark:bg-slate-900 pt-12 px-4">
            <Text className="text-3xl font-bold text-slate-800 dark:text-white mb-6">La tua Collezione</Text>

            <View
                className="bg-green-50 dark:bg-green-950 p-4 rounded-xl mb-6 flex-row justify-between items-center"
                style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }}
            >
                <View>
                    <Text className="text-slate-600 dark:text-slate-300 font-medium">Timbri Sbloccati</Text>
                    <Text className="text-sm text-slate-500 dark:text-slate-400">Gratta i luoghi visitati!</Text>
                </View>
                <Text className="text-3xl font-bold text-green-600 dark:text-green-500">
                    {scratchedPlaceIds.length} <Text className="text-lg text-slate-400 dark:text-slate-500">/ {allPlaces.length}</Text>
                </Text>
            </View>

            <FlatList
                data={allPlaces}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 20 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => {
                    // Unlock mainly depends on SCRATCHING now, as requested
                    const isUnlocked = scratchedPlaceIds.includes(item.id);
                    // Optionally, we could show a different state for "Visited but NOT Scratched" (e.g. bouncing lock?)
                    // For now, sticking to user request: "una volta grattato... si sblocchi" implies otherwise locked.
                    return (
                        <TouchableOpacity
                            className="w-[30%] items-center mb-6"
                            activeOpacity={isUnlocked ? 0.7 : 1}
                            onPress={() => {
                                if (isUnlocked) setSelectedPlace(item);
                            }}
                        >
                            <View className="mb-2 relative items-center justify-center">
                                {/* Outer Shadow Container */}
                                <View style={{
                                    // Cleaned up for CSS interop compatibility:
                                    ...(isUnlocked ? { elevation: 5, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } } : {})
                                }}
                                    className={`mb-2 relative items-center justify-center rounded-full w-24 h-24 ${isUnlocked ? 'bg-white dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700'}`}
                                >
                                    {/* Inner Clipping Container */}
                                    <View style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 48,
                                        overflow: 'hidden',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                        className={`${isUnlocked ? 'border-4 border-white dark:border-slate-800' : ''}`}
                                    >
                                        {isUnlocked && item.badge.imageAsset ? (
                                            <Image
                                                source={item.badge.imageAsset}
                                                style={{ width: '100%', height: '100%' }}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <>
                                                {isUnlocked ? (
                                                    <LucideUnlock size={32} color="#eab308" />
                                                ) : (
                                                    <LucideLock size={32} color="#94a3b8" />
                                                )}
                                            </>
                                        )}

                                    </View>
                                </View>
                            </View>

                            <Text className={`text-xs text-center font-medium w-full ${isUnlocked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`} numberOfLines={2}>
                                {item.badge.title}
                            </Text>
                            <Text className="text-[10px] text-center text-slate-400 dark:text-slate-500 w-full mt-1">
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />

            {/* 3D Viewer Modal */}
            <Modal
                visible={!!selectedPlace}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setSelectedPlace(null)}
            >
                {selectedPlace && (
                    <Badge3DViewer
                        place={selectedPlace}
                        onClose={() => setSelectedPlace(null)}
                    />
                )}
            </Modal>
        </View >
    );
}
