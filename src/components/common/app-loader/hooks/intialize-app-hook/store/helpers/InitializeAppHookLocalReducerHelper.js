const InitializeAppHookLocalReducerHelper = () => {
  const isCommandsReady = ({
    loadingCommandsReady,
    navigationCommandsReady,
    shoppingListModificationCommandsReady,
  }) => {
    return !!(
      loadingCommandsReady &&
      navigationCommandsReady &&
      shoppingListModificationCommandsReady
    );
  };

  return {
    isCommandsReady,
  };
};

export default InitializeAppHookLocalReducerHelper();
