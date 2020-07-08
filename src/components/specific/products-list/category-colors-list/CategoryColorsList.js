import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import CategoryColor from './category-color/CategoryColor';
import AvailableColors from '../../../common/available-colors/AvailableColors';

const CategoryColorsList = ({selectedColorItem, onColorPress}) => {
  const colors = AvailableColors.getColors();

  const renderItem = ({item}) => {
    return (
      <CategoryColor
        colorItem={item}
        selectedColorItem={selectedColorItem}
        onColorPress={onColorPress}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={colors}
        horizontal={true}
        activeOpacity={1}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: 'grey',
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryColorsList;
