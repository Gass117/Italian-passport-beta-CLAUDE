import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withRepeat, 
    withTiming, 
    withDelay, 
    withSequence,
    Easing 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// A generic twinkling star
const TwinklingStar = ({ x, y, size, delay }: { x: number, y: number, size: number, delay: number }) => {
    const opacity = useSharedValue(0.1);

    useEffect(() => {
        opacity.value = withDelay(
            delay, 
            withRepeat(
                withSequence(
                    withTiming(0.8, { duration: 1000 + Math.random() * 2000 }),
                    withTiming(0.1, { duration: 1000 + Math.random() * 2000 })
                ), 
                -1, // infinite
                true // reverse
            )
        );
    }, []);

    const style = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    return (
        <Animated.View style={[
            {
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: 'white',
            },
            style
        ]} />
    );
};

// A shooting star traversing diagonally
const ShootingStar = ({ delay }: { delay: number }) => {
    const x = useSharedValue(-50);
    const y = useSharedValue(-50);
    const opacity = useSharedValue(0);

    const startX = Math.random() * (width / 2); // Start somewhere on the upper left
    const startY = Math.random() * -100; // Start outside the screen top
    const endX = startX + width; // Move right
    const endY = startY + height; // Move down

    useEffect(() => {
        // Setup infinite shooting loop
        const runShootingStar = () => {
            x.value = startX;
            y.value = startY;
            
            // Fade in and out during the fall
            opacity.value = withDelay(delay, withSequence(
                withTiming(1, { duration: 300 }),
                withTiming(0, { duration: 700 })
            ));

            x.value = withDelay(delay, withTiming(endX, { duration: 1000, easing: Easing.linear }));
            y.value = withDelay(delay, withTiming(endY, { duration: 1000, easing: Easing.linear }));

            // Relaunch the star every 3-8 seconds
            setTimeout(runShootingStar, delay + 3000 + Math.random() * 5000);
        };
        
        runShootingStar();
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [
            { translateX: x.value },
            { translateY: y.value },
            { rotate: '45deg' }
        ],
        opacity: opacity.value
    }));

    return (
        <Animated.View style={[
            {
                position: 'absolute',
                width: 60,
                height: 2,
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 2,
                shadowColor: 'white',
                shadowOpacity: 1,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 0 }
            },
            style
        ]} />
    );
}

export function TwinklingBackground() {
    // Generate 100 random twinkle stars across upper part of screen (above map)
    const stars = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * (height * 0.9), // Concentrate on the top 90%
        size: Math.random() * 2.5 + 1, // 1px to 3.5px
        delay: Math.random() * 3000
    }));

    return (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {stars.map(star => (
                <TwinklingStar key={`star-${star.id}`} x={star.x} y={star.y} size={star.size} delay={star.delay} />
            ))}
        </View>
    );
}

export function ShootingStarsOverlay() {
    const shootingStars = [0, 1500, 3200]; // 3 shooting stars with different delays

    return (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 100 }]} pointerEvents="none">
            {shootingStars.map((delay, index) => (
                <ShootingStar key={`shooting-${index}`} delay={delay} />
            ))}
        </View>
    );
}
