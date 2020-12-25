import {takeLatest, debounce} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {SET_WIDGET_SHOPPING_LIST} from '../../types/app-widget/appWidgetTypes';
import aws_setWidgetShoppingListHandler from './handlers/aws_setWidgetShoppingListHandler';

function* appWidgetSaga() {
  SystemEventsHandler.onInfo({info: 'appWidgetSaga()'});

  yield takeLatest(SET_WIDGET_SHOPPING_LIST, aws_setWidgetShoppingListHandler);

  // yield debounce(
  //   50,
  //   SUGGEST_PRODUCTS_BASED_ON_INPUT,
  //   pss_suggestProductsBasedOnInputHandler,
  // );
  // yield takeLatest(SUGGEST_RANDOM_PRODUCTS, pss_suggestRandomProductsHandler);
  // yield takeLatest(ADD_PRODUCT, pss_updateProductDataHandler);
  // yield takeLatest(UPDATE_PRODUCT, pss_updateProductDataHandler);
}

export default appWidgetSaga;
