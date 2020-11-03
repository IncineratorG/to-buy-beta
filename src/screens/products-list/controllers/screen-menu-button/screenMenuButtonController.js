import {useCallback} from 'react';
import {
  pla_setRemoveAllBoughtProductsDialogVisibility,
  pla_setRemoveAllCategoryProductsDialogVisibility,
  pla_setRemoveAllProductsDialogVisibility,
  pla_setRenameListDialogVisibility,
} from '../../stores/productListActions';
import ProductStatus from '../../../../services/shopping-list/data/product-status/ProductStatus';
import {changeMultipleProductsStatusAction} from '../../../../store/actions/products-list/productsListActions';
import ProductInitialCategories from '../../../../components/specific/products-list/product-initial-categories/ProductInitialCategories';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

export const useScreenMenuButtonController = (model) => {
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
    model.localDispatch(
      pla_setRemoveAllBoughtProductsDialogVisibility({visible: true}),
    );
  };

  const screenMenuRemoveCurrentCategoryPressHandler = () => {
    model.localDispatch(
      pla_setRemoveAllCategoryProductsDialogVisibility({visible: true}),
    );
  };

  const screenMenuRemoveAllPressHandler = useCallback(() => {
    model.localDispatch(
      pla_setRemoveAllProductsDialogVisibility({visible: true}),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    screenMenuRenameListPressHandler,
    screenMenuMarkAllAsBoughtPressHandler,
    screenMenuMarkAllAsNotBoughtPressHandler,
    screenMenuMarkCurrentCategoryAsBoughtPressHandler,
    screenMenuMarkCurrentCategoryAsNotBoughtPressHandler,
    screenMenuRemoveBoughtPressHandler,
    screenMenuRemoveCurrentCategoryPressHandler,
    screenMenuRemoveAllPressHandler,
  };
};
