import {useCallback} from 'react';
import {pla_setRenameListDialogVisibility} from '../../stores/productListActions';
import {renameShoppingListAction} from '../../../../store/actions/shopping-lists/shoppingListsActions';

export const useRenameListDialogController = (model) => {
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

  return {
    renameListDialogTouchOutsideHandler,
    renameListDialogCancelPressHandler,
    renameListDialogRenamePressHandler,
  };
};
