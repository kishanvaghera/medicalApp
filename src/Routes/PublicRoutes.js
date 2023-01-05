import { createStackNavigator } from '@react-navigation/stack';
// import Login from '../Pages/Auth/Login';
// import Register from '../Pages/Auth/Register';
import { FristScreen, Login, Register, Payment, OtherDetails } from '../Pages/Auth';
import { Home } from '../Pages/Dashboard';
import RoutName from './RoutName';

const Stack = createStackNavigator();

const PublicRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={RoutName.LOGIN} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={RoutName.FRIST_SCREEN} component={FristScreen} />
            <Stack.Screen name={RoutName.LOGIN} component={Login} />
            <Stack.Screen name={RoutName.REGIDTER} component={Register} />
            <Stack.Screen name={RoutName.OTHER_DETILS} component={OtherDetails} />
        </Stack.Navigator>
    )
}
export default PublicRoutes