import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addProductAction,
  changeMultipleProductsStatusAction,
  changeProductStatusAction,
  removeMultipleProductsAction,
  removeProductAction,
  updateProductAction,
} from '../../../../store/actions/products-list/productsListActions';
import {
  renameShoppingListAction,
  updateShoppingListsAction,
} from '../../../../store/actions/shopping-lists/shoppingListsActions';
import {
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
  pla_setProductsListCategoryUpdatingComplete,
  pla_setRemoveAllProductsDialogVisibility,
  pla_setRenameListDialogVisibility,
  pla_setSelectedCategoryIdForCategoriesList,
  pla_setSelectedCategoryIdForProductsList,
  pla_setSharePanelVisibility,
} from '../../stores/productListActions';
import {
  addCategoryAction,
  removeCategoryAction,
  updateCategoryAction,
} from '../../../../store/actions/categories/categoriesActions';
import {
  addUnitAction,
  removeUnitAction,
  updateUnitAction,
} from '../../../../store/actions/units/unitsActions';
import ProductStatus from '../../../../services/shopping-list/data/product-status/ProductStatus';
import {
  shareProductsListViaSmsAction,
  shareProductsListViaWhatsAppAction,
} from '../../../../store/actions/share/shareActions';
import ProductInitialCategories from '../../../../components/specific/products-list/product-initial-categories/ProductInitialCategories';

