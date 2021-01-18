import InitializeAppHookLocalActionTypes from './initializeAppHookLocalActionTypes';

export const iahla_setAppIsVisible = ({isVisible}) => {
  return {
    type: InitializeAppHookLocalActionTypes.SET_APP_IS_VISIBLE,
    payload: {isVisible},
  };
};

export const iahla_setServicesIsReady = ({isReady}) => {
  return {
    type: InitializeAppHookLocalActionTypes.SET_SERVICES_IS_READY,
    payload: {isReady},
  };
};

export const iahla_setLoadingCommands = ({loadingCommands, isReady}) => {
  return {
    type: InitializeAppHookLocalActionTypes.SET_LOADING_COMMANDS,
    payload: {loadingCommands, isReady},
  };
};

export const iahla_setNavigationCommands = ({navigationCommands, isReady}) => {
  return {
    type: InitializeAppHookLocalActionTypes.SET_NAVIGATION_COMMANDS,
    payload: {navigationCommands, isReady},
  };
};

export const iahla_setShoppingListModificationCommands = ({
  shoppingListModificationCommands,
  isReady,
}) => {
  return {
    type:
      InitializeAppHookLocalActionTypes.SET_SHOPPING_LIST_MODIFICATION_COMMANDS,
    payload: {shoppingListModificationCommands, isReady},
  };
};

export const iahla_setAppIsInitialized = ({isInitialized}) => {
  return {
    type: InitializeAppHookLocalActionTypes.SET_APP_IS_INITIALIZED,
    payload: {isInitialized},
  };
};
