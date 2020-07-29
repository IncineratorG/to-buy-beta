import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import CategoryColorsList from '../category-colors-list/CategoryColorsList';
import AvailableColors from '../../../../utils/common/available-colors/AvailableColors';
import {useTranslation} from '../../../../utils/common/localization';

const EditCategoryDialog = ({
  visible,
  category,
  onTouchOutside,
  onSavePress,
  onRemovePress,
  onCancelPress,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedColorItem, setSelectedColorItem] = useState(null);

  const {t} = useTranslation();

  const touchOutsideHandler = () => {
    if (onTouchOutside) {
      onTouchOutside();
    }
  };

  const saveButtonHandler = () => {
    if (!categoryName) {
      return;
    }

    const categoryColor = selectedColorItem
      ? selectedColorItem
      : AvailableColors.getDefaultColor();

    if (onSavePress) {
      onSavePress({
        id: category.id,
        name: categoryName,
        color: categoryColor.color,
      });
    }
  };

  const cancelButtonHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }
  };

  const removeButtonHandler = () => {
    if (onRemovePress) {
      onRemovePress({id: category.id});
    }
  };

  const colorPressHandler = ({colorItem}) => {
    setSelectedColorItem(colorItem);
  };

  const textChangeHandler = (text) => {
    setCategoryName(text);
  };

  useEffect(() => {
    const initialCategoryName = category ? category.name : '';
    const initialCategoryColorItem = category
      ? AvailableColors.getColorItem({colorHex: category.color})
      : null;

    setCategoryName(initialCategoryName);
    setSelectedColorItem(initialCategoryColorItem);
  }, [category]);

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
              {color: categoryName ? '#4a9dec' : 'lightgrey'},
            ]}>
            {t('EditCategoryDialog_saveButton')}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        style={styles.cancelButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={cancelButtonHandler}>
        <View style={styles.cancelButtonContainer}>
          <Text style={styles.cancelButtonText}>
            {t('EditCategoryDialog_cancelButton')}
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
              {t('EditCategoryDialog_removeButton')}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );

  return (
    <Dialog
      visible={visible}
      title={t('EditCategoryDialog_dialogTitle')}
      buttons={buttons}
      onTouchOutside={touchOutsideHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.categoryColorContainer}>
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
              placeholder={t('EditCategoryDialog_placeholder')}
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

export default EditCategoryDialog;
