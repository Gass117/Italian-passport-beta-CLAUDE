import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItalyMap from '@/src/components/Map/ItalyMap';
import { Stack } from 'expo-router';

export default function MapScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900" edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-2xl font-bold mb-4 text-center text-slate-800 dark:text-white">
          Esplora l'Italia
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 text-center mb-8">
          Tocca una regione per scoprire i luoghi da visitare
        </Text>
        <ItalyMap />
      </View>
    </SafeAreaView>
  );
}
