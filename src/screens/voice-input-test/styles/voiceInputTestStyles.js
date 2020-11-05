import {StyleSheet} from 'react-native';

export const voiceInputTestStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  textInputContainer: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'lightgrey',
    padding: 4,
  },
  currentLocaleContainer: {
    height: 80,
    alignSelf: 'stretch',
    backgroundColor: 'grey',
    margin: 4,
  },
  currentLocaleInputContainer: {
    height: 40,
    alignSelf: 'stretch',
    backgroundColor: 'lightgrey',
    margin: 4,
    flexDirection: 'row',
  },
  localeTextInputContainer: {
    flex: 1,
    height: 40,
  },
  setLocaleButtonContainer: {
    height: 40,
    width: 100,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  currentLocaleValueContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startVoiceRecognitionButtonContainer: {
    height: 40,
    flex: 1,
  },
  systemOutputContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    margin: 4,
  },
});
