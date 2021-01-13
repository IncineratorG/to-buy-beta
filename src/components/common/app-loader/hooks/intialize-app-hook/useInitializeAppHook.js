import {useState, useEffect, useReducer} from 'react';
import {AppState} from 'react-native';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../../services/Services';
import AppWidgetRequestsProcessor from '../../../../../utils/common/app-widget-requests-processor/AppWidgetRequestsProcessor';
import initializeAppHookLocalReducer from './store/initializeAppHookLocalReducer';
import initializeAppHookLocalState from './store/initializeAppHookLocalState';
import {
  iahla_setAppIsVisible,
  iahla_setLoadingCommands,
  iahla_setNavigationCommands,
  iahla_setServicesIsReady,
  iahla_setShoppingListModificationCommands,
} from './store/initializeAppHookLocalActions';
import Command from '../../../../../utils/common/command/Command';
import {loadShoppingListsAction} from '../../../../../store/actions/shopping-lists/shoppingListsActions';

const useInitializeAppHook = () => {
  const [state, localDispatch] = useReducer(
    initializeAppHookLocalReducer,
    initializeAppHookLocalState,
  );

  const {
    appIsVisible,
    servicesIsReady,
    commandsIsReady,
    loadingCommands: {commands: loadingCommands},
    navigationCommands: {commands: navigationCommands},
    shoppingListModificationCommands: {
      commands: shoppingListModificationCommands,
    },
  } = state;

  useEffect(() => {
    const appStateChangeHandler = (nextAppState) => {
      if (nextAppState === 'active') {
        localDispatch(iahla_setAppIsVisible({isVisible: true}));
      } else {
        localDispatch(iahla_setAppIsVisible({isVisible: false}));
      }
    };

    AppState.addEventListener('change', appStateChangeHandler);

    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);

  useEffect(() => {
    const startAppServices = async () => {
      try {
        await Services.init();
        localDispatch(iahla_setServicesIsReady({isReady: true}));
      } catch (e) {
        SystemEventsHandler.onError({
          err:
            'useInitializeAppHook()->startAppServices()->ERROR: ' +
            e.toString(),
        });
      }
    };

    startAppServices();
  }, []);

  useEffect(() => {
    if (appIsVisible && servicesIsReady) {
      const initializeAppWidget = async () => {
        const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
        const appWidgetServiceRequests = await appWidgetService.getAndRemoveAllWidgetRequests();

        const {navigationCommands} = await AppWidgetRequestsProcessor.process({
          requests: appWidgetServiceRequests,
        });

        // const {
        //   navigationCommands: requestedNavigationCommands,
        //   shoppingListModificationCommands: requestedShoppingListModificationCommands,
        // } = AppWidgetRequestsProcessor.process({
        //   requests: appWidgetServiceRequests,
        // });
      };

      initializeAppWidget();
    }
  }, [appIsVisible, servicesIsReady]);

  // useEffect(() => {
  //   if (appIsVisible && servicesIsReady) {
  //     const initializeAppServices = async () => {
  //       try {
  //         const appWidgetService = Services.get(
  //           Services.serviceTypes.APP_WIDGET,
  //         );
  //         const appWidgetServiceRequests = await appWidgetService.getAndRemoveAllWidgetRequests();
  //         const {
  //           navigationCommands: requestedNavigationCommands,
  //           shoppingListModificationCommands: requestedShoppingListModificationCommands,
  //         } = AppWidgetRequestsProcessor.process({
  //           requests: appWidgetServiceRequests,
  //         });
  //
  //         localDispatch(
  //           iahla_setNavigationCommands({
  //             navigationCommands: requestedNavigationCommands,
  //             isReady: true,
  //           }),
  //         );
  //         localDispatch(
  //           iahla_setShoppingListModificationCommands({
  //             shoppingListModificationCommands: requestedShoppingListModificationCommands,
  //             isReady: true,
  //           }),
  //         );
  //       } catch (e) {
  //         SystemEventsHandler.onError({
  //           err:
  //             'useInitializeAppHook()->initializeAppServices()->ERROR: ' +
  //             e.toString(),
  //         });
  //       }
  //     };
  //
  //     initializeAppServices();
  //   }
  // }, [appIsVisible, servicesIsReady]);

  // useEffect(() => {
  //   if (servicesIsReady) {
  //     const loadingCommandExecutable = ({dispatch}) => {
  //       if (!dispatch) {
  //         SystemEventsHandler.onError({
  //           err:
  //             'useInitializeAppHook()->loadingCommandExecutable(): NO_DISPATCH',
  //         });
  //         return;
  //       }
  //
  //       dispatch(loadShoppingListsAction());
  //     };
  //
  //     const loadingCommand = Command({executable: loadingCommandExecutable});
  //     const generatedLoadingCommands = [loadingCommand];
  //
  //     localDispatch(
  //       iahla_setLoadingCommands({
  //         loadingCommands: generatedLoadingCommands,
  //         isReady: true,
  //       }),
  //     );
  //   }
  // }, [servicesIsReady]);
};

export default useInitializeAppHook;

// import {useState, useEffect, useReducer} from 'react';
// import {AppState} from 'react-native';
// import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
// import Services from '../../../../../services/Services';
// import AppWidgetRequestsProcessor from '../../../../../utils/common/app-widget-requests-processor/AppWidgetRequestsProcessor';
// import initializeAppHookLocalReducer from './store/initializeAppHookLocalReducer';
// import initializeAppHookLocalState from './store/initializeAppHookLocalState';
// import {
//   iahla_setAppIsVisible,
//   iahla_setLoadingCommands,
//   iahla_setNavigationCommands,
//   iahla_setServicesIsReady,
//   iahla_setShoppingListModificationCommands,
// } from './store/initializeAppHookLocalActions';
// import Command from '../../../../../utils/common/command/Command';
// import {loadShoppingListsAction} from '../../../../../store/actions/shopping-lists/shoppingListsActions';
//
// const useInitializeAppHook = () => {
//   const [state, localDispatch] = useReducer(
//     initializeAppHookLocalReducer,
//     initializeAppHookLocalState,
//   );
//
//   const {
//     appIsVisible,
//     servicesIsReady,
//     commandsIsReady,
//     loadingCommands: {commands: loadingCommands},
//     navigationCommands: {commands: navigationCommands},
//     shoppingListModificationCommands: {
//       commands: shoppingListModificationCommands,
//     },
//   } = state;
//
//   useEffect(() => {
//     const appStateChangeHandler = (nextAppState) => {
//       if (nextAppState === 'active') {
//         localDispatch(iahla_setAppIsVisible({isVisible: true}));
//       } else {
//         localDispatch(iahla_setAppIsVisible({isVisible: false}));
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
//     const startAppServices = async () => {
//       try {
//         await Services.init();
//         localDispatch(iahla_setServicesIsReady({isReady: true}));
//       } catch (e) {
//         SystemEventsHandler.onError({
//           err:
//             'useInitializeAppHook()->startAppServices()->ERROR: ' +
//             e.toString(),
//         });
//       }
//     };
//
//     startAppServices();
//   }, []);
//
//   useEffect(() => {
//     if (appIsVisible && servicesIsReady) {
//       const initializeAppServices = async () => {
//         try {
//           const appWidgetService = Services.get(
//             Services.serviceTypes.APP_WIDGET,
//           );
//           const appWidgetServiceRequests = await appWidgetService.getAndRemoveAllWidgetRequests();
//           const {
//             navigationCommands: requestedNavigationCommands,
//             shoppingListModificationCommands: requestedShoppingListModificationCommands,
//           } = AppWidgetRequestsProcessor.process({
//             requests: appWidgetServiceRequests,
//           });
//
//           localDispatch(
//             iahla_setNavigationCommands({
//               navigationCommands: requestedNavigationCommands,
//               isReady: true,
//             }),
//           );
//           localDispatch(
//             iahla_setShoppingListModificationCommands({
//               shoppingListModificationCommands: requestedShoppingListModificationCommands,
//               isReady: true,
//             }),
//           );
//         } catch (e) {
//           SystemEventsHandler.onError({
//             err:
//               'useInitializeAppHook()->initializeAppServices()->ERROR: ' +
//               e.toString(),
//           });
//         }
//       };
//
//       initializeAppServices();
//     }
//   }, [appIsVisible, servicesIsReady]);
//
//   useEffect(() => {
//     if (servicesIsReady) {
//       const loadingCommandExecutable = ({dispatch}) => {
//         if (!dispatch) {
//           SystemEventsHandler.onError({
//             err:
//               'useInitializeAppHook()->loadingCommandExecutable(): NO_DISPATCH',
//           });
//           return;
//         }
//
//         dispatch(loadShoppingListsAction());
//       };
//
//       const loadingCommand = Command({executable: loadingCommandExecutable});
//       const generatedLoadingCommands = [loadingCommand];
//
//       localDispatch(
//         iahla_setLoadingCommands({
//           loadingCommands: generatedLoadingCommands,
//           isReady: true,
//         }),
//       );
//     }
//   }, [servicesIsReady]);
//
//   return {
//     commandsIsReady,
//     initializationCommands: {
//       loadingCommands,
//       navigationCommands,
//       shoppingListModificationCommands,
//     },
//   };
//
//   // return {initializationCommands, commandsIsReady};
// };
//
// export default useInitializeAppHook;

// import {useState, useEffect} from 'react';
// import {AppState} from 'react-native';
// import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
// import Services from '../../../../../services/Services';
// import AppWidgetRequestsProcessor from '../../../../../utils/common/app-widget-requests-processor/AppWidgetRequestsProcessor';
//
// const useInitializeAppHook = () => {
//   const [appIsVisible, setAppIsVisible] = useState(false);
//   const [servicesIsReady, setServicesIsReady] = useState(false);
//
//   const [loadingCommands, setLoadingCommands] = useState([]);
//   const [loadingCommandsReady, setLoadingCommandsReady] = useState(false);
//
//   const [navigationCommands, setNavigationCommands] = useState([]);
//   const [navigationCommandsReady, setNavigationCommandsReady] = useState(false);
//
//   const [
//     shoppingListModificationCommands,
//     setShoppingListModificationCommands,
//   ] = useState([]);
//   const [
//     shoppingListModificationCommandsReady,
//     setShoppingListModificationCommandsReady,
//   ] = useState(false);
//
//   const [initializationCommands, setInitializationCommands] = useState({
//     loadingCommands: [],
//     navigationCommands: [],
//     shoppingListModificationCommands: [],
//   });
//   const [
//     initializationCommandsReady,
//     setInitializationCommandsReady,
//   ] = useState(false);
//
//   useEffect(() => {
//     const appStateChangeHandler = (nextAppState) => {
//       if (nextAppState === 'active') {
//         setAppIsVisible(true);
//       } else {
//         setAppIsVisible(false);
//         setInitializationCommandsReady(false);
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
//     const startAppServices = async () => {
//       try {
//         await Services.init();
//         setServicesIsReady(true);
//       } catch (e) {
//         SystemEventsHandler.onError({
//           err:
//             'useInitializeAppHook()->startAppServices()->ERROR: ' +
//             e.toString(),
//         });
//       }
//     };
//
//     startAppServices();
//   }, []);
//
//   useEffect(() => {
//     if (appIsVisible && servicesIsReady) {
//       const initializeAppServices = async () => {
//         try {
//           const appWidgetService = Services.get(
//             Services.serviceTypes.APP_WIDGET,
//           );
//           const appWidgetServiceRequests = await appWidgetService.getAndRemoveAllWidgetRequests();
//           const {
//             navigationCommands,
//             shoppingListModificationCommands,
//           } = AppWidgetRequestsProcessor.process({
//             requests: appWidgetServiceRequests,
//           });
//
//           setInitializationCommands({
//             navigationCommands,
//             shoppingListModificationCommands,
//           });
//         } catch (e) {
//           SystemEventsHandler.onError({
//             err:
//               'useInitializeAppHook()->initializeAppServices()->ERROR: ' +
//               e.toString(),
//           });
//         }
//       };
//
//       initializeAppServices();
//     }
//   }, [appIsVisible, servicesIsReady]);
//
//   return {initializationCommandsReady, initializationCommands};
// };
//
// export default useInitializeAppHook;
