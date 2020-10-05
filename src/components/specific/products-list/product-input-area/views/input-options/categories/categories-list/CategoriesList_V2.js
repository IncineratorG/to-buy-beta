import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import CategoriesListItem from './categories-list-item/CategoriesListItem';
import {SystemEventsHandler} from '../../../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

const CategoriesList_V2 = ({
  categoriesList,
  selectedCategory,
  onCategoryPress,
  onCategoryLongPress,
}) => {
  const width = useWindowDimensions().width;
  const actualListRef = useRef(null);
  const [needSwitch, setNeedSwitch] = useState(false);

  const widthsMap = new Map();

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

  const fakeListComponent = (
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
      />
    </View>
  );

  const actualListComponent = (
    <View style={styles.listContainer}>
      <FlatList
        ref={actualListRef}
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        data={categoriesList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        activeOpacity={1}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        getItemLayout={(data, index) => {
          const itemLength = widthsMap.get(data.id)
            ? widthsMap.get(data.id)
            : 50;

          return {
            length: itemLength,
            offset: itemLength * index,
            index,
          };
        }}
        snapToAlignment={'center'}
      />
    </View>
  );

  let renderedListComponent = fakeListComponent;

  const testOnLayout = ({event, category}) => {
    // SystemEventsHandler.onInfo({
    //   info: 'hereH: ' + event.nativeEvent.layout.width + ' - ' + category.name,
    // });

    widthsMap.set(category.id, event.nativeEvent.layout.width);

    if (widthsMap.size % categoriesList.length === 0) {
      SystemEventsHandler.onInfo({info: 'SWITCH'});

      renderedListComponent = actualListComponent;

      setNeedSwitch(true);

      // if (selectedCategory) {
      //   const selectedCategoryIndex = categoriesList.findIndex(
      //     (categoryItem) => categoryItem.id === selectedCategory.id,
      //   );
      //
      //   SystemEventsHandler.onInfo({
      //     info: 'INDEX: ' + selectedCategoryIndex + ' - ' + width,
      //   });
      //
      //   setTimeout(() => {
      //     if (actualListRef) {
      //       actualListRef.current.scrollToIndex({
      //         animated: true,
      //         index: selectedCategoryIndex,
      //         viewOffset: width / 2.5,
      //       });
      //     }
      //   }, 300);
      // }
    }
  };

  useEffect(() => {
    if (needSwitch) {
      if (selectedCategory) {
        const selectedCategoryIndex = categoriesList.findIndex(
          (categoryItem) => categoryItem.id === selectedCategory.id,
        );

        SystemEventsHandler.onInfo({
          info: 'INDEX: ' + selectedCategoryIndex + ' - ' + width,
        });

        setTimeout(() => {
          if (actualListRef) {
            actualListRef.current.scrollToIndex({
              animated: true,
              index: selectedCategoryIndex,
              viewOffset: width / 2.5,
            });
          }
        }, 300);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needSwitch]);

  const categoriesArrayComponent = categoriesList.map((category) => {
    return (
      <View style={styles.invisibleContainer} key={category.id}>
        <CategoriesListItem
          onLayout={testOnLayout}
          category={category}
          selectedCategory={selectedCategory}
          onCategoryPress={onCategoryPress}
          onCategoryLongPress={onCategoryLongPress}
        />
      </View>
    );
  });

  return (
    <View style={styles.mainContainer}>
      {renderedListComponent}
      {categoriesArrayComponent}
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

export default CategoriesList_V2;
