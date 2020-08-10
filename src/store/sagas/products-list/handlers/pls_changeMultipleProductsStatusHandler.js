import {call, put, take} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  changeMultipleProductsStatusBeginAction,
  changeMultipleProductsStatusErrorAction,
} from '../../../actions/products-list/productsListActions';

function* pls_changeMultipleProductsStatusHandler(action) {
  const {shoppingListId, productsIdsArray, status} = action.payload;

  yield put(
    changeMultipleProductsStatusBeginAction({
      shoppingListId,
      productsIdsArray,
      status,
    }),
  );

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    yield call(shoppingListService.changeMultipleProductsStatus, {
      shoppingListId,
      productsIdsArray,
      status,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pls_changeMultipleProductsStatusHandler()->ERROR: ' + e,
    });
    yield put(
      changeMultipleProductsStatusErrorAction({
        shoppingListId,
        productsIdsArray,
        description: e.toString(),
      }),
    );
  }
}

export default pls_changeMultipleProductsStatusHandler;
