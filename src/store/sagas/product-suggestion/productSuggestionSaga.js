import {takeLatest, debounce} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {SUGGEST_PRODUCTS} from '../../types/product-suggestion/productSuggestionTypes';
import pss_suggestProductHandler from './handlers/pss_suggestProductHandler';
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from '../../types/products-list/productsListTypes';
import pss_updateProductDataHandler from './handlers/pss_updateProductDataHandler';

function* productSuggestionSaga() {
  SystemEventsHandler.onInfo({info: 'productSuggestionSaga()'});

  yield debounce(150, SUGGEST_PRODUCTS, pss_suggestProductHandler);
  yield takeLatest(ADD_PRODUCT, pss_updateProductDataHandler);
  yield takeLatest(UPDATE_PRODUCT, pss_updateProductDataHandler);
}

export default productSuggestionSaga;
