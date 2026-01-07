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
    'sms.success.title': 'Регистрация завершена!',
    'sms.success.subtitle': 'Поздравляем, теперь вам доступны все возможности приложения',
    'sms.success.button': 'Отлично',
    'welcome.page': 'Welcome Page {number}',
    'welcome.skip': 'Пропустить',
    'welcome.next': 'Далее',
    'welcome.start': 'Начать',
    'welcome.start.catalog': 'Перейти в каталог',
    'welcome.page1.title': 'Внутренняя поддержка всегда под рукой',
    'welcome.page1.description': 'Аудио-сессии, которые заменят тебе сеанс у психолога.\nЛичное терапевтическое пространство, доступное в любое время, в любом месте',
    'welcome.page2.title': 'Ваш проводник\nк гармонии',
    'welcome.page2.description': 'Описание страницы 2',
    'welcome.page2.name': 'Анна Чернигова',
    'welcome.page2.role': 'Дипломированный психолог, автор книг, спикер, телеведущая',
    'welcome.page2.achievement1': 'Кандидат наук, основатель Международной Академии Репарационной Психологии',
    'welcome.page2.achievement2': 'Автор 100+ программ на TV, которые знают и любят',
    'welcome.page2.achievement3': '20 000 часов частной практики: помогла тысячам людей изменить жизнь',
    'welcome.page2.achievement4': 'Спикер конференций Woman Forum в Сколково, Synergy Brain Global Forum и др.',
    'welcome.page3.title': 'Глубокие изменения\nза один сеанс',
    'welcome.page3.description': 'Описание страницы 3',
    'welcome.page3.intro': 'Каждая сессия — это законченный процесс. Ты погружаешься в тему, трансформируешь состояние и получаешь практический инструмент для жизни, который останется с тобой навсегда. Выбирай то, что актуально для тебя прямо сейчас:',
    'welcome.page3.category1': 'Отношения с собой и другими',
    'welcome.page3.category2': 'Достижение целей и карьера',
    'welcome.page3.category3': 'Здоровье, энергия и ресурсное состояние',
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
    'sms.success.title': 'Registration completed!',
    'sms.success.subtitle': 'Congrats, you now have full access to the app features',
    'sms.success.button': 'Great',
    'welcome.page': 'Welcome Page {number}',
    'welcome.skip': 'Skip',
    'welcome.next': 'Next',
    'welcome.start': 'Start',
    'welcome.start.catalog': 'Go to catalog',
    'welcome.page1.title': 'Internal support always at hand',
    'welcome.page1.description': 'Audio sessions that will replace a session with a psychologist for you.\nPersonal therapeutic space, available anytime, anywhere',
    'welcome.page2.title': 'Your guide\nto harmony',
    'welcome.page2.description': 'Page 2 Description',
    'welcome.page2.name': 'Anna Chernigova',
    'welcome.page2.role': 'Certified psychologist, author of books, speaker, TV presenter',
    'welcome.page2.achievement1': 'PhD, founder of the International Academy of Reparative Psychology',
    'welcome.page2.achievement2': 'Author of 100+ TV programs that are known and loved',
    'welcome.page2.achievement3': '20,000 hours of private practice: helped thousands of people change their lives',
    'welcome.page2.achievement4': 'Speaker at Woman Forum conferences in Skolkovo, Synergy Brain Global Forum and others',
    'welcome.page3.title': 'Deep changes in\none session',
    'welcome.page3.description': 'Page 3 Description',
    'welcome.page3.intro': 'Each session is a complete process. You immerse yourself in the topic, transform your state and get a practical tool for life that will stay with you forever. Choose what is relevant to you right now:',
    'welcome.page3.category1': 'Relationships with self and others',
    'welcome.page3.category2': 'Achieving goals and career',
    'welcome.page3.category3': 'Health, energy and resource state',
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

