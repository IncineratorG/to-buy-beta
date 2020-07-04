import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  selectProductNameType,
  selectProductNoteType,
  selectProductQuantityType,
} from '../stores/productInputAreaActions';

export const useProductInputAreaController = (model) => {
  const productNameTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productNameTypePressHandler()'});
    model.componentDispatch(selectProductNameType());
  };

  const productQuantityTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productQuantityTypePressHandler()'});
    model.componentDispatch(selectProductQuantityType());
  };

  const productNoteTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productNoteTypePressHandler()'});
    model.componentDispatch(selectProductNoteType());
  };

  const confirmInputButtonPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'confirmInputButtonPressHandler()'});
  };

  return {
    productNameTypePressHandler,
    productQuantityTypePressHandler,
    productNoteTypePressHandler,
    confirmInputButtonPressHandler,
  };
};
