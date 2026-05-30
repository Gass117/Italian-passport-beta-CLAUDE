import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import { LucideMail, LucideLock, LucideChevronLeft, LucideUserPlus, LucideUser, LucideCalendar } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { sendWelcomeEmail } from '@/src/lib/email';
import { usePassportStore } from '@/src/store/usePassportStore';

export default function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const validatePassword = (pwd: string) => {
        // Min 8 chars, 1 uppercase, 1 number
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pwd);
    };

    const handleRegister = async () => {
        if (!firstName || !lastName || !birthDate || !email || !password) {
            Alert.alert('Errore', 'Compila tutti i campi.');
            return;
        }

        if (!validatePassword(password)) {
            Alert.alert('Password Debole', 'La password deve avere minimo 8 caratteri, una lettera maiuscola e un numero.');
            return;
        }

        if (!privacyAccepted) {
            Alert.alert('Privacy', 'Devi accettare i Termini e Condizioni e la Privacy Policy.');
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    birth_date: birthDate
                }
            }
        });

        if (error) {
            Alert.alert('Errore di Registrazione', error.message);
        } else {
            // Trigger welcome email
            await sendWelcomeEmail(email, firstName);
            
            if (data.session?.user) {
                usePassportStore.getState().setUser({
                    id: data.session.user.id,
                    email: data.session.user.email,
                    firstName: data.session.user.user_metadata?.first_name || '',
                    lastName: data.session.user.user_metadata?.last_name || '',
                });
            }
            
            Alert.alert(
                'Benvenuto!', 
                'Registrazione completata con successo. Ti abbiamo inviato una mail di benvenuto!',
                [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
            );
        }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            className="flex-1 bg-slate-50 dark:bg-slate-900"
        >
            <Stack.Screen 
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    title: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white/50 dark:bg-black/50 rounded-full ml-4">
                            <LucideChevronLeft size={24} color={isDark ? '#fff' : '#000'} />
                        </TouchableOpacity>
                    )
                }} 
            />
            
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 100 }}>
                <View className="items-center mb-8">
                    <View className="bg-emerald-100 dark:bg-emerald-900/50 p-5 rounded-full mb-4 shadow-sm">
                        <LucideUserPlus size={48} color="#10b981" />
                    </View>
                    <Text className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Crea Account</Text>
                    <Text className="text-slate-500 dark:text-slate-400 text-center">
                        Inizia la tua avventura in Italia e salva i tuoi progressi nel cloud.
                    </Text>
                </View>

                <View className="space-y-4 mb-6">
                    <View className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-1 h-14">
                        <LucideUser size={20} color={isDark ? '#94a3b8' : '#64748b'} className="mr-3" />
                        <TextInput
                            className="flex-1 text-slate-800 dark:text-white text-base h-full"
                            placeholder="Nome"
                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>
                    
                    <View className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-1 h-14">
                        <LucideUser size={20} color={isDark ? '#94a3b8' : '#64748b'} className="mr-3" />
                        <TextInput
                            className="flex-1 text-slate-800 dark:text-white text-base h-full"
                            placeholder="Cognome"
                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-1 h-14">
                        <LucideCalendar size={20} color={isDark ? '#94a3b8' : '#64748b'} className="mr-3" />
                        <TextInput
                            className="flex-1 text-slate-800 dark:text-white text-base h-full"
                            placeholder="Data di Nascita (GG/MM/AAAA)"
                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            value={birthDate}
                            onChangeText={setBirthDate}
                        />
                    </View>

                    <View className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-1 h-14">
                        <LucideMail size={20} color={isDark ? '#94a3b8' : '#64748b'} className="mr-3" />
                        <TextInput
                            className="flex-1 text-slate-800 dark:text-white text-base h-full"
                            placeholder="Email"
                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-1 h-14">
                        <LucideLock size={20} color={isDark ? '#94a3b8' : '#64748b'} className="mr-3" />
                        <TextInput
                            className="flex-1 text-slate-800 dark:text-white text-base h-full"
                            placeholder="Password"
                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <Text className="text-xs text-slate-400 pl-2">Minimo 8 caratteri, inclusa una maiuscola e un numero.</Text>
                </View>

                <View className="flex-row items-center mb-8 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <Switch
                        value={privacyAccepted}
                        onValueChange={setPrivacyAccepted}
                        trackColor={{ false: '#cbd5e1', true: '#10b981' }}
                        thumbColor={Platform.OS === 'ios' ? '#ffffff' : (privacyAccepted ? '#059669' : '#f8fafc')}
                    />
                    <View className="flex-1 ml-3 flex-row flex-wrap">
                        <Text className="text-slate-600 dark:text-slate-300 text-sm">Ho letto e accetto la </Text>
                        <TouchableOpacity onPress={() => router.push('/privacy-policy' as any)}>
                            <Text className="text-blue-600 dark:text-blue-400 font-bold text-sm">Privacy Policy</Text>
                        </TouchableOpacity>
                        <Text className="text-slate-600 dark:text-slate-300 text-sm"> e i Termini.</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    className={`w-full rounded-xl py-4 items-center shadow-sm ${!privacyAccepted ? 'bg-slate-300 dark:bg-slate-700' : 'bg-emerald-600'}`}
                    onPress={handleRegister}
                    disabled={loading || !privacyAccepted}
                >
                    <Text className="text-white font-bold text-lg">{loading ? 'Creazione in corso...' : 'Registrati'}</Text>
                </TouchableOpacity>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-slate-500 dark:text-slate-400">Hai già un account? </Text>
                    <TouchableOpacity onPress={() => router.replace('/(auth)/login' as any)}>
                        <Text className="text-blue-600 dark:text-blue-400 font-bold">Accedi</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
