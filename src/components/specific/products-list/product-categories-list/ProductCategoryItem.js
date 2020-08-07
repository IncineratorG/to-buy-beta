import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import TextColorDeterminer from '../../../../utils/common/text-color-determiner/TextColorDeterminer';

const ProductCategoryItem = ({
  category,
  changeCategoryProductsListUpdateRunning,
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

  // if (categorySelected && changeCategoryProductsListUpdateRunning) {
  //   backgroundColor = 'green';
  // }

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

// import React, {useState, useEffect} from 'react';
// import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
// import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
// import TextColorDeterminer from '../../../../utils/common/text-color-determiner/TextColorDeterminer';
//
// const ProductCategoryItem = ({
//   category,
//   changeCategoryProductsListUpdateRunning,
//   selectedCategoriesIds,
//   onCategoryPress,
// }) => {
//   const categorySelected = selectedCategoriesIds.has(category.id);
//   const categoryCompleted = category.completed;
//
//   let backgroundColor = '#edeef1';
//   let textColor = 'black';
//   if (categorySelected && !categoryCompleted) {
//     backgroundColor = category.color;
//     textColor = TextColorDeterminer.determine(backgroundColor);
//   } else if (categorySelected && categoryCompleted) {
//     backgroundColor = '#808080';
//     textColor = TextColorDeterminer.determine(backgroundColor);
//   }
//
//   // if (categorySelected && changeCategoryProductsListUpdateRunning) {
//   //   backgroundColor = 'green';
//   // }
//
//   // const [categorySelected, setCategorySelected] = useState(false);
//   // const [categoryCompleted, setCategoryCompleted] = useState(false);
//   // const [backgroundColor, setBackgroundColor] = useState('green');
//   // const [textColor, setTextColor] = useState('white');
//   //
//   // useEffect(() => {
//   //   const currentCategorySelected = selectedCategoriesIds.has(category.id);
//   //   const currentCategoryCompleted = category.completed;
//   //
//   //   if (currentCategorySelected && !currentCategoryCompleted) {
//   //     setBackgroundColor(category.color);
//   //     setTextColor(TextColorDeterminer.determine(category.color));
//   //   } else if (currentCategorySelected && currentCategoryCompleted) {
//   //     setBackgroundColor('#808080');
//   //     setTextColor(TextColorDeterminer.determine('#808080'));
//   //   } else {
//   //     setBackgroundColor('#edeef1');
//   //     setTextColor('black');
//   //   }
//   // }, [
//   //   category,
//   //   selectedCategoriesIds,
//   //   changeCategoryProductsListUpdateRunning,
//   // ]);
//
//   // const busyTextComponent = (
//   //   <View style={{flex: 1, alignSelf: 'stretch', width: 30, margin: 5, backgroundColor: 'grey'}} />
//   // );
//   // const notBusyTextComponent = (
//   //   <Text style={[styles.typeTitle, {color: textColor}]}>{category.name}</Text>
//   // );
//   //
//   // const [textComponent, setTextComponent] = useState(notBusyTextComponent);
//
//   const [stateBackgroundColor, setStateBackgroundColor] = useState('green');
//   const [stateTextColor, setStateTextColor] = useState('white');
//
//   const itemPressHandler = () => {
//     // setTextComponent(busyTextComponent);
//     setStateBackgroundColor('green');
//
//     if (onCategoryPress) {
//       onCategoryPress({
//         category,
//         selected: selectedCategoriesIds.has(category.id),
//       });
//     }
//   };
//
//   useEffect(() => {
//     if (categorySelected && !categoryCompleted) {
//       setStateBackgroundColor(category.color);
//       setStateTextColor(TextColorDeterminer.determine(category.color));
//     } else if (categorySelected && categoryCompleted) {
//       setStateBackgroundColor('#808080');
//       setStateTextColor(TextColorDeterminer.determine(category.color));
//     }
//   }, [categorySelected, categoryCompleted, category]);
//
//   return (
//     <TouchableWithoutFeedback
//       style={styles.touchable}
//       // underlayColor={'grey'}
//       onPress={itemPressHandler}>
//       <View
//         style={[
//           styles.mainContainer,
//           // eslint-disable-next-line react-native/no-inline-styles
//           {
//             borderColor: category.color,
//             opacity: category.completed ? 0.2 : 1.0,
//             backgroundColor: stateBackgroundColor,
//           },
//         ]}>
//         <Text style={[styles.typeTitle, {color: stateTextColor}]}>
//           {category.name}
//         </Text>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };
//
// const styles = StyleSheet.create({
//   touchable: {
//     borderRadius: 10,
//     margin: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainContainer: {
//     backgroundColor: 'lightgrey',
//     margin: 4,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: 'lightgrey',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   typeTitle: {
//     margin: 5,
//   },
// });
//
// export default ProductCategoryItem;

// import React from 'react';
// import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
// import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
// import TextColorDeterminer from '../../../../utils/common/text-color-determiner/TextColorDeterminer';
//
// const ProductCategoryItem = ({
//   category,
//   changeCategoryProductsListUpdateRunning,
//   selectedCategoriesIds,
//   onCategoryPress,
// }) => {
//   const categorySelected = selectedCategoriesIds.has(category.id);
//   const categoryCompleted = category.completed;
//
//   let backgroundColor = '#edeef1';
//   let textColor = 'black';
//   if (categorySelected && !categoryCompleted) {
//     backgroundColor = category.color;
//     textColor = TextColorDeterminer.determine(backgroundColor);
//   } else if (categorySelected && categoryCompleted) {
//     backgroundColor = '#808080';
//     textColor = TextColorDeterminer.determine(backgroundColor);
//   }
//
//   if (categorySelected && changeCategoryProductsListUpdateRunning) {
//     backgroundColor = 'green';
//   }
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
//           // eslint-disable-next-line react-native/no-inline-styles
//           {
//             borderColor: category.color,
//             opacity: category.completed ? 0.2 : 1.0,
//             backgroundColor: backgroundColor,
//           },
//         ]}>
//         <Text style={[styles.typeTitle, {color: textColor}]}>
//           {category.name}
//         </Text>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };
//
// const styles = StyleSheet.create({
//   touchable: {
//     borderRadius: 10,
//     margin: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainContainer: {
//     backgroundColor: 'lightgrey',
//     margin: 4,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: 'lightgrey',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   typeTitle: {
//     margin: 5,
//   },
// });
//
// export default ProductCategoryItem;
