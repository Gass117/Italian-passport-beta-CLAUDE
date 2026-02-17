import React, { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import {
    Canvas,
    Path,
    Skia,
    Image,
    useImage,
    Group,
    Rect,
    Circle,
} from '@shopify/react-native-skia';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

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
                            color="#C0C0C0" // Silver
                        />
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
