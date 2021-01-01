import AppWidget from '../../libs/app-widget/AppWidget';

const NativeWidgetConstants = () => {
  const {
    actionTypes: {GET_WIDGET_STATUS},
  } = AppWidget.getConstants();

  return {
    actionTypes: {
      GET_WIDGET_STATUS,
    },
  };
};

export default NativeWidgetConstants();
