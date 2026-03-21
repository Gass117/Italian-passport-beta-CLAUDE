import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ItalyMap from '@/src/components/Map/ItalyMap';
import { Stack } from 'expo-router';
import ThemeToggle from '@/src/components/ThemeToggle';
import CurrentLocation from '@/src/components/CurrentLocation';

export default function MapScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900" edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <View className="w-full justify-center items-center px-6 mt-6 mb-2 z-10 relative">
            <ThemeToggle />
          </View>

          <View className="w-full px-4 items-center mb-6">
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

            {/* GPS Location Display */}
            <CurrentLocation />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
