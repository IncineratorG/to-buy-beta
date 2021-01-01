import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* aws_setWidgetShoppingListHandler(action) {
  const {shoppingListId} = action.payload;

  SystemEventsHandler.onInfo({
    info: 'aws_setWidgetShoppingListHandler(): ' + shoppingListId,
  });

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const shoppingListData = yield call(shoppingListService.getProductsList, {
      id: shoppingListId,
    });
    if (!shoppingListData || !shoppingListData.id) {
      SystemEventsHandler.onError({
        err: 'aws_setWidgetShoppingListHandler(): BAD_SHOPPING_LIST_DATA',
      });
      return;
    }

    const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);

    yield call(appWidgetService.setShoppingList, {
      listId: shoppingListData.id,
      listName: shoppingListData.name,
      productsList: shoppingListData.products,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'aws_setWidgetShoppingListHandler()->ERROR: ' + e,
    });
  }
}

export default aws_setWidgetShoppingListHandler;
