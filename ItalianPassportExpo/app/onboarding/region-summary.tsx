import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import Animated, { FadeIn, FadeInDown, SlideInDown } from 'react-native-reanimated';
import ItalyMap from '@/src/components/Map/ItalyMap';
import { usePassportStore } from '@/src/store/usePassportStore';
import { PLACES_DATA } from '@/src/data/places';

export default function RegionSummaryScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    const unlockedRegions = usePassportStore((state) => state.unlockedRegions);
    const completeOnboarding = usePassportStore((state) => state.completeOnboarding);

    const handleStartJourney = () => {
        completeOnboarding();
        router.replace('/auth-prompt' as any);
    };

    const handleSummaryPress = (regionId: string) => {
        if (unlockedRegions.includes(regionId)) {
            const citiesInRegion = PLACES_DATA.places
                .filter(p => p.regionId === regionId)
                .map(p => p.name)
                .sort()
                .join('\n• ');
            const rName = PLACES_DATA.regions.find(r => r.id === regionId)?.displayName;
            Alert.alert(`Città disponibili in ${rName}`, `• ${citiesInRegion}`);
        } else {
            Alert.alert(
                "Hai già fatto la tua scelta", 
                "Puoi sbloccare le altre regioni direttamente dallo store nell'app."
            );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['top', 'bottom']}>
            
            {/* Header Text */}
            <Animated.View entering={FadeInDown.delay(100).duration(600)} className="px-6 pt-6 pb-2 text-center items-center">
                <Text className="text-3xl font-black text-slate-800 dark:text-white mb-2 tracking-tight text-center">
                    Mappa Sbloccata!
                </Text>
                <Text className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-center px-4">
                    Ecco l'anteprima delle regioni che hai appena sbloccato. Tutte le citta e i borghi al loro interno sono ora disponibili per essere esplorati!
                </Text>
            </Animated.View>

            {/* Map Area */}
            <View className="flex-1 items-center justify-center -mt-6">
                <Animated.View entering={FadeIn.delay(300).duration(800)} className="w-full">
                    <ItalyMap 
                        selectionMode={true}
                        selectedRegions={unlockedRegions}
                        onRegionPress={handleSummaryPress}
                    />
                </Animated.View>
            </View>

            {/* Bottom Action */}
            <Animated.View 
                entering={SlideInDown.delay(500).duration(500)}
                className="px-6 pb-10"
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleStartJourney}
                    className="w-full py-4 rounded-full bg-green-500 dark:bg-green-600 shadow-xl flex-row justify-center items-center"
                    style={{
                        shadowColor: isDark ? '#22c55e' : '#16a34a',
                        shadowOpacity: 0.3,
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 10,
                        elevation: 10
                    }}
                >
                    <Text className="text-white text-lg font-extrabold tracking-wide uppercase">
                        Partiamo!
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </SafeAreaView>
    );
}
