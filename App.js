import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PublicRoutes from './src/Routes/PublicRoutes';
import PrivateRouters from './src/Routes/PrivateRouters';

export default function App() {
  const isLogin=true;
  return (
    <NavigationContainer>
      {
        isLogin?<PrivateRouters/>:<PublicRoutes/>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
