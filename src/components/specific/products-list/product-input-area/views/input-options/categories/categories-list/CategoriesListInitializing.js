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
  const [categoriesArrayComponent, setCategoriesArrayComponent] = useState(
    null,
  );

  const [
    categoriesComponentsWidthsMap,
    setCategoriesComponentsWidthsMap,
  ] = useState(new Map());
  const updateCategoriesComponentsWidthsMap = (key, width) => {
    setCategoriesComponentsWidthsMap(
      new Map(categoriesComponentsWidthsMap.set(key, width)),
    );
  };

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
    updateCategoriesComponentsWidthsMap(
      category.id,
      event.nativeEvent.layout.width,
    );
  };

  useEffect(() => {
    setCategoriesArrayComponent(
      categoriesList.map((category) => {
        return (
          <View
            style={styles.categoriesArrayInvisibleContainer}
            key={category.id}>
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
      info:
        'LAST_EFFECT: ' +
        categoriesList.length +
        ' - ' +
        categoriesComponentsWidthsMap.size,
    });

    if (categoriesComponentsWidthsMap.size >= categoriesList.length) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const categoriesListWithWidths = categoriesList.map(
        (categoryListItem) => {
          let categoryComponentWidth = categoriesComponentsWidthsMap.get(
            categoryListItem.id,
          );
          if (!categoryComponentWidth) {
            SystemEventsHandler.onError({
              err:
                'CategoriesListInitializing->BAD_CATEGORY_COMPONENT_WIDTH: ' +
                JSON.stringify(categoryListItem),
            });
            categoryComponentWidth = 50;
          }

          return {
            ...categoryListItem,
            width: Math.ceil(categoryComponentWidth),
          };
        },
      );

      setCategoriesListWithWidths(categoriesListWithWidths);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesList, categoriesComponentsWidthsMap]);

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
  categoriesArrayInvisibleContainer: {
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

export default CategoriesListInitializing;
