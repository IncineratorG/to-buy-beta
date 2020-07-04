import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {call, put} from '@redux-saga/core/effects';
import {
  updateShoppingListsBeginAction,
  updateShoppingListsErrorAction,
  updateShoppingListsFinishedAction,
} from '../../../actions/shopping-lists/shoppingListsActions';

function* sls_updateShoppingListsHandler() {
  yield put(updateShoppingListsBeginAction());

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const shoppingLists = yield call(shoppingListService.getShoppingLists);
    yield put(updateShoppingListsFinishedAction({shoppingLists}));
  } catch (e) {
    yield put(updateShoppingListsErrorAction({description: e.toString()}));
  }
}

export default sls_updateShoppingListsHandler;
