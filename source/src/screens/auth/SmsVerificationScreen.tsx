import React, { useState, useRef, useEffect } from 'react';
import { Image, Pressable, StyleSheet, View, TextInput } from 'react-native';
import { colorPrimary, colorTextPrimary, colorTextSecondary, colorShadow, colorBackground, colorBorder } from '../../constants/colors';
import { Text } from '../../components/common/Text';
import { useI18n } from '../../i18n';

interface SmsVerificationScreenProps {
  phoneNumber?: string;
  origin?: 'login' | 'register';
  onBack?: () => void;
  onConfirm?: () => void;
}

export function SmsVerificationScreen({
  phoneNumber = '+7 (999) 999-99-99',
  origin = 'login',
  onBack,
  onConfirm,
}: SmsVerificationScreenProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(45);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { t, language } = useI18n();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (text: string, index: number) => {
    const numeric = text.replace(/[^0-9]/g, '');
    const nextCode = [...code];

    if (!numeric) {
      nextCode[index] = '';
    } else {
      let cursor = index;
      for (let i = 0; i < numeric.length && cursor < 4; i += 1) {
        nextCode[cursor] = numeric[i];
        cursor += 1;
      }
    }

    setCode(nextCode);

    if (numeric) {
      const firstEmptyAfter = nextCode.findIndex((v, idx) => v === '' && idx > index);
      if (firstEmptyAfter !== -1) {
        inputRefs.current[firstEmptyAfter]?.focus();
      } else if (nextCode.every((v) => v !== '')) {
        handleConfirm();
      } else {
        const nextSlot = Math.min(index + numeric.length, 3);
        if (nextCode[nextSlot] === '') {
          inputRefs.current[nextSlot]?.focus();
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(45);
      // Resend SMS logic here
    }
  };

  const handleConfirm = () => {
    const fullCode = code.join('');
    if (fullCode.length === 4 && onConfirm) {
      onConfirm();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo_red.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{t('sms.title')}</Text>

        {/* Card */}
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {origin === 'register' ? t('auth.register') : t('auth.login')}
            </Text>
          </View>

          {/* Phone number text */}
          <Text style={styles.phoneText}>
            {t('sms.sent')} {'\n'}
            <Text style={styles.phoneHighlight}>{phoneNumber}</Text>
          </Text>

          {/* Code input section */}
          <View style={styles.codeSection}>
            <View style={styles.codeInputContainer}>
              <Text style={styles.codeLabel}>{t('sms.code.label')}</Text>
              <View style={styles.codeInputs}>
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={styles.codeInput}
                    value={digit}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                ))}
              </View>
            </View>

            {/* Resend link */}
            <View style={styles.resendContainer}>
              <Pressable onPress={handleResend} disabled={timer > 0}>
                <Text style={[styles.resendText, timer > 0 && styles.resendDisabled]}>
                  {t('sms.resend')}
                </Text>
              </Pressable>
              {timer > 0 && (
                <Text style={styles.timerText}>
                  ({timer}{language === 'ru' ? 'с' : 's'})
                </Text>
              )}
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>{t('sms.confirm')}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.backButton]}
              onPress={onBack}
            >
              <Text style={styles.backButtonText}>{t('common.back')}</Text>
            </Pressable>
          </View>
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
    gap: 36,
    width: 345,
  },
  logoContainer: {
    width: 115,
    height: 41,
    backgroundColor: colorBackground,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 115,
    height: 41,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
    letterSpacing: -0.408,
    color: '#F5E6E6',
    textAlign: 'center',
    width: 281,
  },
  card: {
    width: 345,
    backgroundColor: '#F5ECE5',
    borderRadius: 30,
    padding: 30,
    gap: 20,
    alignItems: 'center',
    // Inner shadow effect using elevation and shadow
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 4,
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.408,
    color: colorTextPrimary,
    textAlign: 'center',
  },
  phoneText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.408,
    color: 'rgba(65, 44, 44, 0.7)',
    textAlign: 'center',
    width: 285,
  },
  phoneHighlight: {
    color: colorPrimary,
    fontWeight: '600',
  },
  codeSection: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  codeInputContainer: {
    width: 285,
    gap: 12,
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: 'rgba(65, 44, 44, 0.5)',
    textAlign: 'center',
  },
  codeInputs: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  codeInput: {
    width: 45,
    height: 54,
    backgroundColor: colorBackground,
    borderWidth: 1,
    borderColor: colorBorder,
    borderRadius: 13,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorTextPrimary,
    textAlign: 'center',
    shadowColor: colorShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  resendText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorPrimary,
    textDecorationLine: 'underline',
  },
  resendDisabled: {
    opacity: 0.5,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: 'rgba(65, 44, 44, 0.5)',
  },
  buttonsContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    width: '100%',
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  confirmButton: {
    backgroundColor: colorPrimary,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colorPrimary,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorPrimary,
    textAlign: 'center',
  },
});

