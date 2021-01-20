import AppWidget from '../../libs/app-widget/AppWidget';

const NativeWidgetConstants = () => {
  const {
    actionTypes: {
      GET_WIDGET_STATUS,
      SET_SHOPPING_LIST,
      SET_INITIAL_SHOPPING_LISTS,
      SET_MULTIPLE_SHOPPING_LISTS,
      REMOVE_SHOPPING_LIST,
      GET_ALL_WIDGET_REQUESTS,
      GET_AND_REMOVE_ALL_WIDGET_REQUESTS,
    },
    widgetRequests: {
      EMPTY_REQUEST,
      OPEN_SHOPPING_LIST_REQUEST,
      MARK_PRODUCT_AS_BOUGHT_REQUEST,
      CHANGE_PRODUCT_STATUS_REQUEST,
    },
  } = AppWidget.getConstants();

  return {
    actionTypes: {
      GET_WIDGET_STATUS,
      SET_SHOPPING_LIST,
      SET_INITIAL_SHOPPING_LISTS,
      SET_MULTIPLE_SHOPPING_LISTS,
      REMOVE_SHOPPING_LIST,
      GET_ALL_WIDGET_REQUESTS,
      GET_AND_REMOVE_ALL_WIDGET_REQUESTS,
    },
    widgetRequests: {
      EMPTY_REQUEST,
      OPEN_SHOPPING_LIST_REQUEST,
      MARK_PRODUCT_AS_BOUGHT_REQUEST,
      CHANGE_PRODUCT_STATUS_REQUEST,
    },
  };
};

export default NativeWidgetConstants();
