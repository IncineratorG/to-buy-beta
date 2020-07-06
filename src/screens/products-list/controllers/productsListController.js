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
    model.setters.setInputAreaState(null);
    model.setters.setInputAreaVisible(!model.data.inputAreaVisible);
  };

  const inputAreaHideHandler = ({inputAreaState}) => {
    SystemEventsHandler.onInfo({info: 'inputAreaHideHandler()'});
    model.setters.setInputAreaVisible(false);
  };

  const inputAreaSubmitValuesHandler = (values) => {
    SystemEventsHandler.onInfo({info: 'inputAreaSubmitValuesHandler()'});
  };

  const productPressHandler = useCallback((product) => {
    SystemEventsHandler.onInfo({
      info: 'productPressHandler(): ' + JSON.stringify(product),
    });
  }, []);

  const statusPressHandler = useCallback((product) => {
    SystemEventsHandler.onInfo({
      info: 'statusPressHandler(): ' + JSON.stringify(product),
    });
  }, []);

  const productRemoveHandler = useCallback((product) => {
    SystemEventsHandler.onInfo({
      info: 'productRemoveHandler(): ' + JSON.stringify(product),
    });
  }, []);

  const categoryPressHandler = (category) => {
    SystemEventsHandler.onInfo({
      info: 'categoryPressHandler(): ' + JSON.stringify(category),
    });
  };

  const shadedBackgroundPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'shadedBackgroundPressHandler()'});
    model.setters.setInputAreaVisible(false);
    model.setters.setInputAreaState(null);
  };

  const addCategoryPressHandler = ({productInputState}) => {
    model.setters.setAddCategoryDialogVisible(true);
    model.setters.setInputAreaState(productInputState);
  };

  const addCategoryDialogTouchOutsideHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'addCategoryDialogTouchOutsideHandler()',
    });
    model.setters.setAddCategoryDialogVisible(false);
  };

  const addCategoryDialogAddButtonHandler = () => {
    SystemEventsHandler.onInfo({info: 'addCategoryDialogAddButtonHandler()'});
  };

  const addCategoryDialogCancelButtonHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'addCategoryDialogCancelButtonHandler()',
    });
    model.setters.setAddCategoryDialogVisible(false);
    model.setters.setInputAreaVisible(true);
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
    addCategoryPressHandler,
    shadedBackgroundPressHandler,
    addCategoryDialogTouchOutsideHandler,
    addCategoryDialogAddButtonHandler,
    addCategoryDialogCancelButtonHandler,
  };
};
