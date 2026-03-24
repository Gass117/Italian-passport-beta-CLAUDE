import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { usePassportStore } from '@/src/store/usePassportStore';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function SettingsScreen() {
    const router = useRouter();
    const { colorScheme, setColorScheme } = useColorScheme();
    const gpsThreshold = usePassportStore((state) => state.gpsThreshold);
    const setGpsThreshold = usePassportStore((state) => state.setGpsThreshold);
    const resetProgress = usePassportStore((state) => state.resetProgress);
    const resetOnboarding = usePassportStore((state) => state.resetOnboarding);

    const [thresholdInput, setThresholdInput] = useState(gpsThreshold.toString());

    const handleSave = () => {
        // Clean input: remove dots/commas if used as thousands separators (simple approach) or just keep digits
        // Allow pure numbers. If user types "1.000", convert to 1000.
        const cleanInput = thresholdInput.replace(/[^0-9]/g, '');
        const val = parseInt(cleanInput, 10);

        if (!isNaN(val) && val > 0) {
            setGpsThreshold(val);
            Keyboard.dismiss();
            Alert.alert("Successo", `Soglia GPS aggiornata a ${val} metri`);
        } else {
            Alert.alert("Errore", "Inserisci un numero valido (es. 500)");
        }
    };

    const handleReset = () => {
        Alert.alert(
            "Attenzione",
            "Sei sicuro di voler cancellare tutti i progressi e i badge ottenuti?",
            [
                { text: "Annulla", style: "cancel" },
                {
                    text: "Cancella tutto",
                    style: "destructive",
                    onPress: () => {
                        resetProgress();
                        Alert.alert("Resettato", "La mappa e le attività sono state ripristinate.");
                    }
                }
            ]
        );
    };

    const handleResetTips = () => {
        Alert.alert(
            "Azzera Attività",
            "Vuoi rimuovere le spunte da tutte le attività completate?",
            [
                { text: "Annulla", style: "cancel" },
                {
                    text: "Conferma",
                    style: "destructive",
                    onPress: () => {
                        usePassportStore.setState({ completedTips: {} });
                        Alert.alert("Fatto", "Tutte le attività sono state ripristinate.");
                    }
                }
            ]
        );
    };

    const handleResetOnboarding = () => {
        Alert.alert(
            "Sviluppatore",
            "Vuoi riavviare l'Onboarding iniziale rimuovendo le regioni gratuite scelte?",
            [
                { text: "Annulla", style: "cancel" },
                {
                    text: "Riavvia Onboarding",
                    style: "destructive",
                    onPress: () => {
                        resetOnboarding();
                        // Forza il refresh ricaricando l'app o facendola triggerare dal layout root
                        router.replace('/');
                    }
                }
            ]
        );
    };

    // Helper to go back to map directly
    const goBackToMap = () => {
        // We use navigate('/') to go back to the first tab (Map) reliably.
        // dimiss() fails if we are already at the root of the tab stack.
        router.navigate('/');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-white dark:bg-slate-900 pt-12 px-6">
                <View className="flex-row justify-between items-center mb-8">
                    <Text className="text-3xl font-bold text-slate-800 dark:text-white">Impostazioni</Text>
                    {/* Add a close/home button for easy navigation */}
                    <TouchableOpacity onPress={goBackToMap} className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        <Text className="text-slate-600 dark:text-slate-300 font-medium px-2">Chiudi</Text>
                    </TouchableOpacity>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-semibold text-slate-700 dark:text-white mb-2">Orario e Tema</Text>
                    <View className="flex-row bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                        <TouchableOpacity
                            className={`flex-1 items-center py-2 rounded-md ${colorScheme === 'light' ? 'bg-white dark:bg-slate-700' : ''}`}
                            style={colorScheme === 'light' ? { elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } } : undefined}
                            onPress={() => setColorScheme('light')}
                        >
                            <Text className={`font-medium ${colorScheme === 'light' ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Giorno</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 items-center py-2 rounded-md ${colorScheme === 'dark' ? 'bg-white dark:bg-slate-700' : ''}`}
                            style={colorScheme === 'dark' ? { elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } } : undefined}
                            onPress={() => setColorScheme('dark')}
                        >
                            <Text className={`font-medium ${colorScheme === 'dark' ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Notte</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-semibold text-slate-700 dark:text-white mb-2">Soglia GPS (metri)</Text>
                    <Text className="text-slate-500 dark:text-slate-400 mb-4">
                        Distanza massima per sbloccare un luogo. Aumenta questo valore se hai difficoltà col GPS o per testare da casa (es. 500000 per 500km).
                    </Text>

                    <View className="flex-row gap-4">
                        <TextInput
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-lg dark:text-white"
                            keyboardType="numeric"
                            value={thresholdInput}
                            onChangeText={setThresholdInput}
                            placeholder="Es. 200"
                            placeholderTextColor="#94a3b8"
                        />
                        <TouchableOpacity
                            className="bg-green-600 justify-center px-6 rounded-lg"
                            onPress={handleSave}
                        >
                            <Text className="text-white font-bold">Salva</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-auto mb-12">
                    <Text className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">Gestione Dati</Text>
                    
                    <TouchableOpacity
                        className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 p-4 rounded-lg items-center mb-3"
                        onPress={handleResetOnboarding}
                    >
                        <Text className="text-purple-600 dark:text-purple-400 font-bold">Riavvia Onboarding (Test)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 p-4 rounded-lg items-center mb-3"
                        onPress={handleResetTips}
                    >
                        <Text className="text-orange-600 dark:text-orange-500 font-bold">Azzera solo Completamento Attività</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 p-4 rounded-lg items-center"
                        onPress={handleReset}
                    >
                        <Text className="text-red-600 dark:text-red-500 font-bold">Reset Completo App (Badge Inclusi)</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-center text-slate-400 dark:text-slate-600 mb-4">
                    Italia Passport Expo v1.0.0
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}
