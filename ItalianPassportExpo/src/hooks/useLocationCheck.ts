import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { getDistance } from 'geolib'; // Need to install or implement haversine
import { Platform } from 'react-native';

// Simple Haversine implementation if we don't want another dependency
const getDist = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
}

export function useLocationCheck(targetLat: number, targetLon: number) {
    const [distance, setDistance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

    const checkDistance = async () => {
        setLoading(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);

            const dist = getDist(
                location.coords.latitude,
                location.coords.longitude,
                targetLat,
                targetLon
            );

            setDistance(dist);
        } catch (e) {
            setErrorMsg('Error getting location');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkDistance();
    }, [targetLat, targetLon]);

    return { distance, loading, errorMsg, userLocation, refresh: checkDistance };
}
