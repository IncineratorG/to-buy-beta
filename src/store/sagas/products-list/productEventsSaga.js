import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {call, put, take, takeLatest} from '@redux-saga/core/effects';
import {eventChannel} from 'redux-saga';
import Services from '../../../services/Services';
import {
  addProductConfirmedAction,
  addProductCreatedAction,
} from '../../actions/products-list/productsListActions';
import ShoppingListServiceEvents from '../../../services/shopping-list/data/event-types/ShoppingListServiceEvents';

function createProductEventsChannel() {
  return eventChannel((emit) => {
    const createProductHandler = ({shoppingListId, product}) => {
      emit(addProductCreatedAction({shoppingListId, product}));
    };

    const confirmCreatedProductHandler = ({
      shoppingListId,
      product,
      confirmed,
    }) => {
      emit(addProductConfirmedAction({shoppingListId, product, confirmed}));
    };

    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const createUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_CREATED,
      handler: createProductHandler,
    });
    const confirmUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_CONFIRMED,
      handler: confirmCreatedProductHandler,
    });

    return () => {
      createUnsubscribe();
      confirmUnsubscribe();
    };
  });
}

function* productEventsSaga() {
  SystemEventsHandler.onInfo({info: 'productEventsSaga()'});

  const channel = yield call(createProductEventsChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default productEventsSaga;
