import {StyleSheet} from 'react-native';

export const productInputAreaStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  topAreaContainer: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  suggestionsAreaContainer: {
    height: 20,
    alignSelf: 'stretch',
    // backgroundColor: 'red',
  },
  middleAreaContainer: {
    height: 40,
    // flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  bottomAreaContainer: {
    height: 40,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  extraTopComponent: {
    height: 10,
    alignSelf: 'stretch',
    // backgroundColor: 'red',
  },
  // suggestionContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   marginBottom: 40,
  //   marginLeft: 50,
  //   marginRight: 50,
  //   borderRadius: 3,
  // },
});
