import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  ADD_PRODUCT,
  CHANGE_MULTIPLE_PRODUCTS_STATUS,
  CHANGE_PRODUCT_STATUS,
  LOAD_PRODUCTS_LIST,
  REMOVE_MULTIPLE_PRODUCTS,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from '../../types/products-list/productsListTypes';
import pls_loadProductsListHandler from './handlers/pls_loadProductsListHandler';
import pls_addProductHandler from './handlers/pls_addProductHandler';
import pls_updateProductHandler from './handlers/pls_updateProductHandler';
import pls_changeProductStatusHandler from './handlers/pls_changeProductStatusHandler';
import pls_removeProductHandler from './handlers/pls_removeProductHandler';
import pls_changeMultipleProductsStatusHandler from './handlers/pls_changeMultipleProductsStatusHandler';
import pls_removeMultipleProductsHandler from './handlers/pls_removeMultipleProductsHandler';

function* productsListSaga() {
  SystemEventsHandler.onInfo({info: 'productsListSaga()'});

  yield takeLatest(LOAD_PRODUCTS_LIST, pls_loadProductsListHandler);
  yield takeLatest(ADD_PRODUCT, pls_addProductHandler);
  yield takeLatest(UPDATE_PRODUCT, pls_updateProductHandler);
  yield takeLatest(CHANGE_PRODUCT_STATUS, pls_changeProductStatusHandler);
  yield takeLatest(
    CHANGE_MULTIPLE_PRODUCTS_STATUS,
    pls_changeMultipleProductsStatusHandler,
  );
  yield takeLatest(REMOVE_PRODUCT, pls_removeProductHandler);
  yield takeLatest(REMOVE_MULTIPLE_PRODUCTS, pls_removeMultipleProductsHandler);
}

export default productsListSaga;
