import React from 'react';
import {shoppingListsStyles} from './styles/shoppingListsStyles';
import ShoppingListsView from './views/ShoppingListsView';
import {useShoppingListsModel} from './models/shoppingListsModel';
import {useShoppingListsController} from './controllers/shoppingListsController';

const ShoppingLists = () => {
  const styles = shoppingListsStyles;
  const model = useShoppingListsModel();
  const controller = useShoppingListsController(model);

  return (
    <ShoppingListsView styles={styles} model={model} controller={controller} />
  );
};

export default ShoppingLists;
