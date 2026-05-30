import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import { LucideMail, LucideLock, LucideChevronLeft, LucideUser } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { usePassportStore } from '@/src/store/usePassportStore';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Errore', 'Inserisci email e password.');
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert('Errore di Accesso', error.message);
        } else {
            if (data.session?.user) {
                usePassportStore.getState().setUser({
                    id: data.session.user.id,
                    email: data.session.user.email,
                    firstName: data.session.user.user_metadata?.first_name || '',
                    lastName: data.session.user.user_metadata?.last_name || '',
                });
                // Load progress from cloud to overwrite local state with saved state
                await usePassportStore.getState().loadProgressFromCloud();
            }
            router.replace('/(tabs)');
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
            
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
                <View className="items-center mb-10">
                    <View className="bg-blue-100 dark:bg-blue-900/50 p-6 rounded-full mb-6 shadow-sm">
                        <LucideUser size={64} color="#3b82f6" />
                    </View>
                    <Text className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Bentornato!</Text>
                    <Text className="text-slate-500 dark:text-slate-400 text-center">
                        Accedi per sincronizzare i tuoi progressi e continuare l'avventura.
                    </Text>
                </View>

                <View className="space-y-4 mb-8">
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
                </View>

                <TouchableOpacity 
                    className="w-full bg-blue-600 rounded-xl py-4 items-center shadow-sm"
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text className="text-white font-bold text-lg">{loading ? 'Accesso in corso...' : 'Accedi'}</Text>
                </TouchableOpacity>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-slate-500 dark:text-slate-400">Non hai un account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
                        <Text className="text-blue-600 dark:text-blue-400 font-bold">Registrati</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
