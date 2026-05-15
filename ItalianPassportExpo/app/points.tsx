import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { usePassportStore } from '@/src/store/usePassportStore';
import { LucideGem, LucideAward, LucideCalendarDays, LucideTrendingUp, LucideCheckCircle2, LucideTarget, LucideStore } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function PointsScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const {
        totalPoints,
        pointsHistory,
        weeklyMissionProgress,
        monthlyMissionProgress,
        loginStreak
    } = usePassportStore((state) => state);

    const getIconForReason = (reason: string) => {
        if (reason.toLowerCase().includes('login') || reason.toLowerCase().includes('settimanale')) return <LucideCalendarDays size={20} color={isDark ? '#cbd5e1' : '#64748b'} />;
        if (reason.toLowerCase().includes('badge') || reason.toLowerCase().includes('trofeo')) return <LucideAward size={20} color={isDark ? '#cbd5e1' : '#64748b'} />;
        if (reason.toLowerCase().includes('attività')) return <LucideCheckCircle2 size={20} color={isDark ? '#cbd5e1' : '#64748b'} />;
        return <LucideTrendingUp size={20} color={isDark ? '#cbd5e1' : '#64748b'} />;
    };

    return (
        <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-900" contentContainerStyle={{ paddingBottom: 40 }}>
            <Stack.Screen 
                options={{ 
                    title: 'I Tuoi Punti',
                    // @ts-ignore
                    headerBackTitleVisible: false,
                    headerBackTitle: '',
                }} 
            />

            {/* Total Points Header */}
            <Animated.View entering={FadeInDown.duration(500)} className="items-center p-8 bg-amber-50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/30">
                <View className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-full mb-4 shadow-sm">
                    <LucideGem size={48} color="#d97706" />
                </View>
                <Text className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-1">
                    Saldo Attuale
                </Text>
                <Text className="text-5xl font-black text-amber-500 dark:text-amber-400">
                    {totalPoints}
                </Text>
                {loginStreak > 0 && (
                    <View className="mt-4 flex-row items-center bg-orange-100 dark:bg-orange-900/40 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800/50">
                        <Text className="text-orange-600 dark:text-orange-400 font-bold text-xs">
                            🔥 {loginStreak} Giorni di Accesso Consecutivi!
                        </Text>
                    </View>
                )}
            </Animated.View>

            <View className="p-4 mt-2">
                {/* Missions Section */}
                <Animated.View entering={FadeInDown.delay(200).duration(500)}>
                    {/* Store Button */}
                    <TouchableOpacity 
                        className="bg-amber-500 dark:bg-amber-600 rounded-xl p-4 flex-row justify-center items-center shadow-sm mb-6 mt-2"
                        onPress={() => alert('Lo Store sarà disponibile prossimamente!')}
                    >
                        <LucideStore size={20} color="white" className="mr-2" />
                        <Text className="text-white font-bold text-lg uppercase tracking-wider">Riscatta Premio</Text>
                    </TouchableOpacity>

                    <Text className="text-lg font-bold text-slate-800 dark:text-white mb-4 px-2">Missioni Attive</Text>
                    
                    <View className="bg-white dark:bg-slate-800 rounded-2xl p-5 mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
                        <View className="flex-row justify-between items-start mb-3">
                            <View className="flex-row items-center flex-1">
                                <View className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg mr-3">
                                    <LucideTarget size={20} color="#3b82f6" />
                                </View>
                                <View className="flex-1 pr-2">
                                    <Text className="text-base font-bold text-slate-800 dark:text-white">Missione Settimanale</Text>
                                    <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">Completa 5 attività (Giorno/Notte)</Text>
                                </View>
                            </View>
                            <View className="bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded">
                                <Text className="text-amber-600 dark:text-amber-400 font-bold text-xs">+50 pt</Text>
                            </View>
                        </View>
                        {/* Progress Bar */}
                        <View className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                            <View 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: `${Math.min((weeklyMissionProgress / 5) * 100, 100)}%` }} 
                            />
                        </View>
                        <Text className="text-right text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
                            {weeklyMissionProgress}/5
                        </Text>
                    </View>

                    <View className="bg-white dark:bg-slate-800 rounded-2xl p-5 mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
                        <View className="flex-row justify-between items-start mb-3">
                            <View className="flex-row items-center flex-1">
                                <View className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg mr-3">
                                    <LucideAward size={20} color="#a855f7" />
                                </View>
                                <View className="flex-1 pr-2">
                                    <Text className="text-base font-bold text-slate-800 dark:text-white">Missione Mensile</Text>
                                    <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sblocca 2 Trofei delle Città</Text>
                                </View>
                            </View>
                            <View className="bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded">
                                <Text className="text-amber-600 dark:text-amber-400 font-bold text-xs">+150 pt</Text>
                            </View>
                        </View>
                        {/* Progress Bar */}
                        <View className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                            <View 
                                className="h-full bg-purple-500 rounded-full" 
                                style={{ width: `${Math.min((monthlyMissionProgress / 2) * 100, 100)}%` }} 
                            />
                        </View>
                        <Text className="text-right text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
                            {monthlyMissionProgress}/2
                        </Text>
                    </View>
                </Animated.View>

                {/* History Section */}
                <Animated.View entering={FadeInUp.delay(400).duration(500)}>
                    <Text className="text-lg font-bold text-slate-800 dark:text-white mb-4 px-2">Cronologia</Text>
                    
                    <View className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
                        {pointsHistory.length === 0 ? (
                            <View className="p-8 items-center">
                                <Text className="text-slate-400 dark:text-slate-500 text-center">Nessun punto guadagnato ancora. Inizia a esplorare per accumularne!</Text>
                            </View>
                        ) : (
                            pointsHistory.map((transaction, index) => {
                                const isLast = index === pointsHistory.length - 1;
                                const date = new Date(transaction.timestamp);
                                const dateString = date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
                                const timeString = date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

                                return (
                                    <View 
                                        key={transaction.id} 
                                        className={`flex-row items-center p-4 ${!isLast ? 'border-b border-slate-100 dark:border-slate-700/50' : ''}`}
                                    >
                                        <View className="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-full mr-4 border border-slate-100 dark:border-slate-700/30">
                                            {getIconForReason(transaction.reason)}
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-base font-bold text-slate-700 dark:text-slate-200">{transaction.reason}</Text>
                                            <Text className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{dateString} • {timeString}</Text>
                                        </View>
                                        <Text className="text-amber-500 dark:text-amber-400 font-black text-lg">
                                            +{transaction.amount}
                                        </Text>
                                    </View>
                                );
                            })
                        )}
                    </View>
                </Animated.View>
            </View>
        </ScrollView>
    );
}
