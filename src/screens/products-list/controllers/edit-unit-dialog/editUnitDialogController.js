import {useCallback} from 'react';
import {pla_closeEditUnitDialog} from '../../stores/productListActions';
import {
  removeUnitAction,
  updateUnitAction,
} from '../../../../store/actions/units/unitsActions';

export const useEditUnitDialogController = (model) => {
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

  return {
    editUnitDialogTouchOutsideHandler,
    editUnitDialogCancelButtonHandler,
    editUnitDialogSaveButtonHandler,
    editUnitDialogRemoveButtonHandler,
  };
};
