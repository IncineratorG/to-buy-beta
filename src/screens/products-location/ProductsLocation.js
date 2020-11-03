import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import ProductsLocationView from './views/ProductsLocationView';
import {productsLocationStyles} from './styles/productsLocationStyles';
import {useProductsLocationModel} from './models/productsLocationModel';
import ProductsLocationScreenMenuButton from '../../components/specific/products-location/screen-menu-button/ProductsLocationScreenMenuButton';
import {useProductsLocationController} from './controllers/productsLocationController';

const ProductsLocation = () => {
  const styles = productsLocationStyles;
  const model = useProductsLocationModel();
  const controller = useProductsLocationController(model);

  useFocusEffect(() => {
    model.navigation.setOptions({
      headerRight: (props) => (
        <ProductsLocationScreenMenuButton
          availableMapProviderTypes={model.data.availableMapProviderTypes}
          currentMapProviderType={model.data.currentMapProviderType}
          onMapProviderPress={controller.screenMenuMapProviderTypePressHandler}
        />
      ),
    });
  });

  return (
    <ProductsLocationView
      styles={styles}
      model={model}
      controller={controller}
    />
  );
};

export default ProductsLocation;
