import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addProductAction,
  clearProductsListCachedData,
} from '../../../store/actions/products-list/productsListActions';
import {updateShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {
  pla_closeAddCategoryDialog,
  pla_hideProductInputArea,
  pla_openAddCategoryDialog,
  pla_openProductInputArea,
} from '../stores/productListActions';

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
    model.localDispatch(pla_openProductInputArea());
  };

  const inputAreaHideHandler = ({inputAreaState}) => {
    SystemEventsHandler.onInfo({info: 'inputAreaHideHandler()'});
    model.localDispatch(pla_hideProductInputArea());
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
    model.localDispatch(pla_hideProductInputArea());
  };

  const addCategoryPressHandler = ({productInputState}) => {
    model.localDispatch(
      pla_openAddCategoryDialog({productInputAreaState: productInputState}),
    );
  };

  const addCategoryDialogTouchOutsideHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'addCategoryDialogTouchOutsideHandler()',
    });
    model.localDispatch(pla_closeAddCategoryDialog());
  };

  const addCategoryDialogAddButtonHandler = () => {
    SystemEventsHandler.onInfo({info: 'addCategoryDialogAddButtonHandler()'});
  };

  const addCategoryDialogCancelButtonHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'addCategoryDialogCancelButtonHandler()',
    });
    model.localDispatch(pla_closeAddCategoryDialog());
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
