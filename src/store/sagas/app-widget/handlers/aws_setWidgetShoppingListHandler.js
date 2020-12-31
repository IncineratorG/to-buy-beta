import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {widgetShoppingListSetAction} from '../../../actions/app-widget/appWidgetActions';

function* aws_setWidgetShoppingListHandler(action) {
  const {shoppingListId} = action.payload;

  SystemEventsHandler.onInfo({
    info: 'aws_setWidgetShoppingListHandler(): ' + shoppingListId,
  });

  // const shoppingListService = Services.get(Services.serviceTypes.SHOPPING_LIST);
  // const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
  //
  // const shoppingListData = yield call(shoppingListService.getProductsList, {
  //   id: shoppingListId,
  // });
  //
  // yield call(appWidgetService.setWidgetShoppingList, {
  //   listId: shoppingListData.id,
  //   listName: shoppingListData.name,
  //   productsList: shoppingListData.products,
  // });
}

export default aws_setWidgetShoppingListHandler;
