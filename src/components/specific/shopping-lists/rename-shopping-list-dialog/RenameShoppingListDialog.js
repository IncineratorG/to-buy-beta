import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {useTranslation} from '../../../../utils/common/localization';

const RenameShoppingListDialog = ({
  visible,
  shoppingList,
  onRenameButton,
  onCancelButton,
  onTouchOutside,
}) => {
  const {t} = useTranslation();

  const [listName, setListName] = useState('');

  const renameButtonHandler = () => {
    if (!listName) {
      return;
    }

    if (onRenameButton) {
      onRenameButton({shoppingList, newName: listName});
    }
  };

  const cancelButtonHandler = () => {
    if (onCancelButton) {
      onCancelButton();
    }
  };

  const onTouchOutsideHandler = () => {
    if (onTouchOutside) {
      onTouchOutside();
    }
  };

  useEffect(() => {
    if (shoppingList) {
      setListName(shoppingList.name);
    }
  }, [shoppingList]);

  return (
    <ConfirmDialog
      title={t('RenameShoppingListDialog_dialogTitle')}
      keyboardShouldPersistTaps={'always'}
      visible={visible}
      onTouchOutside={onTouchOutsideHandler}
      positiveButton={{
        title: t('RenameShoppingListDialog_renameButton'),
        titleStyle: listName
          ? styles.positiveButtonEnabled
          : styles.positiveButtonDisabled,
        onPress: renameButtonHandler,
      }}
      negativeButton={{
        title: t('RenameShoppingListDialog_cancelButton'),
        titleStyle: styles.negativeButton,
        onPress: cancelButtonHandler,
      }}>
      <TextInput
        placeholder={t('RenameShoppingListDialog_placeholder')}
        style={styles.listNameInput}
        selectionColor={'#4a9dec'}
        underlineColorAndroid={'#4a9dec'}
        autoFocus={true}
        onChangeText={(text) => setListName(text)}
        value={listName}
      />
    </ConfirmDialog>
  );
};

const styles = StyleSheet.create({
  listNameInput: {
    fontSize: 18,
  },
  positiveButtonEnabled: {
    color: '#4a9dec',
  },
  positiveButtonDisabled: {
    color: 'grey',
  },
  negativeButton: {
    color: 'grey',
  },
});

export default RenameShoppingListDialog;
