import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {call, put} from '@redux-saga/core/effects';

function* aws_handleChangeProductStatusWidgetRequestHandler(action) {
  const {payload} = action;
  if (!payload) {
    return;
  }

  const {listId, productId, productStatus, requestId} = payload;
  if (!listId || !productId || !productStatus || !requestId) {
    return;
  }

  SystemEventsHandler.onInfo({
    info:
      'aws_handleChangeProductStatusWidgetRequestHandler(): ' +
      JSON.stringify(payload),
  });

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );
    yield call(shoppingListService.changeProductStatus, {
      shoppingListId: listId,
      productId,
      status: productStatus,
    });

    // const widgetRequestIdsArray = [requestId];

    const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
    yield call(appWidgetService.removeMultipleWidgetRequests, {
      widgetRequestIdsArray: [requestId],
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'aws_handleChangeProductStatusWidgetRequestHandler()->ERROR: ' + e,
    });
    // yield put(
    //   changeProductStatusErrorAction({
    //     shoppingListId: listId,
    //     productId,
    //     description: e.toString(),
    //   }),
    // );
  }
}

export default aws_handleChangeProductStatusWidgetRequestHandler;
