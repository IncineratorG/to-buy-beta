import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import TestWidget from './libs/test-widget/TestWidget';

const AppWidgetService = () => {
  const notifier = new Notifier();

  const init = async () => {};

  const setWidgetShoppingList = async ({listId, listName, productsList}) => {
    SystemEventsHandler.onInfo({
      info:
        'AppWidgetService->setWidgetShoppingList(): ' +
        listId +
        ' - ' +
        listName +
        ' - ' +
        productsList.length,
    });

    await TestWidget.setShoppingList(listId.toString(), listName, productsList);
  };

  return {
    init,
    setWidgetShoppingList,
  };
};

export default AppWidgetService;
