import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addProductAction,
  clearProductsListCachedData,
} from '../../../store/actions/products-list/productsListActions';
import {updateShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {
  pla_closeAddCategoryDialog,
  pla_closeEditCategoryDialog,
  pla_hideProductInputArea,
  pla_openAddCategoryDialog,
  pla_openEditCategoryDialog,
  pla_openProductInputArea,
} from '../stores/productListActions';
import {
  addCategoryAction,
  updateCategoryAction,
} from '../../../store/actions/categories/categoriesActions';

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
    model.localDispatch(pla_hideProductInputArea());
  };

  const inputAreaAddCategoryPressHandler = ({productInputState}) => {
    model.localDispatch(
      pla_openAddCategoryDialog({productInputAreaState: productInputState}),
    );
  };

  const addCategoryDialogTouchOutsideHandler = () => {
    model.localDispatch(pla_closeAddCategoryDialog());
  };

  const addCategoryDialogAddButtonHandler = ({name, color}) => {
    model.dispatch(addCategoryAction({name, color}));
    model.localDispatch(pla_closeAddCategoryDialog());
  };

  const addCategoryDialogCancelButtonHandler = () => {
    model.localDispatch(pla_closeAddCategoryDialog());
  };

  const inputAreaCategoryLongPressHandler = ({category, productInputState}) => {
    if (!category.editable) {
      return;
    }

    model.localDispatch(
      pla_openEditCategoryDialog({
        productInputAreaState: productInputState,
        category,
      }),
    );
  };

  const editCategoryDialogTouchOutsideHandler = () => {
    model.localDispatch(pla_closeEditCategoryDialog());
  };

  const editCategoryDialogSaveButtonHandler = ({id, name, color}) => {
    model.dispatch(updateCategoryAction({id, name, color}));
    model.localDispatch(pla_closeEditCategoryDialog());
  };

  const editCategoryDialogRemoveButtonHandler = ({category}) => {
    SystemEventsHandler.onInfo({
      info:
        'editCategoryDialogRemoveButtonHandler(): ' + JSON.stringify(category),
    });
  };

  const editCategoryDialogCancelButtonHandler = () => {
    model.localDispatch(pla_closeEditCategoryDialog());
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
    inputAreaAddCategoryPressHandler,
    shadedBackgroundPressHandler,
    addCategoryDialogTouchOutsideHandler,
    addCategoryDialogAddButtonHandler,
    addCategoryDialogCancelButtonHandler,
    inputAreaCategoryLongPressHandler,
    editCategoryDialogTouchOutsideHandler,
    editCategoryDialogSaveButtonHandler,
    editCategoryDialogRemoveButtonHandler,
    editCategoryDialogCancelButtonHandler,
  };
};
