import { store } from './src/Redux/store';
import { Provider } from 'react-redux'
import MainNavigator from './src/Routes/MainNavigator';
import Toast from 'react-native-toast-message';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
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

  useEffect(() => {
    const checkIfUserLoggedIn = async () => {
      const data = await AsyncStorage.getItem('@loginData');
      if (data !== null) {
        const dd=JSON.parse(data);
        console.log("dd",dd)
      }else{
        console.log("no data found")
      }
    };
    checkIfUserLoggedIn();
  }, []);


  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <MainNavigator />
        <Toast />
      </ApplicationProvider>
    </Provider>
  );
}


