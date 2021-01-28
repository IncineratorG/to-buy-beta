import {takeEvery} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  ADD_PRODUCT_CREATED,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_CHANGED,
  CHANGE_PRODUCT_STATUS_CHANGED,
  REMOVE_MULTIPLE_PRODUCTS_REMOVED,
  REMOVE_PRODUCT_REMOVED,
  UPDATE_PRODUCT_UPDATED,
} from '../../types/products-list/productsListTypes';
import aws_addProductHandler from './handlers/aws_addProductHandler';
import aws_updateProductHandler from './handlers/aws_updateProductHandler';
import aws_changeProductStatusHandler from './handlers/aws_changeProductStatusHandler';
import aws_removeProductHandler from './handlers/aws_removeProductHandler';
import aws_changeMultipleProductsStatusHandler from './handlers/aws_changeMultipleProductsStatusHandler';
import aws_removeMultipleProductsHandler from './handlers/aws_removeMultipleProductsHandler';
import {
  COPY_SHOPPING_LIST_FINISHED,
  CREATE_SHOPPING_LIST_FINISHED,
  REMOVE_SHOPPING_LIST_FINISHED,
  RENAME_SHOPPING_LIST_FINISHED,
} from '../../types/shopping-lists/shoppingListsTypes';
import aws_createShoppingListHandler from './handlers/aws_createShoppingListHandler';
import aws_removeShoppingListHandler from './handlers/aws_removeShoppingListHandler';
import aws_copyShoppingListHandler from './handlers/aws_copyShoppingListHandler';
import aws_renameShoppingListHandler from './handlers/aws_renameShoppingListHandler';

function* appWidgetSaga() {
  SystemEventsHandler.onInfo({info: 'appWidgetSaga()'});

  yield takeEvery(CREATE_SHOPPING_LIST_FINISHED, aws_createShoppingListHandler);
  yield takeEvery(REMOVE_SHOPPING_LIST_FINISHED, aws_removeShoppingListHandler);
  yield takeEvery(RENAME_SHOPPING_LIST_FINISHED, aws_renameShoppingListHandler);
  yield takeEvery(COPY_SHOPPING_LIST_FINISHED, aws_copyShoppingListHandler);

  yield takeEvery(ADD_PRODUCT_CREATED, aws_addProductHandler);
  yield takeEvery(UPDATE_PRODUCT_UPDATED, aws_updateProductHandler);
  yield takeEvery(
    CHANGE_PRODUCT_STATUS_CHANGED,
    aws_changeProductStatusHandler,
  );
  yield takeEvery(REMOVE_PRODUCT_REMOVED, aws_removeProductHandler);
  yield takeEvery(
    CHANGE_MULTIPLE_PRODUCTS_STATUS_CHANGED,
    aws_changeMultipleProductsStatusHandler,
  );
  yield takeEvery(
    REMOVE_MULTIPLE_PRODUCTS_REMOVED,
    aws_removeMultipleProductsHandler,
  );
}

export default appWidgetSaga;
