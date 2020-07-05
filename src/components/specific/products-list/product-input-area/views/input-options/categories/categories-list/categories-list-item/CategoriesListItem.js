import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import TextColorDeterminer from '../../../../../../../../common/text-color-determiner/TextColorDeterminer';
import {useTranslation} from '../../../../../../../../common/localization';

const CategoriesListItem = ({category, selectedCategory, onCategoryPress}) => {
  const {t} = useTranslation();

  const categoryName = category.translationMark
    ? t(category.translationMark)
    : category.name;

  const selectedCategoryId = selectedCategory ? selectedCategory.id : -1;

  const categoryPressHandler = () => {
    if (onCategoryPress) {
      onCategoryPress({category});
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles.touchable}
      onPress={categoryPressHandler}>
      <View
        style={[
          styles.mainContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderColor: category.color,
            opacity: category.completed ? 0.2 : 1.0,
            backgroundColor:
              category.id === selectedCategoryId ? category.color : 'white',
          },
        ]}>
        <Text
          style={[
            styles.typeTitle,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              color:
                category.id === selectedCategoryId
                  ? TextColorDeterminer.determine(category.color)
                  : 'black',
            },
          ]}>
          {categoryName}
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
    height: 30,
  },
  mainContainer: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  typeTitle: {
    margin: 5,
  },
});

export default CategoriesListItem;

// const CategoriesListItem = ({category}) => {
//   const categoryPressHandler = () => {
//     SystemEventsHandler.onInfo({info: 'CATEGORY: ' + JSON.stringify(category)});
//   };
//
//   return (
//     <TouchableHighlight style={styles.touchable} onPress={categoryPressHandler}>
//       <View style={styles.mainContainer}>
//         <View />
//       </View>
//     </TouchableHighlight>
//   );
// };
//
// const styles = StyleSheet.create({
//   touchable: {
//     width: 100,
//     height: 30,
//     marginLeft: 10,
//   },
//   mainContainer: {
//     width: 100,
//     height: 30,
//     backgroundColor: 'purple',
//   },
// });
//
// export default CategoriesListItem;
