import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import UnitsListItem from './units-list-item/UnitsListItem';

const UnitsListActual = ({
  unitsListWithWidths,
  selectedUnit,
  onUnitPress,
  onUnitLongPress,
}) => {
  const width = useWindowDimensions().width;
  const listRef = useRef(null);

  const [count, setCount] = useState(0);

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

  const getItemLayout = (data, index) => {
    const itemWidth = data[index].width;
    let itemOffset = 0;
    for (let i = 0; i < index; ++i) {
      itemOffset = itemOffset + data[i].width;
    }

    return {
      length: itemWidth,
      offset: itemOffset,
      index,
    };
  };

  useEffect(() => {
    if (selectedUnit && listRef.current && unitsListWithWidths.length) {
      const selectedUnitIndex = unitsListWithWidths.findIndex(
        (unitItem) => unitItem.id === selectedUnit.id,
      );

      if (selectedUnitIndex >= 0) {
        setTimeout(() => {
          if (listRef && listRef.current) {
            listRef.current.scrollToIndex({
              animated: true,
              index: selectedUnitIndex,
              viewOffset: count === 0 ? width / 2.5 : 0,
              viewPosition: 0.5,
            });
            setCount(count + 1);
          }
        }, 50);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitsListWithWidths, selectedUnit, listRef]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          ref={listRef}
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
          data={unitsListWithWidths}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          activeOpacity={1}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          getItemLayout={unitsListWithWidths.length ? getItemLayout : null}
          snapToAlignment={'center'}
          initialNumToRender={unitsListWithWidths.length}
          // onScroll={onScroll}
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

export default UnitsListActual;
