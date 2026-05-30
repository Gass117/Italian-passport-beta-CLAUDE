import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ItalyMap from '@/src/components/Map/ItalyMap';
import { Stack, useRouter } from 'expo-router';
import ThemeToggle from '@/src/components/ThemeToggle';
import CurrentLocation from '@/src/components/CurrentLocation';
import { TwinklingBackground, ShootingStarsOverlay } from '@/src/components/StarryBackground';
import { useColorScheme } from 'nativewind';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { usePassportStore } from '@/src/store/usePassportStore';
import PointsBadge from '@/src/components/PointsBadge';
import { LucideShare2 } from 'lucide-react-native';

export default function MapScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const processDailyLogin = usePassportStore(state => state.processDailyLogin);
  const triggerSocialShare = usePassportStore(state => state.triggerSocialShare);
  const isGuest = usePassportStore(state => state.isGuest);
  const appOpenCount = usePassportStore(state => state.appOpenCount);
  const incrementAppOpen = usePassportStore(state => state.incrementAppOpen);
  const router = useRouter();

  useEffect(() => {
    processDailyLogin();
    incrementAppOpen();
    
    // Check if we should remind the guest to login (e.g. every 3 app opens)
    if (isGuest && (appOpenCount + 1) % 3 === 0) {
        setTimeout(() => {
            Alert.alert(
                "Salva i tuoi progressi! ☁️",
                "Stai esplorando come ospite. Registrati gratis per salvare i tuoi punti e trofei nel cloud e non perderli mai!",
                [
                    { text: "Non ora", style: "cancel" },
                    { text: "Registrati", style: "default", onPress: () => router.push('/(auth)/register' as any) }
                ]
            );
        }, 1500); // delay so it doesn't pop up instantly
    }
  }, []);

  const handleShare = async () => {
    try {
        const result = await Share.share({
            message: `Ehi! Sto esplorando l'Italia con Italian Passport! 🇮🇹✨ Unisciti a me e colleziona badge e trofei 3D!`,
        });
        if (result.action === Share.sharedAction) {
            triggerSocialShare();
        }
    } catch (error: any) {
        Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      {isDark && <TwinklingBackground />}
      
      {/* Header with Theme Toggle & Points */}
      <View className="flex-row items-center justify-center px-6 mt-6 mb-2 z-10 relative h-10">
        <View className="absolute left-6">
          <TouchableOpacity 
            onPress={handleShare}
            className="w-10 h-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 shadow-sm border border-blue-200 dark:border-blue-700/50"
          >
            <LucideShare2 size={18} color="#3b82f6" />
          </TouchableOpacity>
        </View>
        <View className="z-10 bg-transparent">
          <ThemeToggle />
        </View>
        <View className="absolute right-6">
          <PointsBadge />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          
          <View className="w-full px-4 items-center mb-6 mt-2 z-10 relative">
            <View className="w-full">
                  {/* Map Card */}
                  <View className="w-full bg-blue-50 dark:bg-slate-900 rounded-[40px] overflow-hidden pt-8 mb-4 shadow-sm shadow-slate-200 dark:shadow-slate-900 border border-slate-100 dark:border-slate-800 transition-colors duration-1000 relative">
                    
                    <View className="w-full items-center mb-2 mt-4">
                      <Text className="text-4xl font-extrabold mb-1 text-center text-slate-800 dark:text-white transition-colors duration-1000">
                        Esplora l'Italia
                      </Text>
                      <Text className="text-slate-500 dark:text-slate-400 text-center text-base px-6 mb-2 transition-colors duration-1000">
                        Tocca una regione per scoprire i luoghi da visitare
                      </Text>
                    </View>
                    <ItalyMap />
                  </View>
            </View>

            <View className="w-full items-center">
              <CurrentLocation />
            </View>
          </View>
      </ScrollView>
      {isDark && <ShootingStarsOverlay />}
    </SafeAreaView>
  );
}
