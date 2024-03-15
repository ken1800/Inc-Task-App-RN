import * as React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import palette from './palette';
import AppRoute from './src';

export default () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StatusBar barStyle="light-content" backgroundColor={palette.defaultTheme} />
        <AppRoute />
        <Toast />
      </PaperProvider>
    </NavigationContainer>
  )
}

