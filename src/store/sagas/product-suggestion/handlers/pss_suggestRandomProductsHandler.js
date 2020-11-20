import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {suggestRandomProductsErrorAction} from '../../../actions/product-suggestion/productSuggestionActions';

function* pss_suggestRandomProductsHandler(action) {
  const {excludedProductNamesSet} = action.payload;

  SystemEventsHandler.onInfo({
    info:
      'pss_suggestRandomProductsHandler(): ' +
      ' - ' +
      excludedProductNamesSet.size,
  });

  // yield put(suggestProductsBeginAction());

  try {
    const productSuggestionService = Services.get(
      Services.serviceTypes.PRODUCT_SUGGESTION,
    );

    // const suggestedProductsData = yield call(productSuggestionService.suggest, {
    //   partialProductName,
    // });
    //
    // yield put(suggestProductsFinishedAction({suggestedProductsData}));
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pss_suggestRandomProductsHandler()->ERROR: ' + e,
    });
    yield put(suggestRandomProductsErrorAction({description: e.toString()}));
  }
}

export default pss_suggestRandomProductsHandler;
