import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const IMAGES = [
    'https://images.unsplash.com/photo-1516483638261-f40af5aa3463?q=60&w=800&auto=format&fit=crop', // Cinque Terre
    'https://images.unsplash.com/photo-1552832230-c0197dd311f5?q=60&w=800&auto=format&fit=crop', // Rome
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=60&w=800&auto=format&fit=crop', // Venice
    'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=60&w=800&auto=format&fit=crop', // Positano
    'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=60&w=800&auto=format&fit=crop', // Florence
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=60&w=800&auto=format&fit=crop', // Milan
    'https://images.unsplash.com/photo-1534008897995-27a23e859048?q=60&w=800&auto=format&fit=crop'  // Tuscany
];

const CrossFadeImage = ({ uri, isActive }: { uri: string; isActive: boolean }) => {
    const opacity = useSharedValue(isActive ? 1 : 0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isActive && isLoaded) {
            opacity.value = withTiming(1, { duration: 1000 });
        } else if (!isActive) {
            opacity.value = withTiming(0, { duration: 2500 });
        }
    }, [isActive, isLoaded]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.Image 
            source={{ uri }}
            onLoad={() => setIsLoaded(true)}
            style={[{ position: 'absolute', width: '100%', height: '100%' }, animatedStyle]}
            resizeMode="cover"
        />
    );
};

export default function WelcomeScreen() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % IMAGES.length);
        }, 2000); // 2 seconds per image

        return () => clearInterval(interval);
    }, []);

    // Preload system to prevent network starvation
    const isNeeded = (index: number) => {
        const dist = (index - activeIndex + IMAGES.length) % IMAGES.length;
        // Mount index if it is current (0), next (1), next-next (2), or previous (IMAGES.length - 1)
        // Mounting next-next ensures we start downloading 4 seconds in advance!
        return dist === 0 || dist === 1 || dist === 2 || dist === IMAGES.length - 1;
    };

    return (
        <View className="flex-1 bg-slate-900">
            {/* Background Images Layer */}
            {IMAGES.map((uri, index) => {
                if (!isNeeded(index)) return null;
                return <CrossFadeImage key={uri} uri={uri} isActive={index === activeIndex} />;
            })}

            {/* Dark Overlay for Text Readability - Ensures text is always legible */}
            <View style={StyleSheet.absoluteFill} className="bg-slate-900/40" />

            <SafeAreaView className="flex-1 justify-end items-center" edges={['top', 'bottom']}>
                {/* Bottom Typography & Action Area */}
                <View className="w-full px-8 pb-8">
                    <Animated.Text 
                        entering={FadeInUp.delay(500).duration(800)}
                        className="text-4xl md:text-5xl font-black text-white text-center tracking-tight mb-3"
                        style={{
                            textShadowColor: 'rgba(0, 0, 0, 0.7)',
                            textShadowOffset: { width: 0, height: 2 },
                            textShadowRadius: 8
                        }}
                    >
                        Ciao e benvenuto in{'\n'}<Text className="text-green-400">ITALIA</Text>
                    </Animated.Text>
                    
                    <Animated.Text 
                        entering={FadeInUp.delay(700).duration(800)}
                        className="text-lg text-slate-100 text-center font-medium leading-relaxed mb-10"
                        style={{
                            textShadowColor: 'rgba(0, 0, 0, 0.7)',
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 6
                        }}
                    >
                        Il tuo passaporto digitale per esplorare, scoprire e collezionare le meraviglie della penisola.
                    </Animated.Text>

                    <Animated.View entering={FadeInDown.delay(1000).duration(800)}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => router.push('/onboarding/region-selection')}
                            className="w-full py-4 rounded-full bg-white shadow-xl flex-row justify-center items-center active:bg-slate-200"
                            style={{
                                shadowColor: '#000',
                                shadowOpacity: 0.3,
                                shadowOffset: { width: 0, height: 6 },
                                shadowRadius: 12,
                                elevation: 8
                            }}
                        >
                            <Text className="text-slate-900 text-lg font-extrabold tracking-wide">
                                Inizia L'Avventura
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </View>
    );
}
