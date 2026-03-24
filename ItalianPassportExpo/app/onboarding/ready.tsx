import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import Animated, { FadeInDown, SlideInDown, ZoomIn } from 'react-native-reanimated';
import { usePassportStore } from '@/src/store/usePassportStore';
import { LucideCompass, LucideTrophy, LucideSparkles } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ReadyScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const completeOnboarding = usePassportStore((state) => state.completeOnboarding);

    const handleStartJourney = () => {
        completeOnboarding(); // Persist the flag
        // Use replace instead of push so they cannot "go back" into onboarding
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900 justify-between items-center" edges={['top', 'bottom']}>
            
            <View className="flex-1 justify-center items-center w-full px-8 -mt-20">
                
                {/* Visual Icon Group */}
                <Animated.View 
                    entering={ZoomIn.delay(200).duration(800).springify()}
                    className="flex-row justify-center items-end mb-12"
                >
                    <View className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-full mr-[-15] z-0" style={{ transform: [{ rotate: '-15deg' }] }}>
                        <LucideTrophy size={48} color={isDark ? '#fbbf24' : '#d97706'} />
                    </View>
                    
                    <View className="bg-green-100 dark:bg-green-900 p-6 rounded-full z-10" style={{ elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
                        <LucideCompass size={64} color={isDark ? '#4ade80' : '#16a34a'} />
                    </View>
                    
                    <View className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full ml-[-15] z-0" style={{ transform: [{ rotate: '15deg' }] }}>
                        <LucideSparkles size={48} color={isDark ? '#60a5fa' : '#2563eb'} />
                    </View>
                </Animated.View>

                {/* Typography */}
                <Animated.Text 
                    entering={FadeInDown.delay(500).duration(800)}
                    className="text-4xl font-black text-slate-800 dark:text-white text-center tracking-tight mb-4"
                >
                    Tutto Pronto!
                </Animated.Text>
                
                <Animated.Text 
                    entering={FadeInDown.delay(700).duration(800)}
                    className="text-lg text-slate-500 dark:text-slate-400 text-center font-medium leading-relaxed px-2"
                >
                    Le tue regioni iniziali sono sbloccate. Inizia il tuo viaggio nel Bel Paese, completa le attività e colleziona tutti i badge.
                </Animated.Text>
            </View>

            {/* Bottom Action */}
            <Animated.View 
                entering={SlideInDown.delay(1000).duration(600)}
                className="w-full px-8 pb-8"
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
