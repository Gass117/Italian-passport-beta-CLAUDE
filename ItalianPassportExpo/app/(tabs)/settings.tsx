import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { usePassportStore } from '@/src/store/usePassportStore';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
    const router = useRouter();
    const gpsThreshold = usePassportStore((state) => state.gpsThreshold);
    const setGpsThreshold = usePassportStore((state) => state.setGpsThreshold);
    const resetProgress = usePassportStore((state) => state.resetProgress);

    const [thresholdInput, setThresholdInput] = useState(gpsThreshold.toString());

    const handleSave = () => {
        const val = parseInt(thresholdInput, 10);
        if (!isNaN(val) && val > 0) {
            setGpsThreshold(val);
            Alert.alert("Successo", "Soglia GPS aggiornata");
        } else {
            Alert.alert("Errore", "Inserisci un numero valido");
        }
    };

    const handleReset = () => {
        Alert.alert(
            "Attenzione",
            "Sei sicuro di voler cancellare tutti i progressi?",
            [
                { text: "Annulla", style: "cancel" },
                {
                    text: "Cancella tutto",
                    style: "destructive",
                    onPress: () => {
                        resetProgress();
                        Alert.alert("Resettato", "I progressi sono stati cancellati.");
                    }
                }
            ]
        );
    };

    return (
        <View className="flex-1 bg-white pt-12 px-6">
            <Text className="text-3xl font-bold text-slate-800 mb-8">Impostazioni</Text>

            <View className="mb-8">
                <Text className="text-lg font-semibold text-slate-700 mb-2">Soglia GPS (metri)</Text>
                <Text className="text-slate-500 mb-4">
                    Distanza massima per sbloccare un luogo. Aumenta questo valore se hai difficoltà col GPS o per testare da casa (cheat!).
                </Text>

                <View className="flex-row gap-4">
                    <TextInput
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-3 text-lg"
                        keyboardType="numeric"
                        value={thresholdInput}
                        onChangeText={setThresholdInput}
                    />
                    <TouchableOpacity
                        className="bg-green-600 justify-center px-6 rounded-lg"
                        onPress={handleSave}
                    >
                        <Text className="text-white font-bold">Salva</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="border-t border-slate-200 pt-8 mt-auto mb-12">
                <Text className="text-lg font-semibold text-red-600 mb-4">Zona Pericolo</Text>
                <TouchableOpacity
                    className="bg-red-50 border border-red-200 p-4 rounded-lg items-center"
                    onPress={handleReset}
                >
                    <Text className="text-red-600 font-bold">Reset Progressi</Text>
                </TouchableOpacity>
            </View>

            <Text className="text-center text-slate-400 mb-4">
                Italia Passport Expo v1.0.0
            </Text>
        </View>
    );
}
