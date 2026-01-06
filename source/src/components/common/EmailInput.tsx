import React from 'react';
import { Image, StyleSheet, View, TextInputProps } from 'react-native';
import { colorBackground, colorBorder, colorShadow, colorTextPlaceholder, colorTextPrimary } from '../../constants/colors';
import { TextInput } from './TextInput';

export interface EmailInputProps extends Omit<TextInputProps, 'onChangeText'> {
  onChangeText?: (value: string) => void;
}

export function EmailInput({ style, onChangeText, placeholder = 'Введите почту', ...props }: EmailInputProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/mail_3x.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <TextInput
        style={[styles.input, style, { color: colorTextPrimary }]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colorTextPlaceholder}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
    width: '100%',
    height: 54,
    backgroundColor: colorBackground,
    borderWidth: 1,
    borderColor: colorBorder,
    borderRadius: 13,
    shadowColor: colorShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: 14,
    height: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorTextPrimary,
    padding: 0,
    margin: 0,
  },
});

