import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

const SuggestionRowItem = ({suggestion, onSuggestionPress}) => {
  const suggestionText = suggestion.productName;

  const suggestionPressHandler = () => {
    if (onSuggestionPress) {
      onSuggestionPress({suggestion});
    }
  };

  return (
    <View style={styles.suggestionArea}>
      <TouchableHighlight
        style={styles.suggestionTouchable}
        onPress={suggestionPressHandler}
        underlayColor={'transparent'}>
        <View style={styles.suggestion}>
          <Text
            style={styles.suggestionText}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            {suggestionText}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionArea: {
    flex: 1,
    borderRadius: 3,
  },
  suggestionTouchable: {
    flex: 1,
    margin: 0,
    borderRadius: 3,
  },
  suggestion: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  suggestionText: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 2,
    marginRight: 2,
  },
});

export default SuggestionRowItem;
