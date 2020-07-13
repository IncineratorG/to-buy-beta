import React from 'react';
import {View} from 'react-native';
import CreateListDialog from '../../../components/specific/create-shopping-list/create-list-dailog/CreateListDialog';

const CreateShoppingListView = ({styles, model, controller}) => {
  const {listName} = model.data;

  const {
    createListButtonHandler,
    cancelCreationButtonHandler,
    touchOutsideHandler,
    setListName,
  } = controller;

  const listCreationDialog = (
    <View style={{position: 'absolute'}}>
      <CreateListDialog
        listName={listName}
        setListName={setListName}
        visible={true}
        onPositiveButton={createListButtonHandler}
        onNegativeButton={cancelCreationButtonHandler}
        onTouchOutside={touchOutsideHandler}
      />
    </View>
  );

  return <View style={styles.mainContainer}>{listCreationDialog}</View>;
};

export default CreateShoppingListView;
