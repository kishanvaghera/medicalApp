import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';

const Stack = createStackNavigator();

const PublicRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown : false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}
export default PublicRoutes