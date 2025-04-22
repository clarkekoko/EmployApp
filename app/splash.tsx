import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { Briefcase } from 'lucide-react-native';

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
    ]).start(() => {
      router.replace('/(auth)/login');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Briefcase size={64} color="#007AFF" />
        <Text style={styles.title}>Employ</Text>
        <Text style={styles.tagline}>Find Your Perfect Job Nearby</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    marginTop: 16,
    color: '#1a1a1a',
  },
  tagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginTop: 8,
    color: '#666',
  },
});