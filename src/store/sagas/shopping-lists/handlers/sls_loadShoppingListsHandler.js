import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {call, put} from '@redux-saga/core/effects';
import {
  loadShoppingListsBeginAction,
  loadShoppingListsErrorAction,
  loadShoppingListsFinishedAction,
} from '../../../actions/shopping-lists/shoppingListsActions';

function* sls_loadShoppingListsHandler() {
  yield put(loadShoppingListsBeginAction());

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const shoppingLists = yield call(shoppingListService.getShoppingLists);
    yield put(loadShoppingListsFinishedAction({shoppingLists}));
  } catch (e) {
    yield put(loadShoppingListsErrorAction({description: e.toString()}));
  }
}

export default sls_loadShoppingListsHandler;
