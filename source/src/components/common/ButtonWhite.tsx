import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colorPrimary } from '../../constants/colors';
import { Text } from './Text';

interface ButtonWhiteProps {
  text: string;
  onPress: () => void;
}

export function ButtonWhite({ text, onPress }: ButtonWhiteProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    height: 46,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorPrimary,
    textAlign: 'center',
  },
});

