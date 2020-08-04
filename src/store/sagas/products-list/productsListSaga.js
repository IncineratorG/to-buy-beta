import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  ADD_PRODUCT,
  CHANGE_PRODUCT_STATUS,
  LOAD_PRODUCTS_LIST,
  REMOVE_ALL_PRODUCTS,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from '../../types/products-list/productsListTypes';
import pls_loadProductsListHandler from './handlers/pls_loadProductsListHandler';
import pls_addProductHandler from './handlers/pls_addProductHandler';
import pls_updateProductHandler from './handlers/pls_updateProductHandler';
import pls_changeProductStatusHandler from './handlers/pls_changeProductStatusHandler';
import pls_removeProductHandler from './handlers/pls_removeProductHandler';
import pls_removeAllProductsHandler from './handlers/pls_removeAllProductsHandler';

function* productsListSaga() {
  SystemEventsHandler.onInfo({info: 'productsListSaga()'});

  yield takeLatest(LOAD_PRODUCTS_LIST, pls_loadProductsListHandler);
  yield takeLatest(ADD_PRODUCT, pls_addProductHandler);
  yield takeLatest(UPDATE_PRODUCT, pls_updateProductHandler);
  yield takeLatest(CHANGE_PRODUCT_STATUS, pls_changeProductStatusHandler);
  yield takeLatest(REMOVE_PRODUCT, pls_removeProductHandler);
  yield takeLatest(REMOVE_ALL_PRODUCTS, pls_removeAllProductsHandler);
}

export default productsListSaga;
