import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import Animated, { FadeIn, FadeInDown, SlideInDown } from 'react-native-reanimated';
import ItalyMap from '@/src/components/Map/ItalyMap';
import { usePassportStore } from '@/src/store/usePassportStore';

export default function RegionSelectionScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const setUnlockedRegions = usePassportStore((state) => state.setUnlockedRegions);

    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const MAX_FREE_REGIONS = 2;

    const handleRegionToggle = (regionId: string) => {
        if (selectedRegions.includes(regionId)) {
            // Deselect
            setSelectedRegions(prev => prev.filter(r => r !== regionId));
        } else {
            // Try to select
            if (selectedRegions.length >= MAX_FREE_REGIONS) {
                Alert.alert(
                    "Limite Raggiunto",
                    "Hai già selezionato le tue 2 regioni gratuite. Aggiungere altre regioni avrà il costo di 4,99€ ciascuna (Funzione in arrivo nel futuro negozio).",
                    [{ text: "Ho capito", style: "default" }]
                );
                return;
            }
            setSelectedRegions(prev => [...prev, regionId]);
        }
    };

    const handleConfirm = () => {
        if (selectedRegions.length === MAX_FREE_REGIONS) {
            setUnlockedRegions(selectedRegions);
            router.push('/onboarding/ready');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['top', 'bottom']}>
            
            {/* Header Text */}
            <Animated.View entering={FadeInDown.delay(100).duration(600)} className="px-6 pt-8 pb-4">
                <Text className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">
                    Scegli i tuoi {`\n`}punti di partenza
                </Text>
                <Text className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Hai a disposizione <Text className="text-green-600 dark:text-green-500 font-bold">2 Regioni gratuite</Text> per iniziare a collezionare i tuoi primi badge.
                </Text>

                <View className="flex-row items-center mt-4">
                    <View className="h-2 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <Animated.View 
                            className="h-full bg-green-500" 
                            style={{ width: `${(selectedRegions.length / MAX_FREE_REGIONS) * 100}%` }}
                        />
                    </View>
                    <Text className="ml-4 font-bold text-slate-700 dark:text-slate-300">
                        {selectedRegions.length} / {MAX_FREE_REGIONS}
                    </Text>
                </View>
            </Animated.View>

            {/* Map Area */}
            <View className="flex-1 items-center justify-center mt-2">
                <Animated.View entering={FadeIn.delay(400).duration(800)} className="w-full">
                    <ItalyMap 
                        selectionMode={true}
                        selectedRegions={selectedRegions}
                        onRegionSelectToggle={handleRegionToggle}
                    />
                </Animated.View>
            </View>

            {/* Bottom Action */}
            <Animated.View 
                entering={SlideInDown.delay(200).duration(500)}
                className="px-6 pb-6"
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleConfirm}
                    disabled={selectedRegions.length !== MAX_FREE_REGIONS}
                    className={`w-full py-4 rounded-full flex-row justify-center items-center shadow-lg ${
                        selectedRegions.length === MAX_FREE_REGIONS 
                            ? 'bg-green-600 dark:bg-green-500' 
                            : 'bg-slate-300 dark:bg-slate-800'
                    }`}
                >
                    <Text className={`text-lg font-bold ${
                         selectedRegions.length === MAX_FREE_REGIONS 
                         ? 'text-white' 
                         : 'text-slate-500 dark:text-slate-500'
                    }`}>
                        Conferma Scelta
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </SafeAreaView>
    );
}
