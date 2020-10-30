import React from 'react';
import ProductsLocationView from './views/ProductsLocationView';
import {productsLocationStyles} from './styles/productsLocationStyles';
import {useProductsLocationModel} from './models/productsLocationModel';
import {useProductsListController} from '../products-list/controllers/products-list/productsListController';

const ProductsLocation = () => {
  const styles = productsLocationStyles;
  const model = useProductsLocationModel();
  const controller = useProductsListController(model);

  return (
    <ProductsLocationView
      styles={styles}
      model={model}
      controller={controller}
    />
  );
};

export default ProductsLocation;
