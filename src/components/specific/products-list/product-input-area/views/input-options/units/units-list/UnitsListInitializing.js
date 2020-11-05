import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import UnitsListItem from './units-list-item/UnitsListItem';
import {SystemEventsHandler} from '../../../../../../../../utils/common/system-events-handler/SystemEventsHandler';

const UnitsListInitializing = ({
  unitsList,
  setUnitsListWithWidths,
  selectedUnit,
  onUnitPress,
  onUnitLongPress,
}) => {
  const [unitsArrayComponent, setUnitsArrayComponent] = useState(null);

  const [unitsComponentsWidthsMap, setUnitsComponentsWidthsMap] = useState(
    new Map(),
  );
  const updateUnitsComponentsWidthsMap = (key, width) => {
    setUnitsComponentsWidthsMap(
      new Map(unitsComponentsWidthsMap.set(key, width)),
    );
  };

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

  const listItemOnLayout = ({event, unit}) => {
    updateUnitsComponentsWidthsMap(unit.id, event.nativeEvent.layout.width);
  };

  useEffect(() => {
    setUnitsArrayComponent(
      unitsList.map((unit) => {
        return (
          <View
            style={styles.unitsArrayInvisibleContainer}
            key={unit.id.toString()}>
            <UnitsListItem
              onLayout={listItemOnLayout}
              unit={unit}
              selectedUnit={selectedUnit}
              onUnitPress={onUnitPress}
              onUnitLongPress={onUnitLongPress}
            />
          </View>
        );
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitsList]);

  useEffect(() => {
    if (unitsComponentsWidthsMap.size >= unitsList.length) {
      const unitsListWithWidths = unitsList.map((unitsListItem) => {
        let unitComponentWidth = unitsComponentsWidthsMap.get(unitsListItem.id);
        if (!unitComponentWidth) {
          SystemEventsHandler.onError({
            err:
              'UnitsListInitializing->BAD_CATEGORY_COMPONENT_WIDTH: ' +
              JSON.stringify(unitsListItem),
          });
          unitComponentWidth = 50;
        }

        return {
          ...unitsListItem,
          width: Math.ceil(unitComponentWidth),
        };
      });

      setUnitsListWithWidths(unitsListWithWidths);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitsList, unitsComponentsWidthsMap]);

  return (
    <View style={styles.mainContainer}>
      {unitsArrayComponent}
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
          // initialNumToRender={unitsList.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  unitsArrayInvisibleContainer: {
    position: 'absolute',
    zIndex: -100,
    bottom: -100,
  },
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

export default UnitsListInitializing;
