import React from 'react';
import {listOfShoppingListsItemStylesGeneral} from './general/styles/listOfShoppingListItemStyleGeneral';
import {listOfShoppingListsItemStylesExtra} from './extra/styles/listOfShoppingListsItemStylesExtra';
import ListOfShoppingListsItemGeneral from './general/ListOfShoppingListsItemGeneral';
import ListOfShoppingListsItemExtra from './extra/ListOfShoppingListsItemExtra';

const ListOfShoppingListsItem = ({
  online,
  listItem,
  currentEmail,
  onItemPress,
  onRemovePress,
  onSharePress,
  onRenamePress,
}) => {
  const generalItemStyles = listOfShoppingListsItemStylesGeneral;
  const extraItemStyles = listOfShoppingListsItemStylesExtra;

  const generalItem = (
    <ListOfShoppingListsItemGeneral
      styles={generalItemStyles}
      listItem={listItem}
      online={online}
      currentEmail={currentEmail}
      onItemPress={onItemPress}
      onRemovePress={onRemovePress}
      onSharedPress={onSharePress}
      onRenamePress={onRenamePress}
    />
  );

  const extraItem = <ListOfShoppingListsItemExtra styles={extraItemStyles} />;

  if (listItem.extra) {
    return extraItem;
  } else {
    return generalItem;
  }
};

export default React.memo(ListOfShoppingListsItem);
