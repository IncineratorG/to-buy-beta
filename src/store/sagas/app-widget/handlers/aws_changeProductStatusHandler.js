import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import AppWidgetSagaHelpers from './helpers/AppWidgetSagaHelpers';

function* aws_changeProductStatusHandler(action) {
  const {payload} = action;

  SystemEventsHandler.onInfo({
    info: 'aws_changeProductStatusHandler(): ' + JSON.stringify(payload),
  });

  if (
    payload &&
    payload.notifyWidget !== undefined &&
    payload.notifyWidget === false
  ) {
    // SystemEventsHandler.onInfo({
    //   info: 'aws_changeProductStatusHandler()->WILL_NOT_UPDATE_WIDGET',
    // });
    return;
  }

  // SystemEventsHandler.onInfo({
  //   info: 'aws_changeProductStatusHandler()->WILL_UPDATE_WIDGET',
  // });

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
      err: 'aws_changeProductStatusHandler()->ERROR: ' + e,
    });
  }
}

export default aws_changeProductStatusHandler;
