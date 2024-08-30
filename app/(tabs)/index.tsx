import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated';

export default function HomeScreen() {
  const titlePositionY = useSharedValue(-50); 
  const titleOpacity = useSharedValue(0); 
  const bgColor = useSharedValue(0); 
  const titleOpacityOnPress = useSharedValue(1); 

  useEffect(() => {
    titlePositionY.value = withSpring(0, { damping: 10 });
    titleOpacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titlePositionY.value }],
      opacity: titleOpacity.value,
    };
  });

  const bgAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(bgColor.value, [0, 1], ['pink', 'red']),
    };
  });

  const handlePress = () => {
    // cambiar color de fondo y desvanecer titulo
    bgColor.value = withTiming(bgColor.value === 0 ? 1 : 0, { duration: 1000 });
    titleOpacityOnPress.value = withTiming(0, { duration: 1000 });
  };

  const titleFadeOutStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacityOnPress.value,
    };
  });

  return (
    <Animated.View style={[styles.container, bgAnimatedStyle]}>
      {/* Título */}
      <Animated.Text style={[styles.title, titleAnimatedStyle, titleFadeOutStyle]}>
        ¡Hola, Mundo!
      </Animated.Text>

      {/* Botón */}
      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.btnText}>Iniciar</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  btnText: {
    color: 'pink',
    fontSize: 18,
  },
});
