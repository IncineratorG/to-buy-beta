import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {call, put} from '@redux-saga/core/effects';
import {
  renameShoppingListBeginAction,
  renameShoppingListErrorAction,
  renameShoppingListFinishedAction,
} from '../../../actions/shopping-lists/shoppingListsActions';

function* sls_renameShoppingListHandler(action) {
  const {id, newName} = action.payload;

  yield put(renameShoppingListBeginAction({id}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const shoppingList = yield call(shoppingListService.renameShoppingList, {
      id,
      newName,
    });
    if (shoppingList) {
      yield put(renameShoppingListFinishedAction({shoppingList}));
    } else {
      yield put(
        renameShoppingListErrorAction({
          id,
          description: 'UNABLE_TO_RENAME_SHOPPING_LIST_WITH_ID: ' + id,
        }),
      );
    }
  } catch (e) {
    yield put(renameShoppingListErrorAction({id, description: e.toString()}));
  }
}

export default sls_renameShoppingListHandler;
