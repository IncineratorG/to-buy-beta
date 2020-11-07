import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  copyShoppingListAction,
  removeShoppingListAction,
  renameShoppingListAction,
  resetCreateShoppingListStatusAction,
} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {loadProductsListAction} from '../../../store/actions/products-list/productsListActions';
import {loadCategoriesAction} from '../../../store/actions/categories/categoriesActions';
import {loadUnitsAction} from '../../../store/actions/units/unitsActions';
import {shareProductsListViaAppAction} from '../../../store/actions/share/shareActions';
import {setSystemLanguageAction} from '../../../store/actions/system/systemActions';
import ShareServiceAppTypes from '../../../services/share/data/share-app-types/ShareServiceAppTypes';

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

  const listItemCopyHandler = (listItem) => {
    model.setters.setListToCopy(listItem);
    model.setters.setCopyDialogVisible(true);
  };

  const addButtonHandler = () => {
    // model.navigation.navigate('VoiceInputTest');

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

  const shareListHandler = (listId) => {
    // let availableServicesCount = 0;
    // let onlyAvailableServiceType = '';
    // model.data.shareServicesAvailabilityMap.forEach(
    //   (isAvailable, serviceType) => {
    //     if (isAvailable) {
    //       ++availableServicesCount;
    //       if (!onlyAvailableServiceType) {
    //         onlyAvailableServiceType = serviceType;
    //       }
    //     }
    //   },
    // );
    //
    // if (availableServicesCount <= 0) {
    //   SystemEventsHandler.onError({
    //     err: 'shareListHandler()->NO_AVAILABLE_SHARE_SERVICES',
    //   });
    //   return;
    // }
    //
    // if (availableServicesCount === 1) {
    //   model.dispatch(
    //     shareProductsListViaAppAction({
    //       appType: onlyAvailableServiceType,
    //       shoppingListId: listId,
    //     }),
    //   );
    //   return;
    // }

    model.setters.setListIdToShare(listId);
    model.setters.setShareDialogVisible(true);
  };

  const shareDialogTouchOutsidePressHandler = () => {
    model.setters.setShareDialogVisible(false);
    model.setters.setListIdToShare(-1);
  };

  const shareDialogShareViaServicePressHandler = ({serviceType}) => {
    model.dispatch(
      shareProductsListViaAppAction({
        appType: serviceType,
        shoppingListId: model.data.listIdToShare,
      }),
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

  const renameDialogRenamePressHandler = ({listId, oldName, newName}) => {
    if (!newName || oldName === newName) {
      model.setters.setRenameDialogVisible(false);
      model.setters.setListToRename(null);
      return;
    }

    model.dispatch(renameShoppingListAction({id: listId, newName}));

    model.setters.setRenameDialogVisible(false);
    model.setters.setListToRename(null);
  };

  const copyDialogTouchOutsideHandler = () => {
    model.setters.setCopyDialogVisible(false);
    model.setters.setListToCopy(null);
  };

  const copyDialogCancelButtonHandler = () => {
    model.setters.setCopyDialogVisible(false);
    model.setters.setListToCopy(null);
  };

  const copyDialogCopyButtonHandler = ({listId, copiedListName}) => {
    model.dispatch(
      copyShoppingListAction({shoppingListId: listId, copiedListName}),
    );

    model.setters.setCopyDialogVisible(false);
    model.setters.setListToCopy(null);
  };

  const screenMenuLanguagePressHandler = ({languageCode}) => {
    if (languageCode === model.data.currentLanguage) {
      return;
    }
    model.dispatch(setSystemLanguageAction({languageCode}));
  };

  return {
    listItemPressHandler,
    listItemRemoveHandler,
    listItemRenameHandler,
    listItemCopyHandler,
    addButtonHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    shareListHandler,
    shareDialogTouchOutsidePressHandler,
    shareDialogShareViaServicePressHandler,
    shareDialogCancelPressHandler,
    renameDialogTouchOutsideHandler,
    renameDialogCancelPressHandler,
    renameDialogRenamePressHandler,
    copyDialogTouchOutsideHandler,
    copyDialogCancelButtonHandler,
    copyDialogCopyButtonHandler,
    screenMenuLanguagePressHandler,
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
