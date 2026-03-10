import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { usePassportStore } from '@/src/store/usePassportStore';
import { PLACES_DATA } from '@/src/data/places';
import { LucideUnlock, LucideLock, LucideChevronLeft, LucideChevronRight, LucideMap } from 'lucide-react-native';
import Badge3DViewer from '@/src/components/Badge3DViewer';
import { Place } from '@/src/types';

export default function CollectionScreen() {
    const visitedPlaceIds = usePassportStore((state) => state.visitedPlaceIds);
    const scratchedPlaceIds = usePassportStore((state) => state.scratchedPlaceIds);
    const allPlaces = PLACES_DATA.places;
    const allRegions = PLACES_DATA.regions;
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [selectedMacro, setSelectedMacro] = useState<string | null>(null);

    const MACRO_REGIONS = [
        {
            name: "Nord Italia",
            regions: ["valle_aosta", "piemonte", "lombardia", "trentino", "friuli", "veneto", "liguria", "emilia"]
        },
        {
            name: "Centro Italia",
            regions: ["toscana", "marche", "umbria", "lazio"]
        },
        {
            name: "Sud Italia",
            regions: ["abruzzo", "molise", "campania", "puglia", "basilicata", "calabria"]
        },
        {
            name: "Isole",
            regions: ["sicilia", "sardegna"]
        }
    ];

    // Group places by macro-region and region
    const groupedData = MACRO_REGIONS.map(macro => {
        const regionsData = macro.regions.map(regionId => {
            const regionNode = allRegions.find(r => r.id === regionId);
            const placesInRegion = allPlaces.filter(p => p.regionId === regionId);
            return {
                regionId,
                regionTitle: regionNode?.name || regionId,
                places: placesInRegion
            };
        }).filter(r => r.places.length > 0);

        return {
            title: macro.name,
            data: [regionsData] // Passed as single item containing array for FlatList
        };
    }).filter(macro => macro.data[0].length > 0);

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

            {!selectedMacro ? (
                // --- MACRO REGION MENU ---
                <View className="flex-1">
                    <Text className="text-xl font-medium text-slate-600 dark:text-slate-300 mb-4 px-1">Scegli una macro-area</Text>
                    
                    {groupedData.map((macro, index) => {
                        // Calculate total unlocked for this macro
                        const totalPlacesInMacro = macro.data[0].reduce((sum, r) => sum + r.places.length, 0);
                        const unlockedInMacro = macro.data[0].reduce((sum, r) => sum + r.places.filter(p => scratchedPlaceIds.includes(p.id)).length, 0);
                        
                        return (
                            <TouchableOpacity
                                key={macro.title}
                                className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl mb-4 flex-row items-center border border-slate-200 dark:border-slate-700"
                                style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } }}
                                onPress={() => setSelectedMacro(macro.title)}
                            >
                                <View className={`p-3 rounded-full mr-4 ${unlockedInMacro > 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    <LucideMap size={28} color={unlockedInMacro > 0 ? "#16a34a" : "#64748b"} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-xl font-bold text-slate-800 dark:text-white mb-1">{macro.title}</Text>
                                    <Text className="text-sm text-slate-500 dark:text-slate-400">
                                        {unlockedInMacro} su {totalPlacesInMacro} timbri sbloccati
                                    </Text>
                                </View>
                                <LucideChevronRight size={24} color="#94a3b8" />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ) : (
                // --- REGIONS & PLACES LIST ---
                <View className="flex-1">
                    <TouchableOpacity 
                        className="flex-row items-center mb-6 py-2 px-1"
                        onPress={() => setSelectedMacro(null)}
                    >
                        <LucideChevronLeft size={24} color="#3b82f6" />
                        <Text className="text-blue-500 text-lg font-semibold ml-1">Torna alle Aree</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={groupedData.filter(m => m.title === selectedMacro)}
                        keyExtractor={(item) => item.title}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item: macro }) => (
                            <View className="mb-8">
                                {/* Macro Region Header */}
                                <Text className="text-3xl font-black text-slate-900 dark:text-white mb-2 px-1 tracking-wider">{macro.title.toUpperCase()}</Text>
                                <View className="bg-slate-200 dark:bg-slate-700 h-[1px] w-full mb-6" />

                                {/* Regions within this Macro Region */}
                                {macro.data[0].map((regionInfo) => (
                                    <View key={regionInfo.regionId} className="mb-2 mt-2 bg-slate-50 dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-800" style={{ elevation: 1 }}>
                                        <Text className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 px-1 text-center">{regionInfo.regionTitle.toUpperCase()}</Text>
                                        <View className="flex-row flex-wrap">
                                            {regionInfo.places.map((place) => {
                                                const isUnlocked = scratchedPlaceIds.includes(place.id);
                                                return (
                                                    <TouchableOpacity
                                                        key={place.id}
                                                        style={{ width: '33.33%', paddingHorizontal: 4, marginBottom: 20 }}
                                                        className="items-center"
                                                        activeOpacity={isUnlocked ? 0.7 : 1}
                                                        onPress={() => {
                                                            if (isUnlocked) setSelectedPlace(place);
                                                        }}
                                                    >
                                                        <View className="mb-2 relative items-center justify-center">
                                                            <View style={{
                                                                ...(isUnlocked ? { elevation: 5, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } } : {})
                                                            }}
                                                                className={`mb-2 relative items-center justify-center rounded-full w-20 h-20 ${isUnlocked ? 'bg-white dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700'}`}
                                                            >
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
                                                                    {isUnlocked && place.badge.imageAsset ? (
                                                                        <Image
                                                                            source={place.badge.imageAsset}
                                                                            style={{ width: '100%', height: '100%' }}
                                                                            resizeMode="cover"
                                                                        />
                                                                    ) : (
                                                                        <>
                                                                            {isUnlocked ? (
                                                                                <LucideUnlock size={28} color="#eab308" />
                                                                            ) : (
                                                                                <LucideLock size={28} color="#94a3b8" />
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <Text className={`text-[11px] text-center font-bold w-full px-1 ${isUnlocked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`} numberOfLines={2}>
                                                            {place.badge.title}
                                                        </Text>
                                                        <Text className="text-[9px] text-center text-slate-500 dark:text-slate-500 w-full mt-1 px-1 font-medium" numberOfLines={1}>
                                                            {place.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    />
                </View>
            )}

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
