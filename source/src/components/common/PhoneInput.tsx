import React from 'react';
import { Image, StyleSheet, View, TextInputProps } from 'react-native';
import { colorBackground, colorBorder, colorShadow, colorTextPlaceholder, colorTextPrimary } from '../../constants/colors';
import { TextInput } from './TextInput';

export interface PhoneInputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  value: string;
  onChangeText?: (formatted: string) => void;
}

export function PhoneInput({ value, onChangeText, placeholder = '+ 7 (999) 999-99-99', ...props }: PhoneInputProps) {
  const formatPhone = (text: string) => {
    const digits = text.replace(/\D/g, '');
    if (digits.length === 0) {
      return '';
    }
    let normalized = digits;

    if (normalized.startsWith('8')) {
      normalized = '7' + normalized.slice(1);
    }

    if (!normalized.startsWith('7')) {
      normalized = '7' + normalized;
    }

    const limited = normalized.slice(0, 11);
    const rest = limited.slice(1);

    let result = '+ 7';

    if (rest.length > 0) {
      result += ' (' + rest.slice(0, Math.min(rest.length, 3));
    }
    if (rest.length >= 3) {
      result += ')';
    }
    if (rest.length > 3) {
      result += ' ' + rest.slice(3, Math.min(rest.length, 6));
    }
    if (rest.length > 6) {
      result += '-' + rest.slice(6, Math.min(rest.length, 8));
    }
    if (rest.length > 8) {
      result += '-' + rest.slice(8, Math.min(rest.length, 10));
    }

    return result;
  };

  const handleChange = (text: string) => {
    const masked = formatPhone(text);
    if (onChangeText) {
      onChangeText(masked);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/phone_3x.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <TextInput
        style={[styles.input, { color: colorTextPrimary }]}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={colorTextPlaceholder}
        keyboardType="phone-pad"
        maxLength={20}
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

