import { store } from './src/Redux/store';
import { Provider } from 'react-redux'
import MainNavigator from './src/Routes/MainNavigator';
import Toast from 'react-native-toast-message';
import { ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <MainNavigator />
        <Toast />      
      </ApplicationProvider>
    </Provider>
  );
}


