import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import ProductInputType from '../../stores/types/productInputAreaProductInputTypes';
import {SystemEventsHandler} from '../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';

const ProductSuggestion = ({state, onSuggestionPress}) => {
  const {type, productSuggestions} = state.currentInput;
  const {suggestions} = productSuggestions;

  if (type !== ProductInputType.PRODUCT_NAME || suggestions.length <= 0) {
    return null;
  }

  const firstSuggestionPressHandler = () => {
    if (onSuggestionPress) {
      onSuggestionPress({suggestion: suggestions[0]});
    }
  };

  const secondSuggestionPressHandler = () => {
    if (onSuggestionPress) {
      onSuggestionPress({suggestion: suggestions[1]});
    }
  };

  const thirdSuggestionPressHandler = () => {
    if (onSuggestionPress) {
      onSuggestionPress({suggestion: suggestions[2]});
    }
  };

  const firstSuggestionComponent = (
    <TouchableHighlight
      style={styles.suggestionTouchable}
      onPress={firstSuggestionPressHandler}>
      <View style={styles.suggestion}>
        <Text
          style={styles.suggestionText}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {suggestions[0].productName}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const secondSuggestionComponent =
    suggestions.length > 1 ? (
      <TouchableHighlight
        style={styles.suggestionTouchable}
        onPress={secondSuggestionPressHandler}>
        <View style={styles.suggestion}>
          <Text
            style={styles.suggestionText}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            {suggestions[1].productName}
          </Text>
        </View>
      </TouchableHighlight>
    ) : null;

  const thirdSuggestionComponent =
    suggestions.length > 2 ? (
      <TouchableHighlight
        style={styles.suggestionTouchable}
        onPress={thirdSuggestionPressHandler}>
        <View style={styles.suggestion}>
          <Text
            style={styles.suggestionText}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            {suggestions[2].productName}
          </Text>
        </View>
      </TouchableHighlight>
    ) : null;

  return (
    <View style={styles.mainContainer}>
      {firstSuggestionComponent}
      {secondSuggestionComponent}
      {thirdSuggestionComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 30,
    width: 300,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  suggestionTouchable: {
    flex: 1,
    margin: 4,
  },
  suggestion: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 2,
    marginRight: 2,
  },
});

export default ProductSuggestion;