import React from 'react';
import {View} from 'react-native';
import ProductInputTypes from './input-types/ProductInputTypes';
import ProductInputOptions from './input-options/ProductInputOptions';
import ProductMainInput from './main-input/ProductMainInput';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
import ProductInputType from '../stores/types/productInputAreaProductInputTypes';
// import ProductSuggestion from './suggestion/ProductSuggestion';
import Suggestions from './suggestion/Suggestions';

const ProductInputAreaView = ({styles, model, controller}) => {
  const {
    state,
    categoriesList,
    extendedCategoriesList,
    unitsList,
    extendedUnitsList,
  } = model.data;

  const {type, suggestions} = state.currentInput;
  const {productSuggestions, noteSuggestions} = suggestions;

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
    // makeProductsSuggestion,
    // clearProductSuggestions,
    // productSuggestionPressHandler,
  } = controller;

  const getExtraTopComponentHeight = () => {
    if (type === ProductInputType.NOTE) {
      return styles.extraTopComponent.height;
    } else {
      return 0;
    }
  };
  const getInputOptionsComponentHeight = () => {
    if (
      type === ProductInputType.PRODUCT_NAME ||
      type === ProductInputType.QUANTITY
    ) {
      return styles.topAreaContainer.height;
    } else {
      return 0;
    }
  };
  const getSuggestionsComponentHeight = () => {
    switch (type) {
      case ProductInputType.PRODUCT_NAME: {
        if (productSuggestions.length > 0) {
          return styles.suggestionsAreaContainer.height;
        } else {
          return 0;
        }
      }

      case ProductInputType.NOTE: {
        if (noteSuggestions.length > 0) {
          return styles.suggestionsAreaContainer.height;
        } else {
          return 0;
        }
      }

      case ProductInputType.QUANTITY: {
        return 0;
      }

      default: {
        SystemEventsHandler.onError({
          err: 'ProductInputAreaView->UNKNOWN_TYPE: ' + type,
        });
        return 0;
      }
    }
  };

  const extraTopComponentHeight = getExtraTopComponentHeight();
  const inputOptionsComponentHeight = getInputOptionsComponentHeight();
  const suggestionsComponentHeight = getSuggestionsComponentHeight();
  const mainInputComponentHeight = styles.middleAreaContainer.height;
  const inputTypesComponentHeight = styles.bottomAreaContainer.height;
  const productInputAreaViewHeight =
    extraTopComponentHeight +
    inputOptionsComponentHeight +
    suggestionsComponentHeight +
    mainInputComponentHeight +
    inputTypesComponentHeight;

  const inputOptionsComponent = (
    <View
      style={[styles.topAreaContainer, {height: inputOptionsComponentHeight}]}>
      <ProductInputOptions
        state={state}
        unitsList={extendedUnitsList ? extendedUnitsList : unitsList}
        categoriesList={
          extendedCategoriesList ? extendedCategoriesList : categoriesList
        }
        wrapperHeight={inputOptionsComponentHeight}
        onCategoryPress={categoryPressHandler}
        onCategoryLongPress={categoryLongPressHandler}
        onAddCategoryPress={addCategoryPressHandler}
        onUnitPress={unitPressHandler}
        onUnitLongPress={unitLongPressHandler}
        onAddUnitPress={addUnitPressHandler}
      />
    </View>
  );

  const inputSuggestionsComponent = (
    <View
      style={[
        styles.suggestionsAreaContainer,
        {height: suggestionsComponentHeight},
      ]}>
      <Suggestions state={state} wrapperHeight={suggestionsComponentHeight} />
    </View>
  );

  const mainInputComponent = (
    <View
      style={[styles.middleAreaContainer, {height: mainInputComponentHeight}]}>
      <ProductMainInput
        state={state}
        unitsList={unitsList}
        categoriesList={categoriesList}
        onConfirmPress={confirmInputButtonPressHandler}
        onChangeText={changeInputTextHandler}
        // onMakeProductsSuggestion={makeProductsSuggestion}
      />
    </View>
  );

  const inputTypesComponent = (
    <View
      style={[styles.bottomAreaContainer, {height: inputTypesComponentHeight}]}>
      <ProductInputTypes
        onProductNamePress={productNameTypePressHandler}
        onProductQuantityPress={productQuantityTypePressHandler}
        onProductNotePress={productNoteTypePressHandler}
      />
    </View>
  );

  const extraTopComponent = (
    <View
      style={[styles.extraTopComponent, {height: extraTopComponentHeight}]}
    />
  );

  return (
    <View style={[styles.mainContainer, {height: productInputAreaViewHeight}]}>
      {extraTopComponent}
      {inputOptionsComponent}
      {inputSuggestionsComponent}
      {mainInputComponent}
      {inputTypesComponent}
    </View>
  );
};

export default ProductInputAreaView;
