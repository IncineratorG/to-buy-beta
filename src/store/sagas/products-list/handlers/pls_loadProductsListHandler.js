import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  loadProductsListBeginAction,
  loadProductsListErrorAction,
  loadProductsListFinishedAction,
} from '../../../actions/products-list/productsListActions';
import Services from '../../../../services/Services';

function* pls_loadProductsListHandler(action) {
  const {shoppingListId} = action.payload;

  yield put(loadProductsListBeginAction({shoppingListId}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const productsList = yield call(shoppingListService.getProductsList, {
      id: shoppingListId,
    });
    yield put(loadProductsListFinishedAction({shoppingListId, productsList}));
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pls_loadProductsListHandler()->ERROR: ' + e,
    });

    yield put(
      loadProductsListErrorAction({shoppingListId, description: e.toString()}),
    );
  }
}

export default pls_loadProductsListHandler;
