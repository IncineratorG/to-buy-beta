import {call, put, take} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  removeMultipleProductsBeginAction,
  removeMultipleProductsErrorAction,
} from '../../../actions/products-list/productsListActions';

function* pls_removeMultipleProductsHandler(action) {
  const {shoppingListId, productsIdsArray} = action.payload;

  yield put(
    removeMultipleProductsBeginAction({shoppingListId, productsIdsArray}),
  );

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    yield call(shoppingListService.removeMultipleProducts, {
      shoppingListId,
      productsIdsArray,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pls_removeMultipleProductsHandler()->ERROR: ' + e,
    });
    yield put(
      removeMultipleProductsErrorAction({
        shoppingListId,
        productsIdsArray,
        description: e.toString(),
      }),
    );
  }
}

export default pls_removeMultipleProductsHandler;
