import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addProductAction,
  changeProductStatusAction,
  clearProductsListCachedData,
  removeProductAction,
  updateProductAction,
} from '../../../store/actions/products-list/productsListActions';
import {updateShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {
  pla_addSelectedCategoryId,
  pla_closeAddCategoryDialog,
  pla_closeAddUnitDialog,
  pla_closeEditCategoryDialog,
  pla_closeEditUnitDialog,
  pla_closeRemoveProductDialog,
  pla_hideProductInputArea,
  pla_openAddCategoryDialog,
  pla_openAddUnitDialog,
  pla_openEditCategoryDialog,
  pla_openEditUnitDialog,
  pla_openProductInputAreaInCreateMode,
  pla_openProductInputAreaInEditMode,
  pla_openRemoveProductDialog,
  pla_removeSelectedCategoryId,
  pla_setSelectedCategoryId,
} from '../stores/productListActions';
import {
  addCategoryAction,
  removeCategoryAction,
  updateCategoryAction,
} from '../../../store/actions/categories/categoriesActions';
import {
  addUnitAction,
  removeUnitAction,
  updateUnitAction,
} from '../../../store/actions/units/unitsActions';
import ProductStatus from '../../../services/shopping-list/data/product-status/ProductStatus';
import ListToTextConverter from '../../../utils/specific/products-list/list-to-text-converter/ListToTextConverter';
import {
  shareProductsListViaSmsAction,
  shareProductsListViaWhatsAppAction,
} from '../../../store/actions/share/shareActions';

export const useProductsListController = (model) => {
  const backButtonPressHandler = () => {
    model.navigation.goBack();

    model.dispatch(updateShoppingListsAction());
    // model.dispatch(clearProductsListCachedData());

    return true;
  };

  const addProductButtonHandler = () => {
    model.setters.setSharePanelVisible(false);
    model.localDispatch(pla_openProductInputAreaInCreateMode());
  };

  const inputAreaHideHandler = ({inputAreaState}) => {
    SystemEventsHandler.onInfo({info: 'inputAreaHideHandler()'});
    model.setters.setSharePanelVisible(false);
    model.localDispatch(pla_hideProductInputArea());
  };

  const inputAreaSubmitValuesHandler = ({
    productName,
    quantity,
    note,
    unitId,
    categoryId,
  }) => {
    let editMode = false;
    if (model.data.state.inputArea.editData) {
      editMode = true;
    }

    if (editMode) {
      const {shoppingListId, productId} = model.data.state.inputArea.editData;

      model.dispatch(
        updateProductAction({
          shoppingListId,
          productId,
          name: productName,
          quantity,
          note,
          unitId,
          categoryId,
        }),
      );
      model.localDispatch(pla_hideProductInputArea());
    } else {
      model.dispatch(
        addProductAction({
          shoppingListId: model.data.shoppingListId,
          name: productName,
          quantity,
          note,
          unitId,
          categoryId,
        }),
      );
    }
  };

  const productPressHandler = useCallback((product) => {
    model.setters.setSharePanelVisible(false);

    const {
      parentListId: shoppingListId,
      id: productId,
      name,
      quantity,
      note,
      unitId,
      categoryId,
    } = product;

    model.localDispatch(
      pla_openProductInputAreaInEditMode({
        shoppingListId,
        productId,
        name,
        quantity,
        note,
        unitId,
        categoryId,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusPressHandler = useCallback((product) => {
    model.setters.setSharePanelVisible(false);

    const newStatus =
      product.completionStatus === ProductStatus.COMPLETED
        ? ProductStatus.NOT_COMPLETED
        : ProductStatus.COMPLETED;

    model.dispatch(
      changeProductStatusAction({
        shoppingListId: product.parentListId,
        productId: product.id,
        status: newStatus,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productRemoveHandler = useCallback((product) => {
    model.localDispatch(
      pla_openRemoveProductDialog({
        shoppingListId: product.parentListId,
        productId: product.id,
        productName: product.name,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryPressHandler = ({category, selected}) => {
    model.setters.setSharePanelVisible(false);

    if (!selected) {
      model.localDispatch(pla_setSelectedCategoryId({id: category.id}));
    }
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

  const inputAreaUnitLongPressHandler = ({unit, productInputState}) => {
    if (!unit.editable) {
      return;
    }

    model.localDispatch(
      pla_openEditUnitDialog({productInputAreaState: productInputState, unit}),
    );
  };

  const editUnitDialogTouchOutsideHandler = () => {
    model.localDispatch(pla_closeEditUnitDialog());
  };

  const editUnitDialogCancelButtonHandler = () => {
    model.localDispatch(pla_closeEditUnitDialog());
  };

  const editUnitDialogSaveButtonHandler = ({id, name}) => {
    model.dispatch(updateUnitAction({id, name}));
    model.localDispatch(pla_closeEditUnitDialog());
  };

  const editUnitDialogRemoveButtonHandler = ({id}) => {
    model.dispatch(removeUnitAction({id}));
    model.localDispatch(pla_closeEditUnitDialog());
  };

  const removeProductDialogTouchOutsideHandler = () => {
    model.localDispatch(pla_closeRemoveProductDialog());
  };

  const removeProductDialogCancelButtonHandler = () => {
    model.localDispatch(pla_closeRemoveProductDialog());
  };

  const removeProductDialogRemoveButtonHandler = () => {
    const shoppingListId =
      model.data.state.removeProductDialog.removeProduct.shoppingListId;
    const productId =
      model.data.state.removeProductDialog.removeProduct.productId;

    model.dispatch(removeProductAction({shoppingListId, productId}));
    model.localDispatch(pla_closeRemoveProductDialog());
  };

  const shareButtonPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'shareButtonPressHandler()'});
    model.setters.setSharePanelVisible(!model.data.sharePanelVisible);
  };

  const smsSharePressHandler = async () => {
    // const productsListText = await ListToTextConverter.convert({
    //   productsList: model.data.products,
    //   listName: model.data.listName,
    //   categoriesMap: model.data.allCategoriesMap,
    //   unitsMap: model.data.allUnitsMap,
    // });

    // if (productsListText) {
    //   model.dispatch(
    //     shareProductsListViaSmsAction({productsListTextForm: productsListText}),
    //   );
    // }

    model.dispatch(
      shareProductsListViaSmsAction({id: model.data.shoppingListId}),
    );

    model.setters.setSharePanelVisible(false);
  };

  const whatsAppSharePressHandler = async () => {
    const productsListText = await ListToTextConverter.convert({
      productsList: model.data.products,
      listName: model.data.listName,
      categoriesMap: model.data.allCategoriesMap,
      unitsMap: model.data.allUnitsMap,
    });

    if (productsListText) {
      model.dispatch(
        shareProductsListViaWhatsAppAction({
          productsListTextForm: productsListText,
        }),
      );
    }

    model.setters.setSharePanelVisible(false);
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
    inputAreaUnitLongPressHandler,
    editUnitDialogTouchOutsideHandler,
    editUnitDialogCancelButtonHandler,
    editUnitDialogSaveButtonHandler,
    editUnitDialogRemoveButtonHandler,
    removeProductDialogTouchOutsideHandler,
    removeProductDialogCancelButtonHandler,
    removeProductDialogRemoveButtonHandler,
    shareButtonPressHandler,
    smsSharePressHandler,
    whatsAppSharePressHandler,
  };
};
