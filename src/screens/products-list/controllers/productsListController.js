import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addProductAction,
  changeProductStatusAction,
  clearProductsListCachedData,
  removeAllProductsAction,
  removeProductAction,
  updateProductAction,
} from '../../../store/actions/products-list/productsListActions';
import {
  renameShoppingListAction,
  updateShoppingListsAction,
} from '../../../store/actions/shopping-lists/shoppingListsActions';
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

  const shadedBackgroundPressHandler = useCallback(() => {
    model.localDispatch(pla_hideProductInputArea());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputAreaAddCategoryPressHandler = useCallback(
    ({productInputState}) => {
      model.localDispatch(
        pla_openAddCategoryDialog({productInputAreaState: productInputState}),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const addCategoryDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(pla_closeAddCategoryDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategoryDialogAddButtonHandler = useCallback(({name, color}) => {
    model.dispatch(addCategoryAction({name, color}));
    model.localDispatch(pla_closeAddCategoryDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategoryDialogCancelButtonHandler = useCallback(() => {
    model.localDispatch(pla_closeAddCategoryDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputAreaCategoryLongPressHandler = useCallback(
    ({category, productInputState}) => {
      if (!category.editable) {
        return;
      }

      let canRemoveCategory = true;

      const {currentInput} = productInputState;
      if (currentInput) {
        const {selectedCategory} = currentInput;
        if (selectedCategory && selectedCategory.id === category.id) {
          canRemoveCategory = false;
        }
      }

      model.localDispatch(
        pla_openEditCategoryDialog({
          productInputAreaState: productInputState,
          category,
          canRemove: canRemoveCategory,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const editCategoryDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(pla_closeEditCategoryDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editCategoryDialogSaveButtonHandler = useCallback(
    ({id, name, color}) => {
      model.dispatch(updateCategoryAction({id, name, color}));
      model.localDispatch(pla_closeEditCategoryDialog());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const editCategoryDialogRemoveButtonHandler = useCallback(({id}) => {
    model.dispatch(removeCategoryAction({id}));
    model.localDispatch(pla_closeEditCategoryDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editCategoryDialogCancelButtonHandler = useCallback(() => {
    model.localDispatch(pla_closeEditCategoryDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputAreaAddUnitPressHandler = useCallback(({productInputState}) => {
    model.localDispatch(
      pla_openAddUnitDialog({productInputAreaState: productInputState}),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUnitDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(pla_closeAddUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUnitDialogCancelButtonHandler = useCallback(() => {
    model.localDispatch(pla_closeAddUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUnitDialogAddButtonHandler = useCallback(({name}) => {
    model.dispatch(addUnitAction({name}));
    model.localDispatch(pla_closeAddUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputAreaUnitLongPressHandler = useCallback(
    ({unit, productInputState}) => {
      if (!unit.editable) {
        return;
      }

      let canRemoveUnit = true;

      const {currentInput} = productInputState;
      if (currentInput) {
        const {selectedUnit} = currentInput;
        if (selectedUnit && selectedUnit.id === unit.id) {
          canRemoveUnit = false;
        }
      }

      model.localDispatch(
        pla_openEditUnitDialog({
          productInputAreaState: productInputState,
          unit,
          canRemove: canRemoveUnit,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const editUnitDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(pla_closeEditUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editUnitDialogCancelButtonHandler = useCallback(() => {
    model.localDispatch(pla_closeEditUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editUnitDialogSaveButtonHandler = useCallback(({id, name}) => {
    model.dispatch(updateUnitAction({id, name}));
    model.localDispatch(pla_closeEditUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editUnitDialogRemoveButtonHandler = useCallback(({id}) => {
    model.dispatch(removeUnitAction({id}));
    model.localDispatch(pla_closeEditUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProductDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(pla_closeRemoveProductDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProductDialogCancelButtonHandler = useCallback(() => {
    model.localDispatch(pla_closeRemoveProductDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProductDialogRemoveButtonHandler = () => {
    const shoppingListId =
      model.data.state.removeProductDialog.removeProduct.shoppingListId;
    const productId =
      model.data.state.removeProductDialog.removeProduct.productId;

    model.dispatch(removeProductAction({shoppingListId, productId}));
    model.localDispatch(pla_closeRemoveProductDialog());
  };

  const shareButtonPressHandler = () => {
    if (model.data.smsShareSupported && model.data.whatsAppShareSupported) {
      model.setters.setSharePanelVisible(!model.data.sharePanelVisible);
    } else if (model.data.whatsAppShareSupported) {
      model.dispatch(
        shareProductsListViaWhatsAppAction({id: model.data.shoppingListId}),
      );
    } else if (model.data.smsShareSupported) {
      model.dispatch(
        shareProductsListViaSmsAction({id: model.data.shoppingListId}),
      );
    }
  };

  const smsSharePressHandler = async () => {
    model.dispatch(
      shareProductsListViaSmsAction({id: model.data.shoppingListId}),
    );

    model.setters.setSharePanelVisible(false);
  };

  const whatsAppSharePressHandler = async () => {
    model.dispatch(
      shareProductsListViaWhatsAppAction({id: model.data.shoppingListId}),
    );

    model.setters.setSharePanelVisible(false);
  };

  const screenMenuRenameListPressHandler = () => {
    model.setters.setRenameListDialogVisible(true);
  };

  const screenMenuMarkAllAsBoughtPressHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'screenMenuMarkAllAsBoughtPressHandler()',
    });
  };

  const screenMenuMarkAllAsNotBoughtPressHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'screenMenuMarkAllAsNotBoughtPressHandler()',
    });
  };

  const screenMenuRemoveBoughtPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'screenMenuRemoveBoughtPressHandler()'});
  };

  const screenMenuRemoveAllPressHandler = () => {
    model.setters.setRemoveAllProductsDialogVisible(true);
  };

  const renameListDialogTouchOutsideHandler = () => {
    model.setters.setRenameListDialogVisible(false);
  };

  const renameListDialogCancelPressHandler = () => {
    model.setters.setRenameListDialogVisible(false);
  };

  const renameListDialogRenamePressHandler = ({listId, oldName, newName}) => {
    if (!newName || oldName === newName) {
      model.setters.setRenameListDialogVisible(false);
      return;
    }

    model.dispatch(renameShoppingListAction({id: listId, newName}));

    model.setters.setRenameListDialogVisible(false);
  };

  const removeAllProductsDialogTouchOutsideHandler = () => {
    model.setters.setRemoveAllProductsDialogVisible(false);
  };

  const removeAllProductsDialogRemoveButtonHandler = () => {
    model.setters.setRemoveAllProductsDialogVisible(false);
    model.dispatch(
      removeAllProductsAction({shoppingListId: model.data.shoppingListId}),
    );
  };

  const removeAllProductsDialogCancelButtonHandler = () => {
    model.setters.setRemoveAllProductsDialogVisible(false);
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
    screenMenuRenameListPressHandler,
    screenMenuMarkAllAsBoughtPressHandler,
    screenMenuMarkAllAsNotBoughtPressHandler,
    screenMenuRemoveBoughtPressHandler,
    screenMenuRemoveAllPressHandler,
    renameListDialogTouchOutsideHandler,
    renameListDialogCancelPressHandler,
    renameListDialogRenamePressHandler,
    removeAllProductsDialogTouchOutsideHandler,
    removeAllProductsDialogRemoveButtonHandler,
    removeAllProductsDialogCancelButtonHandler,
  };
};
