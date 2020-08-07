import {useCallback} from 'react';
import {pla_closeEditCategoryDialog} from '../../stores/productListActions';
import {
  removeCategoryAction,
  updateCategoryAction,
} from '../../../../store/actions/categories/categoriesActions';

export const useEditCategoryDialogController = (model) => {
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

  return {
    editCategoryDialogTouchOutsideHandler,
    editCategoryDialogSaveButtonHandler,
    editCategoryDialogRemoveButtonHandler,
    editCategoryDialogCancelButtonHandler,
  };
};
