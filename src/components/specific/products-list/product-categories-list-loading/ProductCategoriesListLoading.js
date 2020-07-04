import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

const ProductCategoriesListLoading = () => {
  const fakeItems = ['1', '2', '3', '4'];

  const renderItem = () => {
    return <View style={styles.listItemContainer} />;
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        data={fakeItems}
        inverted={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  list: {
    flex: 1,
  },
  listItemContainer: {
    flex: 1,
    width: 80,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    margin: 4,
  },
});

export default ProductCategoriesListLoading;
