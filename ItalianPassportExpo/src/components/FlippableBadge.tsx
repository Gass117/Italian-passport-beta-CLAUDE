import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { 
    interpolate, 
    useAnimatedStyle, 
    useSharedValue, 
    withSpring 
} from 'react-native-reanimated';
import { Canvas, Rect, LinearGradient, vec } from '@shopify/react-native-skia';

interface FlippableBadgeProps {
    imageAsset: any;
    unlockDate?: string;
    themeColorHex: string;
    size?: number;
}

export default function FlippableBadge({ imageAsset, unlockDate, themeColorHex, size = 180 }: FlippableBadgeProps) {
    const isFlipped = useSharedValue(0);

    const handlePress = () => {
        isFlipped.value = withSpring(isFlipped.value === 0 ? 1 : 0, {
            damping: 15,
            stiffness: 100,
        });
    };

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const spin = interpolate(isFlipped.value, [0, 1], [0, 180]);
        return {
            transform: [{ rotateY: `${spin}deg` }],
            backfaceVisibility: 'hidden',
            position: 'absolute',
            zIndex: isFlipped.value < 0.5 ? 2 : 1,
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const spin = interpolate(isFlipped.value, [0, 1], [180, 360]);
        return {
            transform: [{ rotateY: `${spin}deg` }],
            backfaceVisibility: 'hidden',
            position: 'absolute',
            zIndex: isFlipped.value > 0.5 ? 2 : 1,
        };
    });

    return (
        <Pressable onPress={handlePress} style={{ width: size, height: size }}>
            <View style={{ width: size, height: size }}>
                {/* BACK FACE (Renders "behind") */}
                <Animated.View 
                    style={[
                        {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                            borderWidth: 8,
                            borderColor: '#D4AF37', // Gold rim
                            overflow: 'hidden', // Contain the Skia canvas
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            shadowOffset: { width: 0, height: 2 },
                        },
                        backAnimatedStyle
                    ]}
                >
                    <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                        <Rect x={0} y={0} width={size} height={size}>
                            <LinearGradient
                                start={vec(0, 0)}
                                end={vec(size, size)}
                                colors={['#bf953f', '#fcf6ba', '#b38728', '#fbf5b7', '#aa771c']}
                                positions={[0, 0.25, 0.5, 0.75, 1]}
                            />
                        </Rect>
                    </Canvas>

                    <View style={{ 
                        width: size - 30, 
                        height: size - 30, 
                        borderRadius: (size - 30) / 2, 
                        borderWidth: 2, 
                        borderColor: 'rgba(255,255,255,0.4)',
                        borderStyle: 'dashed',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Text style={{ 
                            color: 'white', 
                            fontWeight: '900', 
                            fontSize: size * 0.08, // responsive font
                            letterSpacing: 1,
                            textAlign: 'center',
                            marginBottom: 4,
                            textShadowColor: 'rgba(0,0,0,0.3)',
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 2
                        }}>
                            SBLOCCATO
                        </Text>
                        <Text style={{ 
                            color: 'white', 
                            fontWeight: '600', 
                            fontSize: size * 0.06, 
                            textAlign: 'center',
                            opacity: 0.9
                        }}>
                            {unlockDate || 'Appena sbloccato'}
                        </Text>
                    </View>
                </Animated.View>

                {/* FRONT FACE (Renders "in front" initially) */}
                <Animated.View 
                    style={[
                        {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                            overflow: 'hidden',
                            borderWidth: 8,
                            borderColor: 'white',
                            backgroundColor: 'white'
                        },
                        frontAnimatedStyle
                    ]}
                >
                    {imageAsset ? (
                        <Image
                            source={imageAsset}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={{ flex: 1, backgroundColor: '#dcfce7', alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Icon</Text>
                        </View>
                    )}
                </Animated.View>
            </View>
        </Pressable>
    );
}
