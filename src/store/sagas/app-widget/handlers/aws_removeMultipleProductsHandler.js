import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import AppWidgetSagaHelpers from './helpers/AppWidgetSagaHelpers';

function* aws_removeMultipleProductsHandler(action) {
  const {payload} = action;

  SystemEventsHandler.onInfo({
    info: 'aws_removeMultipleProductsHandler(): ' + JSON.stringify(payload),
  });

  let shoppingListId;
  if (payload) {
    shoppingListId = payload.shoppingListId;
  }

  if (!shoppingListId) {
    return;
  }

  try {
    const {
      listId,
      listName,
      productsList,
    } = yield call(AppWidgetSagaHelpers.getShoppingListData, {shoppingListId});

    const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);

    yield call(appWidgetService.setShoppingList, {
      listId,
      listName,
      productsList,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'aws_removeMultipleProductsHandler()->ERROR: ' + e,
    });
  }
}

export default aws_removeMultipleProductsHandler;
