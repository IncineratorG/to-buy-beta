import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  piaa_selectProductNameType,
  piaa_selectProductNoteType,
  piaa_selectProductQuantityType,
  piaa_setNote,
  piaa_setProductName,
  piaa_setQuantity,
} from '../stores/productInputAreaActions';
import ProductInputType from '../stores/types/productInputAreaProductInputTypes';

export const useProductInputAreaController = (model) => {
  const productNameTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productNameTypePressHandler()'});
    model.componentDispatch(piaa_selectProductNameType());
  };

  const productQuantityTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productQuantityTypePressHandler()'});
    model.componentDispatch(piaa_selectProductQuantityType());
  };

  const productNoteTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productNoteTypePressHandler()'});
    model.componentDispatch(piaa_selectProductNoteType());
  };

  const confirmInputButtonPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'confirmInputButtonPressHandler()'});
  };

  const changeInputTextHandler = ({text, inputType}) => {
    SystemEventsHandler.onInfo({
      info: 'changeInputTextHandler(): ' + text + ' - ' + inputType,
    });

    switch (inputType) {
      case ProductInputType.PRODUCT_NAME: {
        model.componentDispatch(piaa_setProductName({name: text}));
        break;
      }

      case ProductInputType.QUANTITY: {
        model.componentDispatch(piaa_setQuantity({quantity: text}));
        break;
      }

      case ProductInputType.NOTE: {
        model.componentDispatch(piaa_setNote({note: text}));
        break;
      }

      default: {
        SystemEventsHandler.onError({
          err:
            'useProductInputAreaController()->changeInputTextHandler: BAD_INPUT_TYPE: ' +
            inputType,
        });
      }
    }
  };

  return {
    productNameTypePressHandler,
    productQuantityTypePressHandler,
    productNoteTypePressHandler,
    confirmInputButtonPressHandler,
    changeInputTextHandler,
  };
};
