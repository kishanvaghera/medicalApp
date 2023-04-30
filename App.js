import { store } from './src/Redux/store';
import { Provider } from 'react-redux'
import MainNavigator from './src/Routes/MainNavigator';
import Toast from 'react-native-toast-message';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login } from './src/Pages/Auth';
import { useState, useEffect } from 'react';
import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkIfUserLoggedIn = async () => {
      const data = await AsyncStorage.getItem('@loginData');
      if (data !== null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    checkIfUserLoggedIn();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        {
          loggedIn ? <MainNavigator /> : <Login />
        }
        <Toast />
      </ApplicationProvider>
    </Provider>
  );
}


