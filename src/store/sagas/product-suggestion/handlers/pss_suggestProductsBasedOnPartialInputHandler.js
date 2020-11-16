import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

function* pss_suggestProductsBasedOnPartialInputHandler(action) {
  const {partialProductName} = action.payload;

  SystemEventsHandler.onInfo({
    info:
      'pss_suggestProductsBasedOnPartialInputHandler(): ' + partialProductName,
  });

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

export default pss_suggestProductsBasedOnPartialInputHandler;
