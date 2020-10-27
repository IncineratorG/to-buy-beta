import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
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
import RenameShoppingListDialog from '../../../components/specific/shopping-lists/rename-shopping-list-dialog/RenameShoppingListDialog';

const ProductsListView = ({styles, model, controller}) => {
  const {t} = model;

  const {
    state,
    shoppingListId,
    listName,
    products,
    unitsList,
    unitsMap,
    allUnitsList,
    allUnitsMap,
    categoriesList,
    categoriesMap,
    allCategoriesList,
    allCategoriesMap,
    smsShareSupported,
    whatsAppShareSupported,
    categoryAddInProgress,
    lastAddedCategory,
    unitAddInProgress,
    lastAddedUnit,
  } = model.data;

  const {
    dataLoading,
    usedCategories,
    selectedCategory,
    productsList,
    inputArea,
    addCategoryDialog,
    editCategoryDialog,
    addUnitDialog,
    editUnitDialog,
    removeProductDialog,
    shareButton,
    sharePanel,
    renameListDialog,
    removeAllProductsDialog,
    removeAllBoughtProductsDialog,
    removeAllCategoryProductsDialog,
  } = state;

  const {usedCategoriesLoading, usedCategoriesList} = usedCategories;

  const {
    categoriesList: categoriesListSelectedCategoryData,
    productsList: productsListSelectedCategoryData,
  } = selectedCategory;

  const {
    selectedCategoryId: categoriesListSelectedCategoryId,
  } = categoriesListSelectedCategoryData;

  const {
    selectedCategoryId: productsListSelectedCategoryId,
  } = productsListSelectedCategoryData;

  const {
    changeCategoryUpdating: productsListChangeCategoryUpdating,
  } = productsList;

  const {inputAreaVisible, inputAreaState, editData} = inputArea;
  const {addCategoryDialogVisible} = addCategoryDialog;
  const {
    editCategoryDialogVisible,
    editCategory,
    canRemoveCategory,
  } = editCategoryDialog;
  const {addUnitDialogVisible} = addUnitDialog;
  const {editUnitDialogVisible, editUnit, canRemoveUnit} = editUnitDialog;
  const {removeProductDialogVisible, removeProduct} = removeProductDialog;
  const {shareButtonVisible} = shareButton;
  const {sharePanelVisible} = sharePanel;
  const {renameListDialogVisible} = renameListDialog;
  const {removeAllProductsDialogVisible} = removeAllProductsDialog;
  const {removeAllBoughtProductsDialogVisible} = removeAllBoughtProductsDialog;
  const {
    removeAllCategoryProductsDialogVisible,
  } = removeAllCategoryProductsDialog;

  const {
    addCategoryDialogController,
    addUnitDialogController,
    editCategoryDialogController,
    editUnitDialogController,
    productsListController,
    removeAllProductsDialogController,
    removeProductDialogController,
    renameListDialogController,
    removeAllBoughtProductsDialogController,
    removeAllCategoryProductsDialogController,
  } = controller;

  const {
    addCategoryDialogTouchOutsideHandler,
    addCategoryDialogAddButtonHandler,
    addCategoryDialogCancelButtonHandler,
    addCategoryDialogRequestCloseAfterCategoryAddedHandler,
  } = addCategoryDialogController;

  const {
    addUnitDialogTouchOutsideHandler,
    addUnitDialogCancelButtonHandler,
    addUnitDialogAddButtonHandler,
    addUnitDialogRequestCloseAfterUnitAddedHandler,
  } = addUnitDialogController;

  const {
    editCategoryDialogTouchOutsideHandler,
    editCategoryDialogSaveButtonHandler,
    editCategoryDialogRemoveButtonHandler,
    editCategoryDialogCancelButtonHandler,
  } = editCategoryDialogController;

  const {
    editUnitDialogTouchOutsideHandler,
    editUnitDialogCancelButtonHandler,
    editUnitDialogSaveButtonHandler,
    editUnitDialogRemoveButtonHandler,
  } = editUnitDialogController;

  const {
    productsListRenderCompletedHandler,
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    productPressHandler,
    productRemoveHandler,
    categoryPressHandler,
    inputAreaAddCategoryPressHandler,
    shadedBackgroundPressHandler,
    inputAreaCategoryLongPressHandler,
    inputAreaAddUnitPressHandler,
    inputAreaUnitLongPressHandler,
    shareButtonPressHandler,
    smsSharePressHandler,
    whatsAppSharePressHandler,
  } = productsListController;

  const {
    removeAllProductsDialogTouchOutsideHandler,
    removeAllProductsDialogRemoveButtonHandler,
    removeAllProductsDialogCancelButtonHandler,
  } = removeAllProductsDialogController;

  const {
    removeProductDialogTouchOutsideHandler,
    removeProductDialogCancelButtonHandler,
    removeProductDialogRemoveButtonHandler,
  } = removeProductDialogController;

  const {
    renameListDialogTouchOutsideHandler,
    renameListDialogCancelPressHandler,
    renameListDialogRenamePressHandler,
  } = renameListDialogController;

  const {
    removeAllBoughtProductsDialogTouchOutsideHandler,
    removeAllBoughtProductsDialogRemoveButtonHandler,
    removeAllBoughtProductsDialogCancelButtonHandler,
  } = removeAllBoughtProductsDialogController;

  const {
    removeAllCategoryProductsDialogTouchOutsideHandler,
    removeAllCategoryProductsDialogRemoveButtonHandler,
    removeAllCategoryProductsDialogCancelButtonHandler,
  } = removeAllCategoryProductsDialogController;

  // ===
  const renameListDialogComponent = renameListDialogVisible ? (
    <RenameShoppingListDialog
      visible={renameListDialogVisible}
      listId={shoppingListId}
      listName={listName}
      onTouchOutside={renameListDialogTouchOutsideHandler}
      onCancelButton={renameListDialogCancelPressHandler}
      onRenameButton={renameListDialogRenamePressHandler}
    />
  ) : null;

  const removeAllCategoryProductsConfirmationDialogComponent = (
    <ConfirmDialog
      dialogStyle={{borderRadius: 10}}
      // title={t('ProductsList_removeAllCategoryProductsConfirmationDialogTitle')}
      message={t(
        'ProductsList_removeAllCategoryProductsConfirmationDialogMessage',
      )}
      visible={removeAllCategoryProductsDialogVisible}
      onTouchOutside={removeAllCategoryProductsDialogTouchOutsideHandler}
      positiveButton={{
        title: t(
          'ProductsList_removeAllCategoryProductsConfirmationDialogPositiveButton',
        ),
        titleStyle: {color: 'red'},
        onPress: removeAllCategoryProductsDialogRemoveButtonHandler,
      }}
      negativeButton={{
        title: t(
          'ProductsList_removeAllCategoryProductsConfirmationDialogNegativeButton',
        ),
        titleStyle: {color: 'grey'},
        onPress: removeAllCategoryProductsDialogCancelButtonHandler,
      }}
    />
  );

  const removeAllBoughtProductsConfirmationDialogComponent = (
    <ConfirmDialog
      dialogStyle={{borderRadius: 10}}
      // title={t('ProductsList_removeAllBoughtProductsConfirmationDialogTitle')}
      message={t(
        'ProductsList_removeAllBoughtProductsConfirmationDialogMessage',
      )}
      visible={removeAllBoughtProductsDialogVisible}
      onTouchOutside={removeAllBoughtProductsDialogTouchOutsideHandler}
      positiveButton={{
        title: t(
          'ProductsList_removeAllBoughtProductsConfirmationDialogPositiveButton',
        ),
        titleStyle: {color: 'red'},
        onPress: removeAllBoughtProductsDialogRemoveButtonHandler,
      }}
      negativeButton={{
        title: t(
          'ProductsList_removeAllBoughtProductsConfirmationDialogNegativeButton',
        ),
        titleStyle: {color: 'grey'},
        onPress: removeAllBoughtProductsDialogCancelButtonHandler,
      }}
    />
  );

  const removeAllProductsConfirmationDialogComponent = (
    <ConfirmDialog
      dialogStyle={{borderRadius: 10}}
      // title={t('ProductsList_removeAllProductsConfirmationDialogTitle')}
      message={t('ProductsList_removeAllProductsConfirmationDialogMessage')}
      visible={removeAllProductsDialogVisible}
      onTouchOutside={removeAllProductsDialogTouchOutsideHandler}
      positiveButton={{
        title: t(
          'ProductsList_removeAllProductsConfirmationDialogPositiveButton',
        ),
        titleStyle: {color: 'red'},
        onPress: removeAllProductsDialogRemoveButtonHandler,
      }}
      negativeButton={{
        title: t(
          'ProductsList_removeAllProductsConfirmationDialogNegativeButton',
        ),
        titleStyle: {color: 'grey'},
        onPress: removeAllProductsDialogCancelButtonHandler,
      }}
    />
  );

  const removeProductConfirmationDialogComponent = (
    <ConfirmDialog
      dialogStyle={{borderRadius: 10}}
      // title={t('ProductsList_removeProductConfirmationDialogTitle')}
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
      lastAddedUnit={lastAddedUnit}
      unitAddInProgress={unitAddInProgress}
      onTouchOutside={addUnitDialogTouchOutsideHandler}
      onAddPress={addUnitDialogAddButtonHandler}
      onCancelPress={addUnitDialogCancelButtonHandler}
      onCloseRequest={addUnitDialogRequestCloseAfterUnitAddedHandler}
    />
  );

  const editUnitDialogComponent = (
    <EditUnitDialog
      visible={editUnitDialogVisible}
      unit={editUnit}
      canRemove={canRemoveUnit}
      onTouchOutside={editUnitDialogTouchOutsideHandler}
      onSavePress={editUnitDialogSaveButtonHandler}
      onRemovePress={editUnitDialogRemoveButtonHandler}
      onCancelPress={editUnitDialogCancelButtonHandler}
    />
  );

  const addCategoryDialogComponent = (
    <AddCategoryDialog
      visible={addCategoryDialogVisible}
      lastAddedCategory={lastAddedCategory}
      categoryAddInProgress={categoryAddInProgress}
      onTouchOutside={addCategoryDialogTouchOutsideHandler}
      onAddPress={addCategoryDialogAddButtonHandler}
      onCancelPress={addCategoryDialogCancelButtonHandler}
      onCloseRequest={addCategoryDialogRequestCloseAfterCategoryAddedHandler}
    />
  );

  const editCategoryDialogComponent = (
    <EditCategoryDialog
      visible={editCategoryDialogVisible}
      category={editCategory}
      canRemove={canRemoveCategory}
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
        selectedCategoryId={categoriesListSelectedCategoryId}
        productsListChangeCategoryUpdating={productsListChangeCategoryUpdating}
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
        onRenderCompleted={productsListRenderCompletedHandler}
        unitsMap={allUnitsMap}
        categoriesMap={allCategoriesMap}
        selectedCategoryId={productsListSelectedCategoryId}
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
      <SharePanel
        visible={sharePanelVisible}
        smsShareSupported={smsShareSupported}
        whatsAppShareSupported={whatsAppShareSupported}
        onSmsPress={smsSharePressHandler}
        onWhatsAppPress={whatsAppSharePressHandler}
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
        onSubmit={inputAreaSubmitValuesHandler}
        predefinedData={editData}
        predefinedState={inputAreaState}
        categoriesList={categoriesList}
        categoriesMap={categoriesMap}
        allCategoriesMap={allCategoriesMap}
        unitsList={unitsList}
        unitsMap={unitsMap}
        allUnitsMap={allUnitsMap}
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
      {removeAllProductsConfirmationDialogComponent}
      {removeAllBoughtProductsConfirmationDialogComponent}
      {removeAllCategoryProductsConfirmationDialogComponent}
      {renameListDialogComponent}
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

  return dataLoading ? loadingComponent : loadedComponent;
};

export default ProductsListView;
