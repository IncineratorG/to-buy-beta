import {takeLatest, debounce} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {SUGGEST_PRODUCTS} from '../../types/product-suggestion/productSuggestionTypes';
import pss_suggestProductHandler from './handlers/pss_suggestProductHandler';
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from '../../types/products-list/productsListTypes';
import pss_updateProductDataHandler from './handlers/pss_updateProductDataHandler';
import pss_suggestProductsBasedOnCurrentProductsListHandler from './handlers/pss_suggestProductsBasedOnCurrrentProductsListHandler';
import pss_suggestProductsBasedOnPartialInputHandler from './handlers/pss_suggestProductsBasedOnPartialInputHandler';

function* productSuggestionSaga() {
  SystemEventsHandler.onInfo({info: 'productSuggestionSaga()'});

  yield debounce(50, SUGGEST_PRODUCTS, pss_suggestProductHandler);

  // ===
  // yield takeLatest(
  //   SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST,
  //   pss_suggestProductsBasedOnCurrentProductsListHandler,
  // );
  // yield takeLatest(
  //   SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT,
  //   pss_suggestProductsBasedOnPartialInputHandler,
  // );
  // ===

  yield takeLatest(ADD_PRODUCT, pss_updateProductDataHandler);
  yield takeLatest(UPDATE_PRODUCT, pss_updateProductDataHandler);
}

export default productSuggestionSaga;
