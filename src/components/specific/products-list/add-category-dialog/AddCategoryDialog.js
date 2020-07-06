import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';

const AddCategoryDialog = ({
  visible,
  onTouchOutside,
  onAddPress,
  onCancelPress,
}) => {
  const addButtonHandler = () => {
    if (onAddPress) {
      onAddPress();
    }
  };

  const cancelButtonHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }
  };

  const buttons = (
    <View style={styles.buttonsContainer}>
      <TouchableNativeFeedback
        style={styles.addButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={addButtonHandler}>
        <View style={styles.addButtonContainer}>
          <Text style={styles.addButtonText}>ДОБАВИТЬ</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        style={styles.cancelButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={cancelButtonHandler}>
        <View style={styles.cancelButtonContainer}>
          <Text style={styles.cancelButtonText}>ОТМЕНА</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  return (
    <Dialog
      visible={visible}
      title="Custom Dialog"
      buttons={buttons}
      onTouchOutside={onTouchOutside}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer} />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'stretch',
    height: 200,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'cyan',
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

export default AddCategoryDialog;
