import React from 'react';
import {View} from 'react-native';
import ProductInputTypes from './input-types/ProductInputTypes';
import ProductInputOptions from './input-options/ProductInputOptions';
import ProductMainInput from './main-input/ProductMainInput';
import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import ProductInputType from '../stores/types/productInputAreaProductInputTypes';

const ProductInputAreaView = ({styles, model, controller}) => {
  const {
    state,
    categoriesList,
    categoriesMap,
    unitsList,
    unitsMap,
  } = model.data;

  const {type} = state.currentInput;

  const {
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
  } = controller;

  const inputOptionsComponent = (
    <View
      style={[
        styles.topAreaContainer,
        {height: type === ProductInputType.NOTE ? 0 : 50},
      ]}>
      <ProductInputOptions
        state={state}
        unitsList={unitsList}
        categoriesList={categoriesList}
        onCategoryPress={categoryPressHandler}
        onCategoryLongPress={categoryLongPressHandler}
        onAddCategoryPress={addCategoryPressHandler}
        onUnitPress={unitPressHandler}
        onUnitLongPress={unitLongPressHandler}
        onAddUnitPress={addUnitPressHandler}
      />
    </View>
  );

  const mainInputComponent = (
    <View style={styles.middleAreaContainer}>
      <ProductMainInput
        state={state}
        unitsList={unitsList}
        categoriesList={categoriesList}
        onConfirmPress={confirmInputButtonPressHandler}
        onChangeText={changeInputTextHandler}
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
    <View
      style={[
        styles.mainContainer,
        {height: type === ProductInputType.NOTE ? 100 : 150},
      ]}>
      {inputOptionsComponent}
      {mainInputComponent}
      {inputTypesComponent}
    </View>
  );
};

export default ProductInputAreaView;
