import {takeLatest, debounce} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  SUGGEST_PRODUCTS_BASED_ON_INPUT,
  SUGGEST_RANDOM_PRODUCTS,
} from '../../types/product-suggestion/productSuggestionTypes';
import pss_suggestProductsBasedOnInputHandler from './handlers/pss_suggestProductsBasedOnInputHandler';
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from '../../types/products-list/productsListTypes';
import pss_updateProductDataHandler from './handlers/pss_updateProductDataHandler';
import pss_suggestRandomProductsHandler from './handlers/pss_suggestRandomProductsHandler';

function* productSuggestionSaga() {
  SystemEventsHandler.onInfo({info: 'productSuggestionSaga()'});

  yield debounce(
    50,
    SUGGEST_PRODUCTS_BASED_ON_INPUT,
    pss_suggestProductsBasedOnInputHandler,
  );
  yield takeLatest(SUGGEST_RANDOM_PRODUCTS, pss_suggestRandomProductsHandler);
  yield takeLatest(ADD_PRODUCT, pss_updateProductDataHandler);
  yield takeLatest(UPDATE_PRODUCT, pss_updateProductDataHandler);
}

export default productSuggestionSaga;
