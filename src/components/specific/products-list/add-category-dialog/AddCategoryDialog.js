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
import CategoryColorsList from '../category-colors-list/CategoryColorsList';
import AvailableColors from '../../../common/available-colors/AvailableColors';
import {useTranslation} from '../../../common/localization';

const AddCategoryDialog = ({
  visible,
  onTouchOutside,
  onAddPress,
  onCancelPress,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedColorItem, setSelectedColorItem] = useState(null);

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

  return (
    <Dialog
      visible={visible}
      title={t('AddCategoryDialog_dialogTitle')}
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

/*
<View style={styles.categoryNameTitleContainer}>
  <Text style={styles.categoryNameTitle}>Название</Text>
  <View style={styles.categoryNameUnderline} />
</View>
 */

/*
<View style={styles.categoryColorTitleContainer}>
  <Text style={styles.categoryColorTitle}>Цвет</Text>
  <View style={styles.categoryColorUnderline} />
</View>
 */

// categoryColorTitleContainer: {
//   height: 20,
//   alignSelf: 'stretch',
//   backgroundColor: 'transparent',
// },
// categoryColorTitle: {
//   color: 'grey',
// },
// categoryColorUnderline: {
//   height: 1,
//   alignSelf: 'stretch',
//   backgroundColor: 'lightgrey',
//   marginRight: 250,
// },

// categoryNameTitleContainer: {
//   height: 20,
//   alignSelf: 'stretch',
//   backgroundColor: 'transparent',
// },
// categoryNameTitle: {
//   color: 'grey',
// },
// categoryNameUnderline: {
//   height: 1,
//   alignSelf: 'stretch',
//   backgroundColor: 'lightgrey',
//   marginRight: 250,
// },
