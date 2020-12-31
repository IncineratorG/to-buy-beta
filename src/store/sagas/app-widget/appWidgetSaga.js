import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {SET_WIDGET_SHOPPING_LIST} from '../../types/app-widget/appWidgetTypes';
import aws_setWidgetShoppingListHandler from './handlers/aws_setWidgetShoppingListHandler';
import {
  ADD_PRODUCT_CREATED,
  CHANGE_MULTIPLE_PRODUCTS_STATUS,
  CHANGE_PRODUCT_STATUS,
  REMOVE_MULTIPLE_PRODUCTS,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from '../../types/products-list/productsListTypes';
import aws_addProductHandler from './handlers/aws_addProductHandler';
import aws_updateProductHandler from './handlers/aws_updateProductHandler';
import aws_changeProductStatusHandler from './handlers/aws_changeProductStatusHandler';
import aws_removeProductHandler from './handlers/aws_removeProductHandler';
import aws_changeMultipleProductsStatusHandler from './handlers/aws_changeMultipleProductsStatusHandler';
import aws_removeMultipleProductsHandler from './handlers/aws_removeMultipleProductsHandler';
import {
  COPY_SHOPPING_LIST,
  CREATE_SHOPPING_LIST,
  REMOVE_SHOPPING_LIST,
  RENAME_SHOPPING_LIST,
} from '../../types/shopping-lists/shoppingListsTypes';
import aws_createShoppingListHandler from './handlers/aws_createShoppingListHandler';
import aws_removeShoppingListHandler from './handlers/aws_removeShoppingListHandler';
import aws_copyShoppingListHandler from './handlers/aws_copyShoppingListHandler';

function* appWidgetSaga() {
  SystemEventsHandler.onInfo({info: 'appWidgetSaga()'});

  yield takeLatest(CREATE_SHOPPING_LIST, aws_createShoppingListHandler);
  yield takeLatest(REMOVE_SHOPPING_LIST, aws_removeShoppingListHandler);
  // yield takeLatest(RENAME_SHOPPING_LIST, aws_renameShoppingListHandler);
  yield takeLatest(COPY_SHOPPING_LIST, aws_copyShoppingListHandler);

  yield takeLatest(SET_WIDGET_SHOPPING_LIST, aws_setWidgetShoppingListHandler);
  yield takeLatest(ADD_PRODUCT_CREATED, aws_addProductHandler);
  yield takeLatest(UPDATE_PRODUCT, aws_updateProductHandler);
  yield takeLatest(CHANGE_PRODUCT_STATUS, aws_changeProductStatusHandler);
  yield takeLatest(REMOVE_PRODUCT, aws_removeProductHandler);
  yield takeLatest(
    CHANGE_MULTIPLE_PRODUCTS_STATUS,
    aws_changeMultipleProductsStatusHandler,
  );
  yield takeLatest(REMOVE_MULTIPLE_PRODUCTS, aws_removeMultipleProductsHandler);
}

export default appWidgetSaga;
