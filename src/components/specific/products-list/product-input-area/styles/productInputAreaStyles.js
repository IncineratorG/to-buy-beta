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
  },
  topAreaContainer: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  middleAreaContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  bottomAreaContainer: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
});
