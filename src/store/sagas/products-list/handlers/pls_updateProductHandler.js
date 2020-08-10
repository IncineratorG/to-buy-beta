import {call, put, take} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  updateProductBeginAction,
  updateProductErrorAction,
} from '../../../actions/products-list/productsListActions';

function* pls_updateProductHandler(action) {
  const {
    editor,
    shoppingListId,
    productId,
    name,
    quantity,
    note,
    unitId,
    categoryId,
  } = action.payload;

  yield put(updateProductBeginAction({shoppingListId, productId}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    yield call(shoppingListService.updateProduct, {
      shoppingListId,
      productId,
      name,
      quantity,
      note,
      unitId,
      categoryId,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pls_updateProductHandler()->ERROR: ' + e,
    });
    yield put(
      updateProductErrorAction({
        shoppingListId,
        productId,
        description: e.toString(),
      }),
    );
  }
}

export default pls_updateProductHandler;
