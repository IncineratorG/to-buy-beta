import {call, put, take} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  changeProductStatusBeginAction,
  changeProductStatusErrorAction,
} from '../../../actions/products-list/productsListActions';

function* pls_changeProductStatusHandler(action) {
  const {shoppingListId, productId, status} = action.payload;

  yield put(changeProductStatusBeginAction({shoppingListId, productId}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    yield call(shoppingListService.changeProductStatus, {
      shoppingListId,
      productId,
      status,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pls_changeProductStatusHandler()->ERROR: ' + e,
    });
    yield put(
      changeProductStatusErrorAction({
        shoppingListId,
        productId,
        description: e.toString(),
      }),
    );
  }
}

export default pls_changeProductStatusHandler;
