import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { colorPrimary, colorTextPrimary, colorTextSecondary, colorTextPlaceholder, colorShadow, colorBackground, colorBorder } from '../../constants/colors';
import { Text } from '../../components/common/Text';
import { TextInput } from '../../components/common/TextInput';

interface LoginScreenProps {
  onContinue?: (phoneNumber: string) => void;
}

export function LoginScreen({ onContinue }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (text: string) => {
    // Allow only numbers and phone format characters
    const cleaned = text.replace(/[^\d+()\s-]/g, '');
    setPhoneNumber(cleaned);
  };

  const handleContinue = () => {
    if (onContinue && phoneNumber.trim()) {
      onContinue(phoneNumber);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/logo_red.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Зарегистрируйтесь{'\n'}или войдите в аккаунт
        </Text>
        
        {/* Card Container */}
        <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Вход</Text>
          <Pressable style={styles.registrationButton}>
            <Image
              source={require('../../assets/images/register_3x.png')}
              style={styles.registrationIcon}
              resizeMode="contain"
            />
            <Text style={styles.registrationText}>Регистрация</Text>
          </Pressable>
        </View>

        {/* Form Field */}
        <View style={styles.formField}>
          <Text style={styles.label}>Номер телефона</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/images/phone_3x.png')}
              style={styles.phoneIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[styles.input, { color: colorTextPrimary }]}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              placeholder="+ 7 (999) 999-99-99"
              placeholderTextColor={colorTextPlaceholder}
              keyboardType="phone-pad"
              maxLength={20}
              // selectionColor={colorTextPrimary}
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Button */}
        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Продолжить</Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    gap: 24,
    marginTop: -60,
  },
  logo: {
    width: 115,
    height: 41,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28.8,
    letterSpacing: -0.41,
    color: '#F5E6E6',
    textAlign: 'center',
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: colorBackground,
    borderRadius: 30,
    padding: 30,
    gap: 20,
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 36,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: -0.408,
    color: colorTextPrimary,
  },
  registrationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 5,
    height: 37,
    backgroundColor: colorBackground,
    borderWidth: 1,
    borderColor: colorBorder,
    borderRadius: 10,
    shadowColor: colorShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  registrationIcon: {
    width: 13.87,
    height: 16.2,
  },
  registrationText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -0.408,
    color: colorTextPrimary,
  },
  formField: {
    width: '100%',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorTextSecondary,
    textAlign: 'left',
  },
  inputContainer: {
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
  phoneIcon: {
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
  button: {
    width: '100%',
    height: 46,
    backgroundColor: colorPrimary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});


