import NativeWidgetConstants from '../constants/NativeWidgetConstants';

const NativeWidgetEvents = () => {
  const openShoppingListRequestEventPayload = (event) => {
    const {listId} = event;

    return {
      listId,
    };
  };

  return {
    types: NativeWidgetConstants.widgetEvents,
    openShoppingListRequestEventPayload,
  };
};

export default NativeWidgetEvents();
