import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

const ListOfProductsLoading = () => {
  const fakeItems = ['1', '2', '3', '4'];

  const renderItem = () => {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.bodyContainer}>
          <View style={styles.bodyContent} />
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.footerContainer}>
          <View style={styles.footerContent} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={fakeItems}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item}
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
  listItemContainer: {
    height: 70,
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 4,
    elevation: 3,
    marginLeft: 8,
    marginRight: 8,
  },
  bodyContainer: {
    height: 40,
    alignSelf: 'stretch',
  },
  bodyContent: {
    backgroundColor: 'lightgrey',
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  separatorLine: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 4,
    marginRight: 4,
  },
  footerContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  footerContent: {
    backgroundColor: 'lightgrey',
    flex: 1,
    width: 180,
    marginLeft: 8,
    marginRight: 20,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 4,
  },
});

export default ListOfProductsLoading;
