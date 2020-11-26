import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import ProductInputType from '../../stores/types/productInputAreaProductInputTypes';
import CategoriesOption from './categories/CategoriesOption';
import UnitsOption from './units/UnitsOption';
import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';

const ProductInputOptions = ({
  state,
  unitsList,
  categoriesList,
  wrapperHeight,
  onCategoryPress,
  onCategoryLongPress,
  onAddCategoryPress,
  onUnitPress,
  onUnitLongPress,
  onAddUnitPress,
}) => {
  const {type} = state.currentInput;

  let optionsComponent = null;
  switch (type) {
    case ProductInputType.PRODUCT_NAME: {
      optionsComponent = (
        <CategoriesOption
          state={state}
          categoriesList={categoriesList}
          onCategoryPress={onCategoryPress}
          onCategoryLongPress={onCategoryLongPress}
          onAddCategoryPress={onAddCategoryPress}
        />
      );
      break;
    }

    case ProductInputType.QUANTITY: {
      optionsComponent = (
        <UnitsOption
          state={state}
          unitsList={unitsList}
          onUnitPress={onUnitPress}
          onUnitLongPress={onUnitLongPress}
          onAddUnitPress={onAddUnitPress}
        />
      );
      break;
    }
  }

  if (wrapperHeight <= 0) {
    return null;
  }

  return <View style={styles.mainContainer}>{optionsComponent}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default ProductInputOptions;
