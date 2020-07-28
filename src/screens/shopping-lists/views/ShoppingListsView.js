import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmDialog from 'react-native-simple-dialogs/src/ConfirmDialog';
import EmptyShoppingListsScreen from '../../../components/specific/shopping-lists/empty-shopping-lists-screen/EmptyShoppingListsScreen';
import AddButton from '../../../components/common/add-button/AddButton';
import {LoadingShoppingListsScreen} from '../../../components/specific/shopping-lists/loading-shopping-lists-screen/LoadingShoppingListsScreen';
import ListOfShoppingLists from '../../../components/specific/shopping-lists/list-of-shopping-lists/ListOfShoppingLists';
import ShareDialog from '../../../components/specific/shopping-lists/share-dialog/ShareDialog';

const ShoppingListsView = ({styles, model, controller}) => {
  const {t} = model;

  const {
    shareDialogVisible,
    removeConfirmationDialogVisible,
    online,
    currentEmail,
    selectedShoppingLists,
    listsLoading,
    listToRemove,
    smsShareSupported,
    whatsAppShareSupported,
  } = model.data;

  const {
    listItemPressHandler,
    listItemRemoveHandler,
    listItemRenameHandler,
    addButtonHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    selectListTypeHandler,
    shareListHandler,
    shareDialogTouchOutsidePressHandler,
    shareDialogSmsOptionPressHandler,
    shareDialogWhatsAppOptionPressHandler,
    shareDialogCancelPressHandler,
  } = controller;

  const shareDialogComponent = (
    <ShareDialog
      visible={shareDialogVisible}
      smsShareSupported={smsShareSupported}
      whatsAppShareSupported={whatsAppShareSupported}
      onTouchOutside={shareDialogTouchOutsidePressHandler}
      onCancelPress={shareDialogCancelPressHandler}
      onSmsOptionPress={shareDialogSmsOptionPressHandler}
      onWhatsAppOptionPress={shareDialogWhatsAppOptionPressHandler}
    />
  );

  const removeConfirmationDialogComponent = (
    <ConfirmDialog
      title={t('ShoppingLists_removeConfirmationDialogTitle')}
      message={
        t('ShoppingLists_removeConfirmationDialogMessage') +
        ' ' +
        (listToRemove ? listToRemove.name : '') +
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
        onRenamePress={listItemRenameHandler}
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
      {shareDialogComponent}
      {removeConfirmationDialogComponent}
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
