import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LucideMap, LucideLayoutGrid, LucideSettings } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#22c55e', // Green
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mappa',
          tabBarIcon: ({ color }) => <LucideMap color={color} />,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'Collezione',
          tabBarIcon: ({ color }) => <LucideLayoutGrid color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Impostazioni',
          tabBarIcon: ({ color }) => <LucideSettings color={color} />,
        }}
      />
    </Tabs>
  );
}
