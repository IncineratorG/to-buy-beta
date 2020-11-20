import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  suggestRandomProductsBeginAction,
  suggestRandomProductsErrorAction,
  suggestRandomProductsFinishedAction,
} from '../../../actions/product-suggestion/productSuggestionActions';

function* pss_suggestRandomProductsHandler(action) {
  const {excludedProductNamesSet} = action.payload;
  const partialProductName = '';

  yield put(suggestRandomProductsBeginAction());

  try {
    const productSuggestionService = Services.get(
      Services.serviceTypes.PRODUCT_SUGGESTION,
    );

    const suggestedProductsData = yield call(
      productSuggestionService.makeSuggestion,
      {
        partialProductName,
        excludedProductNamesSet,
      },
    );

    yield put(suggestRandomProductsFinishedAction({suggestedProductsData}));
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pss_suggestRandomProductsHandler()->ERROR: ' + e,
    });
    yield put(suggestRandomProductsErrorAction({description: e.toString()}));
  }
}

export default pss_suggestRandomProductsHandler;
