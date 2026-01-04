import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>AudioSale</Text>
      <Text style={styles.subtitle}>Loading...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#0B1220',
  },
  brand: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#A7B0C0',
  },
});


