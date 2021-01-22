import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AppNavigation from '../app-navigation/AppNavigation';
import AppLoading from '../app-loading/AppLoading';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import useInitializeAppHook from './hooks/intialize-app-hook/useInitializeAppHook';
import {loadShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
import useStartAppServices from './hooks/useStartAppServices';
import useAppState from './hooks/useAppState';
import useWidgetRequests from './hooks/useWidgetRequests';
import Services from '../../../services/Services';
import useNavigationRequestCommands from './hooks/useNavigationRequestCommands';
import AppWidgetRequestsProcessor from '../../../utils/common/app-widget-requests-processor/AppWidgetRequestsProcessor';
import AppWidgetRequestsHandler from '../../../utils/common/app-widget-requests-handler/AppWidgetRequestsHandler';

const AppLoader = () => {
  const [appServicesStarted, setAppServicesStarted] = useState(false);
  const [appWidgetService, setAppWidgetService] = useState(null);
  const [appWidgetRequests, setAppWidgetRequests] = useState(null);
  const [
    appWidgetNavigationCommands,
    setAppWidgetNavigationCommands,
  ] = useState([]);

  const dispatch = useDispatch();

  const {servicesStarted} = useStartAppServices();
  const {appInForeground} = useAppState();
  const {widgetRequests} = useWidgetRequests({appWidgetService});
  const {navigationCommands} = useNavigationRequestCommands({
    widgetRequests: appWidgetRequests,
  });

  useEffect(() => {
    if (servicesStarted) {
      dispatch(loadShoppingListsAction());
    }
  }, [servicesStarted, dispatch]);

  useEffect(() => {
    if (servicesStarted) {
      let widgetService = null;
      if (appInForeground) {
        widgetService = Services.get(Services.serviceTypes.APP_WIDGET);
      }
      setAppWidgetService(widgetService);
    }
    setAppServicesStarted(servicesStarted);
  }, [servicesStarted, appInForeground]);

  useEffect(() => {
    setAppWidgetRequests(widgetRequests);
    // AppWidgetRequestsHandler.handle({requests: widgetRequests});
  }, [widgetRequests]);

  useEffect(() => {
    setAppWidgetNavigationCommands(navigationCommands);
  }, [navigationCommands]);

  useEffect(() => {
    AppWidgetRequestsHandler.handle({requests: appWidgetRequests});
  }, [appWidgetRequests]);

  if (appServicesStarted) {
    return (
      <AppNavigation initialNavigationCommands={appWidgetNavigationCommands} />
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
// import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
// import useInitializeAppHook from './hooks/intialize-app-hook/useInitializeAppHook';
// import {loadShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
//
// const AppLoader = () => {
//   const [appInitialized, setAppInitialized] = useState(false);
//   const [
//     requestedNavigationCommands,
//     setRequestedNavigationCommands,
//   ] = useState([]);
//
//   const dispatch = useDispatch();
//
//   const {appIsInitialized, navigationCommands} = useInitializeAppHook();
//
//   useEffect(() => {
//     setAppInitialized(appIsInitialized);
//     setRequestedNavigationCommands(navigationCommands);
//   }, [appIsInitialized, navigationCommands]);
//
//   useEffect(() => {
//     if (appInitialized) {
//       dispatch(loadShoppingListsAction());
//     }
//   }, [appInitialized, dispatch]);
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
