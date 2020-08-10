import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {
  removeShoppingListBeginAction,
  removeShoppingListErrorAction,
  removeShoppingListFinishedAction,
} from '../../../actions/shopping-lists/shoppingListsActions';
import Services from '../../../../services/Services';

function* sls_removeShoppingListHandler(action) {
  const {id} = action.payload;

  yield put(removeShoppingListBeginAction({id}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );
    const success = yield call(shoppingListService.removeShoppingList, {id});
    if (success) {
      yield put(removeShoppingListFinishedAction({id}));
    } else {
      yield put(
        removeShoppingListErrorAction({id, description: 'UNABLE_TO_REMOVE'}),
      );
    }
  } catch (e) {
    yield put(removeShoppingListErrorAction({id, description: e.toString()}));
  }
}

export default sls_removeShoppingListHandler;
