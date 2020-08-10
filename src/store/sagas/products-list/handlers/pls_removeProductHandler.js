import {call, put, take} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  removeProductBeginAction,
  removeProductErrorAction,
} from '../../../actions/products-list/productsListActions';

function* pls_removeProductHandler(action) {
  const {shoppingListId, productId} = action.payload;

  yield put(removeProductBeginAction({shoppingListId, productId}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    yield call(shoppingListService.removeProduct, {
      shoppingListId,
      productId,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pls_removeProductHandler()->ERROR: ' + e,
    });
    yield put(
      removeProductErrorAction({
        shoppingListId,
        productId,
        description: e.toString(),
      }),
    );
  }
}

export default pls_removeProductHandler;
