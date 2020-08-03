import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  suggestProductsBeginAction,
  suggestProductsErrorAction,
  suggestProductsFinishedAction,
} from '../../../actions/product-suggestion/productSuggestionActions';

function* pss_suggestProductHandler(action) {
  const {partialProductName} = action.payload;

  yield put(suggestProductsBeginAction());

  try {
    const productSuggestionService = Services.get(
      Services.serviceTypes.PRODUCT_SUGGESTION,
    );

    const suggestedProductsData = yield call(productSuggestionService.suggest, {
      partialProductName,
    });

    yield put(suggestProductsFinishedAction({suggestedProductsData}));
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pss_suggestProductHandler()->ERROR: ' + e,
    });
    yield put(suggestProductsErrorAction({description: e.toString()}));
  }
}

export default pss_suggestProductHandler;
