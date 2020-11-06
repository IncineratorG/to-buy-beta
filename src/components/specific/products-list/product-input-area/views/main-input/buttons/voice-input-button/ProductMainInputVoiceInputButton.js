import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import {icons} from '../../../../../../../../assets/icons';
import Voice from '@react-native-community/voice';

const ProductMainInputVoiceInputButton = ({
  voiceInputAvailabilityChangeHandler,
}) => {
  const voiceInputIconActive = icons.microphone_black;
  const voiceInputIconNonActive = icons.microphone_grey;

  const [
    hasSpeechRecognitionService,
    setHasSpeechRecognitionService,
  ] = useState(false);
  const [voiceInputActive, setVoiceInputActive] = useState(false);

  const checkHasSpeechRecognitionService = async () => {
    const services = await Voice.getSpeechRecognitionServices();

    for (let i = 0; i < services.length; ++i) {
      const service = services[i];
      if (service === 'com.google.android.googlequicksearchbox') {
        setHasSpeechRecognitionService(true);
        break;
      }
    }
  };

  const askForAudioRecordingPermission = async () => {
    const userResponse = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );

    let permissionGranted = false;
    if (userResponse === 'granted') {
      permissionGranted = true;
    }

    return permissionGranted;
  };

  const onSpeechStart = (e) => {
    SystemEventsHandler.onInfo({info: 'onSpeechStart(): ' + JSON.stringify(e)});

    setVoiceInputActive(true);
  };

  const onSpeechEnd = (e) => {
    SystemEventsHandler.onInfo({info: 'onSpeechEnd(): ' + JSON.stringify(e)});

    setVoiceInputActive(false);
  };

  const onSpeechResults = (e) => {
    SystemEventsHandler.onInfo({
      info: 'onSpeechResults(): ' + JSON.stringify(e),
    });

    setVoiceInputActive(false);
  };

  const onSpeechError = (e) => {
    SystemEventsHandler.onInfo({
      info: 'onSpeechError(): ' + JSON.stringify(e),
    });

    setVoiceInputActive(false);
  };

  const voiceInputButtonPressHandler = async () => {
    SystemEventsHandler.onInfo({info: 'voiceInputButtonPressHandler()'});

    const hasPermission = await askForAudioRecordingPermission();
    if (!hasPermission) {
      SystemEventsHandler.onInfo({info: 'NO_PERMISSION'});
      return;
    }

    setVoiceInputActive(true);

    try {
      await Voice.start('en-US');
    } catch (e) {
      SystemEventsHandler.onError({
        err: 'voiceInputButtonPressHandler()->ERROR: ' + JSON.stringify(e),
      });

      setVoiceInputActive(false);
    }
  };

  useEffect(() => {
    checkHasSpeechRecognitionService();
  }, []);

  useEffect(() => {
    if (hasSpeechRecognitionService) {
      voiceInputAvailabilityChangeHandler(true);
    } else {
      voiceInputAvailabilityChangeHandler(false);
    }
  }, [voiceInputAvailabilityChangeHandler, hasSpeechRecognitionService]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.voiceInputButtonArea}>
      <View style={styles.voiceInputButtonContainer}>
        <TouchableHighlight
          style={styles.voiceInputButtonTouchable}
          underlayColor={'lightgrey'}
          onPress={voiceInputButtonPressHandler}>
          <View style={styles.voiceInputButton}>
            <Image
              style={styles.voiceInputButtonIcon}
              source={
                voiceInputActive
                  ? voiceInputIconActive
                  : voiceInputIconNonActive
              }
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  voiceInputButtonArea: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceInputButtonContainer: {
    width: 30,
    height: 30,
  },
  voiceInputButtonTouchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 15,
  },
  voiceInputButton: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 15,
  },
  voiceInputButtonIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

export default ProductMainInputVoiceInputButton;
