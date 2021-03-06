import {useCallback} from 'react';
import {pla_closeAddCategoryDialog} from '../../stores/productListActions';
import {addCategoryAction} from '../../../../store/actions/categories/categoriesActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

export const useAddCategoryDialogController = (model) => {
  const addCategoryDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(pla_closeAddCategoryDialog({addedCategory: undefined}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategoryDialogAddButtonHandler = useCallback(({name, color}) => {
    model.dispatch(addCategoryAction({name, color}));
    // model.localDispatch(pla_closeAddCategoryDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategoryDialogCancelButtonHandler = useCallback(() => {
    model.localDispatch(pla_closeAddCategoryDialog({addedCategory: undefined}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategoryDialogRequestCloseAfterCategoryAddedHandler = useCallback(
    ({addedCategory}) => {
      model.localDispatch(pla_closeAddCategoryDialog({addedCategory}));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    addCategoryDialogTouchOutsideHandler,
    addCategoryDialogAddButtonHandler,
    addCategoryDialogCancelButtonHandler,
    addCategoryDialogRequestCloseAfterCategoryAddedHandler,
  };
};
