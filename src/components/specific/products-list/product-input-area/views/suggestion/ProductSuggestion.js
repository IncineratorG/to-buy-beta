import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import ProductInputType from '../../stores/types/productInputAreaProductInputTypes';
import {SystemEventsHandler} from '../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';

const ProductSuggestion = ({state, onSuggestionPress}) => {
  const {type} = state.currentInput;

  const suggestions = [
    {id: 1, word: 'First'},
    {id: 2, word: 'Dorokhov'},
    {id: 3, word: 'PrePrePrestidigitator'},
  ];

  if (type !== ProductInputType.PRODUCT_NAME || suggestions.length <= 0) {
    return null;
  }

  const firstSuggestionPressHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'firstSuggestionPressHandler(): ' + JSON.stringify(suggestions[0]),
    });
  };

  const secondSuggestionPressHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'secondSuggestionPressHandler(): ' + JSON.stringify(suggestions[1]),
    });
  };

  const thirdSuggestionPressHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'thirdSuggestionPressHandler(): ' + JSON.stringify(suggestions[2]),
    });
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
          {suggestions[0].word}
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
            {suggestions[1].word}
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
            {suggestions[2].word}
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
