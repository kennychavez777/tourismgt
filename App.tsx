import "react-native-gesture-handler";
import './src/utils/warnings';
import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import SessionContext from "./src/context/SessionContext";

function App() {
  return (
      <AppNavigator />
  );
}

export default App;
