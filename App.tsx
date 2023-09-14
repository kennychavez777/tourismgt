import "react-native-gesture-handler";
import './src/utils/warnings';
import React from 'react';

//import SignUpScreen from './src/screens/SignUpScreen';
import Dashboard from './src/screens/Dashboard';
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return <AppNavigator />;
  
}

export default App;
