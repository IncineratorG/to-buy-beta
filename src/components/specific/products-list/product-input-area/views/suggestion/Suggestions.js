import React from 'react';
import {View, StyleSheet} from 'react-native';
import SuggestionItem from './SuggestionItem';
import ProductInputType from '../../stores/types/productInputAreaProductInputTypes';

const Suggestions = ({state, wrapperHeight}) => {
  // const suggestions = ['First', 'Second', 'Third'];
  // const suggestions = ['First', 'Second'];
  let suggestions = [];
  switch (state.currentInput.type) {
    case ProductInputType.PRODUCT_NAME: {
      suggestions = state.currentInput.suggestions.productSuggestions;
      break;
    }

    case ProductInputType.NOTE: {
      suggestions = state.currentInput.suggestions.noteSuggestions;
      break;
    }
  }

  const firstSuggestionPressHandler = () => {};

  const secondSuggestionPressHandler = () => {};

  const thirdSuggestionPressHandler = () => {};

  const firstSuggestionComponent = (
    <SuggestionItem
      suggestion={suggestions[0]}
      onSuggestionPress={firstSuggestionPressHandler}
    />
  );

  const secondSuggestionComponent =
    suggestions.length > 1 ? (
      <SuggestionItem
        suggestion={suggestions[1]}
        onSuggestionPress={secondSuggestionPressHandler}
      />
    ) : null;

  const thirdSuggestionComponent =
    suggestions.length > 2 ? (
      <SuggestionItem
        suggestion={suggestions[2]}
        onSuggestionPress={thirdSuggestionPressHandler}
      />
    ) : null;

  const firstToSecondSeparatorLineComponent =
    suggestions.length > 1 ? <View style={styles.separatorLine} /> : null;
  const secondToThirdSeparatorLineComponent =
    suggestions.length > 2 ? <View style={styles.separatorLine} /> : null;

  if (wrapperHeight <= 0) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      {firstSuggestionComponent}
      {firstToSecondSeparatorLineComponent}
      {secondSuggestionComponent}
      {secondToThirdSeparatorLineComponent}
      {thirdSuggestionComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    // backgroundColor: 'green',
  },
  separatorLine: {
    width: 1,
    backgroundColor: 'lightgrey',
    alignSelf: 'stretch',
    marginTop: 2,
    marginBottom: 2,
  },
});

export default Suggestions;
