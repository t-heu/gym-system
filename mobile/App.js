import React from 'react';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import { store, persistor } from './src/store';
import Routes from './src'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar hidden barStyle="dark-content" backgroundColor="#fff" />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
