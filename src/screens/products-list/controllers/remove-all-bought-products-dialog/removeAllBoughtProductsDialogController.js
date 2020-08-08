import {
  pla_setRemoveAllBoughtProductsDialogVisibility,
  pla_setRemoveAllProductsDialogVisibility,
} from '../../stores/productListActions';
import {removeMultipleProductsAction} from '../../../../store/actions/products-list/productsListActions';
import ProductStatus from '../../../../services/shopping-list/data/product-status/ProductStatus';

export const useRemoveAllBoughtProductsDialogController = (model) => {
  const removeAllBoughtProductsDialogTouchOutsideHandler = () => {
    model.localDispatch(
      pla_setRemoveAllBoughtProductsDialogVisibility({visible: false}),
    );
  };

  const removeAllBoughtProductsDialogRemoveButtonHandler = () => {
    const shoppingListId = model.data.shoppingListId;
    const productsIdsArray = model.data.products
      .filter((product) => product.completionStatus === ProductStatus.COMPLETED)
      .map((product) => product.id);

    model.dispatch(
      removeMultipleProductsAction({shoppingListId, productsIdsArray}),
    );

    model.localDispatch(
      pla_setRemoveAllBoughtProductsDialogVisibility({visible: false}),
    );
  };

  const removeAllBoughtProductsDialogCancelButtonHandler = () => {
    model.localDispatch(
      pla_setRemoveAllBoughtProductsDialogVisibility({visible: false}),
    );
  };

  return {
    removeAllBoughtProductsDialogTouchOutsideHandler,
    removeAllBoughtProductsDialogRemoveButtonHandler,
    removeAllBoughtProductsDialogCancelButtonHandler,
  };
};
