import NativeWidgetConstants from '../../../../../services/app-widget/native-widget/constants/NativeWidgetConstants';

const OpenShoppingListRequestHandler = () => {
  const {OPEN_SHOPPING_LIST_REQUEST} = NativeWidgetConstants.widgetRequests;

  const handle = ({request}) => {
    if (request.type === OPEN_SHOPPING_LIST_REQUEST) {
      return {
        shoppingListId: request.listId,
      };
    }
  };

  return {
    handle,
  };
};

export default OpenShoppingListRequestHandler();
