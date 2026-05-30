import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { LucideCloud, LucideShieldCheck, LucideUserPlus, LucideLogIn } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function AuthPromptScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handleSkip = () => {
        router.replace('/(tabs)');
    };

    const handleRegister = () => {
        router.push('/(auth)/register' as any);
    };

    const handleLogin = () => {
        router.push('/(auth)/login' as any);
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-8">
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-10">
                    <View className="bg-blue-100 dark:bg-blue-900/40 p-6 rounded-full mb-6 shadow-sm">
                        <LucideCloud size={64} color="#3b82f6" />
                    </View>
                    <Text className="text-3xl font-black text-slate-800 dark:text-white mb-4 text-center tracking-tight">
                        Non Perdere i Tuoi Progressi
                    </Text>
                    <Text className="text-base text-slate-500 dark:text-slate-400 text-center leading-relaxed mb-6">
                        Crea subito il tuo profilo per salvare in cloud i trofei sbloccati, le attività completate e i punti accumulati.
                    </Text>
                    
                    <View className="bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex-row items-center w-full">
                        <LucideShieldCheck size={20} color="#10b981" className="mr-3" />
                        <Text className="text-emerald-700 dark:text-emerald-400 font-medium flex-1">
                            Il salvataggio in cloud è 100% gratuito e sicuro.
                        </Text>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(200).duration(600)} className="space-y-4 w-full">
                    <TouchableOpacity 
                        className="bg-blue-600 rounded-xl py-4 px-4 flex-row justify-center items-center shadow-sm w-full mb-4"
                        onPress={handleRegister}
                    >
                        <LucideUserPlus size={20} color="white" className="mr-2" />
                        <Text className="text-white font-bold text-lg">Crea Profilo Gratis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-4 px-4 flex-row justify-center items-center shadow-sm w-full mb-6"
                        onPress={handleLogin}
                    >
                        <LucideLogIn size={20} color={isDark ? '#fff' : '#000'} className="mr-2" />
                        <Text className="text-slate-800 dark:text-white font-bold text-lg">Ho già un account</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>

            <Animated.View entering={FadeInUp.delay(400).duration(600)} className="mt-auto pt-6">
                <TouchableOpacity 
                    className="items-center py-4"
                    onPress={handleSkip}
                >
                    <Text className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm">
                        Continua come ospite
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}
