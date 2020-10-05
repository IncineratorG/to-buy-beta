import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {View, FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import CategoriesListItem from './categories-list-item/CategoriesListItem';
import {SystemEventsHandler} from '../../../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

const CategoriesListInitializing = ({
  categoriesList,
  setCategoriesListWithWidths,
  selectedCategory,
  onCategoryPress,
  onCategoryLongPress,
}) => {
  // SystemEventsHandler.onInfo({info: 'START: ' + categoriesList.length});

  const [categoriesArrayComponent, setCategoriesArrayComponent] = useState(
    null,
  );

  const [map, setMap] = useState(new Map());
  const updateMap = (k, v) => {
    setMap(new Map(map.set(k, v)));
  };

  const listItemWidthsMap = new Map();
  let categoriesListWithWidths = [];

  const renderItem = ({item}) => {
    return (
      <CategoriesListItem
        category={item}
        selectedCategory={selectedCategory}
        onCategoryPress={onCategoryPress}
        onCategoryLongPress={onCategoryLongPress}
      />
    );
  };

  const listItemOnLayout = ({event, category}) => {
    // listItemWidthsMap.set(category.id, event.nativeEvent.layout.width);
    SystemEventsHandler.onInfo({info: 'ON_LAYOUT: ' + map.size});
    updateMap(category.id, event.nativeEvent.layout.width);
  };

  useEffect(() => {
    // SystemEventsHandler.onInfo({info: 'IN_EFFECT: ' + categoriesList.length});

    setCategoriesArrayComponent(
      categoriesList.map((category) => {
        // SystemEventsHandler.onInfo({info: 'MAPPING: ' + category.name});

        return (
          <View style={styles.invisibleContainer} key={category.id}>
            <CategoriesListItem
              onLayout={listItemOnLayout}
              category={category}
              selectedCategory={selectedCategory}
              onCategoryPress={onCategoryPress}
              onCategoryLongPress={onCategoryLongPress}
            />
          </View>
        );
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesList]);

  useEffect(() => {
    SystemEventsHandler.onInfo({
      info: 'LAST_EFF: ' + categoriesList.length + ' - ' + map.size,
    });

    if (map.size >= categoriesList.length) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      categoriesListWithWidths = categoriesList.map((categoryListItem) => {
        const categoryComponentWidth = map.get(categoryListItem.id)
          ? map.get(categoryListItem.id)
          : 35;

        return {
          ...categoryListItem,
          width: Math.ceil(categoryComponentWidth),
        };
      });

      setCategoriesListWithWidths(categoriesListWithWidths);
    }
  }, [categoriesList, map]);

  return (
    <View style={styles.mainContainer}>
      {categoriesArrayComponent}
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
          data={categoriesList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          activeOpacity={1}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          initialNumToRender={categoriesList.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ===
  invisibleContainer: {
    position: 'absolute',
    zIndex: -100,
    bottom: -100,
  },
  // ===

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

export default CategoriesListInitializing;

// const listItemOnLayout = ({event, category}) => {
//   SystemEventsHandler.onInfo({
//     info: 'ON_LAYOUT: ' + category.id + ' - ' + category.name,
//   });
//
//   widthsMap.set(category.id, event.nativeEvent.layout.width);
//   if (widthsMap.size % categoriesList.length === 0) {
//     const categoriesArrayWithWidths = categoriesList.map(
//       (categoryListItem) => {
//         const categoryComponentWidth = widthsMap.get(categoryListItem.id)
//           ? widthsMap.get(categoryListItem.id)
//           : 35;
//
//         return {
//           ...categoryListItem,
//           width: Math.ceil(categoryComponentWidth),
//         };
//       },
//     );
//
//     setCategoriesListWithWidths(categoriesArrayWithWidths);
//   }
// };

// SystemEventsHandler.onInfo({
//   info: 'HERE: ' + listItemWidthsMap.size + ' - ' + categoriesList.length,
// });

// if (listItemWidthsMap.size === categoriesList.length) {
//   SystemEventsHandler.onInfo({info: 'UPDATE_ARRAY_WITH_WIDTHS'});
//
//   categoriesListWithWidths = categoriesList.map((categoryListItem) => {
//     const categoryComponentWidth = listItemWidthsMap.get(
//       categoryListItem.id,
//     )
//       ? listItemWidthsMap.get(categoryListItem.id)
//       : 35;
//
//     return {
//       ...categoryListItem,
//       width: Math.ceil(categoryComponentWidth),
//     };
//   });
//
//   setCategoriesListWithWidths(categoriesListWithWidths);
// }

// const categoriesArrayComponent = categoriesList.map((category) => {
//   SystemEventsHandler.onInfo({info: 'MAPPING: ' + category.name});
//
//   return (
//     <View style={styles.invisibleContainer} key={category.id}>
//       <CategoriesListItem
//         onLayout={listItemOnLayout}
//         category={category}
//         selectedCategory={selectedCategory}
//         onCategoryPress={onCategoryPress}
//         onCategoryLongPress={onCategoryLongPress}
//       />
//     </View>
//   );
// });

// useEffect(() => {
//   SystemEventsHandler.onInfo({
//     info: 'IN_COMPONENT_EFFECT: ' + listItemWidthsMap.size,
//   });
// }, [categoriesArrayComponent]);

// useEffect(() => {
//   categoriesList.forEach((category) => {
//     const categoryComponentWidth = widthsMap.get(category.id);
//     SystemEventsHandler.onInfo({
//       info: category.name + ' - ' + categoryComponentWidth,
//     });
//   });
// }, [categoriesList]);
