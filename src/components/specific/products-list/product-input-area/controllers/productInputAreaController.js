import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  piaa_selectProductNameType,
  piaa_selectProductNoteType,
  piaa_selectProductQuantityType,
  piaa_setCategory,
  piaa_setNote,
  piaa_setProductName,
  piaa_setQuantity,
  piaa_setUnit,
  piaa_submitValues,
} from '../stores/productInputAreaActions';
import ProductInputType from '../stores/types/productInputAreaProductInputTypes';

export const useProductInputAreaController = (model) => {
  const productNameTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productNameTypePressHandler()'});
    model.localDispatch(piaa_selectProductNameType());
  };

  const productQuantityTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productQuantityTypePressHandler()'});
    model.localDispatch(piaa_selectProductQuantityType());
  };

  const productNoteTypePressHandler = () => {
    SystemEventsHandler.onInfo({info: 'productNoteTypePressHandler()'});
    model.localDispatch(piaa_selectProductNoteType());
  };

  const confirmInputButtonPressHandler = ({
    productName,
    quantity,
    note,
    unitId,
    categoryId,
  }) => {
    if (!productName || !quantity || !unitId || !categoryId) {
      const input = {
        productName,
        quantity,
        note,
        unitId,
        categoryId,
      };
      SystemEventsHandler.onError({
        err:
          'confirmInputButtonPressHandler()->BAD_INPUT: ' +
          JSON.stringify(input),
      });

      return;
    }

    model.externalHandlers.onSubmit({
      productName,
      quantity,
      note,
      unitId,
      categoryId,
    });
    model.localDispatch(piaa_submitValues());
  };

  const changeInputTextHandler = ({text, inputType}) => {
    switch (inputType) {
      case ProductInputType.PRODUCT_NAME: {
        model.localDispatch(piaa_setProductName({name: text}));
        break;
      }

      case ProductInputType.QUANTITY: {
        model.localDispatch(piaa_setQuantity({quantity: text}));
        break;
      }

      case ProductInputType.NOTE: {
        model.localDispatch(piaa_setNote({note: text}));
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

  const categoryPressHandler = ({category}) => {
    model.localDispatch(piaa_setCategory({category}));
  };

  const categoryLongPressHandler = ({category}) => {
    model.externalHandlers.onCategoryLongPress({
      category,
      productInputState: model.data.state,
    });
  };

  const addCategoryPressHandler = () => {
    model.externalHandlers.onAddCategoryPress({
      productInputState: model.data.state,
    });
  };

  const unitPressHandler = ({unit}) => {
    model.localDispatch(piaa_setUnit({unit}));
  };

  const unitLongPressHandler = ({unit}) => {
    model.externalHandlers.onUnitLongPress({
      productInputState: model.data.state,
      unit,
    });
  };

  const addUnitPressHandler = () => {
    model.externalHandlers.onAddUnitPress({
      productInputState: model.data.state,
    });
  };

  return {
    productNameTypePressHandler,
    productQuantityTypePressHandler,
    productNoteTypePressHandler,
    confirmInputButtonPressHandler,
    changeInputTextHandler,
    categoryPressHandler,
    categoryLongPressHandler,
    addCategoryPressHandler,
    unitPressHandler,
    unitLongPressHandler,
    addUnitPressHandler,
  };
};
