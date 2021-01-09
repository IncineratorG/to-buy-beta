import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import NativeWidgetConstants from '../../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import MarkProductAsBoughtRequestHandler from './processors/MarkProductAsBoughtRequestHandler';
import OpenShoppingListRequestHandler from './processors/OpenShoppingListRequestHandler';

const AppWidgetRequestsProcessor = () => {
  const {
    OPEN_SHOPPING_LIST_REQUEST,
    MARK_PRODUCT_AS_BOUGHT_REQUEST,
  } = NativeWidgetConstants.widgetRequests;

  const openShoppingListRequestHandler = OpenShoppingListRequestHandler;
  const markProductAsBoughtRequestHandler = MarkProductAsBoughtRequestHandler;

  const process = ({requests}) => {
    SystemEventsHandler.onInfo({
      info:
        'AppWidgetRequestsProcessor->process(): ' + JSON.stringify(requests),
    });

    requests.forEach((request) => {
      switch (request.type) {
        case OPEN_SHOPPING_LIST_REQUEST: {
          openShoppingListRequestHandler.handle({request});
          break;
        }

        case MARK_PRODUCT_AS_BOUGHT_REQUEST: {
          markProductAsBoughtRequestHandler.handle({request});
          break;
        }
      }
    });

    return requests.length;
  };

  return {
    process,
  };
};

export default AppWidgetRequestsProcessor();
