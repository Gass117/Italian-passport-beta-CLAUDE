import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LucideChevronLeft, LucideShieldCheck } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function PrivacyPolicyScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <Stack.Screen 
                options={{
                    headerShown: true,
                    headerTransparent: false,
                    title: 'Privacy Policy',
                    headerStyle: {
                        backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    },
                    headerTintColor: isDark ? '#ffffff' : '#000000',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} className="mr-4">
                            <LucideChevronLeft size={28} color={isDark ? '#fff' : '#000'} />
                        </TouchableOpacity>
                    )
                }} 
            />
            
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
                <View className="items-center mb-8">
                    <LucideShieldCheck size={48} color="#3b82f6" className="mb-4" />
                    <Text className="text-2xl font-bold text-slate-800 dark:text-white text-center">Informativa sulla Privacy e Termini di Servizio</Text>
                </View>

                <Text className="text-slate-700 dark:text-slate-300 mb-4 text-base leading-6">
                    Ultimo aggiornamento: Oggi
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-white mt-4 mb-2">1. Raccolta dei Dati</Text>
                <Text className="text-slate-700 dark:text-slate-300 mb-4 text-base leading-6">
                    Raccogliamo i dati inseriti durante la registrazione (nome, cognome, data di nascita, email) al fine di creare il tuo profilo utente e permetterti di salvare i progressi (punti, trofei, badge sbloccati) nel cloud, assicurandoci che tu possa recuperarli su qualsiasi dispositivo.
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-white mt-4 mb-2">2. Utilizzo dei Dati e Sicurezza</Text>
                <Text className="text-slate-700 dark:text-slate-300 mb-4 text-base leading-6">
                    I tuoi dati sono protetti tramite crittografia di livello industriale (fornita dal nostro partner Supabase). Non venderemo o condivideremo mai i tuoi dati personali con terze parti per scopi di marketing. L'email fornita verrà utilizzata unicamente per comunicazioni di servizio (es. email di benvenuto o recupero password).
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-white mt-4 mb-2">3. I tuoi Diritti (GDPR)</Text>
                <Text className="text-slate-700 dark:text-slate-300 mb-4 text-base leading-6">
                    Hai il diritto di accedere, modificare o richiedere la cancellazione permanente di tutti i tuoi dati e dei progressi associati al tuo account in qualsiasi momento direttamente dalle impostazioni dell'App o contattando il nostro supporto.
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-white mt-4 mb-2">4. Termini di Servizio</Text>
                <Text className="text-slate-700 dark:text-slate-300 mb-4 text-base leading-6">
                    L'utilizzo dell'app è destinato a scopi di intrattenimento personale. L'utente si impegna a non utilizzare la piattaforma in modo illecito o fraudolento. Ci riserviamo il diritto di sospendere account che violino queste norme.
                </Text>

                <TouchableOpacity 
                    className="w-full bg-blue-600 rounded-xl py-4 items-center shadow-sm mt-8"
                    onPress={() => router.back()}
                >
                    <Text className="text-white font-bold text-lg">Ho capito</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
