import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import CategoryColorsList from '../../products-list/category-colors-list/CategoryColorsList';
import {useTranslation} from '../../../../utils/common/localization';

const ShareOptionsDialog = ({
  visible,
  onTouchOutside,
  onCancelPress,
  onSmsOptionPress,
  onWhatsAppOptionPress,
}) => {
  const {t} = useTranslation();

  const cancelButtonHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }
  };

  const touchOutsideHandler = () => {
    if (onTouchOutside) {
      onTouchOutside();
    }
  };

  return (
    <Dialog
      visible={visible}
      title={t('AddCategoryDialog_dialogTitle')}
      onTouchOutside={touchOutsideHandler}>
      <View style={styles.mainContainer}>
        <View />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
});

export default ShareOptionsDialog;