export const useProductsListController = (model) => {
  const backButtonPressHandler = () => {
    model.navigation.goBack();

    model.dispatch(updateShoppingListsAction());
    // model.dispatch(clearProductsListCachedData());

    return true;
  };

  const productsListRenderCompletedHandler = useCallback(() => {
    // SystemEventsHandler.onInfo({info: 'HERE'});
    model.localDispatch(pla_setProductsListCategoryUpdatingComplete());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProductButtonHandler = useCallback(() => {
    model.localDispatch(pla_setSharePanelVisibility({visible: false}));
    model.localDispatch(pla_openProductInputAreaInCreateMode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputAreaHideHandler = useCallback(({inputAreaState}) => {
    model.localDispatch(pla_setSharePanelVisibility({visible: false}));
    model.localDispatch(pla_hideProductInputArea());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    model.localDispatch(pla_setSharePanelVisibility({visible: false}));

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
    model.localDispatch(pla_setSharePanelVisibility({visible: false}));

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

  const categoryPressHandler = useCallback(({category, selected}) => {
    model.localDispatch(pla_setSharePanelVisibility({visible: false}));

    if (!selected) {
      model.localDispatch(
        pla_setSelectedCategoryIdForCategoriesList({id: category.id}),
      );
      setTimeout(() => {
        model.localDispatch(
          pla_setSelectedCategoryIdForProductsList({id: category.id}),
        );
      }, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      model.localDispatch(
        pla_setSharePanelVisibility({
          visible: !model.data.state.sharePanel.sharePanelVisible,
        }),
      );
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

  const smsSharePressHandler = useCallback(() => {
    model.dispatch(
      shareProductsListViaSmsAction({id: model.data.shoppingListId}),
    );

    model.localDispatch(pla_setSharePanelVisibility({visible: false}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const whatsAppSharePressHandler = useCallback(() => {
    model.dispatch(
      shareProductsListViaWhatsAppAction({id: model.data.shoppingListId}),
    );

    model.localDispatch(pla_setSharePanelVisibility({visible: false}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const screenMenuRenameListPressHandler = useCallback(() => {
    model.localDispatch(pla_setRenameListDialogVisibility({visible: true}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const screenMenuMarkAllAsBoughtPressHandler = () => {
    const shoppingListId = model.data.shoppingListId;
    const productsIdsArray = model.data.products.map((product) => product.id);
    const status = ProductStatus.COMPLETED;

    model.dispatch(
      changeMultipleProductsStatusAction({
        shoppingListId,
        productsIdsArray,
        status,
      }),
    );
  };

  const screenMenuMarkAllAsNotBoughtPressHandler = () => {
    const shoppingListId = model.data.shoppingListId;
    const productsIdsArray = model.data.products.map((product) => product.id);
    const status = ProductStatus.NOT_COMPLETED;

    model.dispatch(
      changeMultipleProductsStatusAction({
        shoppingListId,
        productsIdsArray,
        status,
      }),
    );
  };

  const screenMenuMarkCurrentCategoryAsBoughtPressHandler = () => {
    const shoppingListId = model.data.shoppingListId;
    let productsIdsArray = [];
    const status = ProductStatus.COMPLETED;

    const selectedCategoryId =
      model.data.state.selectedCategory.productsList.selectedCategoryId;
    if (selectedCategoryId === ProductInitialCategories.COMPLETED) {
      return;
    } else if (selectedCategoryId === ProductInitialCategories.NOT_COMPLETED) {
      productsIdsArray = model.data.products
        .filter(
          (product) => product.completionStatus === ProductStatus.NOT_COMPLETED,
        )
        .map((product) => product.id);
    } else if (selectedCategoryId === ProductInitialCategories.ALL) {
      productsIdsArray = model.data.products
        .filter(
          (product) => product.completionStatus === ProductStatus.NOT_COMPLETED,
        )
        .map((product) => product.id);
    } else {
      productsIdsArray = model.data.products
        .filter((product) => product.categoryId === selectedCategoryId)
        .map((product) => product.id);
    }

    if (!productsIdsArray || !productsIdsArray.length) {
      return;
    }

    model.dispatch(
      changeMultipleProductsStatusAction({
        shoppingListId,
        productsIdsArray,
        status,
      }),
    );
  };

  const screenMenuMarkCurrentCategoryAsNotBoughtPressHandler = () => {
    const shoppingListId = model.data.shoppingListId;
    let productsIdsArray = [];
    const status = ProductStatus.NOT_COMPLETED;

    const selectedCategoryId =
      model.data.state.selectedCategory.productsList.selectedCategoryId;
    if (selectedCategoryId === ProductInitialCategories.NOT_COMPLETED) {
      return;
    } else if (selectedCategoryId === ProductInitialCategories.COMPLETED) {
      productsIdsArray = model.data.products
        .filter(
          (product) => product.completionStatus === ProductStatus.COMPLETED,
        )
        .map((product) => product.id);
    } else if (selectedCategoryId === ProductInitialCategories.ALL) {
      productsIdsArray = model.data.products
        .filter(
          (product) => product.completionStatus === ProductStatus.COMPLETED,
        )
        .map((product) => product.id);
    } else {
      productsIdsArray = model.data.products
        .filter((product) => product.categoryId === selectedCategoryId)
        .map((product) => product.id);
    }

    if (!productsIdsArray || !productsIdsArray.length) {
      return;
    }

    model.dispatch(
      changeMultipleProductsStatusAction({
        shoppingListId,
        productsIdsArray,
        status,
      }),
    );
  };

  const screenMenuRemoveBoughtPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'screenMenuRemoveBoughtPressHandler()'});
  };

  const screenMenuRemoveCurrentCategoryPressHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'screenMenuRemoveCurrentCategoryPressHandler()',
    });
  };

  const screenMenuRemoveAllPressHandler = useCallback(() => {
    model.localDispatch(
      pla_setRemoveAllProductsDialogVisibility({visible: true}),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renameListDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(pla_setRenameListDialogVisibility({visible: false}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renameListDialogCancelPressHandler = useCallback(() => {
    model.localDispatch(pla_setRenameListDialogVisibility({visible: false}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renameListDialogRenamePressHandler = useCallback(
    ({listId, oldName, newName}) => {
      if (!newName || oldName === newName) {
        model.localDispatch(
          pla_setRenameListDialogVisibility({visible: false}),
        );
        return;
      }

      model.dispatch(renameShoppingListAction({id: listId, newName}));

      model.localDispatch(pla_setRenameListDialogVisibility({visible: false}));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const removeAllProductsDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(
      pla_setRemoveAllProductsDialogVisibility({visible: false}),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeAllProductsDialogRemoveButtonHandler = () => {
    const shoppingListId = model.data.shoppingListId;
    const productsIdsArray = model.data.products.map((product) => product.id);

    model.localDispatch(
      pla_setRemoveAllProductsDialogVisibility({visible: false}),
    );
    model.dispatch(
      removeMultipleProductsAction({shoppingListId, productsIdsArray}),
    );
  };

  const removeAllProductsDialogCancelButtonHandler = useCallback(() => {
    model.localDispatch(
      pla_setRemoveAllProductsDialogVisibility({visible: false}),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    backButtonPressHandler,
    productsListRenderCompletedHandler,
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    productPressHandler,
    productRemoveHandler,
    categoryPressHandler,
    inputAreaAddCategoryPressHandler,
    shadedBackgroundPressHandler,
    // addCategoryDialogTouchOutsideHandler,
    // addCategoryDialogAddButtonHandler,
    // addCategoryDialogCancelButtonHandler,
    inputAreaCategoryLongPressHandler,
    // editCategoryDialogTouchOutsideHandler,
    // editCategoryDialogSaveButtonHandler,
    // editCategoryDialogRemoveButtonHandler,
    // editCategoryDialogCancelButtonHandler,
    inputAreaAddUnitPressHandler,
    // addUnitDialogTouchOutsideHandler,
    // addUnitDialogCancelButtonHandler,
    // addUnitDialogAddButtonHandler,
    inputAreaUnitLongPressHandler,
    // editUnitDialogTouchOutsideHandler,
    // editUnitDialogCancelButtonHandler,
    // editUnitDialogSaveButtonHandler,
    // editUnitDialogRemoveButtonHandler,
    // removeProductDialogTouchOutsideHandler,
    // removeProductDialogCancelButtonHandler,
    // removeProductDialogRemoveButtonHandler,
    shareButtonPressHandler,
    smsSharePressHandler,
    whatsAppSharePressHandler,
    // screenMenuRenameListPressHandler,
    // screenMenuMarkAllAsBoughtPressHandler,
    // screenMenuMarkAllAsNotBoughtPressHandler,
    // screenMenuMarkCurrentCategoryAsBoughtPressHandler,
    // screenMenuMarkCurrentCategoryAsNotBoughtPressHandler,
    // screenMenuRemoveBoughtPressHandler,
    // screenMenuRemoveCurrentCategoryPressHandler,
    // screenMenuRemoveAllPressHandler,
    // renameListDialogTouchOutsideHandler,
    // renameListDialogCancelPressHandler,
    // renameListDialogRenamePressHandler,
    // removeAllProductsDialogTouchOutsideHandler,
    // removeAllProductsDialogRemoveButtonHandler,
    // removeAllProductsDialogCancelButtonHandler,
  };
};
