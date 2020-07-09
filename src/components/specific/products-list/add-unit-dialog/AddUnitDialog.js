import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {useTranslation} from '../../../common/localization';

const AddUnitDialog = ({
  visible,
  onTouchOutside,
  onAddPress,
  onCancelPress,
}) => {
  const [unitName, setUnitName] = useState('');

  const {t} = useTranslation();

  const addButtonHandler = () => {
    if (!unitName) {
      return;
    }

    if (onAddPress) {
      onAddPress({name: unitName});
    }

    setUnitName('');
  };

  const cancelButtonHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }

    setUnitName('');
  };

  const touchOutsideHandler = () => {
    if (onTouchOutside) {
      onTouchOutside();
    }

    setUnitName('');
  };

  const textChangeHandler = (text) => {
    setUnitName(text);
  };

  const buttons = (
    <View style={styles.buttonsContainer}>
      <TouchableNativeFeedback
        style={styles.addButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={addButtonHandler}>
        <View style={styles.addButtonContainer}>
          <Text
            style={[
              styles.addButtonText,
              // eslint-disable-next-line react-native/no-inline-styles
              {color: unitName ? '#4a9dec' : 'lightgrey'},
            ]}>
            {t('AddUnitDialog_addButton')}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        style={styles.cancelButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={cancelButtonHandler}>
        <View style={styles.cancelButtonContainer}>
          <Text style={styles.cancelButtonText}>
            {t('AddUnitDialog_cancelButton')}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  return (
    <Dialog
      visible={visible}
      title={t('AddUnitDialog_dialogTitle')}
      buttons={buttons}
      onTouchOutside={touchOutsideHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.unitNameContainer}>
          <TextInput
            value={unitName}
            blurOnSubmit={false}
            placeholder={t('AddUnitDialog_placeholder')}
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
  addButtonTouchable: {
    alignSelf: 'flex-end',
  },
  addButtonContainer: {
    alignSelf: 'flex-end',
  },
  addButtonText: {
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
});

export default AddUnitDialog;
