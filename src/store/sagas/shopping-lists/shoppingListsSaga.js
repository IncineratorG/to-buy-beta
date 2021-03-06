import {takeLatest} from '@redux-saga/core/effects';
import {
  COPY_SHOPPING_LIST,
  CREATE_SHOPPING_LIST,
  LOAD_SHOPPING_LISTS,
  REMOVE_SHOPPING_LIST,
  RENAME_SHOPPING_LIST,
  UPDATE_SHOPPING_LISTS,
} from '../../types/shopping-lists/shoppingListsTypes';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import sls_createShoppingListHandler from './handlers/sls_createShoppingListHandler';
import sls_loadShoppingListsHandler from './handlers/sls_loadShoppingListsHandler';
import sls_removeShoppingListHandler from './handlers/sls_removeShoppingListHandler';
import sls_updateShoppingListsHandler from './handlers/sls_updateShoppingListsHandler';
import sls_renameShoppingListHandler from './handlers/sls_renameShoppingListHandler';
import sls_copyShoppingListHandler from './handlers/sls_copyShoppingListHandler';

function* shoppingListsSaga() {
  SystemEventsHandler.onInfo({info: 'shoppingListsSaga()'});

  yield takeLatest(CREATE_SHOPPING_LIST, sls_createShoppingListHandler);
  yield takeLatest(LOAD_SHOPPING_LISTS, sls_loadShoppingListsHandler);
  yield takeLatest(UPDATE_SHOPPING_LISTS, sls_updateShoppingListsHandler);
  yield takeLatest(REMOVE_SHOPPING_LIST, sls_removeShoppingListHandler);
  yield takeLatest(RENAME_SHOPPING_LIST, sls_renameShoppingListHandler);
  yield takeLatest(COPY_SHOPPING_LIST, sls_copyShoppingListHandler);
}

export default shoppingListsSaga;
