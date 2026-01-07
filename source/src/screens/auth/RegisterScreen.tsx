import React, { useEffect, useState } from 'react';
import { BackHandler, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colorBackground, colorBorder, colorPrimary, colorShadow, colorTextPrimary, colorTextSecondary } from '../../constants/colors';
import { Text } from '../../components/common/Text';
import { PhoneInput } from '../../components/common/PhoneInput';
import { EmailInput } from '../../components/common/EmailInput';
import { DatePickerInput } from '../../components/common/DatePickerInput';
import { ButtonRed } from '../../components/common/ButtonRed';
import { useI18n } from '../../i18n';

interface RegisterScreenProps {
  onContinue?: (data: {
    phoneNumber: string;
    email: string;
    birthDate: string;
    gender: 'female' | 'male';
  }) => void;
  onBack?: () => void;
  onLoginPress?: () => void;
}

export function RegisterScreen({ onContinue, onBack, onLoginPress }: RegisterScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (onBack) {
        onBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [onBack]);

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue({
        phoneNumber,
        email,
        birthDate,
        gender,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.scrollWrapper,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
          <Image
            source={require('../../assets/images/logo_red.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>{t('auth.subtitle')}</Text>

          <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Pressable style={styles.backButton} onPress={onBack}>
                <Image
                  source={require('../../assets/images/arrow_left_3x.png')}
                  style={styles.backIcon}
                  resizeMode="contain"
                />
              </Pressable>
              <Text style={styles.headerTitle}>{t('auth.register')}</Text>
            </View>
            <Pressable style={styles.registrationButton} onPress={onLoginPress}>
              <Image
                source={require('../../assets/images/login_3x.png')}
                style={styles.registrationIcon}
                resizeMode="contain"
              />
              <Text style={styles.registrationText}>{t('auth.login')}</Text>
            </Pressable>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>{t('auth.phone')}</Text>
          <PhoneInput value={phoneNumber} onChangeText={handlePhoneChange} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>{t('auth.email')}</Text>
          <EmailInput value={email} onChangeText={setEmail} placeholder={t('auth.email.placeholder')} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>{t('auth.birthdate')}</Text>
          <DatePickerInput value={birthDate} onChange={setBirthDate} placeholder={t('auth.birthdate.placeholder')} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>{t('auth.gender')}</Text>
            <View style={styles.genderRow}>
              <Pressable
                style={[styles.genderButton, gender === 'female' && styles.genderButtonSelected]}
                onPress={() => setGender('female')}
              >
                <Image
                  source={
                    gender === 'female'
                      ? require('../../assets/images/radio_on_3x.png')
                      : require('../../assets/images/radio_off_3x.png')
                  }
                  style={styles.genderIcon}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.genderText,
                    gender === 'female' && styles.genderTextSelected,
                  ]}
                >
                  {t('auth.gender.female')}
                </Text>
              </Pressable>

              <Pressable
                style={[styles.genderButton, gender === 'male' && styles.genderButtonSelected]}
                onPress={() => setGender('male')}
              >
                <Image
                  source={
                    gender === 'male'
                      ? require('../../assets/images/radio_on_3x.png')
                      : require('../../assets/images/radio_off_3x.png')
                  }
                  style={styles.genderIcon}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.genderText,
                    gender === 'male' && styles.genderTextSelected,
                  ]}
                >
                  {t('auth.gender.male')}
                </Text>
              </Pressable>
            </View>
          </View>

          <ButtonRed text={t('common.continue')} onPress={handleContinue} />
        </View>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPrimary,
  },
  scrollWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    minHeight: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    gap: 24,
    width: '100%',
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
  languageWrapper: {
    alignSelf: 'flex-end',
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
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
  backIcon: {
    width: 14,
    height: 14,
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
  genderRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 46,
    backgroundColor: colorBackground,
    borderWidth: 1,
    borderColor: colorBorder,
    borderRadius: 16,
    shadowColor: colorShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  genderButtonSelected: {
    borderColor: colorPrimary,
  },
  genderIcon: {
    width: 18,
    height: 18,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorTextPrimary,
  },
  genderTextSelected: {
    color: colorTextPrimary,
  },
});
