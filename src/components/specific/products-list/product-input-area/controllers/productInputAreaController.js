import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
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
import {
  clearProductSuggestionsAction,
  suggestProductsBasedOnInputAction,
} from '../../../../../store/actions/product-suggestion/productSuggestionActions';
import {TestProductSuggester} from './TestProductSuggester';

export const useProductInputAreaController = (model) => {
  const productNameTypePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({info: 'productNameTypePressHandler()'});
    model.localDispatch(piaa_selectProductNameType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productQuantityTypePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({info: 'productQuantityTypePressHandler()'});
    model.localDispatch(piaa_selectProductQuantityType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productNoteTypePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({info: 'productNoteTypePressHandler()'});
    model.localDispatch(piaa_selectProductNoteType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // model.dispatch(clearProductSuggestionsAction());

    model.externalHandlers.onSubmit({
      productName,
      quantity,
      note,
      unitId,
      categoryId,
    });
    model.localDispatch(piaa_submitValues());
  };

  const changeInputTextHandler = useCallback(
    ({text, inputType}) => {
      switch (inputType) {
        case ProductInputType.PRODUCT_NAME: {
          model.localDispatch(piaa_setProductName({name: text}));
          model.dispatch(
            suggestProductsBasedOnInputAction({
              partialProductName: text,
              excludedProductNamesSet:
                model.data.state.currentInput.productsNamesSet,
            }),
          );
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [model.data.state.currentInput.productsNamesSet],
  );

  const categoryPressHandler = useCallback(({category}) => {
    model.localDispatch(piaa_setCategory({category}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const unitPressHandler = useCallback(({unit}) => {
    model.localDispatch(piaa_setUnit({unit}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // const makeProductsSuggestion = useCallback(({partialProductName}) => {
  //   model.dispatch(suggestProductsAction({partialProductName}));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const clearProductSuggestions = useCallback(() => {
  //   model.dispatch(clearProductSuggestionsAction());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const productSuggestionPressHandler = ({suggestion}) => {
  //   if (!suggestion) {
  //     return;
  //   }
  //
  //   const {productName, unitId, categoryId} = suggestion;
  //
  //   if (productName) {
  //     model.localDispatch(piaa_setProductName({name: productName}));
  //   }
  //   if (unitId) {
  //     const unit = model.data.unitsMap.get(unitId);
  //     if (unit) {
  //       model.localDispatch(piaa_setUnit({unit}));
  //     }
  //   }
  //   if (categoryId) {
  //     const category = model.data.categoriesMap.get(categoryId);
  //     if (category) {
  //       model.localDispatch(piaa_setCategory({category}));
  //     }
  //   }
  //
  //   model.dispatch(clearProductSuggestionsAction());
  // };

  // ===
  const suggestRandomProductsHandler = () => {
    SystemEventsHandler.onInfo({info: 'suggestRandomProductsHandler()'});
  };

  // const suggest
  // ===

  // const categoriesListScrollHandler = useCallback((e) => {
  //   // SystemEventsHandler.onInfo({
  //   //   info: 'categoriesListScrollHandler: ' + e.nativeEvent.contentOffset.x,
  //   // });
  // }, []);

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
    // makeProductsSuggestion,
    // clearProductSuggestions,
    // productSuggestionPressHandler,
  };
};
