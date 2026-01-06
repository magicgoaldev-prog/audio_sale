import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colorBackground, colorBorder, colorPrimary, colorShadow, colorTextPrimary } from '../../constants/colors';
import { Text } from './Text';
import { Language, useI18n } from '../../i18n';

const languages: Language[] = ['ru', 'en'];

export function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <View style={styles.container}>
      {languages.map((lang) => {
        const isActive = language === lang;
        return (
          <Pressable
            key={lang}
            style={[styles.button, isActive && styles.buttonActive]}
            onPress={() => setLanguage(lang)}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>{lang.toUpperCase()}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colorBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colorBorder,
    padding: 4,
    shadowColor: colorShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonActive: {
    backgroundColor: colorPrimary,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: colorTextPrimary,
  },
  textActive: {
    color: '#FFFFFF',
  },
});

