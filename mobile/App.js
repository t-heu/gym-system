import React from 'react';
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import createRouter from './src/routes';
import { store, persistor } from './src/store';

function Index() {
  const signedIn = useSelector(state => state.auth.signed);
  const Routes = createRouter(signedIn);

  return (
    <Routes />
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar hidden barStyle="dark-content" backgroundColor="#fff" />
        <Index />
      </PersistGate>
    </Provider>
  );
}
