import React, {useRef} from 'react';
import {TextInput, View} from 'react-native';
import ProductInputTypes from './input-types/ProductInputTypes';
import ProductInputOptions from './input-options/ProductInputOptions';
import ProductMainInput from './main-input/ProductMainInput';
import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';

const ProductInputAreaView = ({styles, model, controller}) => {
  const {state} = model.data;

  const {
    productNameTypePressHandler,
    productQuantityTypePressHandler,
    productNoteTypePressHandler,
    confirmInputButtonPressHandler,
  } = controller;

  const inputOptionsComponent = (
    <View style={styles.topAreaContainer}>
      <ProductInputOptions />
    </View>
  );

  const mainInputComponent = (
    <View style={styles.middleAreaContainer}>
      <ProductMainInput
        state={state}
        onConfirmPress={confirmInputButtonPressHandler}
      />
    </View>
  );

  const inputTypesComponent = (
    <View style={styles.bottomAreaContainer}>
      <ProductInputTypes
        onProductNamePress={productNameTypePressHandler}
        onProductQuantityPress={productQuantityTypePressHandler}
        onProductNotePress={productNoteTypePressHandler}
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {inputOptionsComponent}
      {mainInputComponent}
      {inputTypesComponent}
    </View>
  );
};

export default ProductInputAreaView;
