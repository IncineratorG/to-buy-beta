import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmDialog from 'react-native-simple-dialogs/src/ConfirmDialog';
import EmptyShoppingListsScreen from '../../../components/specific/shopping-lists/empty-shopping-lists-screen/EmptyShoppingListsScreen';
import AddButton from '../../../components/common/add-button/AddButton';
import {LoadingShoppingListsScreen} from '../../../components/specific/shopping-lists/loading-shopping-lists-screen/LoadingShoppingListsScreen';
import ListOfShoppingLists from '../../../components/specific/shopping-lists/list-of-shopping-lists/ListOfShoppingLists';
import ShareShoppingListDialog from '../../../components/specific/shopping-lists/share-shopping-list-dialog/ShareShoppingListDialog';
import RenameShoppingListDialog from '../../../components/specific/shopping-lists/rename-shopping-list-dialog/RenameShoppingListDialog';
import CopyShoppingListDialog from '../../../components/specific/shopping-lists/copy-shopping-list-dialog/CopyShoppingListDialog';

const ShoppingListsView = ({styles, model, controller}) => {
  const {t} = model;

  const {
    shareDialogVisible,
    removeConfirmationDialogVisible,
    renameDialogVisible,
    copyDialogVisible,
    online,
    currentEmail,
    selectedShoppingLists,
    listsLoading,
    listToRemove,
    listToRename,
    listToCopy,
    smsShareSupported,
    whatsAppShareSupported,
  } = model.data;

  const {
    listItemPressHandler,
    listItemRemoveHandler,
    listItemRenameHandler,
    listItemCopyHandler,
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
    renameDialogTouchOutsideHandler,
    renameDialogCancelPressHandler,
    renameDialogRenamePressHandler,
    copyDialogTouchOutsideHandler,
    copyDialogCancelButtonHandler,
    copyDialogCopyButtonHandler,
  } = controller;

  const copyDialogComponent = (
    <CopyShoppingListDialog
      visible={copyDialogVisible}
      listId={listToCopy ? listToCopy.id : null}
      listName={listToCopy ? listToCopy.name : null}
      onTouchOutside={copyDialogTouchOutsideHandler}
      onCancelButton={copyDialogCancelButtonHandler}
      onCopyButton={copyDialogCopyButtonHandler}
    />
  );

  const renameDialogComponent = (
    <RenameShoppingListDialog
      visible={renameDialogVisible}
      listId={listToRename ? listToRename.id : null}
      listName={listToRename ? listToRename.name : null}
      onTouchOutside={renameDialogTouchOutsideHandler}
      onCancelButton={renameDialogCancelPressHandler}
      onRenameButton={renameDialogRenamePressHandler}
    />
  );

  const shareDialogComponent = (
    <ShareShoppingListDialog
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
      dialogStyle={{borderRadius: 10}}
      // title={t('ShoppingLists_removeConfirmationDialogTitle')}
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
        onCopyPress={listItemCopyHandler}
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
      {renameDialogComponent}
      {copyDialogComponent}
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
