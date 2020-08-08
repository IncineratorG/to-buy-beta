import React from 'react';
import {BackHandler} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import ProductsListView from './views/ProductsListView';
import {productsListViewStyles} from './styles/productsListStyles';
import {useProductsListModel} from './models/productsListModel';
import ProductsListScreenMenuButton from '../../components/specific/products-list/screen-menu-button/ProductsListScreenMenuButton';
import {useMainProductsListController} from './controllers/mainProductsListController';

const ProductsList = () => {
  const styles = productsListViewStyles;
  const model = useProductsListModel();
  const mainController = useMainProductsListController(model);

  const {screenMenuButtonController} = mainController;
  const {
    screenMenuRenameListPressHandler,
    screenMenuMarkAllAsBoughtPressHandler,
    screenMenuMarkAllAsNotBoughtPressHandler,
    screenMenuMarkCurrentCategoryAsBoughtPressHandler,
    screenMenuMarkCurrentCategoryAsNotBoughtPressHandler,
    screenMenuRemoveBoughtPressHandler,
    screenMenuRemoveCurrentCategoryPressHandler,
    screenMenuRemoveAllPressHandler,
  } = screenMenuButtonController;

  const {productsListController} = mainController;
  const {backButtonPressHandler} = productsListController;

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
    <ProductsListView
      styles={styles}
      model={model}
      controller={mainController}
    />
  );
};

export default ProductsList;
