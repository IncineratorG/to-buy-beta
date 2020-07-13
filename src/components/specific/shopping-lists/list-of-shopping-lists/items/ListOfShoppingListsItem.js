import React from 'react';
import {listOfShoppingListsItemStylesGeneral} from './general/styles/listOfShoppingListItemStyleGeneral';
import {listOfShoppingListsItemStylesExtra} from './extra/styles/listOfShoppingListsItemStylesExtra';
import ListOfShoppingListsItemGeneral from './general/ListOfShoppingListsItemGeneral';
import ListOfShoppingListsItemExtra from './extra/ListOfShoppingListsItemExtra';

const ListOfShoppingListsItem = ({
  online,
  listItem,
  onItemPress,
  onRemovePress,
  onSharePress,
  currentEmail,
}) => {
  const generalItemStyles = listOfShoppingListsItemStylesGeneral;
  const extraItemStyles = listOfShoppingListsItemStylesExtra;

  const generalItem = (
    <ListOfShoppingListsItemGeneral
      styles={generalItemStyles}
      listItem={listItem}
      online={online}
      onItemPress={onItemPress}
      onRemovePress={onRemovePress}
      onSharedPress={onSharePress}
      currentEmail={currentEmail}
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
