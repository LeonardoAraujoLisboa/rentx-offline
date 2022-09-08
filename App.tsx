import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import {useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter'
import {Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold} from '@expo-google-fonts/archivo'
import StackRoutes from './src/routes';
import Load from './src/components/Load';
import { AppProvider } from './src/hooks';

export default function App() {
  const [fontsLoaded] = useFonts({Inter_400Regular, Inter_500Medium, Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold});

  if (!fontsLoaded) {
    return <Load />
  } else {
    return (
      <ThemeProvider theme={theme}>
        <AppProvider>
          <StackRoutes />
        </AppProvider>
      </ThemeProvider>
    );
  }
}
