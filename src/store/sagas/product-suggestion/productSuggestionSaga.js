import {takeLatest, debounce} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {SUGGEST_PRODUCTS} from '../../types/product-suggestion/productSuggestionTypes';
import pss_suggestProductHandler from './handlers/pss_suggestProductHandler';

function* productSuggestionSaga() {
  SystemEventsHandler.onInfo({info: 'productSuggestionSaga()'});

  yield debounce(200, SUGGEST_PRODUCTS, pss_suggestProductHandler);
}

export default productSuggestionSaga;
