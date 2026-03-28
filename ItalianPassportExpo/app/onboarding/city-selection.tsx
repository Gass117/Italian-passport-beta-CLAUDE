import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { LucideSearch, LucideCheckCircle2, LucideCircle, LucideMapPin, LucideX } from 'lucide-react-native';
import { PLACES_DATA } from '@/src/data/places';
import { Place, Region } from '@/src/types';
import Animated, { FadeInDown, SlideInDown, FadeIn } from 'react-native-reanimated';
import { usePassportStore } from '@/src/store/usePassportStore';

const MAX_CITIES = 6;
const MAX_REGIONS = 2;

export default function CitySelectionScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const setUnlockedRegions = usePassportStore((state) => state.setUnlockedRegions);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCityIds, setSelectedCityIds] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Prepare data
    const allCities = useMemo(() => {
        return [...PLACES_DATA.places].sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredCities = useMemo(() => {
        if (!searchQuery.trim()) return allCities;
        return allCities.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.province.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allCities, searchQuery]);

    const getRegionName = (regionId: string) => {
        return PLACES_DATA.regions.find(r => r.id === regionId)?.displayName || regionId;
    };

    const selectedCitiesList = useMemo(() => {
        return selectedCityIds.map(id => allCities.find(c => c.id === id) as Place);
    }, [selectedCityIds, allCities]);

    const uniqueSelectedRegions = useMemo(() => {
        return Array.from(new Set(selectedCitiesList.map(c => c.regionId)));
    }, [selectedCitiesList]);

    const handleToggleCity = (city: Place) => {
        if (selectedCityIds.includes(city.id)) {
            setSelectedCityIds(prev => prev.filter(id => id !== city.id));
            return;
        }

        if (selectedCityIds.length >= MAX_CITIES) {
            Alert.alert("Limite Raggiunto", `Hai già selezionato il massimo di ${MAX_CITIES} città.`);
            return;
        }

        // Check if adding this city violates region rules
        const newRegions = new Set([...uniqueSelectedRegions, city.regionId]);
        if (newRegions.size > MAX_REGIONS) {
            Alert.alert(
                "Regioni Limite",
                `Puoi scegliere città situate al massimo in ${MAX_REGIONS} Regioni gratuite.\nQuesta città appartiene a una terza regione (${getRegionName(city.regionId)}).`
            );
            return;
        }

        setSelectedCityIds(prev => [...prev, city.id]);
    };

    const confirmSelection = () => {
        if (selectedCityIds.length === 0) return;
        setUnlockedRegions(uniqueSelectedRegions);
        setModalVisible(false);
        // @ts-ignore
        router.push('/onboarding/region-summary');
    };

    const renderCityRow = ({ item }: { item: Place }) => {
        const isSelected = selectedCityIds.includes(item.id);
        const regionName = getRegionName(item.regionId);

        return (
            <TouchableOpacity
                onPress={() => handleToggleCity(item)}
                className={`flex-row items-center p-4 mb-3 rounded-2xl border ${
                    isSelected 
                    ? 'bg-green-50 dark:bg-green-900/40 border-green-500' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
                style={{ elevation: isSelected ? 2 : 1 }}
            >
                <View className="flex-1">
                    <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {item.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <LucideMapPin size={14} color={isDark ? '#94a3b8' : '#64748b'} />
                        <Text className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                            {regionName}
                        </Text>
                    </View>
                </View>
                
                <View className="ml-4">
                    {isSelected ? (
                        <LucideCheckCircle2 size={28} color="#22c55e" fill={isDark ? '#064e3b' : '#dcfce7'} />
                    ) : (
                        <LucideCircle size={28} color={isDark ? '#475569' : '#cbd5e1'} />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    // Calculate grouping for modal exactly as requested natively
    const groupedChoices = useMemo(() => {
        const groups: Record<string, string[]> = {};
        selectedCitiesList.forEach(c => {
            const rName = getRegionName(c.regionId);
            if (!groups[rName]) groups[rName] = [];
            groups[rName].push(c.name);
        });
        return groups;
    }, [selectedCitiesList]);

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['top', 'bottom']}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
                className="flex-1"
            >
                {/* Header Text */}
                <Animated.View entering={FadeInDown.delay(100).duration(600)} className="px-6 pt-6 pb-2">
                    <Text className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">
                        Da dove comincia{'\n'}questa avventura?
                    </Text>
                    <Text className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        Scegli fino a <Text className="text-green-600 dark:text-green-500 font-bold">{MAX_CITIES} città</Text> situate al massimo in <Text className="text-green-600 dark:text-green-500 font-bold">{MAX_REGIONS} regioni</Text> per sbloccarne interamente il territorio.
                    </Text>

                    {/* Stats Pill */}
                    <View className="flex-row items-center mt-4 bg-slate-200 dark:bg-slate-800 self-start px-4 py-2 rounded-full">
                        <View className="flex-row items-center mr-6">
                            <Text className="text-slate-600 dark:text-slate-300 font-medium mr-2">Città</Text>
                            <Text className={`font-bold ${selectedCityIds.length === MAX_CITIES ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-white'}`}>
                                {selectedCityIds.length} / {MAX_CITIES}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-slate-600 dark:text-slate-300 font-medium mr-2">Regioni</Text>
                            <Text className={`font-bold ${uniqueSelectedRegions.length === MAX_REGIONS ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-white'}`}>
                                {uniqueSelectedRegions.length} / {MAX_REGIONS}
                            </Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Search Bar */}
                <Animated.View entering={FadeInDown.delay(200).duration(600)} className="px-6 py-4">
                    <View className="flex-row items-center bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <LucideSearch size={22} color={isDark ? '#94a3b8' : '#64748b'} />
                        <TextInput
                            className="flex-1 ml-3 text-lg text-slate-800 dark:text-white"
                            placeholder="Cerca una città o un borgo..."
                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <LucideX size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                            </TouchableOpacity>
                        )}
                    </View>
                </Animated.View>

                {/* List Area */}
                <Animated.View entering={FadeIn.delay(300).duration(800)} className="flex-1 w-full px-6">
                    <FlatList
                        data={filteredCities}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCityRow}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 120 }} // Space for floating button
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        windowSize={10}
                    />
                </Animated.View>

            </KeyboardAvoidingView>

            {/* Floating Action Button */}
            {selectedCityIds.length > 0 && (
                <Animated.View 
                    entering={SlideInDown.duration(400).springify()}
                    className="absolute bottom-10 left-6 right-6"
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setModalVisible(true)}
                        className="w-full py-4 rounded-full bg-slate-900 dark:bg-white shadow-xl flex-row justify-center items-center"
                        style={{ elevation: 15, shadowColor: isDark ? '#fff' : '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10 }}
                    >
                        <Text className="text-white dark:text-slate-900 text-lg font-extrabold tracking-wide uppercase">
                            Prosegui ({selectedCityIds.length})
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            {/* Custom Modal Popup */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-slate-900/60 px-6">
                    <Animated.View 
                        entering={FadeInDown.duration(400).springify()}
                        className="w-full bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden"
                    >
                        {/* Header graphic */}
                        <View className="items-center mb-6 pt-2">
                            <View className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full items-center justify-center mb-4">
                                <LucideMapPin size={32} color="#3b82f6" />
                            </View>
                            <Text className="text-2xl font-black text-slate-800 dark:text-white text-center">
                                Riepilogo Selezione
                            </Text>
                            <Text className="text-slate-500 dark:text-slate-400 text-center mt-2 font-medium">
                                Sbloccherai interamente le regioni collegate a queste città:
                            </Text>
                        </View>

                        {/* Summary List */}
                        <View className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 mb-8">
                            {Object.entries(groupedChoices).map(([region, cities], index) => (
                                <View key={region} className={index > 0 ? 'mt-4 pt-4 border-t border-slate-200 dark:border-slate-800' : ''}>
                                    <Text className="text-sm font-bold text-green-600 dark:text-green-500 uppercase tracking-widest mb-2">
                                        {region}
                                    </Text>
                                    {cities.map((city) => (
                                        <View key={city} className="flex-row items-center mb-1">
                                            <View className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2" />
                                            <Text className="text-base font-semibold text-slate-700 dark:text-slate-200">
                                                {city}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>

                        {/* Modal Actions */}
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl items-center"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="font-bold text-slate-700 dark:text-slate-300">Modifica</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 py-4 bg-green-600 rounded-2xl items-center shadow-lg shadow-green-600/30"
                                onPress={confirmSelection}
                            >
                                <Text className="font-bold text-white">Conferma</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}
