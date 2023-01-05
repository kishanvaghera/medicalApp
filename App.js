import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes, PrivateRouters } from './src/Routes';
import ThemeProvider from './src/utils/ThemeProvider';

export default function App() {
  const isLogin=true;
  return (
    <NavigationContainer>
      {/* <ThemeProvider> */}
      {
        isLogin?<PrivateRouters/>:<PublicRoutes/>
      }
      {/* </ThemeProvider> */}
      
    </NavigationContainer>
  );
}


