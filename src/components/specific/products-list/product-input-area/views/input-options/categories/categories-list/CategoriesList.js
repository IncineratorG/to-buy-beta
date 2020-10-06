import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CategoriesListInitializing from './CategoriesListInitializing';
import CategoriesListActual from './CategoriesListActual';

const CategoriesList = ({
  categoriesList,
  selectedCategory,
  onCategoryPress,
  onCategoryLongPress,
}) => {
  const [categoriesListWithWidths, setCategoriesListWithWidths] = useState([]);

  const initializingComponent = (
    <CategoriesListInitializing
      categoriesList={categoriesList}
      setCategoriesListWithWidths={setCategoriesListWithWidths}
      selectedCategory={selectedCategory}
      onCategoryPress={onCategoryPress}
      onCategoryLongPress={onCategoryLongPress}
    />
  );

  const actualComponent = (
    <CategoriesListActual
      categoriesListWithWidths={categoriesListWithWidths}
      selectedCategory={selectedCategory}
      onCategoryPress={onCategoryPress}
      onCategoryLongPress={onCategoryLongPress}
    />
  );

  const [
    initializingComponentStyles,
    setInitializingComponentStyles,
  ] = useState(styles.visibleComponentContainer);
  const [actualComponentStyles, setActualComponentStyles] = useState(
    styles.invisibleComponentContainer,
  );

  useEffect(() => {
    if (categoriesListWithWidths.length > 0) {
      setActualComponentStyles(styles.visibleComponentContainer);
      setInitializingComponentStyles(styles.invisibleComponentContainer);
    }
  }, [categoriesListWithWidths]);

  return (
    <View style={{flex: 1}}>
      <View style={initializingComponentStyles}>{initializingComponent}</View>
      <View style={actualComponentStyles}>{actualComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  invisibleComponentContainer: {
    position: 'absolute',
    zIndex: -100,
    bottom: -500,
  },
  visibleComponentContainer: {
    flex: 1,
  },
});

export default CategoriesList;
