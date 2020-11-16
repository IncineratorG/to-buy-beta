import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

function* pss_suggestProductsBasedOnCurrentProductsListHandler(action) {
  const {productsList} = action.payload;

  if (productsList) {
    SystemEventsHandler.onInfo({
      info:
        'pss_suggestProductsBasedOnCurrentProductsListHandler(): ' +
        productsList.length,
    });
  } else {
    SystemEventsHandler.onInfo({
      info:
        'pss_suggestProductsBasedOnCurrentProductsListHandler(): NO_PRODUCTS_LIST',
    });
  }

  // yield put(suggestProductsBeginAction());
  //
  // try {
  //   const productSuggestionService = Services.get(
  //     Services.serviceTypes.PRODUCT_SUGGESTION,
  //   );
  //
  //   const suggestedProductsData = yield call(productSuggestionService.suggest, {
  //     partialProductName,
  //   });
  //
  //   yield put(suggestProductsFinishedAction({suggestedProductsData}));
  // } catch (e) {
  //   SystemEventsHandler.onError({
  //     err: 'pss_suggestProductHandler()->ERROR: ' + e,
  //   });
  //   yield put(suggestProductsErrorAction({description: e.toString()}));
  // }
}

export default pss_suggestProductsBasedOnCurrentProductsListHandler;
