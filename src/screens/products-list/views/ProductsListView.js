import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EmptyProductsListScreen} from '../../../components/specific/products-list/empty-products-list-screen/EmptyProductsListScreen';
import AddButton from '../../../components/common/add-button/AddButton';
import ListOfProducts from '../../../components/specific/products-list/list-of-products/ListOfProducts';
import ProductCategoriesList from '../../../components/specific/products-list/product-categories-list/ProductCategoriesList';
import ProductCategoriesListLoading from '../../../components/specific/products-list/product-categories-list-loading/ProductCategoriesListLoading';
import ListOfProductsLoading from '../../../components/specific/products-list/list-of-products-loading/ListOfProductsLoading';
import ProductInputArea from '../../../components/specific/products-list/product-input-area/ProductInputArea';
import {Dialog} from 'react-native-simple-dialogs';
import AddCategoryDialog from '../../../components/specific/products-list/add-category-dialog/AddCategoryDialog';

const ProductsListView = ({styles, model, controller}) => {
  const {
    dataLoading,
    usedCategoriesLoading,
    shoppingListId,
    products,
    unitsList,
    unitsMap,
    categoriesList,
    categoriesMap,
    inputAreaVisible,
    addCategoryDialogVisible,
    inputAreaState,
  } = model.data;

  const {
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    productPressHandler,
    productRemoveHandler,
    categoryPressHandler,
    addCategoryPressHandler,
    shadedBackgroundPressHandler,
    addCategoryDialogTouchOutsideHandler,
    addCategoryDialogAddButtonHandler,
    addCategoryDialogCancelButtonHandler,
  } = controller;

  // ===
  const addCategoryDialog = (
    <AddCategoryDialog
      visible={addCategoryDialogVisible}
      onTouchOutside={addCategoryDialogTouchOutsideHandler}
      onAddPress={addCategoryDialogAddButtonHandler}
      onCancelPress={addCategoryDialogCancelButtonHandler}
    />
  );
  // ===

  const bottomGradientComponent = (
    <LinearGradient
      style={styles.bottomGradient}
      colors={[
        'rgba(255, 255, 255, 0.0)',
        'rgba(255, 255, 255, 0.5)',
        'rgba(255, 255, 255, 1.0)',
      ]}
    />
  );

  const emptyProductListScreenComponent = (
    <View style={styles.emptyShoppingListScreenContent}>
      <EmptyProductsListScreen />
    </View>
  );

  const productCategoriesComponent = usedCategoriesLoading ? (
    <View style={styles.productCategoriesContainer}>
      <ProductCategoriesListLoading />
    </View>
  ) : (
    <View style={styles.productCategoriesContainer}>
      <ProductCategoriesList
        categories={categoriesList}
        onCategoryPress={categoryPressHandler}
        selectedCategory={categoriesList[0]}
      />
    </View>
  );

  const productsListComponent = (
    <View style={styles.shoppingListContainer}>
      <ListOfProducts
        list={products}
        onProductPress={productPressHandler}
        onStatusPress={statusPressHandler}
        onRemovePress={productRemoveHandler}
        unitsMap={unitsMap}
        categoriesMap={categoriesMap}
      />
    </View>
  );

  const addButtonComponent = (
    <View style={styles.addShoppingListItemButtonContainer}>
      <AddButton
        style={[styles.addShoppingListItemButton, {zIndex: 20}]}
        onClick={addProductButtonHandler}
      />
    </View>
  );

  const shadedBackgroundComponent = inputAreaVisible ? (
    <TouchableWithoutFeedback
      onPress={shadedBackgroundPressHandler}
      behavior={'position'}>
      <View style={styles.shadedBackground} />
    </TouchableWithoutFeedback>
  ) : null;

  const inputAreaComponent = inputAreaVisible ? (
    <View style={styles.inputAreaContainer}>
      <ProductInputArea
        onInputAreaHide={inputAreaHideHandler}
        onAddCategoryPress={addCategoryPressHandler}
        predefinedState={inputAreaState}
        categoriesList={categoriesList}
        categoriesMap={categoriesMap}
        unitsList={unitsList}
        unitsMap={unitsMap}
      />
    </View>
  ) : null;

  const nonEmptyShoppingListScreenComponent = (
    <View style={styles.nonEmptyShoppingListScreenContent}>
      {productCategoriesComponent}
      {productsListComponent}
    </View>
  );

  const screenContent = products.length
    ? nonEmptyShoppingListScreenComponent
    : emptyProductListScreenComponent;

  const loadedComponent = (
    <View style={styles.mainContainer}>
      {screenContent}
      {addButtonComponent}
      {inputAreaComponent}
      {shadedBackgroundComponent}
      {bottomGradientComponent}
      {addCategoryDialog}
    </View>
  );

  const loadingComponent = (
    <View style={styles.nonEmptyShoppingListScreenContent}>
      <View style={styles.productCategoriesContainer}>
        <ProductCategoriesListLoading />
      </View>
      <ListOfProductsLoading />
    </View>
  );

  const activeComponent = dataLoading ? loadingComponent : loadedComponent;
  return activeComponent;
};

export default ProductsListView;
