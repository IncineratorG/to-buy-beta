import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* pss_updateProductDataHandler(action) {
  const {name, unitId, categoryId} = action.payload;

  try {
    const productSuggestionService = Services.get(
      Services.serviceTypes.PRODUCT_SUGGESTION,
    );

    yield call(productSuggestionService.updateProductData, {
      name,
      unitId,
      categoryId,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'pss_updateProductDataHandler()->ERROR: ' + e,
    });
  }
}

export default pss_updateProductDataHandler;
