import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import TextColorDeterminer from '../../../../utils/common/text-color-determiner/TextColorDeterminer';

const ProductCategoryItem = ({
  category,
  selectedCategoriesIds,
  onCategoryPress,
}) => {
  const categorySelected = selectedCategoriesIds.has(category.id);
  const categoryCompleted = category.completed;

  let backgroundColor = '#edeef1';
  let textColor = 'black';
  if (categorySelected && !categoryCompleted) {
    backgroundColor = category.color;
    textColor = TextColorDeterminer.determine(backgroundColor);
  } else if (categorySelected && categoryCompleted) {
    backgroundColor = '#808080';
    textColor = TextColorDeterminer.determine(backgroundColor);
  }

  const itemPressHandler = () => {
    if (onCategoryPress) {
      onCategoryPress({
        category,
        selected: selectedCategoriesIds.has(category.id),
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles.touchable}
      // underlayColor={'grey'}
      onPress={itemPressHandler}>
      <View
        style={[
          styles.mainContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderColor: category.color,
            opacity: category.completed ? 0.2 : 1.0,
            backgroundColor: backgroundColor,
          },
        ]}>
        <Text style={[styles.typeTitle, {color: textColor}]}>
          {category.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: 'lightgrey',
    margin: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTitle: {
    margin: 5,
  },
});

export default ProductCategoryItem;

// const ProductCategoryItem = ({
//   category,
//   selectedCategoriesIds,
//   onCategoryPress,
// }) => {
//   // const selectedCategoryId = selectedCategory ? selectedCategory.id : -1;
//
//   const itemPressHandler = () => {
//     if (onCategoryPress) {
//       onCategoryPress({
//         category,
//         selected: selectedCategoriesIds.has(category.id),
//       });
//     }
//   };
//
//   return (
//     <TouchableWithoutFeedback
//       style={styles.touchable}
//       // underlayColor={'grey'}
//       onPress={itemPressHandler}>
//       <View
//         style={[
//           styles.mainContainer,
//           {
//             borderColor: category.color,
//             opacity: category.completed ? 0.2 : 1.0,
//             backgroundColor:
//               category.id === selectedCategoryId ? 'lightgrey' : '#edeef1',
//           },
//         ]}>
//         <Text style={styles.typeTitle}>{category.name}</Text>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };
