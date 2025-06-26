import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Cairo_400Regular,
  Cairo_600SemiBold,
  Cairo_700Bold
} from '@expo-google-fonts/cairo';
import * as SplashScreen from 'expo-splash-screen'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const [fontsLoaded, fontError] = useFonts({
    'Cairo-Regular': Cairo_400Regular,
    'Cairo-SemiBold': Cairo_600SemiBold,
    'Cairo-Bold': Cairo_700Bold,
  });

  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" backgroundColor="#0a0a0a" />
    </>
  );
}