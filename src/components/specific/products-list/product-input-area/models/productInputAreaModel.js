import {useState, useEffect, useReducer} from 'react';
import {Keyboard} from 'react-native';
import productInputAreaReducer from '../stores/productInputAreaReducer';
import productInputAreaState from '../stores/productInputAreaState';
import {
  piaa_hideInputArea,
  piaa_setCategory,
  piaa_setPredefinedData,
  piaa_setPredefinedState,
  piaa_setUnit,
} from '../stores/productInputAreaActions';
import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';

export const useProductInputAreaModel = ({
  onInputAreaHide,
  onAddCategoryPress,
  onCategoryLongPress,
  onAddUnitPress,
  onUnitLongPress,
  onSubmit,
  predefinedData,
  predefinedState,
  categoriesList,
  categoriesMap,
  unitsList,
  unitsMap,
}) => {
  const [state, dispatch] = useReducer(
    productInputAreaReducer,
    productInputAreaState,
  );

  useEffect(() => {
    const keyboardHideHandler = () => {
      dispatch(piaa_hideInputArea());

      if (onInputAreaHide) {
        onInputAreaHide({inputAreaState: state});
      }
    };

    Keyboard.addListener('keyboardDidHide', keyboardHideHandler);
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardHideHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (predefinedState) {
      dispatch(piaa_setPredefinedState({state: predefinedState}));
    } else if (predefinedData) {
      const {name, quantity, note, unitId, categoryId} = predefinedData;
      const unit = unitsMap.get(unitId);
      const category = categoriesMap.get(categoryId);

      dispatch(piaa_setPredefinedData({name, quantity, note, unit, category}));
    } else {
      let defaultUnit;
      const defaultUnitsList = unitsList.filter((u) => u.default);
      if (defaultUnitsList.length) {
        defaultUnit = defaultUnitsList[0];
      }

      let defaultCategory;
      const defaultCategoriesList = categoriesList.filter((c) => c.default);
      if (defaultCategoriesList.length) {
        defaultCategory = defaultCategoriesList[0];
      }

      dispatch(piaa_setUnit({unit: defaultUnit}));
      dispatch(piaa_setCategory({category: defaultCategory}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predefinedState, predefinedData]);

  return {
    data: {
      state,
      categoriesList,
      categoriesMap,
      unitsList,
      unitsMap,
    },
    setters: {},
    externalHandlers: {
      onInputAreaHide,
      onAddCategoryPress,
      onCategoryLongPress,
      onAddUnitPress,
      onUnitLongPress,
      onSubmit,
    },
    localDispatch: dispatch,
  };
};
