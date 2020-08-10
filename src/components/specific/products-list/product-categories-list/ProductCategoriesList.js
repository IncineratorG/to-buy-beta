import React, {useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ProductCategoryItem from './ProductCategoryItem';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

const ProductCategoriesList = ({
  categories,
  productsListChangeCategoryUpdating,
  selectedCategoryId,
  onCategoryPress,
}) => {
  const renderItem = useCallback(
    ({item}) => {
      return (
        <ProductCategoryItem
          category={item}
          selectedCategoryId={selectedCategoryId}
          productsListChangeCategoryUpdating={
            productsListChangeCategoryUpdating
          }
          onCategoryPress={onCategoryPress}
        />
      );
    },
    [selectedCategoryId, productsListChangeCategoryUpdating, onCategoryPress],
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
