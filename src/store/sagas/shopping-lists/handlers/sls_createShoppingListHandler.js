import {call, put} from '@redux-saga/core/effects';
import {
  createShoppingListBeginAction,
  createShoppingListErrorAction,
  createShoppingListFinishedAction,
} from '../../../actions/shopping-lists/shoppingListsActions';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* sls_createShoppingListHandler(action) {
  const {listName} = action.payload;

  yield put(createShoppingListBeginAction());

  // SystemEventsHandler.onInfo({info: 'createShoppingList()_SAGA: ' + listName});

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );
    const shoppingList = yield call(shoppingListService.createShoppingList, {
      listName,
    });
    yield put(createShoppingListFinishedAction({shoppingList}));
  } catch (e) {
    yield put(createShoppingListErrorAction({description: e.toString()}));
  }
}

export default sls_createShoppingListHandler;
