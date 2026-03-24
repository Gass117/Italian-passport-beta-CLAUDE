import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PLACES_DATA } from '@/src/data/places';
import { LucideSearch, LucideMapPin, LucideMap } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

type SearchResult = 
    | { type: 'place'; id: string; name: string; regionId: string }
    | { type: 'region'; id: string; name: string; regionId: string };

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const getResults = (): SearchResult[] => {
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();

        const regionResults: SearchResult[] = PLACES_DATA.regions
            .filter(r => r.name.toLowerCase().includes(lowerQuery))
            .map(r => ({ type: 'region', id: r.id, name: r.name, regionId: r.id }));

        const placeResults: SearchResult[] = PLACES_DATA.places
            .filter(p => p.name.toLowerCase().includes(lowerQuery) || p.regionId.toLowerCase().includes(lowerQuery))
            .map(p => ({ type: 'place', id: p.id, name: p.name, regionId: p.regionId }));

        return [...regionResults, ...placeResults];
    };

    const results = getResults();

    const renderItem = ({ item }: { item: SearchResult }) => {
        const isRegion = item.type === 'region';
        const Icon = isRegion ? LucideMap : LucideMapPin;
        const color = isRegion ? '#3b82f6' : '#f59e0b'; // blue for regions, amber for places

        // Find region name for places
        let subtitle = '';
        if (item.type === 'place') {
            const region = PLACES_DATA.regions.find(r => r.id === item.regionId);
            if (region) subtitle = region.name;
        }

        return (
            <TouchableOpacity
                onPress={() => router.push(`/${item.type}/${item.id}`)}
                className="flex-row items-center p-4 mb-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700"
                style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } }}
                activeOpacity={0.7}
            >
                <View className="w-12 h-12 rounded-full bg-white dark:bg-slate-700 items-center justify-center mr-4 shadow-sm">
                    <Icon size={24} color={color} />
                </View>
                <View className="flex-1 justify-center">
                    <Text className="text-lg font-bold text-slate-800 dark:text-white">
                        {item.name}
                    </Text>
                    {subtitle ? (
                        <Text className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                            {subtitle}
                        </Text>
                    ) : (
                        <Text className="text-sm font-medium text-blue-500 dark:text-blue-400 mt-0.5">
                            Regione
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900" edges={['top']}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                {/* Header */}
                <View className="px-6 pt-6 pb-2">
                    <Text className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
                        Cerca
                    </Text>
                    <Text className="text-slate-500 dark:text-slate-400 font-medium mb-6">
                        Trova una regione o una città da esplorare.
                    </Text>

                    {/* Search Input */}
                    <View className="flex-row items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-700">
                        <LucideSearch size={22} color={isDark ? '#94a3b8' : '#64748b'} className="mr-3" />
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Cerca 'Toscana', 'Roma'..."
                            placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
                            className="flex-1 text-base text-slate-800 dark:text-white font-medium"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                        />
                    </View>
                </View>

                {/* Results List */}
                <FlatList
                    data={results}
                    keyExtractor={(item) => `${item.type}-${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        query.trim().length > 0 ? (
                            <View className="items-center justify-center py-10 mt-10">
                                <LucideSearch size={48} color={isDark ? '#334155' : '#cbd5e1'} className="mb-4" />
                                <Text className="text-lg font-bold text-slate-400 dark:text-slate-500 text-center">
                                    Nessun risultato trovato
                                </Text>
                                <Text className="text-sm text-slate-400 dark:text-slate-500 text-center mt-2">
                                    Prova a cercare un'altra città o regione.
                                </Text>
                            </View>
                        ) : (
                            <View className="items-center justify-center py-10 mt-10">
                                <LucideMap size={64} color={isDark ? '#1e293b' : '#f1f5f9'} className="mb-4" />
                                <Text className="text-lg font-bold text-slate-300 dark:text-slate-600 text-center">
                                    Inizia a digitare
                                </Text>
                            </View>
                        )
                    }
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
