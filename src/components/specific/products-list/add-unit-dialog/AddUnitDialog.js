import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  ProgressBarAndroid,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {useTranslation} from '../../../../utils/common/localization';

const AddUnitDialog = ({
  visible,
  lastAddedUnit,
  unitAddInProgress,
  onTouchOutside,
  onAddPress,
  onCancelPress,
  onCloseRequest,
}) => {
  const [unitName, setUnitName] = useState('');
  const [unitAddWasInProgress, setUnitAddWasInProgress] = useState(false);

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

  const progressIndicator = unitAddInProgress ? (
    <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
  ) : (
    <View />
  );

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

  useEffect(() => {
    if (!unitAddInProgress && unitAddWasInProgress) {
      if (onCloseRequest) {
        onCloseRequest({addedUnit: lastAddedUnit});
      } else {
        SystemEventsHandler.onError({
          err: 'AddUnitDialog->onCloseRequest_IS_NULL',
        });
      }
    }

    if (unitAddInProgress) {
      setUnitAddWasInProgress(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitAddInProgress, unitAddWasInProgress]);

  return (
    <Dialog
      dialogStyle={{borderRadius: 10}}
      visible={visible}
      title={t('AddUnitDialog_dialogTitle')}
      buttons={buttons}
      onTouchOutside={touchOutsideHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.unitNameContainer}>
          <View
            style={{
              alignSelf: 'stretch',
              height: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
            }}>
            {progressIndicator}
          </View>
          <TextInput
            value={unitName}
            autoCapitalize={'none'}
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
