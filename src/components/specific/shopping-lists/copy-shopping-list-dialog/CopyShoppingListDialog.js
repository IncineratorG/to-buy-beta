import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {useTranslation} from '../../../../utils/common/localization';

const CopyShoppingListDialog = ({
  visible,
  listId,
  listName,
  onCopyButton,
  onCancelButton,
  onTouchOutside,
}) => {
  const {t} = useTranslation();

  const [newListName, setNewListName] = useState('');

  const copyButtonHandler = () => {
    if (!newListName) {
      return;
    }

    if (onCopyButton) {
      onCopyButton({
        listId: listId,
        copiedListName: newListName,
      });
    }
  };

  const cancelButtonHandler = () => {
    if (onCancelButton) {
      onCancelButton();
    }
  };

  const touchOutsideHandler = () => {
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
      title={t('CopyShoppingListDialog_dialogTitle')}
      keyboardShouldPersistTaps={'always'}
      visible={visible}
      onTouchOutside={touchOutsideHandler}
      positiveButton={{
        title: t('CopyShoppingListDialog_copyButton'),
        titleStyle: newListName
          ? styles.positiveButtonEnabled
          : styles.positiveButtonDisabled,
        onPress: copyButtonHandler,
      }}
      negativeButton={{
        title: t('CopyShoppingListDialog_cancelButton'),
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

export default CopyShoppingListDialog;
