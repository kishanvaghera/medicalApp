import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes, PrivateRouters } from '../../src/Routes';
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { LoginSuccess, UserDataStor } from '../Redux/reducer';

export default MainNavigator=()=>{
    const loggedData = useSelector((state) => state.userLoggedData );

    const dispatch = useDispatch()

    useEffect(() => {
      const checkIfUserLoggedIn = async () => {
        const data = await AsyncStorage.getItem('@loginData');
        if (data !== null) {
            const dd=JSON.parse(data);
            dispatch(LoginSuccess({ userLoggedId: dd.iUserId }));
            dispatch(UserDataStor({ isUserData: dd }));
        }
      };

      if(!loggedData.isLogin){
          checkIfUserLoggedIn();
      }
    }, []);

    return <NavigationContainer>
            {
            loggedData.isLogin?<PrivateRouters/>:<PublicRoutes/>
            }
            </NavigationContainer>
} 