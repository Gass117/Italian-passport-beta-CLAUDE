import React, { useRef, useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import {
    Canvas,
    Path,
    Skia,
    TouchInfo,
    useTouchHandler,
    Image,
    useImage,
    Group,
    Rect,
    Paint,
} from '@shopify/react-native-skia';
import * as Haptics from 'expo-haptics';

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
    const image = useImage(imageSource);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const touchHandler = useTouchHandler({
        onStart: ({ x, y }) => {
            const newPath = Skia.Path.Make();
            newPath.moveTo(x, y);
            setPaths((prev) => [...prev, newPath]);
        },
        onActive: ({ x, y }) => {
            setPaths((prev) => {
                const currentPath = prev[prev.length - 1];
                if (currentPath) {
                    currentPath.lineTo(x, y);
                    // Trigger Haptics occasionally or on move, throttle for performance
                    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                return [...prev];
            });
        },
        onEnd: () => {
            // Calculate progress here if needed
            // Simple logic: if enough paths, trigger reveal
            if (paths.length > 10 && onReveal) {
                onReveal();
            }
        },
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
        <View style={styles.container} onLayout={onLayout}>
            <Canvas style={styles.canvas} onTouch={touchHandler}>
                {/* Helper to fit image cover */}
                <Image
                    image={image}
                    fit="cover"
                    x={0}
                    y={0}
                    width={canvasSize.width}
                    height={canvasSize.height}
                />

                {/* Overlay Layer */}
                <Group layer>
                    <Rect
                        x={0}
                        y={0}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        color="#C0C0C0" // Silver scratch color
                    />
                    {/* Paths to cut out from overlay */}
                    {paths.map((path, index) => (
                        <Path
                            key={index}
                            path={path}
                            strokeWidth={brushSize}
                            style="stroke"
                            strokeJoin="round"
                            strokeCap="round"
                            blendMode="dstOut"
                            color="white" // Color doesn't matter for dstOut
                        />
                    ))}
                </Group>
            </Canvas>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 16,
    },
    canvas: {
        flex: 1,
    },
});
