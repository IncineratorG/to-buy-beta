import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Button,
  TextInput,
  Text,
  PermissionsAndroid,
} from 'react-native';
import Voice from '@react-native-community/voice';

const VoiceInputTestView = ({styles, model, controller}) => {
  const [inputText, setInputText] = useState('');
  const [localeInputText, setLocaleInputText] = useState('');
  const [localeValueText, setLocaleValueText] = useState('en-US');
  const [logText, setLogText] = useState('');
  const [logComponent, setLogComponent] = useState(null);
  const logSeparator = ' |---| ';

  const setLocaleHandler = () => {
    setLocaleValueText(localeInputText);
  };

  const onLocalTextChangeHandler = (text) => {
    setLocaleInputText(text);
  };

  const startRecognizeButtonHandler = async () => {
    setLogText((prev) => prev + ' |---| ' + 'startRecognizeButtonHandler()');

    try {
      await Voice.start(localeValueText);
    } catch (e) {
      setLogText(
        (prev) =>
          prev + ' |---| ' + 'startRecognizeButtonHandler()->ERROR: ' + e,
      );
    }
  };

  useEffect(() => {
    const askForAudioRecordingPermission = async () => {
      const userResponse = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      let permissionGranted = false;
      if (userResponse === 'granted') {
        permissionGranted = true;
      }

      setLogText(
        (prev) => prev + ' |---| ' + 'PERMISSION_GRANTED: ' + permissionGranted,
      );
    };

    askForAudioRecordingPermission();
  }, []);

  useEffect(() => {
    const getSpeechRecognitionServices = async () => {
      const services = await Voice.getSpeechRecognitionServices();

      let hasService = false;
      for (let i = 0; i < services.length; ++i) {
        const service = services[i];
        if (service === 'com.google.android.googlequicksearchbox') {
          hasService = true;
          break;
        }
      }

      setLogText((prev) => prev + ' |---| ' + 'HAS_SERVICE: ' + hasService);
    };

    getSpeechRecognitionServices();
  }, []);

  useEffect(() => {
    function onSpeechStart(e) {
      setLogText(
        (prev) => prev + ' |---| ' + 'onSpeechStart: ' + JSON.stringify(e),
      );
      // console.log('onSpeechStart: ', e);
    }
    function onSpeechResults(e) {
      setLogText(
        (prev) => prev + ' |---| ' + 'onSpeechResults: ' + JSON.stringify(e),
      );
      // console.log('onSpeechResults: ', e);
    }
    function onSpeechPartialResults(e) {
      setLogText(
        (prev) => prev + ' |---| ' + 'onSpeechResults: ' + JSON.stringify(e),
      );
      // console.log('onSpeechPartialResults: ', e);
    }
    function onSpeechVolumeChanged(e) {
      setLogText(
        (prev) =>
          prev + ' |---| ' + 'onSpeechVolumeChanged: ' + JSON.stringify(e),
      );
      // console.log('onSpeechVolumeChanged: ', e);
    }
    function onSpeechEnd(e) {
      setLogText(
        (prev) => prev + ' |---| ' + 'onSpeechEnd: ' + JSON.stringify(e),
      );
      // console.log('onSpeechEnd: ', e);
    }
    function onSpeechError(e) {
      setLogText(
        (prev) => prev + ' |---| ' + 'onSpeechError: ' + JSON.stringify(e),
      );
      // console.log('onSpeechError: ', e);
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    let keyCounter = 1;
    const outputComponent = logText.split(logSeparator).map((text) => {
      const key = ++keyCounter;
      return <Text key={key.toString()}>{text}</Text>;
    });
    setLogComponent(outputComponent);
  }, [logText]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.textInputContainer}>
        <TextInput fontSize={18} value={inputText} />
      </View>
      <View style={styles.currentLocaleContainer}>
        <View style={styles.currentLocaleInputContainer}>
          <View style={styles.localeTextInputContainer}>
            <TextInput
              fontSize={16}
              value={localeInputText}
              onChangeText={onLocalTextChangeHandler}
            />
          </View>
          <View style={styles.setLocaleButtonContainer}>
            <Button title={'Button'} onPress={setLocaleHandler} />
          </View>
        </View>
        <View style={styles.currentLocaleValueContainer}>
          <Text>{localeValueText}</Text>
        </View>
      </View>
      <View style={styles.startVoiceRecognitionButtonContainer}>
        <Button title={'Start'} onPress={startRecognizeButtonHandler} />
      </View>
      <View style={styles.systemOutputContainer}>{logComponent}</View>
    </ScrollView>
  );
};

export default VoiceInputTestView;
