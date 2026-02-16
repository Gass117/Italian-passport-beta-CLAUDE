import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { REGION_PATHS } from './RegionPaths';
import { PLACES_DATA } from '@/src/data/places';
import { useRouter } from 'expo-router';

interface ItalyMapProps {
    onRegionPress?: (regionId: string) => void;
}

export default function ItalyMap({ onRegionPress }: ItalyMapProps) {
    const router = useRouter();

    const handlePress = (regionId: string) => {
        if (onRegionPress) {
            onRegionPress(regionId);
        } else {
            router.push(`/region/${regionId}`);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-blue-50">
            <View className="w-full aspect-[3/4] max-w-md">
                <Svg viewBox="0 0 1 1" className="w-full h-full">
                    {Object.entries(REGION_PATHS).map(([id, pathData]) => {
                        const region = PLACES_DATA.regions.find((r) => r.id === id);
                        const color = region ? region.themeColorHex : "#ccc";

                        return (
                            <G key={id} onPress={() => handlePress(id)}>
                                <Path
                                    d={pathData}
                                    fill={color}
                                    stroke="white"
                                    strokeWidth="0.005"
                                />
                            </G>
                        );
                    })}
                </Svg>
            </View>
        </View>
    );
}
