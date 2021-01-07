import React, {useRef, useEffect} from 'react';
import {StatusBar, AppState} from 'react-native';
import {Provider} from 'react-redux';
import AppLoader from './src/components/common/app-loader/AppLoader';
import store from './src/store';
import MainErrorBoundary from './src/components/common/main-error-boundary/MainErrorBoundary';
import {MenuProvider} from 'react-native-popup-menu';
import {SystemEventsHandler} from './src/utils/common/system-events-handler/SystemEventsHandler';

const App = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const appStateChangeHandler = (nextAppState) => {
      SystemEventsHandler.onInfo({info: 'AppState: ' + nextAppState});
    };

    AppState.addEventListener('change', appStateChangeHandler);

    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);

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
