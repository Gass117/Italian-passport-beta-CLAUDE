import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideGem } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { usePassportStore } from '@/src/store/usePassportStore';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function PointsBadge() {
    const router = useRouter();
    const totalPoints = usePassportStore(state => state.totalPoints);

    return (
        <Animated.View entering={FadeInDown.duration(400)}>
            <TouchableOpacity 
                onPress={() => router.push('/points')}
                className="flex-row items-center bg-amber-100 dark:bg-amber-900/50 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-700/50 shadow-sm"
            >
                <LucideGem size={16} color="#d97706" className="mr-1.5" />
                <Text className="text-amber-700 dark:text-amber-400 font-bold text-sm tracking-widest">
                    {totalPoints}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
}
