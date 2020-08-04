import {call, put, take} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  removeAllProductsBeginAction,
  removeAllProductsErrorAction,
} from '../../../actions/products-list/productsListActions';

function* pls_removeAllProductsHandler(action) {
  const {shoppingListId} = action.payload;

  yield put(removeAllProductsBeginAction({shoppingListId}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    yield call(shoppingListService.removeAllShoppingListProducts, {
      shoppingListId,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pls_removeAllProductsHandler()->ERROR: ' + e,
    });
    yield put(
      removeAllProductsErrorAction({
        shoppingListId,
        description: e.toString(),
      }),
    );
  }
}

export default pls_removeAllProductsHandler;
