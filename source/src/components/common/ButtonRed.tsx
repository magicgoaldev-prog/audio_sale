import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colorPrimary } from '../../constants/colors';
import { Text } from './Text';

interface ButtonRedProps {
  text: string;
  onPress: () => void;
}

export function ButtonRed({ text, onPress }: ButtonRedProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    width: '100%',
    height: 46,
    backgroundColor: colorPrimary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

