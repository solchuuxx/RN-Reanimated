import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSequence, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';

export default function HomeScreen() {
  const imageOpacity = useSharedValue(1); // opacidad inicial de la Imagen
  const contentOpacity = useSharedValue(0); // Opacidad inicial del contenido principal
  const imageVisibility = useSharedValue(true); // Visibilidad de la imagen
  const buttonScale = useSharedValue(1); // sscala inicial del boton
  const buttonRotation = useSharedValue(0); // Rotación inicial del boton
  const containerScale = useSharedValue(0.8); // Escala inicial del contenedor

  useEffect(() => {
    setTimeout(() => {
      imageOpacity.value = withTiming(0, {
        duration: 1000,
      }, () => {
        imageVisibility.value = false; 
      });
      contentOpacity.value = withTiming(1, {
        duration: 1000,
      }); 
      containerScale.value = withSpring(1, { damping: 10 }); 
    }, 2000); 
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
      display: imageVisibility.value ? 'flex' : 'none', 
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: buttonScale.value },
        { rotateZ: `${buttonRotation.value}deg` },
      ],
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: containerScale.value }],
    };
  });

  const handleButtonPress = () => {
    buttonScale.value = withSequence(
      withSpring(1.2, { damping: 5 }), 
      withSpring(1) 
    );
    buttonRotation.value = withTiming(buttonRotation.value + 360, {
      duration: 1000,
    }); // Gira el botón 360 grados
  };

  return (
    <View style={styles.container}>
      {/* Imagen de introducción */}
      <Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
        <Image 
          source={{ uri: 'https://th.bing.com/th/id/R.92595f73451407a8c2aaa6833332abc2?rik=oJyfpAmHso34gA&pid=ImgRaw&r=0' }} 
          style={styles.image}
        />
      </Animated.View>

      {/* Contenido principal */}
      <Animated.View style={[styles.contentContainer, contentAnimatedStyle]}>
        <Text style={styles.title}>¡Hola, Mundo!</Text>
        <Text style={styles.subtitle}>
          ¡Prueba la animación vibrante tocando el botón a continuación!
        </Text>
        
        <Pressable onPress={handleButtonPress} style={styles.btn}>
          <Animated.View style={buttonAnimatedStyle}>
            <Text style={styles.btnText}>Comenzar</Text>
          </Animated.View>
        </Pressable>

        <Animated.View style={[styles.infoBox, containerAnimatedStyle]}>
          <Text style={styles.infoText}>
            React Native Reanimated es una biblioteca poderosa para manejar animaciones fluidas y complejas en React Native. Ofrece una API declarativa que permite crear animaciones basadas en valores compartidos, interpolaciones, secuencias y mucho más.
          </Text>
        </Animated.View>
        
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 300,
  },
  infoText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    color: '#1A1A1A',
    fontSize: 36,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
    width: 320,
    textAlign: 'center',
    marginTop: 16,
  },
  btn: {
    marginTop: 20,
  },
  btnText: {
    backgroundColor: '#1A1A1A',
    color: 'pink',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    width: 140,
  },
});
