import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'nativewind';
import { LucideMap, LucideLayoutGrid, LucideSettings } from 'lucide-react-native';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#22c55e', // Green
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#94a3b8' : '#64748b',
        animation: 'shift', // Shift creates a smooth horizontal slide/fade hybrid natively on tabs
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#ffffff',
          borderTopColor: colorScheme === 'dark' ? '#1e293b' : '#e2e8f0'
        },
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
