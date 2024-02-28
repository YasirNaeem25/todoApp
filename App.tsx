
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigator/AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function App() {


  useEffect(() => {
    SplashScreen.hide();
  }, []);



  return (
    <NavigationContainer>
       <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <AppNavigation initialRouteName={'TodoList'} />
    </NavigationContainer>
  );
}

export default App;

