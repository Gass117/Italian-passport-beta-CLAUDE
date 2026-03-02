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
        <View className="flex-1 bg-white pt-12 px-4">
            <Text className="text-3xl font-bold text-slate-800 mb-6">La tua Collezione</Text>

            <View className="bg-green-50 p-4 rounded-xl mb-6 flex-row justify-between items-center shadow-sm">
                <View>
                    <Text className="text-slate-600 font-medium">Timbri Sbloccati</Text>
                    <Text className="text-sm text-slate-500">Gratta i luoghi visitati!</Text>
                </View>
                <Text className="text-3xl font-bold text-green-600">
                    {scratchedPlaceIds.length} <Text className="text-lg text-slate-400">/ {allPlaces.length}</Text>
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
                                <View style={isUnlocked ? {
                                    width: 96, // w-24 = 6rem = 96px
                                    height: 96,
                                    borderRadius: 48,
                                    backgroundColor: 'white',
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                } : {
                                    width: 96,
                                    height: 96,
                                    borderRadius: 48,
                                    backgroundColor: '#f1f5f9', // slate-100
                                    borderWidth: 1,
                                    borderColor: '#e2e8f0' // slate-200
                                }}>
                                    {/* Inner Clipping Container */}
                                    <View style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 48,
                                        overflow: 'hidden',
                                        borderWidth: isUnlocked ? 4 : 0,
                                        borderColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
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

                                        {/* Overlay for locked items */}
                                        {!isUnlocked && (
                                            <View className="absolute inset-0 bg-slate-200/50 items-center justify-center" />
                                        )}
                                    </View>
                                </View>
                            </View>

                            <Text className={`text-xs text-center font-medium w-full ${isUnlocked ? 'text-slate-800' : 'text-slate-400'}`} numberOfLines={2}>
                                {item.badge.title}
                            </Text>
                            <Text className="text-[10px] text-center text-slate-400 w-full mt-1">
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
        </View>
    );
}
