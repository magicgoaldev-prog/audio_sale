import React from 'react';
import { TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native';
import { fontFamily } from '../../constants/fonts';

export function TextInput({ style, ...props }: TextInputProps) {
  return (
    <RNTextInput
      style={[styles.default, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily,
  },
});

