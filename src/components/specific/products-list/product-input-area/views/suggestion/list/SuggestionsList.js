import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import SuggestionsListItem from './item/SuggestionsListItem';

const SuggestionsList = ({suggestions, onSuggestionPress}) => {
  SystemEventsHandler.onInfo({
    info: 'SuggestionsList->SIZE: ' + suggestions.length,
  });

  const renderItem = ({item}) => {
    return (
      <SuggestionsListItem
        suggestion={item}
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
          data={suggestions}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
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
    // backgroundColor: 'red',
    // margin: 1,
    // backgroundColor: 'transparent',
  },
  list: {
    flex: 1,
  },
});

export default SuggestionsList;
