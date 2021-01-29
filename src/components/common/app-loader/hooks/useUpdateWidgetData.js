import {useState, useEffect} from 'react';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const useUpdateWidgetData = ({servicesStarted, requestsHandled}) => {
  const [widgetDataUpdated, setWidgetDataUpdated] = useState(false);

  useEffect(() => {
    const updateWidgetShoppingLists = async () => {
      const shoppingListService = Services.get(
        Services.serviceTypes.SHOPPING_LIST,
      );
      const currentShoppingLists = await shoppingListService.getShoppingListsWithProducts(
        {},
      );

      const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
      await appWidgetService.setInitialShoppingLists({
        shoppingLists: currentShoppingLists,
      });

      setWidgetDataUpdated(true);
    };

    if (servicesStarted && requestsHandled && !widgetDataUpdated) {
      SystemEventsHandler.onInfo({
        info: 'useUpdateWidgetData()->WILL_UPDATE_WIDGET_DATA',
      });
      updateWidgetShoppingLists();
    }
  }, [servicesStarted, requestsHandled, widgetDataUpdated]);

  return {
    widgetDataUpdated,
  };
};

export default useUpdateWidgetData;
