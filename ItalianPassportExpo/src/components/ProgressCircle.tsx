import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { usePassportStore } from '@/src/store/usePassportStore';
import { PLACES_DATA } from '@/src/data/places';
import { useColorScheme } from 'nativewind';

interface ProgressCircleProps {
    size?: number;
    strokeWidth?: number;
}

export default function ProgressCircle({ size = 48, strokeWidth = 5 }: ProgressCircleProps) {
    const scratchedPlaceIds = usePassportStore((state) => state.scratchedPlaceIds);
    // Number of total places (approx 160+)
    const totalPlaces = PLACES_DATA.places.length;
    
    // Safety check in case PLACES_DATA is somehow empty
    const validTotal = totalPlaces > 0 ? totalPlaces : 1; 
    const progress = Math.min(1, Math.max(0, scratchedPlaceIds.length / validTotal));
    const percent = Math.round(progress * 100);

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // The circle track colors (slate-200 for light, slate-700 for dark)
    const trackColor = isDark ? '#334155' : '#e2e8f0';
    // The active fill color (emerald-500)
    const fillColor = '#10b981';

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            {/* SVG implementation for a crisp, native-like circular progress bar */}
            <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
                {/* Background Track */}
                <Circle
                    stroke={trackColor}
                    fill="transparent"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* Progress Indicator */}
                <Circle
                    stroke={fillColor}
                    fill="transparent"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>
            
            {/* Percentage Text inside the circle */}
            <Text className="text-[11px] font-black text-slate-700 dark:text-white">
                {percent}%
            </Text>
        </View>
    );
}
