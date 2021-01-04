import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import AppWidgetSagaHelpers from './helpers/AppWidgetSagaHelpers';

function* aws_setWidgetShoppingListHandler(action) {
  const {shoppingListId} = action.payload;

  SystemEventsHandler.onInfo({
    info:
      'aws_setWidgetShoppingListHandler(): ' + JSON.stringify(shoppingListId),
  });

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
      err: 'aws_setWidgetShoppingListHandler()->ERROR: ' + e,
    });
  }
}

export default aws_setWidgetShoppingListHandler;
