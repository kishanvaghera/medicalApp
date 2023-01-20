import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes, PrivateRouters } from '../../src/Routes';
import { useSelector, useDispatch } from 'react-redux'

export default MainNavigator=()=>{
    const loggedData = useSelector((state) => state.userLoggedData );

    return <NavigationContainer>
            {
            loggedData.isLogin?<PrivateRouters/>:<PublicRoutes/>
            }
            </NavigationContainer>
} 