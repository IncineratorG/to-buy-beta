const initializeAppHookLocalState = {
  appIsVisible: false,
  servicesIsReady: false,
  commandsIsReady: false,
  loadingCommands: {
    ready: false,
    commands: [],
  },
  navigationCommands: {
    ready: false,
    commands: [],
  },
  shoppingListModificationCommands: {
    ready: false,
    commands: [],
  },
};

export default initializeAppHookLocalState;
