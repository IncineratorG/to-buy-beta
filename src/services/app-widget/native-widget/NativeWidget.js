import AppWidget from '../libs/app-widget/AppWidget';
import NativeWidgetActions from './actions/NativeWidgetActions';

const NativeWidget = () => {
  const getWidgetStatus = async () => {
    const action = NativeWidgetActions.getWidgetStatusAction();
    return await AppWidget.execute(action);
  };

  return {
    getWidgetStatus,
  };
};

export default NativeWidget();
