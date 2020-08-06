import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Product from './items/Product';
import ProductRenderManager from './items/ProductRenderManager';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';

const ListOfProducts = ({
  list,
  onProductPress,
  onStatusPress,
  onRemovePress,
  unitsMap,
  categoriesMap,
  selectedCategoriesIds,
}) => {
  const innerList = [...list];
  if (innerList.length) {
    innerList.push({id: 'extra', extra: true});
  }

  const renderItem = ({item}) => {
    if (
      !ProductRenderManager.canRender({product: item, selectedCategoriesIds})
    ) {
      return null;
    }

    return (
      <Product
        product={item}
        onProductPress={onProductPress}
        onProductLongPress={onRemovePress}
        onStatusPress={onStatusPress}
        unitsMap={unitsMap}
        categoriesMap={categoriesMap}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={innerList}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
