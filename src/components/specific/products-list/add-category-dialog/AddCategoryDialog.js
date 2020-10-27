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
import CategoryColorsList from '../category-colors-list/CategoryColorsList';
import AvailableColors from '../../../../utils/common/available-colors/AvailableColors';
import {useTranslation} from '../../../../utils/common/localization';

const AddCategoryDialog = ({
  visible,
  lastAddedCategory,
  categoryAddInProgress,
  onTouchOutside,
  onAddPress,
  onCancelPress,
  onCloseRequest,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedColorItem, setSelectedColorItem] = useState(null);

  const [categoryAddWasInProgress, setCategoryAddWasInProgress] = useState(
    false,
  );

  const {t} = useTranslation();

  const addButtonHandler = () => {
    if (!categoryName) {
      return;
    }

    const categoryColor = selectedColorItem
      ? selectedColorItem
      : AvailableColors.getDefaultColor();

    if (onAddPress) {
      onAddPress({name: categoryName, color: categoryColor.color});
    }

    setCategoryName('');
    setSelectedColorItem(null);
  };

  const cancelButtonHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }

    setCategoryName('');
    setSelectedColorItem(null);
  };

  const touchOutsideHandler = () => {
    if (onTouchOutside) {
      onTouchOutside();
    }

    setCategoryName('');
    setSelectedColorItem(null);
  };

  const colorPressHandler = ({colorItem}) => {
    setSelectedColorItem(colorItem);
  };

  const textChangeHandler = (text) => {
    setCategoryName(text);
  };

  const progressIndicator = categoryAddInProgress ? (
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
              {color: categoryName ? '#4a9dec' : 'lightgrey'},
            ]}>
            {t('AddCategoryDialog_addButton')}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        style={styles.cancelButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={cancelButtonHandler}>
        <View style={styles.cancelButtonContainer}>
          <Text style={styles.cancelButtonText}>
            {t('AddCategoryDialog_cancelButton')}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  useEffect(() => {
    if (!categoryAddInProgress && categoryAddWasInProgress) {
      if (onCloseRequest) {
        onCloseRequest({addedCategory: lastAddedCategory});
      } else {
        SystemEventsHandler.onError({
          err: 'AddCategoryDialog->onCloseRequest_IS_NULL',
        });
      }
    }

    if (categoryAddInProgress) {
      setCategoryAddWasInProgress(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryAddInProgress, categoryAddWasInProgress]);

  return (
    <Dialog
      dialogStyle={{borderRadius: 10}}
      // animationType={'none'}
      visible={visible}
      title={t('AddCategoryDialog_dialogTitle')}
      buttons={buttons}
      onTouchOutside={touchOutsideHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.categoryColorContainer}>
            <View
              style={{
                alignSelf: 'stretch',
                height: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
              {progressIndicator}
            </View>
            <CategoryColorsList
              selectedColorItem={selectedColorItem}
              onColorPress={colorPressHandler}
            />
          </View>
          <View style={styles.spacer} />
          <View style={styles.categoryNameContainer}>
            <TextInput
              value={categoryName}
              blurOnSubmit={false}
              placeholder={t('AddCategoryDialog_placeholder')}
              fontSize={18}
              underlineColorAndroid={'lightgrey'}
              onChangeText={textChangeHandler}
            />
          </View>
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'stretch',
    height: 120,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  categoryColorContainer: {
    height: 50,
    backgroundColor: 'transparent',
  },
  spacer: {
    alignSelf: 'stretch',
    height: 20,
  },
  categoryNameContainer: {
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

export default AddCategoryDialog;
