import React from 'react';
import {StyleSheet} from 'react-native';
import ProductNotCompleted from './not-completed/ProductNotCompleted';
import {productNotCompletedStyles} from './not-completed/styles/productNotCompletedStyles';
import ProductCompleted from './completed/ProductCompleted';
import {productCompletedStyles} from './completed/styles/productCompletedStyles';
import ProductExtra from './extra/ProductExtra';
import {productExtraStyles} from './extra/styles/productExtraStyles';
import ProductStatus from '../../../../../services/shopping-list/data/product-status/ProductStatus';
import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';

const Product = ({
  product,
  onProductPress,
  onProductLongPress,
  onStatusPress,
  unitsMap,
  categoriesMap,
  selectedCategory,
}) => {
  // SystemEventsHandler.onInfo({info: 'PRODUCT_RERENDERS'});

  const productNotCompleted = (
    <ProductNotCompleted
      styles={productNotCompletedStyles}
      product={product}
      categoriesMap={categoriesMap}
      unitsMap={unitsMap}
      onProductPress={onProductPress}
      onProductLongPress={onProductLongPress}
      onStatusPress={onStatusPress}
      selectedCategory={selectedCategory}
    />
  );

  const productCompleted = (
    <ProductCompleted
      styles={productCompletedStyles}
      product={product}
      unitsMap={unitsMap}
      onProductLongPress={onProductLongPress}
      onStatusPress={onStatusPress}
      selectedCategory={selectedCategory}
    />
  );

  const productExtra = <ProductExtra styles={productExtraStyles} />;

  if (product.extra) {
    return productExtra;
  } else if (product.completionStatus === ProductStatus.COMPLETED) {
    return productCompleted;
  } else if (product.completionStatus === ProductStatus.NOT_COMPLETED) {
    return productNotCompleted;
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    width: 200,
    marginTop: 8,
    backgroundColor: 'grey',
  },
});

export default React.memo(Product);
