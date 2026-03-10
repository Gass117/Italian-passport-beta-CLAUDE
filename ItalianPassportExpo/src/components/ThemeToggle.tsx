import React, { useEffect } from 'react';
import { Pressable, View, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor, withTiming } from 'react-native-reanimated';
import { usePassportStore } from '@/src/store/usePassportStore';
import { Sun, Moon, Cloud, Star } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function ThemeToggle() {
    const theme = usePassportStore((state) => state.theme);
    const setTheme = usePassportStore((state) => state.setTheme);
    const { setColorScheme } = useColorScheme();

    const isDark = theme === 'dark';
    
    // 0 = light, 1 = dark
    const progress = useSharedValue(isDark ? 1 : 0);

    useEffect(() => {
        progress.value = withSpring(isDark ? 1 : 0, { damping: 15, stiffness: 120 });
    }, [isDark]);

    const toggleTheme = () => {
        // Trigger a slow, smooth cross-fade across the whole app UI when theme changes
        LayoutAnimation.configureNext({
            duration: 1300,
            create: { type: 'easeInEaseOut', property: 'opacity' },
            update: { type: 'easeInEaseOut' },
            delete: { type: 'easeInEaseOut', property: 'opacity' },
        });
        
        const nextTheme = isDark ? 'light' : 'dark';
        setTheme(nextTheme);
        setColorScheme(nextTheme);
    };

    const containerStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ['#38BDF8', '#0F172A'] // Sky blue for day, dark slate for night
        );
        return { backgroundColor };
    });

    // 100 wide, 48 high, 40 circle -> 100 - 40 - 8 (padding) = 52px travel
    const circleStyle = useAnimatedStyle(() => {
        const translateX = progress.value * 52; 
        return {
            transform: [{ translateX }]
        };
    });

    const sunStyle = useAnimatedStyle(() => {
        return {
            opacity: 1 - progress.value,
            transform: [{ scale: 1 - progress.value * 0.5 }, { rotate: `${progress.value * 90}deg` }]
        };
    });

    const moonStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            transform: [{ scale: 0.5 + progress.value * 0.5 }, { rotate: `${(1 - progress.value) * -90}deg` }]
        };
    });

    const cloudsStyle = useAnimatedStyle(() => {
        return {
            opacity: 1 - progress.value,
            transform: [{ translateY: progress.value * 20 }]
        };
    });

    const starsStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            transform: [{ translateY: (1 - progress.value) * -20 }]
        };
    });

    return (
        <Pressable onPress={toggleTheme} className="self-center">
            <Animated.View 
                style={[
                    { width: 100, height: 48, borderRadius: 24, padding: 4, justifyContent: 'center' },
                    containerStyle
                ]}
            >
                {/* Background Decorations */}
                {/* Day Clouds */}
                <Animated.View style={[StyleSheet.absoluteFill, { paddingLeft: 45, paddingTop: 10 }, cloudsStyle]}>
                    <Cloud size={16} color="white" fill="white" style={{ opacity: 0.8 }} />
                </Animated.View>
                <Animated.View style={[StyleSheet.absoluteFill, { paddingLeft: 65, paddingTop: 22 }, cloudsStyle]}>
                    <Cloud size={12} color="white" fill="white" style={{ opacity: 0.6 }} />
                </Animated.View>

                {/* Night Stars */}
                <Animated.View style={[StyleSheet.absoluteFill, { paddingLeft: 15, paddingTop: 12 }, starsStyle]}>
                    <Star size={8} color="#FDE047" fill="#FDE047" style={{ opacity: 0.8 }} />
                </Animated.View>
                <Animated.View style={[StyleSheet.absoluteFill, { paddingLeft: 30, paddingTop: 26 }, starsStyle]}>
                    <Star size={6} color="#FDE047" fill="#FDE047" style={{ opacity: 0.5 }} />
                </Animated.View>
                <Animated.View style={[StyleSheet.absoluteFill, { paddingLeft: 45, paddingTop: 16 }, starsStyle]}>
                    <Star size={5} color="#FDE047" fill="#FDE047" style={{ opacity: 0.9 }} />
                </Animated.View>

                {/* Thumb */}
                <Animated.View 
                    style={[
                        { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 3 },
                        circleStyle
                    ]}
                >
                    <Animated.View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }, sunStyle]}>
                        <Sun size={24} color="#F59E0B" fill="#FBBF24" />
                    </Animated.View>
                    <Animated.View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }, moonStyle]}>
                        <Moon size={22} color="#475569" fill="#94A3B8" />
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}
