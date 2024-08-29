import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'), 
  });

  const splashOpacity = useSharedValue(1);

  useEffect(() => {
    if (loaded) {
      splashOpacity.value = withTiming(0, { duration: 1000 }, () => {
        SplashScreen.hideAsync();
      });
    }
  }, [loaded]);

  const splashAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: splashOpacity.value,
    };
  });

  if (!loaded) {
    return (
      <Animated.View style={[styles.splashContainer, splashAnimatedStyle]}>
        <Text style={styles.splashText}>Cargando...</Text>
      </Animated.View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F0F0F0',
    text: '#333',
    primary: '#1A73E8',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#181818',
    text: '#FFF',
    primary: '#BB86FC',
  },
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A73E8', // Fondo personalizado para el Splash
  },
  splashText: {
    fontSize: 24,
    color: '#FFF',
    fontFamily: 'Poppins',
  },
});
