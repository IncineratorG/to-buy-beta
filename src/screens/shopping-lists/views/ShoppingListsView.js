import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmDialog from 'react-native-simple-dialogs/src/ConfirmDialog';
import EmptyShoppingListsScreen from '../../../components/specific/shopping-lists/empty-shopping-lists-screen/EmptyShoppingListsScreen';
import AddButton from '../../../components/common/add-button/AddButton';
import {LoadingShoppingListsScreen} from '../../../components/specific/shopping-lists/loading-shopping-lists-screen/LoadingShoppingListsScreen';
import ListOfShoppingLists from '../../../components/specific/shopping-lists/list-of-shopping-lists/ListOfShoppingLists';

const ShoppingListsView = ({styles, model, controller}) => {
  const {t} = model;

  const {
    removeConfirmationDialogVisible,
    removeItemName,
    online,
    currentEmail,
    selectedShoppingLists,
    listsLoading,
  } = model.data;

  const {
    listItemPressHandler,
    listItemRemoveHandler,
    addButtonHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    selectListTypeHandler,
    shareListHandler,
  } = controller;

  const removeConfirmationDialog = (
    <ConfirmDialog
      title={t('ShoppingLists_removeConfirmationDialogTitle')}
      message={
        t('ShoppingLists_removeConfirmationDialogMessage') +
        ' ' +
        removeItemName +
        '?'
      }
      visible={removeConfirmationDialogVisible}
      onTouchOutside={removeConfirmationDialogTouchOutsideHandler}
      positiveButton={{
        title: t('ShoppingLists_removeConfirmationDialogPositiveButton'),
        titleStyle: {color: 'red'},
        onPress: removeConfirmationDialogRemoveHandler,
      }}
      negativeButton={{
        title: t('ShoppingLists_removeConfirmationDialogNegativeButton'),
        titleStyle: {color: 'grey'},
        onPress: removeConfirmationDialogCancelRemoveHandler,
      }}
    />
  );

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

  const emptyShoppingListsScreenComponent = (
    <View style={styles.emptyMainScreenContent}>
      <EmptyShoppingListsScreen />
    </View>
  );

  const shoppingListsComponent = (
    <View style={styles.listOfShoppingListContainer}>
      <ListOfShoppingLists
        online={online}
        currentEmail={currentEmail}
        list={selectedShoppingLists}
        onItemPress={listItemPressHandler}
        onRemovePress={listItemRemoveHandler}
        onSharePress={shareListHandler}
      />
    </View>
  );

  const listTypesComponent = null;
  // const listTypesComponent = <View style={styles.listTypesContainer} />;

  const loadingIndicatorComponent = null;
  // const loadingIndicatorComponent = (
  //   <View style={styles.loadingIndicatorContainer} />
  // );

  const addButtonComponent = (
    <View
      style={styles.addShoppingListButtonContainer}
      enabled={false}
      behavior={'position'}>
      <AddButton
        style={styles.addShoppingListButton}
        onClick={addButtonHandler}
      />
    </View>
  );

  // const screenContent = emptyShoppingListsScreenComponent;
  const screenContent = selectedShoppingLists.length
    ? shoppingListsComponent
    : emptyShoppingListsScreenComponent;

  const listLoadedComponent = (
    <View style={styles.mainContainer}>
      {loadingIndicatorComponent}
      {listTypesComponent}
      {screenContent}
      {removeConfirmationDialog}
      {addButtonComponent}
      {bottomGradientComponent}
    </View>
  );

  const listLoadingComponent = (
    <View style={styles.loadingComponentContainer}>
      <LoadingShoppingListsScreen />
    </View>
  );

  const activeComponent = listsLoading
    ? listLoadingComponent
    : listLoadedComponent;

  return activeComponent;
};

export default ShoppingListsView;
