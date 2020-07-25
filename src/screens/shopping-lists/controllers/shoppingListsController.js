import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  removeShoppingListAction,
  resetCreateShoppingListStatusAction,
} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {loadProductsListAction} from '../../../store/actions/products-list/productsListActions';
import {loadCategoriesAction} from '../../../store/actions/categories/categoriesActions';
import {loadUnitsAction} from '../../../store/actions/units/unitsActions';

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
    SystemEventsHandler.onInfo({
      info: 'listItemRenameHandler(): ' + JSON.stringify(listItem),
    });
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
  // ===

  const addButtonHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'addButtonHandler()',
    });

    // model.navigation.navigate('ProductsList');

    model.dispatch(resetCreateShoppingListStatusAction());
    model.navigation.navigate('CreateShoppingList');

    // const a = logReturned(genFuncWithReturn());
    // console.log(a.next().value);

    // const a = [...logReturned(genFuncWithReturn())];
    // console.log(a);
  };

  const removeConfirmationDialogTouchOutsideHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'removeConfirmationDialogTouchOutsideHandler()',
    });
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

  // const menuButtonHandler = () => {
  //   model.navigation.toggleDrawer();
  // };

  const selectListTypeHandler = (selectedType) => {
    SystemEventsHandler.onInfo({
      info: 'selectListTypeHandler(): ' + JSON.stringify(selectedType),
    });
  };

  const shareListHandler = (listId) => {
    SystemEventsHandler.onInfo({
      info: 'shareListHandler(): ' + JSON.stringify(listId),
    });
  };

  return {
    listItemPressHandler,
    listItemRemoveHandler,
    listItemRenameHandler,
    addButtonHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    // menuButtonHandler,
    selectListTypeHandler,
    shareListHandler,
  };
};
