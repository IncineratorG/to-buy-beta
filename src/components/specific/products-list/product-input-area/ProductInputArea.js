import React from 'react';
import {productInputAreaStyles} from './styles/productInputAreaStyles';
import {useProductInputAreaModel} from './models/productInputAreaModel';
import {useProductInputAreaController} from './controllers/productInputAreaController';
import ProductInputAreaView from './views/ProductInputAreaView';

const ProductInputArea = () => {
  const styles = productInputAreaStyles;
  const model = useProductInputAreaModel();
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
