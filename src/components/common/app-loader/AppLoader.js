import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AppNavigation from '../app-navigation/AppNavigation';
import AppLoading from '../app-loading/AppLoading';
import Services from '../../../services/Services';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import wait from '../../../utils/common/service-utils/wait/wait';
import {loadShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {AppState} from 'react-native';
import awaitAsyncGenerator from '@babel/runtime/helpers/esm/awaitAsyncGenerator';
import NativeWidgetConstants from '../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import AppWidgetRequestsProcessor from './app-widget-requests-processor/AppWidgetRequestsProcessor';

const AppLoader = () => {
  const [appInitialized, setAppInitialized] = useState(false);
  const [appInForeground, setAppInForeground] = useState(false);
  const [shoppingListIdToOpen, setShoppingListIdToOpen] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const initFunc = async () => {
      try {
        await Services.init();
        await dispatch(loadShoppingListsAction());
      } catch (e) {
        SystemEventsHandler.onError({err: 'AppLoader->init()->ERROR'});
      }

      setAppInitialized(true);
    };

    initFunc();
  }, [dispatch]);

  useEffect(() => {
    const appStateChangeHandler = (nextAppState) => {
      // SystemEventsHandler.onInfo({info: 'AppState: ' + nextAppState});
      if (nextAppState === 'active') {
        setAppInForeground(true);
      } else {
        setAppInForeground(false);
      }
    };

    AppState.addEventListener('change', appStateChangeHandler);

    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);

  useEffect(() => {
    if (appInForeground && appInitialized) {
      SystemEventsHandler.onInfo({
        info: 'AppLoader->APP_IN_FOREGROUND_AND_INITIALIZED',
      });

      const initializeAppWidgetService = async () => {
        const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
        const result = await appWidgetService.getAndRemoveAllWidgetRequests();
        const requestsData = AppWidgetRequestsProcessor.process({
          requests: result,
        });

        setShoppingListIdToOpen(requestsData.shoppingListToOpen);
      };

      initializeAppWidgetService();
    }
  }, [appInitialized, appInForeground]);

  if (appInitialized) {
    return <AppNavigation predeterminedListId={shoppingListIdToOpen} />;
  } else {
    return <AppLoading />;
  }
};

export default AppLoader;
