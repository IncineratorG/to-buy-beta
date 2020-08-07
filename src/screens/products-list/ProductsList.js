import React from 'react';
import {BackHandler} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import ProductsListView from './views/ProductsListView';
import {productsListViewStyles} from './styles/productsListStyles';
import {useProductsListModel} from './models/productsListModel';
import {useProductsListController} from './controllers/productsListController';
import {SystemEventsHandler} from '../../services/service-utils/system-events-handler/SystemEventsHandler';
import ProductsListScreenMenuButton from '../../components/specific/products-list/screen-menu-button/ProductsListScreenMenuButton';

const ProductsList = () => {
  const styles = productsListViewStyles;
  const model = useProductsListModel();
  const controller = useProductsListController(model);

  const {
    backButtonPressHandler,
    screenMenuRenameListPressHandler,
    screenMenuMarkAllAsBoughtPressHandler,
    screenMenuMarkAllAsNotBoughtPressHandler,
    screenMenuMarkCurrentCategoryAsBoughtPressHandler,
    screenMenuMarkCurrentCategoryAsNotBoughtPressHandler,
    screenMenuRemoveBoughtPressHandler,
    screenMenuRemoveCurrentCategoryPressHandler,
    screenMenuRemoveAllPressHandler,
  } = controller;

  useFocusEffect(() => {
    model.navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={backButtonPressHandler} />
      ),
      headerRight: (props) => (
        <ProductsListScreenMenuButton
          onRenameList={screenMenuRenameListPressHandler}
          onRemoveAll={screenMenuRemoveAllPressHandler}
          onRemoveCurrentCategory={screenMenuRemoveCurrentCategoryPressHandler}
          onRemoveBought={screenMenuRemoveBoughtPressHandler}
          onAllBought={screenMenuMarkAllAsBoughtPressHandler}
          onAllNotBought={screenMenuMarkAllAsNotBoughtPressHandler}
          onCurrentCategoryBought={
            screenMenuMarkCurrentCategoryAsBoughtPressHandler
          }
          onCurrentCategoryNotBought={
            screenMenuMarkCurrentCategoryAsNotBoughtPressHandler
          }
        />
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
