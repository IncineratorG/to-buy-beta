import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  suggestProductsBasedOnInputBeginAction,
  suggestProductsBasedOnInputErrorAction,
  suggestProductsBasedOnInputFinishedAction,
} from '../../../actions/product-suggestion/productSuggestionActions';

function* pss_suggestProductsBasedOnInputHandler(action) {
  const {partialProductName, excludedProductNamesSet} = action.payload;

  yield put(suggestProductsBasedOnInputBeginAction());

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

    yield put(
      suggestProductsBasedOnInputFinishedAction({suggestedProductsData}),
    );
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pss_suggestProductsBasedOnInputHandler()->ERROR: ' + e,
    });
    yield put(
      suggestProductsBasedOnInputErrorAction({description: e.toString()}),
    );
  }
}

export default pss_suggestProductsBasedOnInputHandler;
