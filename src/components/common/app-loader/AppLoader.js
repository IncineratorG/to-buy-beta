import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AppNavigation from '../app-navigation/AppNavigation';
import AppLoading from '../app-loading/AppLoading';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import useInitializeAppHook from './hooks/intialize-app-hook/useInitializeAppHook';

const AppLoader = () => {
  const [appInitialized, setAppInitialized] = useState(false);
  const [
    requestedNavigationCommands,
    setRequestedNavigationCommands,
  ] = useState([]);

  const dispatch = useDispatch();

  const {initializationCommands, commandsIsReady} = useInitializeAppHook();

  useEffect(() => {
    if (commandsIsReady) {
      const {
        loadingCommands,
        navigationCommands,
        shoppingListModificationCommands,
      } = initializationCommands;

      SystemEventsHandler.onInfo({
        info:
          'COMMANDS_SIZE: ' +
          loadingCommands.length +
          ' - ' +
          navigationCommands.length +
          ' - ' +
          shoppingListModificationCommands.length,
      });

      loadingCommands.forEach((command) => {
        command.execute({dispatch});
      });
      shoppingListModificationCommands.forEach((command) => {
        command.execute({dispatch});
      });

      setRequestedNavigationCommands(navigationCommands);
      setAppInitialized(true);
    }
  }, [commandsIsReady, initializationCommands, dispatch]);

  if (appInitialized) {
    return (
      <AppNavigation initialNavigationCommands={requestedNavigationCommands} />
    );
  } else {
    return <AppLoading />;
  }
};

export default AppLoader;

// import React, {useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import AppNavigation from '../app-navigation/AppNavigation';
// import AppLoading from '../app-loading/AppLoading';
// import Services from '../../../services/Services';
// import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
// import {loadShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
// import {AppState} from 'react-native';
// import AppWidgetRequestsProcessor from '../../../utils/common/app-widget-requests-processor/AppWidgetRequestsProcessor';
//
// const AppLoader = () => {
//   const [appInitialized, setAppInitialized] = useState(false);
//   const [appInForeground, setAppInForeground] = useState(false);
//   const [
//     requestedNavigationCommands,
//     setRequestedNavigationCommands,
//   ] = useState([]);
//
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     const initFunc = async () => {
//       try {
//         await Services.init();
//         await dispatch(loadShoppingListsAction());
//       } catch (e) {
//         SystemEventsHandler.onError({err: 'AppLoader->init()->ERROR'});
//       }
//
//       setAppInitialized(true);
//     };
//
//     initFunc();
//   }, [dispatch]);
//
//   useEffect(() => {
//     const appStateChangeHandler = (nextAppState) => {
//       if (nextAppState === 'active') {
//         setAppInForeground(true);
//       } else {
//         setAppInForeground(false);
//       }
//     };
//
//     AppState.addEventListener('change', appStateChangeHandler);
//
//     return () => {
//       AppState.removeEventListener('change', appStateChangeHandler);
//     };
//   }, []);
//
//   useEffect(() => {
//     if (appInForeground && appInitialized) {
//       SystemEventsHandler.onInfo({
//         info: 'AppLoader->APP_IN_FOREGROUND_AND_INITIALIZED',
//       });
//
//       const initializeAppWidgetService = async () => {
//         const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
//         const result = await appWidgetService.getAndRemoveAllWidgetRequests();
//
//         const {
//           navigationCommands,
//           shoppingListModificationCommands,
//         } = AppWidgetRequestsProcessor.process({requests: result});
//
//         setRequestedNavigationCommands(navigationCommands);
//       };
//
//       initializeAppWidgetService();
//     }
//   }, [appInitialized, appInForeground]);
//
//   if (appInitialized) {
//     return (
//       <AppNavigation initialNavigationCommands={requestedNavigationCommands} />
//     );
//   } else {
//     return <AppLoading />;
//   }
// };
//
// export default AppLoader;
