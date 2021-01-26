import NativeWidgetConstants from '../constants/NativeWidgetConstants';

const NativeWidgetEvents = () => {
  const openShoppingListRequestEventPayload = (data) => {
    const {listId} = data;

    return {
      listId: Number(listId),
    };
  };

  return {
    types: NativeWidgetConstants.widgetEvents,
    openShoppingListRequestEventPayload,
  };
};

export default NativeWidgetEvents();
