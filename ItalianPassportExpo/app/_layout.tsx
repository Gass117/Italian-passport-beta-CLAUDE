import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import 'react-native-reanimated';
import { View } from 'react-native';

import '../global.css';
import { usePassportStore } from '@/src/store/usePassportStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const theme = usePassportStore((state) => state.theme);
  const navTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <View className={theme} style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={navTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </View>
  );
}
