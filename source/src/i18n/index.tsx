import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type Language = 'ru' | 'en';

type TranslateParams = Record<string, string | number>;

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: TranslateParams) => string;
};

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'auth.subtitle': 'Зарегистрируйтесь\nили войдите в аккаунт',
    'auth.login': 'Вход',
    'auth.register': 'Регистрация',
    'auth.phone': 'Номер телефона',
    'auth.email': 'Электронная почта',
    'auth.email.placeholder': 'Введите почту',
    'auth.birthdate': 'Дата рождения',
    'auth.birthdate.placeholder': '14.01.1999',
    'auth.gender': 'Пол',
    'auth.gender.female': 'Женский',
    'auth.gender.male': 'Мужской',
    'common.continue': 'Продолжить',
    'common.back': 'Назад',
    'sms.title': 'Введите код из СМС',
    'sms.sent': 'Отправили секретный код на номер',
    'sms.code.label': 'Введите код здесь',
    'sms.resend': 'Отправить повторно',
    'sms.confirm': 'Подтвердить',
  },
  en: {
    'auth.subtitle': 'Sign up\nor log in to your account',
    'auth.login': 'Log in',
    'auth.register': 'Sign up',
    'auth.phone': 'Phone number',
    'auth.email': 'Email',
    'auth.email.placeholder': 'Enter email',
    'auth.birthdate': 'Date of birth',
    'auth.birthdate.placeholder': 'DD.MM.YYYY',
    'auth.gender': 'Gender',
    'auth.gender.female': 'Female',
    'auth.gender.male': 'Male',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'sms.title': 'Enter the SMS code',
    'sms.sent': 'We sent a secret code to',
    'sms.code.label': 'Enter code here',
    'sms.resend': 'Send again',
    'sms.confirm': 'Confirm',
  },
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const format = (template: string, params?: TranslateParams) => {
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_, key) => `${params[key] ?? ''}`);
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const getSystemLanguage = (): Language => {
    try {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale || 'en';
      return locale.toLowerCase().startsWith('ru') ? 'ru' : 'en';
    } catch {
      return 'ru';
    }
  };

  const [language, setLanguage] = useState<Language>(getSystemLanguage());

  const t = useCallback(
    (key: string, params?: TranslateParams) => {
      const value = translations[language][key] ?? key;
      return format(value, params);
    },
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}

