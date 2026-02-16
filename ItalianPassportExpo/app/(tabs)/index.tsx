import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import ItalyMap from '@/src/components/Map/ItalyMap';
import { Stack } from 'expo-router';

export default function MapScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-2xl font-bold mb-4 text-center text-slate-800">
          Esplora l'Italia
        </Text>
        <Text className="text-slate-500 text-center mb-8">
          Tocca una regione per scoprire i luoghi da visitare
        </Text>
        <ItalyMap />
      </View>
    </SafeAreaView>
  );
}
