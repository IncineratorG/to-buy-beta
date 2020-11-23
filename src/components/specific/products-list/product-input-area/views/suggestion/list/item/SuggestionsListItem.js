import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SuggestionsListItem = ({suggestion, onSuggestionPress}) => {
  const suggestionPressHandler = () => {
    if (onSuggestionPress) {
      onSuggestionPress({suggestion});
    }
  };

  return null;
};

const styles = StyleSheet.create({
  mainContainer: {},
});

export default SuggestionsListItem;
