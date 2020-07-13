import React from 'react';
import CreateShoppingListView from './views/CreateShoppingListView';
import {createShoppingListStyles} from './styles/createShoppingListStyles';
import {useCreateShoppingListModel} from './models/createShoppingListModel';
import {useCreateShoppingListController} from './controllers/createShoppingListController';

const CreateShoppingList = () => {
  const styles = createShoppingListStyles;
  const model = useCreateShoppingListModel();
  const controller = useCreateShoppingListController(model);

  return (
    <CreateShoppingListView
      styles={styles}
      model={model}
      controller={controller}
    />
  );
};

export default CreateShoppingList;
