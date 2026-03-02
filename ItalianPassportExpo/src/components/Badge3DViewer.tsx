import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LucideX, LucideMapPin } from 'lucide-react-native';
import { Place } from '@/src/types';

interface Badge3DViewerProps {
    place: Place;
    onClose: () => void;
}

const { width, height } = Dimensions.get('window');
const BADGE_SIZE = width * 0.6; // Large badge

export default function Badge3DViewer({ place, onClose }: Badge3DViewerProps) {
    // 3D Rotation shared values
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);

    // Pan gesture for spinning the coin
    const pan = Gesture.Pan()
        .onUpdate((event) => {
            // Map translation to rotation degrees. 
            // Swiping right rotates around Y axis.
            // Swiping down rotates around X axis.
            rotateY.value = interpolate(
                event.translationX,
                [-width / 2, width / 2],
                [-45, 45],
                Extrapolation.CLAMP
            );
            // Invert Y so swiping down tilts the top towards us
            rotateX.value = interpolate(
                event.translationY,
                [-height / 2, height / 2],
                [45, -45],
                Extrapolation.CLAMP
            );
        })
        .onEnd(() => {
            // Spring back to center when released
            rotateX.value = withSpring(0, { damping: 10, stiffness: 100 });
            rotateY.value = withSpring(0, { damping: 10, stiffness: 100 });
        });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { perspective: 1000 },
                { rotateX: `${rotateX.value}deg` },
                { rotateY: `${rotateY.value}deg` },
            ],
        };
    });

    return (
        <View className="flex-1 bg-slate-900/95 justify-center items-center">
            {/* Close Button */}
            <TouchableOpacity
                onPress={onClose}
                className="absolute top-16 right-6 bg-white/20 p-3 rounded-full z-10"
            >
                <LucideX size={28} color="white" />
            </TouchableOpacity>

            <View className="items-center w-full px-6">
                <Text className="text-white/60 text-lg font-medium tracking-widest uppercase mb-2">
                    {place.badge.title}
                </Text>

                <GestureDetector gesture={pan}>
                    <View
                        style={{
                            width: BADGE_SIZE,
                            height: BADGE_SIZE,
                            marginVertical: 40,
                            borderRadius: BADGE_SIZE / 2,
                            elevation: 20,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 20 },
                            shadowOpacity: 0.5,
                            shadowRadius: 15,
                            backgroundColor: 'white',
                        }}
                    >
                        <Animated.View
                            style={[
                                {
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: BADGE_SIZE / 2,
                                    backgroundColor: 'white',
                                    backfaceVisibility: 'visible', // Avoids some more clipping
                                },
                                rStyle
                            ]}
                        >
                            {/* The actual image */}
                            <View className="w-full h-full rounded-full overflow-hidden border-8 border-white items-center justify-center bg-slate-100">
                                {place.badge.imageAsset ? (
                                    <Image
                                        source={place.badge.imageAsset}
                                        style={{ width: '100%', height: '100%' }}
                                        resizeMode="cover"
                                    />
                                ) : null}
                            </View>
                        </Animated.View>
                    </View>
                </GestureDetector>

                <Animated.View className="items-center bg-white/10 p-6 rounded-3xl w-full border border-white/20">
                    <View className="flex-row items-center mb-3">
                        <LucideMapPin size={24} color="#eab308" />
                        <Text className="text-2xl font-bold text-white ml-2">{place.name}</Text>
                    </View>
                    <Text className="text-white/80 text-center leading-relaxed">
                        {place.shortDescription}
                    </Text>
                    <View className="mt-6 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/50">
                        <Text className="text-yellow-400 font-bold tracking-wide">TIMBRO SBLOCCATO</Text>
                    </View>
                </Animated.View>
            </View>

            {/* Hint */}
            <Text className="absolute bottom-12 text-white/40 text-sm font-medium animate-pulse">
                SCORRI PER MUOVERE LA MONETA
            </Text>
        </View>
    );
}
