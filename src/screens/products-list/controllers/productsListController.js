import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addProductAction,
  clearProductsListCachedData,
} from '../../../store/actions/products-list/productsListActions';
import {updateShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';

export const useProductsListController = (model) => {
  const backButtonPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'backButtonPressHandler()'});

    model.navigation.goBack();

    model.dispatch(updateShoppingListsAction());
    model.dispatch(clearProductsListCachedData());

    return true;
  };

  const addProductButtonHandler = () => {
    SystemEventsHandler.onInfo({info: 'addProductButtonHandler()'});

    model.setters.setInputAreaVisible(!model.data.inputAreaVisible);

    // const product = {
    //   editor: '',
    //   shoppingListId: model.data.shoppingListId,
    //   name: 'New Product',
    //   quantity: 1,
    //   note: 'Test Note',
    //   unitId: 1,
    //   categoryId: 1,
    // };
    //
    // model.dispatch(addProductAction(product));
  };

  const inputAreaHideHandler = () => {
    SystemEventsHandler.onInfo({info: 'inputAreaHideHandler()'});
  };

  const inputAreaSubmitValuesHandler = (values) => {
    SystemEventsHandler.onInfo({info: 'inputAreaSubmitValuesHandler()'});
  };

  // ===
  const productPressHandler = useCallback((product) => {
    SystemEventsHandler.onInfo({
      info: 'productPressHandler(): ' + JSON.stringify(product),
    });
  }, []);
  // ===
  // const productPressHandler = (product) => {
  //   SystemEventsHandler.onInfo({
  //     info: 'productPressHandler(): ' + JSON.stringify(product),
  //   });
  // };

  // ===
  const statusPressHandler = useCallback((product) => {
    SystemEventsHandler.onInfo({
      info: 'statusPressHandler(): ' + JSON.stringify(product),
    });
  }, []);
  // ===
  // const statusPressHandler = (product) => {
  //   SystemEventsHandler.onInfo({
  //     info: 'statusPressHandler(): ' + JSON.stringify(product),
  //   });
  // };

  // ===
  const productRemoveHandler = useCallback((product) => {
    SystemEventsHandler.onInfo({
      info: 'productRemoveHandler(): ' + JSON.stringify(product),
    });
  }, []);
  // ===
  // const productRemoveHandler = (product) => {
  //   SystemEventsHandler.onInfo({
  //     info: 'productRemoveHandler(): ' + JSON.stringify(product),
  //   });
  // };

  const categoryPressHandler = (category) => {
    SystemEventsHandler.onInfo({
      info: 'categoryPressHandler(): ' + JSON.stringify(category),
    });
  };

  const shadedBackgroundPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'shadedBackgroundPressHandler()'});
    model.setters.setInputAreaVisible(false);
  };

  return {
    backButtonPressHandler,
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    productPressHandler,
    productRemoveHandler,
    categoryPressHandler,
    shadedBackgroundPressHandler,
  };
};
