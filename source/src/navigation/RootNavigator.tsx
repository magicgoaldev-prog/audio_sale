import React, { useEffect, useState } from 'react';
import { LoginScreen } from '../screens/LoginScreen';
import { SplashScreen } from '../screens/SplashScreen';

type RouteName = 'Splash' | 'Login';

export function RootNavigator(props: { splashDurationMs?: number }) {
  const { splashDurationMs = 1200 } = props;
  const [route, setRoute] = useState<RouteName>('Splash');

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     setRoute('Login');
  //   }, splashDurationMs);

  //   return () => clearTimeout(id);
  // }, [splashDurationMs]);

  if (route === 'Splash') {
    return <SplashScreen />;
  }

  return <LoginScreen />;
}


