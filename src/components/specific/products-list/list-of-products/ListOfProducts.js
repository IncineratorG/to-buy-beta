import React, {useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Product from './items/Product';
import ProductRenderManager from './items/ProductRenderManager';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

const ListOfProducts = ({
  list,
  unitsMap,
  categoriesMap,
  selectedCategoryId,
  onProductPress,
  onStatusPress,
  onRemovePress,
  onRenderCompleted,
  onFindNearbyOnMapPress,
}) => {
  const innerList = list.filter((product) =>
    ProductRenderManager.canRender({product, selectedCategoryId}),
  );
  if (innerList.length) {
    innerList.push({id: 'extra', extra: true});
  }

  const renderItem = useCallback(
    ({item}) => {
      return (
        <Product
          product={item}
          unitsMap={unitsMap}
          categoriesMap={categoriesMap}
          onProductPress={onProductPress}
          onProductLongPress={onRemovePress}
          onStatusPress={onStatusPress}
          onFindNearbyOnMapPress={onFindNearbyOnMapPress}
        />
      );
    },
    [
      onFindNearbyOnMapPress,
      onProductPress,
      onRemovePress,
      onStatusPress,
      unitsMap,
      categoriesMap,
    ],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  useEffect(() => {
    if (onRenderCompleted) {
      onRenderCompleted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={innerList}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  list: {
    flex: 1,
    paddingTop: 8,
  },
});

export default ListOfProducts;
