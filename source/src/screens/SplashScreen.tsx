import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';

export function SplashScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={[styles.logo, { top: insets.top + 38 }]}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/load.png')}
        style={styles.loadImage}
        resizeMode="contain"
      />
      <Text
        style={[styles.subtitle, { bottom: insets.bottom + 24 }]}
      >
        Психология{'\n'}Нового Времени
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CC0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 123,
    height: 30,
    position: 'absolute',
  },
  loadImage: {
    width: 148,
    height: 148,
  },
  subtitle: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    letterSpacing: -0.41,
    lineHeight: 28.8,
    color: '#F5E6E6',
    textAlign: 'center',
  },
});


