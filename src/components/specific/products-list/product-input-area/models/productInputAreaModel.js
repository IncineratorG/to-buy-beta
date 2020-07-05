import {useState, useEffect, useReducer} from 'react';
import {Keyboard} from 'react-native';
import productInputAreaReducer from '../stores/productInputAreaReducer';
import productInputAreaState from '../stores/productInputAreaState';
import {piaa_hideInputArea} from '../stores/productInputAreaActions';

export const useProductInputAreaModel = ({
  onInputAreaHide,
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
  });

  return {
    data: {
      state,
      categoriesList,
      categoriesMap,
      unitsList,
      unitsMap,
    },
    setters: {},
    componentDispatch: dispatch,
  };
};
