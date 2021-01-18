import {eventChannel} from 'redux-saga';
import Services from '../../../services/Services';
import ShoppingListServiceEvents from '../../../services/shopping-list/data/event-types/ShoppingListServiceEvents';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {call, put, take} from '@redux-saga/core/effects';
import {updateShoppingListsAction} from '../../actions/shopping-lists/shoppingListsActions';

function createProductEventsChannel() {
  return eventChannel((emit) => {
    const confirmChangeMultipleProductsStatusHandler = ({
      shoppingListId,
      productsArray,
      confirmed,
    }) => {
      emit(updateShoppingListsAction());
    };

    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const changeMultipleProductsStatusConfirmedUnsubscribe = shoppingListService.subscribe(
      {
        event:
          ShoppingListServiceEvents.MULTIPLE_PRODUCTS_STATUS_CHANGE_CONFIRMED,
        handler: confirmChangeMultipleProductsStatusHandler,
      },
    );

    return () => {
      changeMultipleProductsStatusConfirmedUnsubscribe();
    };
  });
}

function* shoppingListsEventsSaga() {
  SystemEventsHandler.onInfo({info: 'shoppingListsEventsSaga()'});

  const channel = yield call(createProductEventsChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default shoppingListsEventsSaga;
