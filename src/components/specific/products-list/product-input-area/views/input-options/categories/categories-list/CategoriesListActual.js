import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import CategoriesListItem from './categories-list-item/CategoriesListItem';

const CategoriesListActual = ({
  categoriesListWithWidths,
  selectedCategory,
  onCategoryPress,
  onCategoryLongPress,
}) => {
  const width = useWindowDimensions().width;
  const listRef = useRef(null);

  const [count, setCount] = useState(0);

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
    if (
      selectedCategory &&
      listRef.current &&
      categoriesListWithWidths.length
    ) {
      const selectedCategoryIndex = categoriesListWithWidths.findIndex(
        (categoryItem) => categoryItem.id === selectedCategory.id,
      );

      let xOffset = 0;
      let selectedCategoryWidth = 0;
      for (let i = 0; i < categoriesListWithWidths.length; ++i) {
        if (categoriesListWithWidths[i].id === selectedCategory.id) {
          selectedCategoryWidth = categoriesListWithWidths[i].width;
          break;
        }

        xOffset = xOffset + categoriesListWithWidths[i].width;
      }
      xOffset = xOffset - width / 4;

      if (selectedCategoryIndex >= 0) {
        setTimeout(() => {
          if (listRef.current) {
            listRef.current.scrollToOffset({
              offset: xOffset,
            });
          }
        }, 75);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesListWithWidths, selectedCategory, listRef]);
  // useEffect(() => {
  //   if (
  //     selectedCategory &&
  //     listRef.current &&
  //     categoriesListWithWidths.length
  //   ) {
  //     const selectedCategoryIndex = categoriesListWithWidths.findIndex(
  //       (categoryItem) => categoryItem.id === selectedCategory.id,
  //     );
  //
  //     if (selectedCategoryIndex >= 0) {
  //       setTimeout(() => {
  //         if (listRef && listRef.current) {
  //           listRef.current.scrollToIndex({
  //             animated: true,
  //             index: selectedCategoryIndex,
  //             viewOffset: count === 0 ? width / 2.5 : 0,
  //             viewPosition: 0.5,
  //           });
  //           setCount(count + 1);
  //         }
  //       }, 50);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [categoriesListWithWidths, selectedCategory, listRef]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          ref={listRef}
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
          data={categoriesListWithWidths}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          activeOpacity={1}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          getItemLayout={categoriesListWithWidths.length ? getItemLayout : null}
          snapToAlignment={'center'}
          initialNumToRender={categoriesListWithWidths.length}
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

export default CategoriesListActual;
