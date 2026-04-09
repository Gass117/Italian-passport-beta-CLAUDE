import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ItalyMap from '@/src/components/Map/ItalyMap';
import { Stack } from 'expo-router';
import ThemeToggle from '@/src/components/ThemeToggle';
import CurrentLocation from '@/src/components/CurrentLocation';
import { TwinklingBackground, ShootingStarsOverlay } from '@/src/components/StarryBackground';
import { useColorScheme } from 'nativewind';
import { Info } from 'lucide-react-native';
import { useCopilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { usePassportStore } from '@/src/store/usePassportStore';

const WalkthroughableView = walkthroughable(View);

export default function MapScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { start } = useCopilot();

  useFocusEffect(
    useCallback(() => {
      const checkTutorialStatus = async () => {
        try {
          const hasSeenTutorial = await AsyncStorage.getItem('hasSeenTutorial_v5');
          if (hasSeenTutorial !== 'true') {
            start();
            await AsyncStorage.setItem('hasSeenTutorial_v5', 'true');
          }
        } catch (e) {
          console.error('Error reading tutorial status', e);
        }
      };

      checkTutorialStatus();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      {isDark && <TwinklingBackground />}
      
      {/* Header with Theme Toggle and Info button */}
      <View className="flex-row items-center justify-between px-6 mt-6 mb-2 z-10 relative">
        <View className="w-10" /> {/* Spacer to keep ThemeToggle centered */}
        
        <View className="relative">
          <CopilotStep text="Tocca qui per passare dalla modalità giorno alla notte. Ogni modalità prevede attività uniche." order={1} name="theme">
            <WalkthroughableView className="absolute inset-0 z-0 opacity-0 pointer-events-none" />
          </CopilotStep>
          <View className="z-10 bg-transparent">
            <ThemeToggle />
          </View>
        </View>

        <CopilotStep text="Puoi ritoccare qui in qualsiasi momento per rivedere questo tutorial." order={9} name="info">
          <WalkthroughableView>
            <TouchableOpacity 
              onPress={() => start()} 
              className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <Info size={20} color={isDark ? "white" : "#334155"} />
            </TouchableOpacity>
          </WalkthroughableView>
        </CopilotStep>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          
          {/* Ancoraggio Invisibile Centrale per la Spiegazione Badge */}
          <View className="absolute top-[40%] left-0 right-0 items-center pointer-events-none z-0">
            <CopilotStep text="Ogni regione ti permetterà di conquistare un Badge animato 3D! Troverai 5 diverse attività previste da completare per il giorno e altre 5 per la notte. Completale tutte per ottenere il premio speciale!" order={5} name="badge">
              <WalkthroughableView style={{ width: 1, height: 1, opacity: 0 }} />
            </CopilotStep>
          </View>

          <View className="w-full px-4 items-center mb-6 mt-2 z-10 relative">
            <View className="w-full">
              <CopilotStep text="Seleziona una regione sulla mappa per scoprire i luoghi da esplorare e le sfide disponibili." order={2} name="map">
                <WalkthroughableView>
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
                </WalkthroughableView>
              </CopilotStep>
            </View>

            <View className="w-full items-center">
              <CopilotStep text="Tocca qui per centrare la mappa o trovare le attività vicine a te." order={3} name="location">
                <WalkthroughableView>
                  <CurrentLocation />
                </WalkthroughableView>
              </CopilotStep>
            </View>
          </View>
      </ScrollView>
      {isDark && <ShootingStarsOverlay />}
    </SafeAreaView>
  );
}
