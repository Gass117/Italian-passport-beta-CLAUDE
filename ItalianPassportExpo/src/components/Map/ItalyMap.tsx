import React, { useState } from 'react';
import { View, TouchableOpacity, Text, LayoutAnimation } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { REGION_PATHS } from './RegionPaths';
import { PLACES_DATA } from '@/src/data/places';
import { useRouter } from 'expo-router';
import { usePassportStore } from '@/src/store/usePassportStore';
import { LucideZoomOut } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import ProgressCircle from '@/src/components/ProgressCircle';

interface ItalyMapProps {
    onRegionPress?: (regionId: string) => void;
}

type ViewMode = 'ALL' | 'NORTH' | 'CENTER' | 'SOUTH';

export const MACRO_CONFIG: Record<ViewMode, { viewBox: string; aspectRatio: any; title: string }> = {
    // ALL: Standard Italy view, slightly taller viewBox to breathe
    ALL: { viewBox: "0 0 610 800", aspectRatio: "3/4", title: "L'Italia" },

    // NORTH: without Emilia.
    // User requested: "il nord va spostato ancora un po' verso la sinistra del riquadro bianco".
    // Shift map LEFT = shift camera RIGHT (increase minX).
    // Let's change minX from -50 to -15, and keep minY at -5.
    NORTH: { viewBox: "-15 -5 395 296", aspectRatio: "4/3", title: "Nord Italia" },

    // CENTER: includes Emilia, Toscana, Marche, Umbria, Lazio.
    // User says "Il centro è perfetto."
    CENTER: { viewBox: "100 140 340 315", aspectRatio: "1/1", title: "Centro Italia" },

    // SOUTH: includes shifted Sardinia.
    // User requested: "non ridimensionare ne spostare più la mappa... allunga solo il riquadro bianco verso il basso"
    // Changing to 1/1 makes the container taller. To STOP the map from zooming up to fill that height, 
    // we increase viewBox proportionally from 340 to 425, and adjust X to 178 so the physical scale and top-alignment match exactly the previous 5/4 box.
    // By increasing minY to 300, we pan the camera down, revealing the hidden bottom of Sicily without changing map scale.
    // By increasing minX to 215, we pan the camera right, moving the map slightly left to ensure Puglia is not cut off.
    SOUTH: { viewBox: "215 300 425 425", aspectRatio: "1/1", title: "Sud e Isole" }
};

export const MACRO_REGIONS: Record<string, ViewMode> = {
    'lombardia': 'NORTH', 'piemonte': 'NORTH', 'valle_aosta': 'NORTH',
    'liguria': 'NORTH', 'veneto': 'NORTH', 'trentino': 'NORTH',
    'friuli': 'NORTH',

    'emilia': 'CENTER', // Properly in CENTER now
    'toscana': 'CENTER', 'umbria': 'CENTER', 'marche': 'CENTER', 'lazio': 'CENTER',

    'abruzzo': 'SOUTH', 'molise': 'SOUTH', 'campania': 'SOUTH',
    'puglia': 'SOUTH', 'basilicata': 'SOUTH', 'calabria': 'SOUTH',
    'sicilia': 'SOUTH', 'sardegna': 'SOUTH'
};

export const getMacroRegion = (regionId: string): ViewMode => {
    return MACRO_REGIONS[regionId] || 'ALL';
};

