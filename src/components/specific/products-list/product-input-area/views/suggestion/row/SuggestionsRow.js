import React from 'react';
import {View, StyleSheet} from 'react-native';
import SuggestionRowItem from './item/SuggestionRowItem';

const SuggestionsRow = ({suggestions, onSuggestionPress}) => {
  const suggestionPressHandler = ({suggestion}) => {
    if (onSuggestionPress) {
      onSuggestionPress({suggestion});
    }
  };

  const firstSuggestionComponent = (
    <SuggestionRowItem
      suggestion={suggestions[0]}
      onSuggestionPress={suggestionPressHandler}
    />
  );

  const secondSuggestionComponent =
    suggestions.length > 1 ? (
      <SuggestionRowItem
        suggestion={suggestions[1]}
        onSuggestionPress={suggestionPressHandler}
      />
    ) : null;

  const thirdSuggestionComponent =
    suggestions.length > 2 ? (
      <SuggestionRowItem
        suggestion={suggestions[2]}
        onSuggestionPress={suggestionPressHandler}
      />
    ) : null;

  const firstToSecondSeparatorLineComponent =
    suggestions.length > 1 ? <View style={styles.separatorLine} /> : null;
  const secondToThirdSeparatorLineComponent =
    suggestions.length > 2 ? <View style={styles.separatorLine} /> : null;

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

export default SuggestionsRow;
