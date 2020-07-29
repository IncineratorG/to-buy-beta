import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {useTranslation} from '../../../../utils/common/localization';

const EditUnitDialog = ({
  visible,
  unit,
  onTouchOutside,
  onSavePress,
  onRemovePress,
  onCancelPress,
}) => {
  const [unitName, setUnitName] = useState('');

  const {t} = useTranslation();

  const touchOutsideHandler = () => {
    if (onTouchOutside) {
      onTouchOutside();
    }
  };

  const saveButtonHandler = () => {
    if (!unitName) {
      return;
    }

    if (onSavePress) {
      onSavePress({id: unit.id, name: unitName});
    }
  };

  const cancelButtonHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }
  };

  const removeButtonHandler = () => {
    if (onRemovePress) {
      onRemovePress({id: unit.id});
    }
  };

  const textChangeHandler = (text) => {
    setUnitName(text);
  };

  useEffect(() => {
    const initialUnitName = unit ? unit.name : '';
    setUnitName(initialUnitName);
  }, [unit]);

  const buttons = (
    <View style={styles.buttonsContainer}>
      <TouchableNativeFeedback
        style={styles.saveButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={saveButtonHandler}>
        <View style={styles.saveButtonContainer}>
          <Text
            style={[
              styles.saveButtonText,
              // eslint-disable-next-line react-native/no-inline-styles
              {color: unitName ? '#4a9dec' : 'lightgrey'},
            ]}>
            {t('EditUnitDialog_saveButton')}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        style={styles.cancelButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={cancelButtonHandler}>
        <View style={styles.cancelButtonContainer}>
          <Text style={styles.cancelButtonText}>
            {t('EditUnitDialog_cancelButton')}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <View style={styles.removeButtonWrapper}>
        <TouchableNativeFeedback
          style={styles.removeButtonTouchable}
          underlayColor={'lightgrey'}
          onPress={removeButtonHandler}>
          <View style={styles.removeButtonContainer}>
            <Text style={styles.removeButtonText}>
              {t('EditUnitDialog_removeButton')}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );

  return (
    <Dialog
      visible={visible}
      title={t('EditUnitDialog_dialogTitle')}
      buttons={buttons}
      onTouchOutside={touchOutsideHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.unitNameContainer}>
          <TextInput
            value={unitName}
            blurOnSubmit={false}
            placeholder={t('EditUnitDialog_placeholder')}
            fontSize={18}
            underlineColorAndroid={'lightgrey'}
            onChangeText={textChangeHandler}
          />
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'stretch',
    height: 60,
    backgroundColor: 'transparent',
  },
  unitNameContainer: {
    backgroundColor: 'transparent',
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  saveButtonTouchable: {
    alignSelf: 'flex-end',
  },
  saveButtonContainer: {
    alignSelf: 'flex-end',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a9dec',
    margin: 4,
  },
  cancelButtonTouchable: {
    alignSelf: 'flex-end',
  },
  cancelButtonContainer: {
    alignSelf: 'flex-end',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
    margin: 4,
  },
  removeButtonWrapper: {
    flex: 1,
  },
  removeButtonTouchable: {
    alignSelf: 'flex-start',
  },
  removeButtonContainer: {
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    margin: 4,
  },
});

export default EditUnitDialog;
