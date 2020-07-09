import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import UnitsListItem from './units-list-item/UnitsListItem';

const UnitsList = ({unitsList, selectedUnit, onUnitPress, onUnitLongPress}) => {
  const renderItem = ({item}) => {
    return (
      <UnitsListItem
        unit={item}
        selectedUnit={selectedUnit}
        onUnitPress={onUnitPress}
        onUnitLongPress={onUnitLongPress}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
          data={unitsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          activeOpacity={1}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UnitsList;
