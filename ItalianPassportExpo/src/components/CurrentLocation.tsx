import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { MapPin } from 'lucide-react-native';

export default function CurrentLocation() {
    const [city, setCity] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permesso negato');
                    setLoading(false);
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                const [address] = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });

                if (address && address.city) {
                    setCity(address.city);
                } else if (address && address.subregion) {
                    setCity(address.subregion);
                } else {
                    setErrorMsg('Città sconosciuta');
                }
            } catch (error) {
                console.error("GPS Error Fetching City:", error);
                setErrorMsg('GPS non disponibile');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <View className="flex-row items-center justify-center space-x-2 py-2">
                <ActivityIndicator size="small" color="#94a3b8" />
                <Text className="text-slate-500 dark:text-slate-400 ml-2">Cercando posizione...</Text>
            </View>
        );
    }

    if (errorMsg || !city) {
        return (
            <View className="flex-row items-center justify-center space-x-2 py-2">
                <MapPin size={16} color="#94a3b8" />
                <Text className="text-slate-400 dark:text-slate-500 ml-1">Posizione sconosciuta</Text>
            </View>
        );
    }

    return (
        <View className="flex-row items-center justify-center space-x-2 py-2">
            <MapPin size={16} color="#38bdf8" />
            <Text className="text-slate-600 dark:text-slate-300 ml-1 font-medium text-base">
                In questo momento ti trovi a <Text className="font-bold text-slate-800 dark:text-white">{city}</Text>
            </Text>
        </View>
    );
}
