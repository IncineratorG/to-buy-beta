import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppLoader from './src/components/common/app-loader/AppLoader';
import store from './src/store';
import MainErrorBoundary from './src/components/common/main-error-boundary/MainErrorBoundary';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <MenuProvider>
      <Provider store={store}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content" // Here is where you change the font-color
        />
        <MainErrorBoundary>
          <AppLoader />
        </MainErrorBoundary>
      </Provider>
    </MenuProvider>
  );
};

export default App;
