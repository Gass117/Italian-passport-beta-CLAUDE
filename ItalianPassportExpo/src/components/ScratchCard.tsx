import React, { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent, Text } from 'react-native';
import {
    Canvas,
    Path,
    Skia,
    Image,
    useImage,
    Group,
    Rect,
    Circle,
    LinearGradient,
    vec
} from '@shopify/react-native-skia';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

interface ScratchCardProps {
    imageSource: any; // require(...) or URI
    onReveal?: () => void;
    brushSize?: number;
}

export default function ScratchCard({
    imageSource,
    onReveal,
    brushSize = 40,
}: ScratchCardProps) {
    const [paths, setPaths] = useState<any[]>([]);
    const [scratchProgress, setScratchProgress] = useState(0); // Track amount scratched
    const image = useImage(imageSource);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    // Pulsing animation for the GRATTA text
    const textScale = useSharedValue(1);

    React.useEffect(() => {
        if (scratchProgress === 0) {
            textScale.value = withRepeat(
                withSequence(
                    withTiming(1.08, { duration: 800 }),
                    withTiming(0.95, { duration: 800 })
                ),
                -1, // infinite
                true // reverse
            );
        }
    }, [scratchProgress]);

    const animatedTextStyle = useAnimatedStyle(() => ({
        transform: [{ scale: textScale.value }]
    }));

    // Wrapper to update state from UI thread
    const addPath = (x: number, y: number) => {
        setPaths((prev) => {
            const newPath = Skia.Path.Make();
            newPath.moveTo(x, y);
            return [...prev, newPath];
        });
    };

    const updatePath = (x: number, y: number) => {
        setPaths((prev) => {
            const currentPath = prev[prev.length - 1];
            if (currentPath) {
                currentPath.lineTo(x, y);
            }
            return [...prev]; // Return new array to trigger re-render
        });
        // Increment progress (simple counter of movement events)
        setScratchProgress(prev => prev + 1);
    };

    const checkReveal = () => {
        // Threshold: ~100 movement events (adjust as needed)
        // This is much more reliable than paths.length because one long stroke is 1 path but many updates.
        if (scratchProgress > 100 && onReveal) {
            onReveal();
        }
    };

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart((g) => {
            runOnJS(addPath)(g.x, g.y);
        })
        .onUpdate((g) => {
            runOnJS(updatePath)(g.x, g.y);
        })
        .onEnd(() => {
            runOnJS(checkReveal)();
        });

    const onLayout = (event: LayoutChangeEvent) => {
        setCanvasSize({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
        });
    };

    if (!image) {
        return <View style={styles.container} />;
    }

    return (
        <GestureDetector gesture={pan}>
            <View style={styles.container} onLayout={onLayout}>
                <Canvas style={styles.canvas}>
                    {/* Badge Image (Bottom Layer) - Centered Sticker Style */}
                    <Group>
                        {/* Shadow simulation (optional, gray circle offset) */}
                        <Circle
                            cx={canvasSize.width / 2}
                            cy={canvasSize.height / 2 + 8} // Increased offset
                            r={150} // 140 radius + 10 border
                            color="#00000040"
                        />

                        {/* White Border */}
                        <Circle
                            cx={canvasSize.width / 2}
                            cy={canvasSize.height / 2}
                            r={145} // 140 image radius + 5 border
                            color="white"
                        />

                        {/* The Image itself */}
                        <Group clip={Skia.Path.Make().addCircle(canvasSize.width / 2, canvasSize.height / 2, 140)}>
                            <Image
                                image={image}
                                fit="cover"
                                x={canvasSize.width / 2 - 140}
                                y={canvasSize.height / 2 - 140}
                                width={280}
                                height={280}
                            />
                        </Group>
                    </Group>

                    {/* Scratch Overlay (Top Layer) */}
                    <Group layer>
                        <Rect
                            x={0}
                            y={0}
                            width={canvasSize.width}
                            height={canvasSize.height}
                        >
                            <LinearGradient
                                start={vec(0, 0)}
                                end={vec(canvasSize.width, canvasSize.height)}
                                colors={['#bf953f', '#fcf6ba', '#b38728', '#fbf5b7', '#aa771c']}
                                positions={[0, 0.25, 0.5, 0.75, 1]}
                            />
                        </Rect>
                        {/* Eraser Paths */}
                        {paths.map((path, index) => (
                            <Path
                                key={index}
                                path={path}
                                strokeWidth={brushSize}
                                style="stroke"
                                strokeJoin="round"
                                strokeCap="round"
                                blendMode="dstOut"
                                color="white"
                            />
                        ))}
                    </Group>
                </Canvas>
                {scratchProgress === 0 && (
                    <View style={StyleSheet.absoluteFill} pointerEvents="none" className="items-center justify-center px-6">
                        <Animated.Text 
                            style={[
                                { fontSize: 48, fontWeight: '900', color: 'rgba(255,255,255,0.95)', letterSpacing: 8, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 8, textAlign: 'center' },
                                animatedTextStyle
                            ]}
                        >
                            GRATTA
                        </Animated.Text>
                        <Animated.Text 
                            style={[
                                { fontSize: 16, fontWeight: '800', color: 'rgba(255,255,255,0.95)', textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4, textAlign: 'center', marginTop: 12 },
                                animatedTextStyle
                            ]}
                        >
                            e colleziona il badge di questa città
                        </Animated.Text>
                    </View>
                )}
            </View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 16,
        backgroundColor: 'transparent', // Ensure background doesn't block
    },
    canvas: {
        flex: 1,
    },
});
