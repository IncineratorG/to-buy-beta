import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  removeShoppingListAction,
  renameShoppingListAction,
  resetCreateShoppingListStatusAction,
} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {loadProductsListAction} from '../../../store/actions/products-list/productsListActions';
import {loadCategoriesAction} from '../../../store/actions/categories/categoriesActions';
import {loadUnitsAction} from '../../../store/actions/units/unitsActions';
import {
  shareProductsListViaSmsAction,
  shareProductsListViaWhatsAppAction,
} from '../../../store/actions/share/shareActions';

export const useShoppingListsController = (model) => {
  const listItemPressHandler = (listItemId) => {
    model.dispatch(loadCategoriesAction({shoppingListId: listItemId}));
    model.dispatch(loadUnitsAction({shoppingListId: listItemId}));
    model.dispatch(loadProductsListAction({shoppingListId: listItemId}));

    model.navigation.navigate('ProductsList');
  };

  const listItemRemoveHandler = (listItem) => {
    model.setters.setListToRemove(listItem);
    model.setters.setRemoveConfirmationDialogVisible(true);
  };

  const listItemRenameHandler = (listItem) => {
    model.setters.setListToRename(listItem);
    model.setters.setRenameDialogVisible(true);
  };

  const addButtonHandler = () => {
    model.dispatch(resetCreateShoppingListStatusAction());
    model.navigation.navigate('CreateShoppingList');
  };

  const removeConfirmationDialogTouchOutsideHandler = () => {
    model.setters.setRemoveConfirmationDialogVisible(false);
    model.setters.setListToRemove(null);
  };

  const removeConfirmationDialogRemoveHandler = () => {
    const listToRemove = model.data.listToRemove;
    if (listToRemove) {
      model.dispatch(removeShoppingListAction({id: listToRemove.id}));
    } else {
      SystemEventsHandler.onError({
        err: 'removeConfirmationDialogRemoveHandler()->BAD_LIST_TO_REMOVE',
      });
    }
    model.setters.setRemoveConfirmationDialogVisible(false);
    model.setters.setListToRemove(null);
  };

  const removeConfirmationDialogCancelRemoveHandler = () => {
    model.setters.setRemoveConfirmationDialogVisible(false);
    model.setters.setListToRemove(null);
  };

  const selectListTypeHandler = (selectedType) => {
    SystemEventsHandler.onInfo({
      info: 'selectListTypeHandler(): ' + JSON.stringify(selectedType),
    });
  };

  const shareListHandler = (listId) => {
    if (model.data.smsShareSupported && model.data.whatsAppShareSupported) {
      model.setters.setListIdToShare(listId);
      model.setters.setShareDialogVisible(true);
    } else if (model.data.whatsAppShareSupported) {
      model.dispatch(shareProductsListViaWhatsAppAction({id: listId}));
    } else if (model.data.smsShareSupported) {
      model.dispatch(shareProductsListViaSmsAction({id: listId}));
    }
  };

  const shareDialogTouchOutsidePressHandler = () => {
    model.setters.setShareDialogVisible(false);
    model.setters.setListIdToShare(-1);
  };

  const shareDialogSmsOptionPressHandler = () => {
    model.dispatch(
      shareProductsListViaSmsAction({id: model.data.listIdToShare}),
    );
    model.setters.setShareDialogVisible(false);
    model.setters.setListIdToShare(-1);
  };

  const shareDialogWhatsAppOptionPressHandler = () => {
    model.dispatch(
      shareProductsListViaWhatsAppAction({id: model.data.listIdToShare}),
    );
    model.setters.setShareDialogVisible(false);
    model.setters.setListIdToShare(-1);
  };

  const shareDialogCancelPressHandler = () => {
    model.setters.setShareDialogVisible(false);
    model.setters.setListIdToShare(-1);
  };

  const renameDialogTouchOutsideHandler = () => {
    model.setters.setRenameDialogVisible(false);
    model.setters.setListToRename(null);
  };

  const renameDialogCancelPressHandler = () => {
    model.setters.setRenameDialogVisible(false);
    model.setters.setListToRename(null);
  };

  const renameDialogRenamePressHandler = ({shoppingList, newName}) => {
    if (shoppingList.name === newName) {
      model.setters.setRenameDialogVisible(false);
      model.setters.setListToRename(null);
      return;
    }

    model.dispatch(renameShoppingListAction({id: shoppingList.id, newName}));

    model.setters.setRenameDialogVisible(false);
    model.setters.setListToRename(null);
  };

  return {
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
    renameDialogTouchOutsideHandler,
    renameDialogCancelPressHandler,
    renameDialogRenamePressHandler,
  };
};

// ===
// function* genFuncWithReturn() {
//   yield 'a';
//   yield 'b';
//   return 'The result';
// }
// function* logReturned(genObj) {
//   const result = yield* genObj;
//   console.log(result); // (A)
// }

// const a = logReturned(genFuncWithReturn());
// console.log(a.next().value);

// const a = [...logReturned(genFuncWithReturn())];
// console.log(a);
// ===
