import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CategoriesListInitializing from './CategoriesListInitializing';
import CategoriesListActual from './CategoriesListActual';

const CategoriesList = ({
  categoriesList,
  selectedCategory,
  onCategoryPress,
  onCategoryLongPress,
}) => {
  const [widthsMap, setWidthsMap] = useState(new Map());
  const [widthsMapReady, setWidthsMapReady] = useState(false);
  const [categoriesListWithWidths, setCategoriesListWithWidths] = useState([]);

  const initializingComponent = (
    <CategoriesListInitializing
      categoriesList={categoriesList}
      setCategoriesListWithWidths={setCategoriesListWithWidths}
      selectedCategory={selectedCategory}
      onCategoryPress={onCategoryPress}
      onCategoryLongPress={onCategoryLongPress}
    />
  );

  const actualComponent = (
    <CategoriesListActual
      categoriesListWithWidths={categoriesListWithWidths}
      selectedCategory={selectedCategory}
      onCategoryPress={onCategoryPress}
      onCategoryLongPress={onCategoryLongPress}
    />
  );

  const [activeComponent, setActiveComponent] = useState(initializingComponent);
  const [
    initializingComponentStyles,
    setInitializingComponentStyles,
  ] = useState(styles.visibleContainer);
  const [actualComponentStyles, setActualComponentStyles] = useState(
    styles.invisibleContainer,
  );

  useEffect(() => {
    if (categoriesListWithWidths.length > 0) {
      setActualComponentStyles(styles.visibleContainer);
      setInitializingComponentStyles(styles.invisibleContainer);
    }
  }, [categoriesListWithWidths]);

  // useEffect(() => {
  //   if (categoriesList.length > widthsMap.size) {
  //     setActualComponentStyles(styles.invisibleContainer);
  //     setInitializingComponentStyles(styles.visibleContainer);
  //   } else {
  //     setActualComponentStyles(styles.visibleContainer);
  //     setInitializingComponentStyles(styles.invisibleContainer);
  //   }
  //
  //   // if (widthsMapReady) {
  //   //   setActualComponentStyles(styles.visibleContainer);
  //   //   setInitializingComponentStyles(styles.invisibleContainer);
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [widthsMapReady, widthsMap]);

  return (
    <View style={{flex: 1}}>
      <View style={initializingComponentStyles}>{initializingComponent}</View>
      <View style={actualComponentStyles}>{actualComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ===
  invisibleContainer: {
    position: 'absolute',
    zIndex: -100,
    bottom: -500,
  },
  visibleContainer: {
    flex: 1,
  },
  // ====

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

export default CategoriesList;

// import React, {useRef, useState, useEffect} from 'react';
// import {View, FlatList, StyleSheet, useWindowDimensions} from 'react-native';
// import CategoriesListItem from './categories-list-item/CategoriesListItem';
// import {SystemEventsHandler} from '../../../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
//
// const CategoriesList = ({
//   categoriesList,
//   selectedCategory,
//   onCategoryPress,
//   onCategoryLongPress,
// }) => {
//   const renderItem = ({item}) => {
//     return (
//       <CategoriesListItem
//         category={item}
//         selectedCategory={selectedCategory}
//         onCategoryPress={onCategoryPress}
//         onCategoryLongPress={onCategoryLongPress}
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
//           data={categoriesList}
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
// export default CategoriesList;

// ======================================================
// ======================================================
// ======================================================
// ======================================================
// import React, {useRef, useState, useEffect} from 'react';
// import {View, FlatList, StyleSheet, useWindowDimensions} from 'react-native';
// import CategoriesListItem from './categories-list-item/CategoriesListItem';
// import {SystemEventsHandler} from '../../../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
//
// const CategoriesList = ({
//   categoriesList,
//   selectedCategory,
//   onCategoryPress,
//   onCategoryLongPress,
// }) => {
//   // ===
//   const testOnLayout = (e) => {
//     SystemEventsHandler.onInfo({info: 'hereH: ' + e.nativeEvent.layout.width});
//     // setWidthsMap((prevState) =>
//     //   prevState.set(item.id, e.nativeEvent.layout.width),
//     // );
//   };
//   const element = React.createElement(
//     CategoriesListItem,
//     {
//       category: categoriesList[0],
//       selectedCategory,
//       onCategoryPress,
//       onCategoryLongPress,
//       onLayout: testOnLayout,
//     },
//     null,
//   );
//
//   function decycle(obj, stack = []) {
//     if (!obj || typeof obj !== 'object') {
//       return obj;
//     }
//
//     if (stack.includes(obj)) {
//       return null;
//     }
//
//     let s = stack.concat([obj]);
//
//     return Array.isArray(obj)
//       ? obj.map((x) => decycle(x, s))
//       : Object.fromEntries(
//           Object.entries(obj).map(([k, v]) => [k, decycle(v, s)]),
//         );
//   }
//
//   SystemEventsHandler.onInfo({
//     info: 'ELEM: ' + JSON.stringify(decycle(element)),
//   });
//   // ===
//
//   const width = useWindowDimensions().width;
//
//   const listRef = useRef(null);
//
//   const [widthsMap, setWidthsMap] = useState(new Map());
//   // SystemEventsHandler.onInfo({info: widthsMap.size});
//
//   if (selectedCategory) {
//     const selectedCategoryIndex = categoriesList.findIndex(
//       (category) => category.id === selectedCategory.id,
//     );
//
//     // SystemEventsHandler.onInfo({
//     //   info: 'INDEX: ' + selectedCategoryIndex + ' - ' + width,
//     // });
//
//     listRef.current.scrollToIndex({
//       animated: true,
//       index: selectedCategoryIndex,
//       viewOffset: width / 2.5,
//     });
//   }
//
//   const renderItem = ({item}) => {
//     const onLayout = (e) => {
//       // SystemEventsHandler.onInfo({info: 'here: ' + widthsMap.size});
//
//       setWidthsMap((prevState) =>
//         prevState.set(item.id, e.nativeEvent.layout.width),
//       );
//     };
//
//     return (
//       <CategoriesListItem
//         onLayout={onLayout}
//         category={item}
//         selectedCategory={selectedCategory}
//         onCategoryPress={onCategoryPress}
//         onCategoryLongPress={onCategoryLongPress}
//       />
//     );
//   };
//
//   // useEffect(() => {
//   //   SystemEventsHandler.onInfo({info: 'HERE'});
//   //
//   //   const map = new Map();
//   //   categoriesList.forEach((category) => {
//   //     map.set(category.id, 50);
//   //   });
//   //
//   //   setWidthsMap(map);
//   // }, [widthsMap, categoriesList]);
//
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.listContainer}>
//         <FlatList
//           ref={listRef}
//           style={styles.list}
//           contentContainerStyle={styles.listContentContainer}
//           data={categoriesList}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal={true}
//           activeOpacity={1}
//           showsHorizontalScrollIndicator={false}
//           keyboardShouldPersistTaps="always"
//           getItemLayout={(data, index) => {
//             // SystemEventsHandler.onInfo({
//             //   info: 'WIDTH: ' + widthsMap.get(data.id),
//             // });
//
//             // SystemEventsHandler.onInfo({info: JSON.stringify(data[index].name)});
//
//             const minItemWidth = 50;
//
//             const textLength = data[index].name.length;
//
//             const itemWidth = textLength * 12;
//             const finalItemWidth =
//               itemWidth > minItemWidth ? itemWidth : minItemWidth;
//
//             // SystemEventsHandler.onInfo({info: itemWidth});
//
//             return {
//               length: finalItemWidth,
//               offset: finalItemWidth * index,
//               index,
//             };
//
//             // return {
//             //   length: width / 5,
//             //   offset: (width / 5) * index,
//             //   index,
//             // };
//           }}
//           // getItemLayout={(data, index) =>
//           //   // Max 5 items visibles at once
//           // SystemEventsHandler.onInfo({info: JSON.stringify(data)});
//           //
//           //   return {
//           //     length: width / 5,
//           //     offset: (width / 5) * index,
//           //     index,
//           //   }
//           // }
//           snapToAlignment={'center'}
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
// export default CategoriesList;
