import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { fontFamily } from '../../constants/fonts';

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
    fontFamily,
  },
});

