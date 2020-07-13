import React from 'react';
import {BackHandler} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import ProductsListView from './views/ProductsListView';
import {productsListViewStyles} from './styles/productsListStyles';
import {useProductsListModel} from './models/productsListModel';
import {useProductsListController} from './controllers/productsListController';
import {SystemEventsHandler} from '../../services/service-utils/system-events-handler/SystemEventsHandler';

const ProductsList = () => {
  const styles = productsListViewStyles;
  const model = useProductsListModel();
  const controller = useProductsListController(model);

  const {backButtonPressHandler} = controller;

  useFocusEffect(() => {
    model.navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={backButtonPressHandler} />
      ),
    });

    BackHandler.addEventListener('hardwareBackPress', backButtonPressHandler);

    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        backButtonPressHandler,
      );
  }, []);

  return (
    <ProductsListView styles={styles} model={model} controller={controller} />
  );
};

export default ProductsList;
