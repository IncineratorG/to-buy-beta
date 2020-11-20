import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {suggestProductsBasedOnInputErrorAction} from '../../../actions/product-suggestion/productSuggestionActions';
// import {
//   suggestProductsBeginAction,
//   suggestProductsErrorAction,
//   suggestProductsFinishedAction,
// } from '../../../actions/product-suggestion/productSuggestionActions';

function* pss_suggestProductsBasedOnInputHandler(action) {
  const {partialProductName, excludedProductNamesSet} = action.payload;

  SystemEventsHandler.onInfo({
    info:
      'pss_suggestProductsBasedOnInputHandler(): ' +
      partialProductName +
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
      err: 'pss_suggestProductsBasedOnInputHandler()->ERROR: ' + e,
    });
    yield put(
      suggestProductsBasedOnInputErrorAction({description: e.toString()}),
    );
  }
}

export default pss_suggestProductsBasedOnInputHandler;
