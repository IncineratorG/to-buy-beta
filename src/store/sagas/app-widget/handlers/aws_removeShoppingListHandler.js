import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* aws_removeShoppingListHandler(action) {
  const {payload} = action;

  SystemEventsHandler.onInfo({
    info: 'aws_removeShoppingListHandler(): ' + JSON.stringify(payload),
  });

  if (!payload) {
    return;
  }

  const {id: removedShoppingListId} = payload;
  if (!removedShoppingListId) {
    return;
  }

  try {
    const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);

    yield call(appWidgetService.removeShoppingList, {
      listId: removedShoppingListId,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'aws_removeShoppingListHandler()->ERROR: ' + e,
    });
  }
}

export default aws_removeShoppingListHandler;
