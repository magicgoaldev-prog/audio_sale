import React, { useEffect, useState } from 'react';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { SmsVerificationScreen } from '../screens/auth/SmsVerificationScreen';

type RouteName = 'Splash' | 'Login' | 'SmsVerification';

export function RootNavigator(props: { splashDurationMs?: number }) {
  const { splashDurationMs = 1200 } = props;
  const [route, setRoute] = useState<RouteName>('Splash');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      setRoute('Login');
    }, splashDurationMs);

    return () => clearTimeout(id);
  }, [splashDurationMs]);

  const navigateToSmsVerification = (phone: string) => {
    setPhoneNumber(phone);
    setRoute('SmsVerification');
  };

  const navigateBack = () => {
    setRoute('Login');
  };

  if (route === 'Splash') {
    return <SplashScreen />;
  }

  if (route === 'SmsVerification') {
    return (
      <SmsVerificationScreen
        phoneNumber={phoneNumber}
        onBack={navigateBack}
        onConfirm={() => {
          // Navigate to next screen after verification
        }}
      />
    );
  }

  return <LoginScreen onContinue={navigateToSmsVerification} />;
}


