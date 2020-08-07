import {useCallback} from 'react';
import {pla_closeRemoveProductDialog} from '../../stores/productListActions';
import {removeProductAction} from '../../../../store/actions/products-list/productsListActions';

export const useRemoveProductDialogController = (model) => {
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

  return {
    removeProductDialogTouchOutsideHandler,
    removeProductDialogCancelButtonHandler,
    removeProductDialogRemoveButtonHandler,
  };
};
