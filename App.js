import { store } from './src/Redux/store';
import { Provider } from 'react-redux'
import MainNavigator from './src/Routes/MainNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
      <Toast />      
    </Provider>
  );
}


