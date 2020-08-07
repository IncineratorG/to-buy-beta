import React from 'react';
import {productInputAreaStyles} from './styles/productInputAreaStyles';
import {useProductInputAreaModel} from './models/productInputAreaModel';
import {useProductInputAreaController} from './controllers/productInputAreaController';
import ProductInputAreaView from './views/ProductInputAreaView';

const ProductInputArea = ({
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
  allCategoriesMap,
  unitsList,
  unitsMap,
  allUnitsMap,
}) => {
  const styles = productInputAreaStyles;
  const model = useProductInputAreaModel({
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
    allCategoriesMap,
    unitsList,
    unitsMap,
    allUnitsMap,
  });
  const controller = useProductInputAreaController(model);

  return (
    <ProductInputAreaView
      styles={styles}
      model={model}
      controller={controller}
    />
  );
};

export default ProductInputArea;
