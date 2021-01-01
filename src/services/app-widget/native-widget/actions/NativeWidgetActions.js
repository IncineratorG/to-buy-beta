import NativeWidgetConstants from '../constants/NativeWidgetConstants';

const NativeWidgetActions = () => {
  const {actionTypes} = NativeWidgetConstants;

  const getWidgetStatusAction = () => {
    return {
      type: actionTypes.GET_WIDGET_STATUS,
    };
  };

  return {
    getWidgetStatusAction,
  };
};

export default NativeWidgetActions();
