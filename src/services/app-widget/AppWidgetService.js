import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';

const AppWidgetService = () => {
  const notifier = new Notifier();

  const init = async () => {};

  const setWidgetShoppingList = () => {
    SystemEventsHandler.onInfo({
      info: 'AppWidgetService->setWidgetShoppingList()',
    });
  };

  return {
    init,
    setWidgetShoppingList,
  };
};

export default AppWidgetService;
