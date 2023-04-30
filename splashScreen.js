import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import RoutName from './src/Routes/RoutName';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('@loginData');
        if (userToken) {
          // navigation.reset({
          //   index: 0,
          //   routes: [{name: RoutName.HOME}],
          // });
          navigation.navigate(RoutName.HOME);
        } else {
          // navigation.reset({
          //   index: 0,
          //   routes: [{name: RoutName.LOGIN}],
          // });
          navigation.navigate(RoutName.LOGIN);
        }
      } catch (e) {
        console.log(e);
        // navigation.reset({
        //   index: 0,
        //   routes: [{name: RoutName.LOGIN}],
        // });
        navigation.navigate(RoutName.LOGIN);
      }
    };
    checkLoginStatus();
  }, [navigation]);

  return null;
};

export default SplashScreen;