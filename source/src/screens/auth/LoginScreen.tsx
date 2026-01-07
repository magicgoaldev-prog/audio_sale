import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { colorPrimary, colorTextPrimary, colorTextSecondary, colorShadow, colorBackground, colorBorder } from '../../constants/colors';
import { Text } from '../../components/common/Text';
import { PhoneInput } from '../../components/common/PhoneInput';
import { ButtonRed } from '../../components/common/ButtonRed';
import { useI18n } from '../../i18n';

interface LoginScreenProps {
  onContinue?: (phoneNumber: string) => void;
  onRegisterPress?: () => void;
}

export function LoginScreen({ onContinue, onRegisterPress }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { t } = useI18n();

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
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
        <Text style={styles.subtitle}>{t('auth.subtitle')}</Text>
        
        {/* Card Container */}
        <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('auth.login')}</Text>
          <Pressable style={styles.registrationButton} onPress={onRegisterPress}>
            <Image
              source={require('../../assets/images/register_3x.png')}
              style={styles.registrationIcon}
              resizeMode="contain"
            />
            <Text style={styles.registrationText}>{t('auth.register')}</Text>
          </Pressable>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>{t('auth.phone')}</Text>
          <PhoneInput value={phoneNumber} onChangeText={handlePhoneChange} />
        </View>

        {/* Button */}
        <ButtonRed text={t('common.continue')} onPress={handleContinue} />
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
});


