import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'nativewind';
import { LucideMap, LucideLayoutGrid, LucideSettings, LucideSearch, LucideStar } from 'lucide-react-native';
import { usePassportStore } from '@/src/store/usePassportStore';

export default function TabLayout() {
  const hasCompletedOnboarding = usePassportStore((state) => state.hasCompletedOnboarding);
  const { colorScheme } = useColorScheme();

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding/welcome" />;
  }

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
          href: null, // Hide from bottom navigation bar
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Cerca',
          tabBarIcon: ({ color }) => <LucideSearch color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Preferiti',
          tabBarIcon: ({ color }) => <LucideStar color={color} />,
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
