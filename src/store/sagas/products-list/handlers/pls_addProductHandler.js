import {call, put, take} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  addProductBeginAction,
  addProductErrorAction,
} from '../../../actions/products-list/productsListActions';

function* pls_addProductHandler(action) {
  const {
    editor,
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    categoryId,
  } = action.payload;

  yield put(addProductBeginAction({shoppingListId}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    yield call(shoppingListService.addProduct, {
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      categoryId,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pls_addProductHandler()->ERROR: ' + e,
    });
    yield put(
      addProductErrorAction({shoppingListId, description: e.toString()}),
    );
  }
}

export default pls_addProductHandler;
