import React, { useEffect, useState } from 'react';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { SmsVerificationScreen } from '../screens/auth/SmsVerificationScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

type RouteName = 'Splash' | 'Login' | 'Register' | 'SmsVerification';

export function RootNavigator(props: { splashDurationMs?: number }) {
  const { splashDurationMs = 1200 } = props;
  const [route, setRoute] = useState<RouteName>('Splash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsSource, setSmsSource] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const id = setTimeout(() => {
      setRoute('Login');
    }, splashDurationMs);

    return () => clearTimeout(id);
  }, [splashDurationMs]);

  const navigateToSmsVerification = (phone: string, source: 'login' | 'register' = 'login') => {
    setPhoneNumber(phone);
    setSmsSource(source);
    setRoute('SmsVerification');
  };

  const navigateBackToLogin = () => {
    setRoute('Login');
  };

  const navigateBackFromSms = () => {
    setRoute(smsSource === 'register' ? 'Register' : 'Login');
  };

  const navigateToRegister = () => {
    setRoute('Register');
  };

  if (route === 'Splash') {
    return <SplashScreen />;
  }

  if (route === 'SmsVerification') {
    return (
      <SmsVerificationScreen
        phoneNumber={phoneNumber}
        origin={smsSource}
        onBack={navigateBackFromSms}
        onConfirm={() => {
          // Navigate to next screen after verification
        }}
      />
    );
  }

  if (route === 'Register') {
    return (
      <RegisterScreen
        onBack={navigateBackToLogin}
        onLoginPress={navigateBackToLogin}
        onContinue={(data) => navigateToSmsVerification(data.phoneNumber, 'register')}
      />
    );
  }

  return (
    <LoginScreen
      onContinue={navigateToSmsVerification}
      onRegisterPress={navigateToRegister}
    />
  );
}


