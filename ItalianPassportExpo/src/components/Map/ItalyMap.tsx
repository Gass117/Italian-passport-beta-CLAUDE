import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { REGION_PATHS } from './RegionPaths';
import { PLACES_DATA } from '@/src/data/places';
import { useRouter } from 'expo-router';
import { usePassportStore } from '@/src/store/usePassportStore';
import { LucideZoomOut } from 'lucide-react-native';

interface ItalyMapProps {
    onRegionPress?: (regionId: string) => void;
}

type ViewMode = 'ALL' | 'NORTH' | 'CENTER' | 'SOUTH';

// PRECISE Bounding Boxes to make each Region feel like a "Standalone State"
const MACRO_CONFIG: Record<ViewMode, { viewBox: string; aspectRatio: any; title: string }> = {
    // ALL: Standard Italy view, slightly taller viewBox to breathe
    ALL: { viewBox: "0 0 610 800", aspectRatio: "3/4", title: "L'Italia" },

    // NORTH: without Emilia.
    // User requested: "ingrandisci il nord del 7% e poi se serve spostalo in modo da centrarlo nel riquadro bianco".
    // 7% zoom -> shrink width from 440 to 410. Height to 308.
    // Adjusted minX to -40 and minY to +15 to perfectly center it within the 4/3 aspect ratio card.
    NORTH: { viewBox: "-40 15 410 308", aspectRatio: "4/3", title: "Nord Italia" },

    // CENTER: includes Emilia, Toscana, Marche, Umbria, Lazio.
    // User says "Il centro è perfetto."
    CENTER: { viewBox: "100 140 340 315", aspectRatio: "1/1", title: "Centro Italia" },

    // SOUTH: includes shifted Sardinia.
    // User requested "il sud è ancora troppo spostato a destra e la puglia e tagliata, sposta tutto un po più a sinistra"
    // By increasing minX we shift the camera right, which pushes the map to the left on screen.
    // Old: "190 268 390 495". Right edge = 580.
    // New: "220 268 400 533". Right edge = 620. (Aspect ratio 3/4 -> 400/533).
    SOUTH: { viewBox: "220 268 400 533", aspectRatio: "3/4", title: "Sud e Isole" }
};

const MACRO_REGIONS: Record<string, ViewMode> = {
    'lombardia': 'NORTH', 'piemonte': 'NORTH', 'valle_aosta': 'NORTH',
    'liguria': 'NORTH', 'veneto': 'NORTH', 'trentino': 'NORTH',
    'friuli': 'NORTH',

    'emilia': 'CENTER', // Properly in CENTER now
    'toscana': 'CENTER', 'umbria': 'CENTER', 'marche': 'CENTER', 'lazio': 'CENTER',

    'abruzzo': 'SOUTH', 'molise': 'SOUTH', 'campania': 'SOUTH',
    'puglia': 'SOUTH', 'basilicata': 'SOUTH', 'calabria': 'SOUTH',
    'sicilia': 'SOUTH', 'sardegna': 'SOUTH'
};

export default function ItalyMap({ onRegionPress }: ItalyMapProps) {
    const router = useRouter();
    const { visitedPlaceIds } = usePassportStore();
    const [viewMode, setViewMode] = useState<ViewMode>('ALL');

    const getMacroRegion = (regionId: string): ViewMode => {
        return MACRO_REGIONS[regionId] || 'ALL';
    };

    const handlePress = (regionId: string) => {
        if (viewMode === 'ALL') {
            const targetMode = getMacroRegion(regionId);
            if (targetMode !== 'ALL') {
                setViewMode(targetMode);
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
        setViewMode('ALL');
    };

    const currentConfig = MACRO_CONFIG[viewMode];

    return (
        <View className="flex-1 items-center justify-center bg-blue-50 relative w-full h-full p-4">

            {/* Dynamic Header */}
            {viewMode !== 'ALL' && (
                <View className="absolute top-10 z-10 bg-white/95 px-8 py-3 rounded-full shadow-lg border border-slate-100 transform scale-110">
                    <Text className="text-xl font-black text-slate-800 tracking-widest uppercase">
                        {currentConfig.title}
                    </Text>
                </View>
            )}

            {/* Map Container */}
            <View
                className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white"
                style={{
                    aspectRatio: currentConfig.aspectRatio,
                    elevation: 10 // Android shadow
                }}
            >
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
                                    stroke="white"
                                    // Strong Sticker outline for ALL states
                                    strokeWidth={viewMode === 'ALL' ? "2.5" : "3.5"}
                                    transform={regionTransform}
                                />
                            </G>
                        );
                    })}
                </Svg>
            </View>

            {/* Back Button */}
            {viewMode !== 'ALL' && (
                <TouchableOpacity
                    onPress={handleZoomOut}
                    className="absolute bottom-10 right-6 bg-slate-800 p-4 rounded-full shadow-xl flex-row items-center space-x-2 active:scale-95"
                >
                    <LucideZoomOut size={22} color="white" />
                    <Text className="text-white font-bold text-sm ml-2">INDIETRO</Text>
                </TouchableOpacity>
            )}

            {/* Interaction Hint */}
            {viewMode === 'ALL' && (
                <View className="absolute bottom-4 left-0 right-0 items-center pointer-events-none">
                    <Text className="text-slate-400 text-xs text-center px-4 bg-white/50 py-1 rounded-full mx-auto">
                        Tocca una zona per esplorare
                    </Text>
                </View>
            )}
        </View>
    );
}
