import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Pages/Dashboard/Home'

const Stack = createStackNavigator();

const PublicRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown : false }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}
export default PublicRoutes