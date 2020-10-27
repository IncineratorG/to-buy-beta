import {useCallback} from 'react';
import {pla_closeAddUnitDialog} from '../../stores/productListActions';
import {addUnitAction} from '../../../../store/actions/units/unitsActions';

export const useAddUnitDialogController = (model) => {
  const addUnitDialogTouchOutsideHandler = useCallback(() => {
    model.localDispatch(pla_closeAddUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUnitDialogCancelButtonHandler = useCallback(() => {
    model.localDispatch(pla_closeAddUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUnitDialogAddButtonHandler = useCallback(({name}) => {
    model.dispatch(addUnitAction({name}));
    // model.localDispatch(pla_closeAddUnitDialog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUnitDialogRequestCloseAfterUnitAddedHandler = useCallback(
    ({addedUnit}) => {
      setTimeout(() => {
        model.localDispatch(pla_closeAddUnitDialog({addedUnit}));
      }, 50);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    addUnitDialogTouchOutsideHandler,
    addUnitDialogCancelButtonHandler,
    addUnitDialogAddButtonHandler,
    addUnitDialogRequestCloseAfterUnitAddedHandler,
  };
};
