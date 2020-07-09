import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addProductAction,
  clearProductsListCachedData,
} from '../../../store/actions/products-list/productsListActions';
import {updateShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {
  pla_closeAddCategoryDialog,
  pla_closeAddUnitDialog,
  pla_closeEditCategoryDialog,
  pla_hideProductInputArea,
  pla_openAddCategoryDialog,
  pla_openAddUnitDialog,
  pla_openEditCategoryDialog,
  pla_openProductInputArea,
} from '../stores/productListActions';
import {
  addCategoryAction,
  removeCategoryAction,
  updateCategoryAction,
} from '../../../store/actions/categories/categoriesActions';
import {addUnitAction} from '../../../store/actions/units/unitsActions';

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

  const editCategoryDialogRemoveButtonHandler = ({id}) => {
    model.dispatch(removeCategoryAction({id}));
    model.localDispatch(pla_closeEditCategoryDialog());
  };

  const editCategoryDialogCancelButtonHandler = () => {
    model.localDispatch(pla_closeEditCategoryDialog());
  };

  const inputAreaAddUnitPressHandler = ({productInputState}) => {
    model.localDispatch(
      pla_openAddUnitDialog({productInputAreaState: productInputState}),
    );
  };

  const addUnitDialogTouchOutsideHandler = () => {
    model.localDispatch(pla_closeAddUnitDialog());
  };

  const addUnitDialogCancelButtonHandler = () => {
    model.localDispatch(pla_closeAddUnitDialog());
  };

  const addUnitDialogAddButtonHandler = ({name}) => {
    model.dispatch(addUnitAction({name}));
    model.localDispatch(pla_closeAddUnitDialog());
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
    inputAreaAddUnitPressHandler,
    addUnitDialogTouchOutsideHandler,
    addUnitDialogCancelButtonHandler,
    addUnitDialogAddButtonHandler,
  };
};
