import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {useTranslation} from '../../../common/localization';

const CreateListDialog = ({
  listName,
  setListName,
  visible,
  onTouchOutside,
  onPositiveButton,
  onNegativeButton,
}) => {
  const {t} = useTranslation();

  const submitEditingHandler = () => onPositiveButton();

  return (
    <ConfirmDialog
      title={t('CreateListDialog_dialogTitle')}
      keyboardShouldPersistTaps={'always'}
      visible={visible}
      onTouchOutside={onTouchOutside}
      positiveButton={{
        title: t('CreateListDialog_positiveButton'),
        titleStyle: styles.positiveButton,
        onPress: onPositiveButton,
      }}
      negativeButton={{
        title: t('CreateListDialog_negativeButton'),
        titleStyle: styles.negativeButton,
        onPress: onNegativeButton,
      }}>
      <TextInput
        placeholder={t('CreateListDialog_placeholder')}
        style={styles.listNameInput}
        selectionColor={'#4a9dec'}
        underlineColorAndroid={'#4a9dec'}
        autoFocus={true}
        onChangeText={(text) => setListName(text)}
        onSubmitEditing={submitEditingHandler}
        value={listName}
        blurOnSubmit={false}
      />
    </ConfirmDialog>
  );
};

const styles = StyleSheet.create({
  listNameInput: {
    fontSize: 18,
  },
  positiveButton: {
    color: '#4a9dec',
  },
  negativeButton: {
    color: 'grey',
  },
});

export default CreateListDialog;
