import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ListOfShoppingListsItem from './items/ListOfShoppingListsItem';

const ListOfShoppingLists = ({
  online,
  currentEmail,
  list,
  onItemPress,
  onRemovePress,
  onSharePress,
}) => {
  const innerList = [...list];
  if (innerList.length) {
    innerList.push({id: 'extra', extra: true});
  }

  const renderItem = ({item}) => {
    return (
      <ListOfShoppingListsItem
        online={online}
        listItem={item}
        currentEmail={currentEmail}
        onItemPress={onItemPress}
        onRemovePress={onRemovePress}
        onSharePress={onSharePress}
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
  listContainer: {flex: 1, backgroundColor: 'transparent'},
  list: {
    flex: 1,
    paddingTop: 8,
  },
});

export default ListOfShoppingLists;
