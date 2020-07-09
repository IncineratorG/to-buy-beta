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
import AddCategoryDialog from '../../../components/specific/products-list/add-category-dialog/AddCategoryDialog';
import EditCategoryDialog from '../../../components/specific/products-list/edit-category-dialog/EditCategoryDialog';
import AddUnitDialog from '../../../components/specific/products-list/add-unit-dialog/AddUnitDialog';
import EditUnitDialog from '../../../components/specific/products-list/edit-unit-dialog/EditUnitDialog';

const ProductsListView = ({styles, model, controller}) => {
  const {
    state,
    shoppingListId,
    products,
    unitsList,
    unitsMap,
    categoriesList,
    categoriesMap,
  } = model.data;

  const {
    dataLoading,
    usedCategoriesLoading,
    inputArea,
    addCategoryDialog,
    editCategoryDialog,
    addUnitDialog,
    editUnitDialog,
  } = state;

  const {inputAreaVisible, inputAreaState} = inputArea;
  const {addCategoryDialogVisible} = addCategoryDialog;
  const {editCategoryDialogVisible, editCategory} = editCategoryDialog;
  const {addUnitDialogVisible} = addUnitDialog;
  const {editUnitDialogVisible, editUnit} = editUnitDialog;

  const {
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    productPressHandler,
    productRemoveHandler,
    categoryPressHandler,
    inputAreaAddCategoryPressHandler,
    shadedBackgroundPressHandler,
    addCategoryDialogTouchOutsideHandler,
    addCategoryDialogAddButtonHandler,
    addCategoryDialogCancelButtonHandler,
    inputAreaCategoryLongPressHandler,
    editCategoryDialogTouchOutsideHandler,
    editCategoryDialogSaveButtonHandler,
    editCategoryDialogRemoveButtonHandler,
    editCategoryDialogCancelButtonHandler,
    inputAreaAddUnitPressHandler,
    addUnitDialogTouchOutsideHandler,
    addUnitDialogCancelButtonHandler,
    addUnitDialogAddButtonHandler,
    inputAreaUnitLongPressHandler,
    editUnitDialogTouchOutsideHandler,
    editUnitDialogCancelButtonHandler,
    editUnitDialogSaveButtonHandler,
    editUnitDialogRemoveButtonHandler,
  } = controller;

  // ===
  const addUnitDialogComponent = (
    <AddUnitDialog
      visible={addUnitDialogVisible}
      onTouchOutside={addUnitDialogTouchOutsideHandler}
      onAddPress={addUnitDialogAddButtonHandler}
      onCancelPress={addUnitDialogCancelButtonHandler}
    />
  );

  const editUnitDialogComponent = (
    <EditUnitDialog
      visible={editUnitDialogVisible}
      unit={editUnit}
      onTouchOutside={editUnitDialogTouchOutsideHandler}
      onSavePress={editUnitDialogSaveButtonHandler}
      onRemovePress={editUnitDialogRemoveButtonHandler}
      onCancelPress={editUnitDialogCancelButtonHandler}
    />
  );

  const addCategoryDialogComponent = (
    <AddCategoryDialog
      visible={addCategoryDialogVisible}
      onTouchOutside={addCategoryDialogTouchOutsideHandler}
      onAddPress={addCategoryDialogAddButtonHandler}
      onCancelPress={addCategoryDialogCancelButtonHandler}
    />
  );

  const editCategoryDialogComponent = (
    <EditCategoryDialog
      visible={editCategoryDialogVisible}
      category={editCategory}
      onTouchOutside={editCategoryDialogTouchOutsideHandler}
      onSavePress={editCategoryDialogSaveButtonHandler}
      onRemovePress={editCategoryDialogRemoveButtonHandler}
      onCancelPress={editCategoryDialogCancelButtonHandler}
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
        onAddCategoryPress={inputAreaAddCategoryPressHandler}
        onCategoryLongPress={inputAreaCategoryLongPressHandler}
        onAddUnitPress={inputAreaAddUnitPressHandler}
        onUnitLongPress={inputAreaUnitLongPressHandler}
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
      {addCategoryDialogComponent}
      {editCategoryDialogComponent}
      {addUnitDialogComponent}
      {editUnitDialogComponent}
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