export default function ItalyMap({ onRegionPress }: ItalyMapProps) {
    const router = useRouter();
    const { visitedPlaceIds } = usePassportStore();
    const { colorScheme } = useColorScheme();
    const [viewMode, setViewMode] = useState<ViewMode>('ALL');

    const mapOpacity = useSharedValue(1);

    const mapAnimatedStyle = useAnimatedStyle(() => {
        return { opacity: mapOpacity.value };
    });

    const handlePress = (regionId: string) => {
        if (viewMode === 'ALL') {
            const targetMode = getMacroRegion(regionId);
            if (targetMode !== 'ALL') {
                mapOpacity.value = withTiming(0, { duration: 200 }, () => {
                    runOnJS(LayoutAnimation.configureNext)(LayoutAnimation.Presets.easeInEaseOut);
                    runOnJS(setViewMode)(targetMode);
                    // Reduced to 200ms
                    mapOpacity.value = withTiming(1, { duration: 200 });
                });
            }
        } else {
            if (onRegionPress) {
                onRegionPress(regionId);
            } else {
                router.push(`/region/${regionId}`);
            }
        }
    };

    const handleZoomOut = () => {
        // Both fade out and fade in reduced to 200ms
        mapOpacity.value = withTiming(0, { duration: 200 }, () => {
            runOnJS(LayoutAnimation.configureNext)(LayoutAnimation.Presets.easeInEaseOut);
            runOnJS(setViewMode)('ALL');
            mapOpacity.value = withTiming(1, { duration: 200 });
        });
    };

    const currentConfig = MACRO_CONFIG[viewMode];

    return (
        <View className="items-center justify-center relative w-full py-8 px-5">

            {/* Dynamic Header */}
            {viewMode !== 'ALL' && (
                <View
                    className="z-10 bg-white dark:bg-slate-800 px-8 py-3 rounded-full border border-slate-100 dark:border-slate-700 transform scale-110 mb-8"
                    style={{ elevation: 10, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}
                >
                    <Text className="text-xl font-black text-slate-800 dark:text-white tracking-widest uppercase">
                        {currentConfig.title}
                    </Text>
                </View>
            )}

            {/* Map Container */}
            <Animated.View
                className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800"
                style={[
                    {
                        aspectRatio: currentConfig.aspectRatio,
                        elevation: 10,
                        shadowColor: '#000',
                        shadowOpacity: 0.25,
                        shadowRadius: 10,
                        shadowOffset: { width: 0, height: 6 }
                    },
                    mapAnimatedStyle
                ]}
            >
                {/* Global Progress Circle inside the white map box */}
                {viewMode === 'ALL' && (
                    <View className="absolute top-4 right-4 z-20 pointer-events-none">
                        <ProgressCircle size={44} strokeWidth={4} />
                    </View>
                )}

                <Svg
                    viewBox={currentConfig.viewBox}
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* 1. SHADOW LAYER (Sticker Depth) */}
                    {Object.entries(REGION_PATHS).map(([id, pathData]) => {
                        const regionMode = getMacroRegion(id);

                        if (viewMode !== 'ALL' && regionMode !== viewMode) return null;

                        // ONLY move Sardinia in SOUTH mode.
                        let regionTransform = "";
                        if (viewMode === 'SOUTH' && id === 'sardegna') {
                            regionTransform = "translate(170, -40)"; // Slower shift to fit box
                        }

                        return (
                            <Path
                                key={`shadow-${id}`}
                                d={pathData}
                                fill="rgba(0,0,0,0.20)" // Slightly lighter shadow color
                                stroke="rgba(0,0,0,0.10)" // Less puffy
                                strokeWidth="2"
                                // Global sticker shadow (reduced) + Optional Region Transform
                                transform={`translate(6, 8) ${regionTransform}`}
                            />
                        );
                    })}

                    {/* 2. MAIN REGION LAYER */}
                    {Object.entries(REGION_PATHS).map(([id, pathData]) => {
                        const region = PLACES_DATA.regions.find((r) => r.id === id);
                        const color = region ? region.themeColorHex : "#E2E8F0";
                        const regionMode = getMacroRegion(id);

                        if (viewMode !== 'ALL' && regionMode !== viewMode) {
                            return null;
                        }

                        // Fix for Double Sardinia Bug:
                        // ALWAYS provide a valid transform. If we just provide "", React Native SVG 
                        // sometimes fails to reset it from a previous render.
                        let regionTransform = "translate(0, 0)";
                        if (viewMode === 'SOUTH' && id === 'sardegna') {
                            regionTransform = "translate(170, -40)";
                        }

                        return (
                            <G key={id} onPress={() => handlePress(id)}>
                                <Path
                                    d={pathData}
                                    fill={color}
                                    stroke={colorScheme === 'dark' ? '#1e293b' : 'white'}
                                    // Strong Sticker outline for ALL states
                                    strokeWidth={viewMode === 'ALL' ? "2.5" : "3.5"}
                                    transform={regionTransform}
                                />
                            </G>
                        );
                    })}
                </Svg>

                {/* Interaction Hint (Moved Inside White Box) */}
                {viewMode === 'ALL' && (
                    <View className="absolute bottom-4 left-0 right-0 items-center pointer-events-none">
                        <Text className="text-slate-400 dark:text-slate-500 text-xs text-center px-4 py-1 rounded-full mx-auto font-medium">
                            Tocca una zona per esplorare
                        </Text>
                    </View>
                )}
            </Animated.View>

            {/* Back Button */}
            {viewMode !== 'ALL' && (
                <View className="w-full flex-row justify-end mt-6 pr-2">
                    <TouchableOpacity
                        onPress={handleZoomOut}
                        className="bg-slate-800 dark:bg-slate-700 p-4 rounded-full flex-row items-center space-x-2 active:scale-95"
                        style={{ elevation: 12, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }}
                    >
                        <LucideZoomOut size={22} color="white" />
                        <Text className="text-white font-bold text-sm ml-2">INDIETRO</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    );
}
