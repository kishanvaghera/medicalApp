import { store } from './src/Redux/store';
import { Provider } from 'react-redux'
import MainNavigator from './src/Routes/MainNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />      
    </Provider>
  );
}


