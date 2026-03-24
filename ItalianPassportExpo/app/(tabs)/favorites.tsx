import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usePassportStore } from '@/src/store/usePassportStore';
import { PLACES_DATA } from '@/src/data/places';
import { LucideStar, LucideMapPin, LucideChevronRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function FavoritesScreen() {
    const router = useRouter();
    const favoritePlaceIds = usePassportStore((state) => state.favoritePlaceIds);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Map the IDs to full place objects
    const favoritePlaces = favoritePlaceIds
        .map(id => PLACES_DATA.places.find(p => p.id === id))
        .filter((p): p is NonNullable<typeof p> => p !== undefined);

    const renderItem = ({ item }: { item: typeof favoritePlaces[0] }) => {
        // Find region to display name
        const region = PLACES_DATA.regions.find(r => r.id === item.regionId);
        
        return (
            <TouchableOpacity
                onPress={() => router.push(`/place/${item.id}`)}
                className="flex-row items-center p-4 mb-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700"
                style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } }}
                activeOpacity={0.7}
            >
                {/* Thumbnail / Icon */}
                <View className="w-14 h-14 rounded-full bg-amber-50 dark:bg-slate-700 items-center justify-center mr-4 overflow-hidden border border-amber-100 dark:border-slate-600">
                    <LucideMapPin size={24} color={isDark ? '#fbbf24' : '#d97706'} />
                </View>

                {/* Details */}
                <View className="flex-1 justify-center">
                    <Text className="text-lg font-bold text-slate-800 dark:text-white mb-0.5">
                        {item.name}
                    </Text>
                    <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {region ? region.name : 'Italia'}
                    </Text>
                </View>

                {/* Arrow */}
                <View className="bg-slate-50 dark:bg-slate-700 w-8 h-8 rounded-full items-center justify-center">
                    <LucideChevronRight size={18} color={isDark ? '#94a3b8' : '#64748b'} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['top']}>
            <View className="px-6 pt-6 pb-4">
                <Text className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
                    Preferiti
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 font-medium">
                    I luoghi che hai salvato per trovarli velocemente.
                </Text>
            </View>

            <FlatList
                data={favoritePlaces}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="items-center justify-center py-20 mt-10 px-6">
                        <View className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center mb-6">
                            <LucideStar size={42} color={isDark ? '#475569' : '#cbd5e1'} strokeWidth={1.5} />
                        </View>
                        <Text className="text-xl font-bold text-slate-600 dark:text-slate-300 text-center mb-2">
                            Nessun preferito
                        </Text>
                        <Text className="text-base text-slate-400 dark:text-slate-500 text-center leading-6">
                            Non hai ancora aggiunto nessuna città ai tuoi preferiti. Clicca sulla stellina dentro la pagina di una città per salvarla qui!
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
