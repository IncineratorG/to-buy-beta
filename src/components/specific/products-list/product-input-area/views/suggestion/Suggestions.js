import React from 'react';
import SuggestionsRow from './row/SuggestionsRow';
import SuggestionsList from './list/SuggestionsList';

const Suggestions = ({state, wrapperHeight, onSuggestionPress}) => {
  const currentInputSuggestions =
    state.currentInput.suggestions.productSuggestions.currentInputSuggestions;
  const randomSuggestions =
    state.currentInput.suggestions.productSuggestions.randomSuggestions;

  if (wrapperHeight <= 0) {
    return null;
  }

  if (currentInputSuggestions.length) {
    return (
      <SuggestionsRow
        suggestions={currentInputSuggestions}
        onSuggestionPress={onSuggestionPress}
      />
    );
  } else {
    return (
      <SuggestionsList
        suggestions={randomSuggestions}
        onSuggestionPress={onSuggestionPress}
      />
    );
  }
};

export default Suggestions;

// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import SuggestionRowItem from './SuggestionRowItem';
// import ProductInputType from '../../stores/types/productInputAreaProductInputTypes';
//
// const Suggestions = ({state, wrapperHeight}) => {
//   // const suggestions = ['First', 'Second', 'Third'];
//   // const suggestions = ['First', 'Second'];
//   let suggestions = [];
//   switch (state.currentInput.type) {
//     case ProductInputType.PRODUCT_NAME: {
//       suggestions = state.currentInput.suggestions.productSuggestions;
//       break;
//     }
//
//     case ProductInputType.NOTE: {
//       suggestions = state.currentInput.suggestions.noteSuggestions;
//       break;
//     }
//   }
//
//   const firstSuggestionPressHandler = () => {};
//
//   const secondSuggestionPressHandler = () => {};
//
//   const thirdSuggestionPressHandler = () => {};
//
//   const firstSuggestionComponent = (
//     <SuggestionRowItem
//       suggestion={suggestions[0]}
//       onSuggestionPress={firstSuggestionPressHandler}
//     />
//   );
//
//   const secondSuggestionComponent =
//     suggestions.length > 1 ? (
//       <SuggestionRowItem
//         suggestion={suggestions[1]}
//         onSuggestionPress={secondSuggestionPressHandler}
//       />
//     ) : null;
//
//   const thirdSuggestionComponent =
//     suggestions.length > 2 ? (
//       <SuggestionRowItem
//         suggestion={suggestions[2]}
//         onSuggestionPress={thirdSuggestionPressHandler}
//       />
//     ) : null;
//
//   const firstToSecondSeparatorLineComponent =
//     suggestions.length > 1 ? <View style={styles.separatorLine} /> : null;
//   const secondToThirdSeparatorLineComponent =
//     suggestions.length > 2 ? <View style={styles.separatorLine} /> : null;
//
//   if (wrapperHeight <= 0) {
//     return null;
//   }
//
//   return (
//     <View style={styles.mainContainer}>
//       {firstSuggestionComponent}
//       {firstToSecondSeparatorLineComponent}
//       {secondSuggestionComponent}
//       {secondToThirdSeparatorLineComponent}
//       {thirdSuggestionComponent}
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignSelf: 'stretch',
//     // backgroundColor: 'green',
//   },
//   separatorLine: {
//     width: 1,
//     backgroundColor: 'lightgrey',
//     alignSelf: 'stretch',
//     marginTop: 2,
//     marginBottom: 2,
//   },
// });
//
// export default Suggestions;
