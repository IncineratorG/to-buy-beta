import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {useTranslation} from '../../../../utils/common/localization';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

const RenameShoppingListDialog = ({
  visible,
  listId,
  listName,
  onRenameButton,
  onCancelButton,
  onTouchOutside,
}) => {
  const {t} = useTranslation();

  const [newListName, setNewListName] = useState('');

  const renameButtonHandler = () => {
    if (!newListName) {
      return;
    }

    if (onRenameButton) {
      onRenameButton({
        listId: listId,
        oldName: listName,
        newName: newListName,
      });
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
    if (listName) {
      setNewListName(listName);
    }
  }, [listName]);

  return (
    <ConfirmDialog
      dialogStyle={{borderRadius: 10}}
      title={t('RenameShoppingListDialog_dialogTitle')}
      keyboardShouldPersistTaps={'always'}
      visible={visible}
      onTouchOutside={onTouchOutsideHandler}
      positiveButton={{
        title: t('RenameShoppingListDialog_renameButton'),
        titleStyle: newListName
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
        onChangeText={(text) => setNewListName(text)}
        value={newListName}
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
