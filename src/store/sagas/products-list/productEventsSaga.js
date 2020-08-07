import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {call, put, take, takeLatest} from '@redux-saga/core/effects';
import {eventChannel} from 'redux-saga';
import Services from '../../../services/Services';
import {
  addProductConfirmedAction,
  addProductCreatedAction,
  changeMultipleProductsStatusChangedAction,
  changeMultipleProductsStatusConfirmedAction,
  changeProductStatusChangedAction,
  changeProductStatusConfirmedAction,
  removeMultipleProductsConfirmedAction,
  removeMultipleProductsRemovedAction,
  removeProductConfirmedAction,
  removeProductRemovedAction,
  updateProductConfirmedAction,
  updateProductUpdatedAction,
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

    const updateProductHandler = ({shoppingListId, product}) => {
      emit(updateProductUpdatedAction({shoppingListId, product}));
    };
    const confirmUpdatedProductHandler = ({
      shoppingListId,
      product,
      confirmed,
    }) => {
      emit(updateProductConfirmedAction({shoppingListId, product, confirmed}));
    };

    const changeProductStatusHandler = ({shoppingListId, product}) => {
      emit(changeProductStatusChangedAction({shoppingListId, product}));
    };
    const confirmChangeProductStatusHandler = ({
      shoppingListId,
      product,
      confirmed,
    }) => {
      emit(
        changeProductStatusConfirmedAction({
          shoppingListId,
          product,
          confirmed,
        }),
      );
    };

    const removeProductHandler = ({shoppingListId, productId}) => {
      emit(removeProductRemovedAction({shoppingListId, productId}));
    };
    const confirmRemoveProductHandler = ({
      shoppingListId,
      productId,
      confirmed,
    }) => {
      emit(
        removeProductConfirmedAction({shoppingListId, productId, confirmed}),
      );
    };

    const removeMultipleProductsHandler = ({
      shoppingListId,
      productsIdsArray,
    }) => {
      emit(
        removeMultipleProductsRemovedAction({shoppingListId, productsIdsArray}),
      );
    };
    const confirmRemoveMultipleProductsHandler = ({
      shoppingListId,
      productsIdsArray,
      confirmed,
    }) => {
      emit(
        removeMultipleProductsConfirmedAction({
          shoppingListId,
          productsIdsArray,
          confirmed,
        }),
      );
    };

    const changeMultipleProductsStatusHandler = ({
      shoppingListId,
      productsArray,
    }) => {
      emit(
        changeMultipleProductsStatusChangedAction({
          shoppingListId,
          productsArray,
        }),
      );
    };
    const confirmChangeMultipleProductsStatusHandler = ({
      shoppingListId,
      productsArray,
      confirmed,
    }) => {
      emit(
        changeMultipleProductsStatusConfirmedAction({
          shoppingListId,
          productsArray,
          confirmed,
        }),
      );
    };

    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const createUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_CREATED,
      handler: createProductHandler,
    });
    const createConfirmUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_CONFIRMED,
      handler: confirmCreatedProductHandler,
    });

    const updateUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_UPDATED,
      handler: updateProductHandler,
    });
    const updateConfirmUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_UPDATE_CONFIRMED,
      handler: confirmUpdatedProductHandler,
    });

    const changeStatusUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_STATUS_CHANGED,
      handler: changeProductStatusHandler,
    });
    const changeStatusConfirmUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_STATUS_CHANGE_CONFIRMED,
      handler: confirmChangeProductStatusHandler,
    });

    const removeUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_REMOVED,
      handler: removeProductHandler,
    });
    const removeConfirmUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.PRODUCT_REMOVE_CONFIRMED,
      handler: confirmRemoveProductHandler,
    });

    const removeMultipleProductsUnsubscribe = shoppingListService.subscribe({
      event: ShoppingListServiceEvents.MULTIPLE_PRODUCTS_REMOVED,
      handler: removeMultipleProductsHandler,
    });
    const removeMultipleProductsConfirmedUnsubscribe = shoppingListService.subscribe(
      {
        event: ShoppingListServiceEvents.MULTIPLE_PRODUCTS_REMOVE_CONFIRMED,
        handler: confirmRemoveMultipleProductsHandler,
      },
    );

    const changeMultipleProductsStatusUnsubscribe = shoppingListService.subscribe(
      {
        event: ShoppingListServiceEvents.MULTIPLE_PRODUCTS_STATUS_CHANGED,
        handler: changeMultipleProductsStatusHandler,
      },
    );
    const changeMultipleProductsStatusConfirmedUnsubscribe = shoppingListService.subscribe(
      {
        event:
          ShoppingListServiceEvents.MULTIPLE_PRODUCTS_STATUS_CHANGE_CONFIRMED,
        handler: confirmChangeMultipleProductsStatusHandler,
      },
    );

    return () => {
      createUnsubscribe();
      createConfirmUnsubscribe();
      updateUnsubscribe();
      updateConfirmUnsubscribe();
      changeStatusUnsubscribe();
      changeStatusConfirmUnsubscribe();
      removeUnsubscribe();
      removeConfirmUnsubscribe();
      removeMultipleProductsUnsubscribe();
      removeMultipleProductsConfirmedUnsubscribe();
      changeMultipleProductsStatusUnsubscribe();
      changeMultipleProductsStatusConfirmedUnsubscribe();
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
