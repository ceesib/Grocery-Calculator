import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 2000, // 2 seconds fade-in
      useNativeDriver: true, // Use native driver for performance
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.emoji, { opacity: fadeAnim }]}>🛍️🧮</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#145A32', // Darker green background
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 50,
    marginBottom: 20,
  },
});
