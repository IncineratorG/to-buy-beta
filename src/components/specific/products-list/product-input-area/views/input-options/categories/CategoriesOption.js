import React from 'react';
import {View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import CategoriesList from './categories-list/CategoriesList';
import {icons} from '../../../../../../../assets/icons';

const CategoriesOption = ({
  state,
  categoriesList,
  onCategoryPress,
  onCategoryLongPress,
  onAddCategoryPress,
}) => {
  const addCategoryButtonHandler = () => {
    if (onAddCategoryPress) {
      onAddCategoryPress();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CategoriesList
        selectedCategory={state.currentInput.selectedCategory}
        categoriesList={categoriesList}
        onCategoryPress={onCategoryPress}
        onCategoryLongPress={onCategoryLongPress}
      />
      <View style={styles.addCategoryButtonContainer}>
        <TouchableHighlight
          style={styles.addCategoryButtonTouchable}
          onPress={addCategoryButtonHandler}>
          <View style={styles.addCategoryButton}>
            <Image style={styles.addCategoryButtonIcon} source={icons.cross} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  addCategoryButtonContainer: {
    width: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCategoryButtonTouchable: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  addCategoryButton: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#4a9dec',
    borderRadius: 15,
  },
  addCategoryButtonIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    transform: [{rotate: '45deg'}, {scale: 0.6}],
  },
});

export default CategoriesOption;
