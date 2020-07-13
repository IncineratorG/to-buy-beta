import {createShoppingListAction} from '../../../store/actions/shopping-lists/shoppingListsActions';

export const useCreateShoppingListController = (model) => {
  const createListButtonHandler = () => {
    const listName = model.data.listName
      ? model.data.listName
      : model.t('CreateListDialog_placeholder');

    model.dispatch(createShoppingListAction({listName}));
  };

  const cancelCreationButtonHandler = () => {
    model.navigation.navigate('ShoppingLists');
  };

  const touchOutsideHandler = () => {
    model.navigation.navigate('ShoppingLists');
  };

  const setListName = (listName) => {
    model.setters.setListName(listName);
  };

  return {
    createListButtonHandler,
    cancelCreationButtonHandler,
    touchOutsideHandler,
    setListName,
  };
};
