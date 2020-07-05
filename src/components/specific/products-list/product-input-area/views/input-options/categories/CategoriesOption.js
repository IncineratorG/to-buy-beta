import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import CategoriesList from './categories-list/CategoriesList';

const CategoriesOption = ({state, categoriesList, onCategoryPress}) => {
  return (
    <View style={styles.mainContainer}>
      <CategoriesList
        selectedCategory={state.selectedCategory}
        categoriesList={categoriesList}
        onCategoryPress={onCategoryPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default CategoriesOption;
