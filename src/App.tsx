/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFonts } from 'expo-font';

import { Main } from './Main';

export function App() {
  const [areFontsLoaded] = useFonts({
    'GeneralSans-400': require('./assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./assets/fonts/GeneralSans-Bold.otf'),
  });

  if (!areFontsLoaded) {
    return null;
  }

  return <Main />;
}
