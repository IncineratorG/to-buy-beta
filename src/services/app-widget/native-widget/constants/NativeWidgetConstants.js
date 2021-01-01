import AppWidget from '../../libs/app-widget/AppWidget';

const NativeWidgetConstants = () => {
  const {
    actionTypes: {GET_WIDGET_STATUS, SET_SHOPPING_LIST},
  } = AppWidget.getConstants();

  return {
    actionTypes: {
      GET_WIDGET_STATUS,
      SET_SHOPPING_LIST,
    },
  };
};

export default NativeWidgetConstants();
