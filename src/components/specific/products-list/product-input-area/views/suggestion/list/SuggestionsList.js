import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import SuggestionsListItem from './item/SuggestionsListItem';
import LinearGradient from 'react-native-linear-gradient';

const SuggestionsList = ({suggestions, onSuggestionPress}) => {
  // SystemEventsHandler.onInfo({
  //   info: 'SuggestionsList->SIZE: ' + suggestions.length,
  // });

  const innerSuggestionsList = suggestions.filter((suggestion) => suggestion);
  if (innerSuggestionsList.length) {
    innerSuggestionsList.push({id: 'extra', extra: true});
  }

  const renderItem = ({item, index}) => {
    const needRightSeparatorLine =
      index !== innerSuggestionsList.length - 2 &&
      index !== innerSuggestionsList.length - 1;

    return (
      <SuggestionsListItem
        suggestion={item}
        needRightSeparatorLine={needRightSeparatorLine}
        onSuggestionPress={onSuggestionPress}
      />
    );
  };

  const keyExtractor = useCallback((suggestion) => {
    return suggestion.id.toString();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={innerSuggestionsList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
      <LinearGradient
        style={styles.gradientRightSide}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[
          'rgba(255, 255, 255, 0.0)',
          'rgba(255, 255, 255, 0.75)',
          'rgba(255, 255, 255, 1.0)',
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // flexDirection: 'row',
    alignSelf: 'stretch',
    // backgroundColor: 'green',
  },
  listContainer: {
    flex: 1,
    marginLeft: 5,
    // backgroundColor: 'red',
    // margin: 1,
    // backgroundColor: 'transparent',
  },
  list: {
    flex: 1,
    // backgroundColor: 'green',
  },

  gradientRightSide: {
    // backgroundColor: 'black',
    // opacity: 0.5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 65,
  },
});

export default SuggestionsList;
