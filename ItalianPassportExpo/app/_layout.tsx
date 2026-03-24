import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import 'react-native-reanimated';
import { View, LayoutAnimation } from 'react-native';

import '../global.css';
import { usePassportStore } from '@/src/store/usePassportStore';
import { useColorScheme } from 'nativewind';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const theme = usePassportStore((state) => state.theme);
  const { colorScheme, setColorScheme } = useColorScheme();
  
  // Sync NativeWind with Zustand store on app start
  useEffect(() => {
    if (colorScheme !== theme) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setColorScheme(theme);
    }
  }, [theme]);

  const navTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <View className={theme} style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={navTheme}>
          <Stack screenOptions={{ animation: 'slide_from_right' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', animation: 'slide_from_bottom' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </View>
  );
}
