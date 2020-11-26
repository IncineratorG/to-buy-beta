import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../../utils/common/system-events-handler/SystemEventsHandler';

const SuggestionsListItem = ({
  suggestion,
  needRightSeparatorLine,
  onSuggestionPress,
}) => {
  const suggestionText = suggestion.productName;

  const suggestionPressHandler = () => {
    if (onSuggestionPress) {
      onSuggestionPress({suggestion});
    }
  };

  const separatorLineComponent = needRightSeparatorLine ? (
    <View style={styles.rightSeparatorLine} />
  ) : null;

  return (
    <View style={styles.mainContainer}>
      <TouchableHighlight
        style={styles.touchable}
        onPress={suggestionPressHandler}
        underlayColor={'transparent'}>
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{suggestionText}</Text>
          </View>
          <View style={styles.rightSeparatorLine} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    minWidth: 75,
    // backgroundColor: 'cyan',
  },
  touchable: {
    flex: 1,
    alignSelf: 'stretch',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    // margin: 2,
    alignSelf: 'stretch',
    // backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  text: {
    fontSize: 14,
    color: 'grey',
    // marginLeft: 2,
    // marginRight: 2,
  },
  rightSeparatorLine: {
    width: 1,
    backgroundColor: 'lightgrey',
    // flex: 1,
    alignSelf: 'stretch',
    marginTop: 2,
    marginBottom: 2,
  },
});

export default SuggestionsListItem;
