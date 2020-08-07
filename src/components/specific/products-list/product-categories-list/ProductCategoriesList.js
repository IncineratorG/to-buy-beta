import React, {useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ProductCategoryItem from './ProductCategoryItem';

const ProductCategoriesList = ({
  categories,
  changeCategoryProductsListUpdateRunning,
  selectedCategoriesIds,
  onCategoryPress,
}) => {
  const renderItem = useCallback(
    ({item}) => {
      return (
        <ProductCategoryItem
          category={item}
          selectedCategoriesIds={selectedCategoriesIds}
          changeCategoryProductsListUpdateRunning={
            changeCategoryProductsListUpdateRunning
          }
          onCategoryPress={onCategoryPress}
        />
      );
    },
    [
      selectedCategoriesIds,
      changeCategoryProductsListUpdateRunning,
      onCategoryPress,
    ],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        inverted={true}
        data={categories}
        horizontal={true}
        activeOpacity={1}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default ProductCategoriesList;
