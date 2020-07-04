import {useState, useEffect, useReducer} from 'react';
import productInputAreaReducer from '../stores/productInputAreaReducer';
import productInputAreaState from '../stores/productInputAreaState';

export const useProductInputAreaModel = () => {
  const [state, dispatch] = useReducer(
    productInputAreaReducer,
    productInputAreaState,
  );

  return {
    data: {
      state,
    },
    setters: {},
    componentDispatch: dispatch,
  };
};
