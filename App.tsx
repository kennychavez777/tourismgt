import "react-native-gesture-handler";
import './src/utils/warnings';
import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { SessionProvider } from './src/context/SessionContext';

function App() {
  return (
      <SessionProvider>
        <AppNavigator />
      </SessionProvider>
  );
}

export default App;
