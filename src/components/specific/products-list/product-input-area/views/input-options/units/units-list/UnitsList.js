import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import UnitsListInitializing from './UnitsListInitializing';
import UnitsListActual from './UnitsListActual';

const UnitsList = ({unitsList, selectedUnit, onUnitPress, onUnitLongPress}) => {
  const [unitsListWithWidths, setUnitsListWithWidths] = useState([]);
  const [
    initializingComponentStyles,
    setInitializingComponentStyles,
  ] = useState(styles.visibleComponentContainer);
  const [actualComponentStyles, setActualComponentStyles] = useState(
    styles.invisibleComponentContainer,
  );

  const initializingComponent = (
    <UnitsListInitializing
      unitsList={unitsList}
      setUnitsListWithWidths={setUnitsListWithWidths}
      selectedUnit={selectedUnit}
      onUnitPress={onUnitPress}
      onUnitLongPress={onUnitLongPress}
    />
  );

  const actualComponent = (
    <UnitsListActual
      unitsListWithWidths={unitsListWithWidths}
      selectedUnit={selectedUnit}
      onUnitPress={onUnitPress}
      onUnitLongPress={onUnitLongPress}
    />
  );

  useEffect(() => {
    if (unitsListWithWidths.length > 0) {
      setActualComponentStyles(styles.visibleComponentContainer);
      setInitializingComponentStyles(styles.invisibleComponentContainer);
    }
  }, [unitsListWithWidths]);

  return (
    <View style={{flex: 1}}>
      <View style={initializingComponentStyles}>{initializingComponent}</View>
      <View style={actualComponentStyles}>{actualComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  invisibleComponentContainer: {
    position: 'absolute',
    zIndex: -100,
    bottom: -500,
  },
  visibleComponentContainer: {
    flex: 1,
  },
});

export default UnitsList;

// import React from 'react';
// import {View, StyleSheet, FlatList} from 'react-native';
// import UnitsListItem from './units-list-item/UnitsListItem';
//
// const UnitsList = ({unitsList, selectedUnit, onUnitPress, onUnitLongPress}) => {
//   const renderItem = ({item}) => {
//     return (
//       <UnitsListItem
//         unit={item}
//         selectedUnit={selectedUnit}
//         onUnitPress={onUnitPress}
//         onUnitLongPress={onUnitLongPress}
//       />
//     );
//   };
//
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.listContainer}>
//         <FlatList
//           style={styles.list}
//           contentContainerStyle={styles.listContentContainer}
//           data={unitsList}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal={true}
//           activeOpacity={1}
//           showsHorizontalScrollIndicator={false}
//           keyboardShouldPersistTaps="always"
//         />
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   listContainer: {
//     flex: 1,
//   },
//   list: {
//     flex: 1,
//   },
//   listContentContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//
// export default UnitsList;
