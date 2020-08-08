import {pla_setRemoveAllCategoryProductsDialogVisibility} from '../../stores/productListActions';
import ProductStatus from '../../../../services/shopping-list/data/product-status/ProductStatus';
import {removeMultipleProductsAction} from '../../../../store/actions/products-list/productsListActions';
import ProductInitialCategories from '../../../../components/specific/products-list/product-initial-categories/ProductInitialCategories';

export const useRemoveAllCategoryProductsDialogController = (model) => {
  const removeAllCategoryProductsDialogTouchOutsideHandler = () => {
    model.localDispatch(
      pla_setRemoveAllCategoryProductsDialogVisibility({visible: false}),
    );
  };

  const removeAllCategoryProductsDialogRemoveButtonHandler = () => {
    const shoppingListId = model.data.shoppingListId;
    const selectedCategoryId =
      model.data.state.selectedCategory.productsList.selectedCategoryId;

    let productsIdsArray = [];
    if (selectedCategoryId === ProductInitialCategories.COMPLETED) {
      productsIdsArray = model.data.products
        .filter(
          (product) => product.completionStatus === ProductStatus.COMPLETED,
        )
        .map((product) => product.id);
    } else if (selectedCategoryId === ProductInitialCategories.NOT_COMPLETED) {
      productsIdsArray = model.data.products
        .filter(
          (product) => product.completionStatus === ProductStatus.NOT_COMPLETED,
        )
        .map((product) => product.id);
    } else if (selectedCategoryId === ProductInitialCategories.ALL) {
      productsIdsArray = model.data.products.map((product) => product.id);
    } else {
      productsIdsArray = model.data.products
        .filter((product) => product.categoryId === selectedCategoryId)
        .map((product) => product.id);
    }

    model.dispatch(
      removeMultipleProductsAction({shoppingListId, productsIdsArray}),
    );

    model.localDispatch(
      pla_setRemoveAllCategoryProductsDialogVisibility({visible: false}),
    );
  };

  const removeAllCategoryProductsDialogCancelButtonHandler = () => {
    model.localDispatch(
      pla_setRemoveAllCategoryProductsDialogVisibility({visible: false}),
    );
  };

  return {
    removeAllCategoryProductsDialogTouchOutsideHandler,
    removeAllCategoryProductsDialogRemoveButtonHandler,
    removeAllCategoryProductsDialogCancelButtonHandler,
  };
};
