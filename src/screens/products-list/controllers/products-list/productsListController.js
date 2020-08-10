import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addProductAction,
  changeProductStatusAction,
  updateProductAction,
} from '../../../../store/actions/products-list/productsListActions';
import {updateShoppingListsAction} from '../../../../store/actions/shopping-lists/shoppingListsActions';
import {
  pla_hideProductInputArea,
  pla_openAddCategoryDialog,
  pla_openAddUnitDialog,
  pla_openEditCategoryDialog,
  pla_openEditUnitDialog,
  pla_openProductInputAreaInCreateMode,
  pla_openProductInputAreaInEditMode,
  pla_openRemoveProductDialog,
  pla_setProductsListCategoryUpdatingComplete,
  pla_setSelectedCategoryIdForCategoriesList,
  pla_setSelectedCategoryIdForProductsList,
  pla_setSharePanelVisibility,
} from '../../stores/productListActions';
import ProductStatus from '../../../../services/shopping-list/data/product-status/ProductStatus';
import {
  shareProductsListViaSmsAction,
  shareProductsListViaWhatsAppAction,
} from '../../../../store/actions/share/shareActions';

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

  const inputAreaAddUnitPressHandler = useCallback(({productInputState}) => {
    model.localDispatch(
      pla_openAddUnitDialog({productInputAreaState: productInputState}),
    );
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

  const smsSharePressHandler = () => {
    model.dispatch(
      shareProductsListViaSmsAction({id: model.data.shoppingListId}),
    );

    model.localDispatch(pla_setSharePanelVisibility({visible: false}));
  };

  const whatsAppSharePressHandler = () => {
    model.dispatch(
      shareProductsListViaWhatsAppAction({id: model.data.shoppingListId}),
    );

    model.localDispatch(pla_setSharePanelVisibility({visible: false}));
  };

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
    inputAreaCategoryLongPressHandler,
    inputAreaAddUnitPressHandler,
    inputAreaUnitLongPressHandler,
    shareButtonPressHandler,
    smsSharePressHandler,
    whatsAppSharePressHandler,
  };
};
