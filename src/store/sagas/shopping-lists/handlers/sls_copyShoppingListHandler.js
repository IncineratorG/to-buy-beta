import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {call, put} from '@redux-saga/core/effects';
import {
  copyShoppingListBeginAction,
  copyShoppingListErrorAction,
  copyShoppingListFinishedAction,
} from '../../../actions/shopping-lists/shoppingListsActions';

function* sls_copyShoppingListHandler(action) {
  const {shoppingListId, copiedListName} = action.payload;

  yield put(copyShoppingListBeginAction({shoppingListId}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const {shoppingList, error} = yield call(
      shoppingListService.copyShoppingList,
      {
        shoppingListId,
        copiedListName,
      },
    );

    if (shoppingList) {
      yield put(copyShoppingListFinishedAction({shoppingList}));
    } else {
      yield put(
        copyShoppingListErrorAction({
          shoppingListId,
          description: error ? error.description : 'UNKNOWN_ERROR',
        }),
      );
    }
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'sls_copyShoppingListHandler()->ERROR: ' + e,
    });
    yield put(
      copyShoppingListErrorAction({shoppingListId, description: e.toString()}),
    );
  }
}

export default sls_copyShoppingListHandler;
