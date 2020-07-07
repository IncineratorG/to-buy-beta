import {useState, useEffect, useReducer} from 'react';
import {Keyboard} from 'react-native';
import productInputAreaReducer from '../stores/productInputAreaReducer';
import productInputAreaState from '../stores/productInputAreaState';
import {
  piaa_hideInputArea,
  piaa_setPredefinedState,
} from '../stores/productInputAreaActions';

export const useProductInputAreaModel = ({
  onInputAreaHide,
  onAddCategoryPress,
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    },
    localDispatch: dispatch,
  };
};
