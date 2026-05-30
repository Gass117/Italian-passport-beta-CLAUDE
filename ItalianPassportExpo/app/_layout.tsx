import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, LayoutAnimation } from 'react-native';

import '../global.css';
import { usePassportStore } from '@/src/store/usePassportStore';
import { useColorScheme } from 'nativewind';
import { supabase } from '@/src/lib/supabase';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const theme = usePassportStore((state) => state.theme);
  const hasHydrated = usePassportStore((state) => state.hasHydrated);
  const { colorScheme, setColorScheme } = useColorScheme();
  
  // Sync NativeWind with Zustand store on app start
  useEffect(() => {
    if (colorScheme !== theme) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setColorScheme(theme);
    }
  }, [theme]);

  // Sync Supabase Auth state with Zustand AFTER hydration completes
  useEffect(() => {
    if (!hasHydrated) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        usePassportStore.getState().setUser({
          id: session.user.id,
          email: session.user.email,
          firstName: session.user.user_metadata?.first_name || '',
          lastName: session.user.user_metadata?.last_name || '',
        });
      } else {
        usePassportStore.getState().setUser(null);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        usePassportStore.getState().setUser({
          id: session.user.id,
          email: session.user.email,
          firstName: session.user.user_metadata?.first_name || '',
          lastName: session.user.user_metadata?.last_name || '',
        });
      } else {
        usePassportStore.getState().setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [hasHydrated]);

  // Debounced Cloud Sync listener
  useEffect(() => {
      if (!hasHydrated) return;

      let timeoutId: NodeJS.Timeout;

      const unsubscribe = usePassportStore.subscribe((state, prevState) => {
          // Check if user is logged in and if any syncable progress changed
          if (
              state.user &&
              (state.visitedPlaceIds !== prevState.visitedPlaceIds ||
              state.scratchedPlaceIds !== prevState.scratchedPlaceIds ||
              state.totalPoints !== prevState.totalPoints ||
              state.favoritePlaceIds !== prevState.favoritePlaceIds ||
              state.unlockedTrophies !== prevState.unlockedTrophies ||
              state.completedTips !== prevState.completedTips)
          ) {
              clearTimeout(timeoutId);
              timeoutId = setTimeout(() => {
                  usePassportStore.getState().syncProgressToCloud();
              }, 3000); // 3 seconds debounce
          }
      });

      return () => {
          unsubscribe();
          clearTimeout(timeoutId);
      };
  }, [hasHydrated]);

  if (!hasHydrated) {
    return null; // Prevents UI glitches and incorrect redirects while loading storage
  }

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
