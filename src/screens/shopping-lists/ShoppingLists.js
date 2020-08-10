import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {shoppingListsStyles} from './styles/shoppingListsStyles';
import ShoppingListsView from './views/ShoppingListsView';
import {useShoppingListsModel} from './models/shoppingListsModel';
import {useShoppingListsController} from './controllers/shoppingListsController';
import ShoppingListScreenMenuButton from '../../components/specific/shopping-lists/screen-menu-button/ShoppingListScreenMenuButton';

const ShoppingLists = () => {
  const styles = shoppingListsStyles;
  const model = useShoppingListsModel();
  const controller = useShoppingListsController(model);

  useFocusEffect(() => {
    model.navigation.setOptions({
      headerRight: (props) => (
        <ShoppingListScreenMenuButton
          availableLanguages={model.data.availableLanguages}
          currentLanguage={model.data.currentLanguage}
          onLanguagePress={controller.screenMenuLanguagePressHandler}
        />
      ),
    });
  });

  return (
    <ShoppingListsView styles={styles} model={model} controller={controller} />
  );
};

export default ShoppingLists;
