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
import {ConfirmDialog} from 'react-native-simple-dialogs';
import ShareButton from '../../../components/specific/products-list/share-button/ShareButton';
import SharePanel from '../../../components/specific/products-list/share-panel/SharePanel';

const ProductsListView = ({styles, model, controller}) => {
  const {t} = model;

  const {
    state,
    shoppingListId,
    products,
    unitsList,
    unitsMap,
    categoriesList,
    categoriesMap,
    allCategoriesList,
    allCategoriesMap,
    shareButtonVisible,
    sharePanelVisible,
  } = model.data;

  const {
    dataLoading,
    usedCategories,
    inputArea,
    addCategoryDialog,
    editCategoryDialog,
    addUnitDialog,
    editUnitDialog,
    removeProductDialog,
  } = state;

  const {
    usedCategoriesLoading,
    usedCategoriesList,
    selectedCategoriesIds,
  } = usedCategories;

  const {inputAreaVisible, inputAreaState, editData} = inputArea;
  const {addCategoryDialogVisible} = addCategoryDialog;
  const {editCategoryDialogVisible, editCategory} = editCategoryDialog;
  const {addUnitDialogVisible} = addUnitDialog;
  const {editUnitDialogVisible, editUnit} = editUnitDialog;
  const {removeProductDialogVisible, removeProduct} = removeProductDialog;

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
    removeProductDialogTouchOutsideHandler,
    removeProductDialogCancelButtonHandler,
    removeProductDialogRemoveButtonHandler,
    shareButtonPressHandler,
  } = controller;

  // ===
  const removeProductConfirmationDialogComponent = (
    <ConfirmDialog
      title={t('ProductsList_removeProductConfirmationDialogTitle')}
      message={
        t('ProductsList_removeProductConfirmationDialogMessage') +
        ' ' +
        removeProduct.productName +
        '?'
      }
      visible={removeProductDialogVisible}
      onTouchOutside={removeProductDialogTouchOutsideHandler}
      positiveButton={{
        title: t('ProductsList_removeProductConfirmationDialogPositiveButton'),
        titleStyle: {color: 'red'},
        onPress: removeProductDialogRemoveButtonHandler,
      }}
      negativeButton={{
        title: t('ProductsList_removeProductConfirmationDialogNegativeButton'),
        titleStyle: {color: 'grey'},
        onPress: removeProductDialogCancelButtonHandler,
      }}
    />
  );

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
        categories={usedCategoriesList}
        onCategoryPress={categoryPressHandler}
        selectedCategoriesIds={selectedCategoriesIds}
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
        selectedCategoriesIds={selectedCategoriesIds}
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

  const shareButtonComponent = (
    <View style={styles.shareButtonContainer}>
      <ShareButton
        visible={shareButtonVisible}
        onClick={shareButtonPressHandler}
      />
    </View>
  );

  const sharePanelComponent = (
    <View style={styles.sharePanel}>
      <SharePanel visible={sharePanelVisible} />
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
        onSubmit={inputAreaSubmitValuesHandler}
        predefinedData={editData}
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
      {shareButtonComponent}
      {sharePanelComponent}
      {inputAreaComponent}
      {shadedBackgroundComponent}
      {bottomGradientComponent}
      {addCategoryDialogComponent}
      {editCategoryDialogComponent}
      {addUnitDialogComponent}
      {editUnitDialogComponent}
      {removeProductConfirmationDialogComponent}
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
