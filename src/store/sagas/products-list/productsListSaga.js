import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  ADD_PRODUCT,
  LOAD_PRODUCTS_LIST,
} from '../../types/products-list/productsListTypes';
import pls_loadProductsListHandler from './handlers/pls_loadProductsListHandler';
import pls_addProductHandler from './handlers/pls_addProductHandler';

function* productsListSaga() {
  SystemEventsHandler.onInfo({info: 'productsListSaga()'});

  yield takeLatest(LOAD_PRODUCTS_LIST, pls_loadProductsListHandler);
  yield takeLatest(ADD_PRODUCT, pls_addProductHandler);
}

export default productsListSaga;
