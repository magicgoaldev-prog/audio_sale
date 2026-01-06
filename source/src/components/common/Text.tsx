import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

export function Text({ style, ...props }: TextProps) {
  return (
    <RNText
      style={[styles.default, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    // Using system default font
  },
});

