import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {icons} from '../../../assets/icons';

const AppLoading = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconOuterContainer}>
        <View style={styles.iconInnerContainer}>
          <Image
            style={styles.appIcon}
            // resizeMode="contain"
            source={icons.app_icon_v2}
          />
        </View>
      </View>
      <View style={styles.nameOuterContainer}>
        <View style={styles.nameInnerContainer}>
          <Text style={styles.appName}>ToBuy.Beta</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  iconOuterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInnerContainer: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    // borderColor: '#c7ede6',
    // borderWidth: 1,
    // elevation: 4,
    // paddingRight: 10,
    // backgroundColor: '#c7ede6',
  },
  appIcon: {
    transform: [{scale: 0.6}],
    // tintColor: 'yellow',
    // borderRadius: 50,
    // borderColor: 'green',
    // borderWidth: 1,
  },
  nameOuterContainer: {
    height: 50,
  },
  nameInnerContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: 'lightgrey',
  },
});

export default AppLoading;

// // import React from 'react';
// // import {StyleSheet, View, Text, Image} from 'react-native';
// // import {icons} from '../../../assets/icons';
// //
// // const AppLoading = () => {
// //   return (
// //     <View style={styles.mainContainer}>
// //       <View style={styles.iconOuterContainer}>
// //         <View style={styles.iconInnerContainer}>
// //           <Image style={styles.appIcon} source={icons.app_icon} />
// //         </View>
// //       </View>
// //       <View style={styles.nameOuterContainer}>
// //         <View style={styles.nameInnerContainer}>
// //           <Text style={styles.appName}>ToBuy.Beta</Text>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };
// //
// // const styles = StyleSheet.create({
// //   mainContainer: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //     justifyContent: 'center',
// //   },
// //   iconOuterContainer: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   iconInnerContainer: {
// //     width: 50,
// //     height: 50,
// //     // backgroundColor: 'red',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   appIcon: {
// //     // transform: [{scale: 1.0}],
// //   },
// //   nameOuterContainer: {
// //     height: 50,
// //     // backgroundColor: 'yellow',
// //   },
// //   nameInnerContainer: {
// //     flex: 1,
// //     // alignSelf: 'stretch',
// //     margin: 8,
// //     // backgroundColor: 'grey',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   appName: {
// //     color: 'lightgrey',
// //   },
// // });
// //
// // export default AppLoading;

// import React from 'react';
// import {StyleSheet, View, TextInput, FlatList} from 'react-native';
//
// const WordsCharacterComponent = () => {
//   // Заданное слово.
//   const word = 'word';
//   // Слово в виде массива букв.
//   const wordArray = word.split('');
//
//   // Из буквы и индекса этой буквы в заданном слове создаёт ключ для хэш-таблицы ссылок на TextInput-ы
//   const refsMapKeyCreator = (character, characterIndex) => {
//     return character + characterIndex;
//   };
//
//   // Хэш-таблица (прочитай, что это такое и как оно работает) для ссылок на соответсвующие TextInput-ы.
//   const refsMap = new Map();
//   // Массив, в котором будут хранится ключи хэш-таблицы со ссылками на TextInput-ы.
//   const refsMapKeysArray = [];
//   // Проходимся по всем буквам текущего сллова.
//   wordArray.forEach((character, index) => {
//     // Генерируем ключ для хэш-таблицы.
//     const key = refsMapKeyCreator(character, index);
//     // Вставляем в хэш-таблицу ключ и (пока) не привязанную ни к чему ссылку.
//     refsMap.set(key, React.createRef());
//     // Последовательно вставляем ключ хэш-таблицы в массив ключей.
//     refsMapKeysArray.push(key);
//   });
//
//   const keyExtractor = (character, index) => {
//     // Избегай использования в качестве ключа просто индекса элемента.
//     return character + index;
//   };
//
//   const renderItem = ({item, index}) => {
//     const itemSubmitEditing = ({nativeEvent: {text, eventCount, target}}) => {
//       // Получаем ключ хэш-таблицы для текущего TextInput-а.
//       const currentRefsMapKey = refsMapKeyCreator(item, index);
//       // Ищем ключ хэш-таблицы для следующего TextInput-а.
//       let nextRefsMapKey;
//       for (let i = 0; i < refsMapKeysArray.length - 1; ++i) {
//         if (refsMapKeysArray[i] === currentRefsMapKey) {
//           nextRefsMapKey = refsMapKeysArray[i + 1];
//           break;
//         }
//       }
//
//       // Если нашли следующий ключ хэш-таблицы ссылок TextInput-ов - делаем этот TextInput активным.
//       if (nextRefsMapKey) {
//         refsMap.get(nextRefsMapKey).current.focus();
//       }
//     };
//
//     return (
//       <View style={styles.itemMainContainer}>
//         <TextInput
//           // Привязываем ссылку к соответсвующему TextInput-у
//           ref={refsMap.get(refsMapKeyCreator(item, index))}
//           value={item}
//           blurOnSubmit={false}
//           onSubmitEditing={itemSubmitEditing}
//         />
//       </View>
//     );
//   };
//
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.listContainer}>
//         <FlatList
//           style={styles.list}
//           horizontal={true}
//           data={wordArray}
//           keyExtractor={keyExtractor}
//           renderItem={renderItem}
//         />
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: 'yellow',
//   },
//   listContainer: {
//     flex: 1,
//   },
//   list: {
//     flex: 1,
//   },
//
//   itemMainContainer: {
//     width: 40,
//     height: 40,
//     // backgroundColor: 'green',
//     margin: 4,
//     borderWidth: 1,
//     borderColor: 'green',
//   },
// });
//
// export default WordsCharacterComponent;
