import {useCallback} from 'react';
import {pla_setRemoveAllProductsDialogVisibility} from '../../stores/productListActions';
import {removeMultipleProductsAction} from '../../../../store/actions/products-list/productsListActions';

export const useRemoveAllProductsDialogController = (model) => {
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
    removeAllProductsDialogTouchOutsideHandler,
    removeAllProductsDialogRemoveButtonHandler,
    removeAllProductsDialogCancelButtonHandler,
  };
};
