import InitializeAppHookLocalActionTypes from './initializeAppHookLocalActionTypes';
import InitializeAppHookLocalReducerHelper from './helpers/InitializeAppHookLocalReducerHelper';

function initializeAppHookLocalReducer(state, action) {
  switch (action.type) {
    case InitializeAppHookLocalActionTypes.SET_APP_IS_VISIBLE: {
      return {
        ...state,
        appIsVisible: action.payload.isVisible,
      };
    }

    case InitializeAppHookLocalActionTypes.SET_SERVICES_IS_READY: {
      return {
        ...state,
        servicesIsReady: action.payload.isReady,
      };
    }

    case InitializeAppHookLocalActionTypes.SET_LOADING_COMMANDS: {
      const loadingCommands = [...action.payload.loadingCommands];
      const loadingCommandsReady = action.payload.isReady;

      return {
        ...state,
        loadingCommands: {
          ...state.loadingCommands,
          commands: loadingCommands,
          ready: loadingCommandsReady,
        },
        commandsIsReady: InitializeAppHookLocalReducerHelper.isCommandsReady({
          loadingCommandsReady,
          navigationCommandsReady: state.navigationCommands.ready,
          shoppingListModificationCommandsReady:
            state.shoppingListModificationCommands.ready,
        }),
      };
    }

    case InitializeAppHookLocalActionTypes.SET_NAVIGATION_COMMANDS: {
      const navigationCommands = [...action.payload.navigationCommands];
      const navigationCommandsReady = action.payload.isReady;

      return {
        ...state,
        navigationCommands: {
          ...state.navigationCommands,
          commands: navigationCommands,
          ready: navigationCommandsReady,
        },
        commandsIsReady: InitializeAppHookLocalReducerHelper.isCommandsReady({
          loadingCommandsReady: state.loadingCommands.ready,
          navigationCommandsReady,
          shoppingListModificationCommandsReady:
            state.shoppingListModificationCommands.ready,
        }),
      };
    }

    case InitializeAppHookLocalActionTypes.SET_SHOPPING_LIST_MODIFICATION_COMMANDS: {
      const shoppingListModificationCommands = [
        ...action.payload.shoppingListModificationCommands,
      ];
      const shoppingListModificationCommandsReady = action.payload.isReady;

      return {
        ...state,
        shoppingListModificationCommands: {
          ...state.shoppingListModificationCommands,
          commands: shoppingListModificationCommands,
          ready: shoppingListModificationCommandsReady,
        },
        commandsIsReady: InitializeAppHookLocalReducerHelper.isCommandsReady({
          loadingCommandsReady: state.loadingCommands.ready,
          navigationCommandsReady: state.navigationCommands.ready,
          shoppingListModificationCommandsReady,
        }),
      };
    }

    default: {
      return state;
    }
  }
}

export default initializeAppHookLocalReducer;
