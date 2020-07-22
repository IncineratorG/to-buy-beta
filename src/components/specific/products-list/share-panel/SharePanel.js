import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Linking,
} from 'react-native';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {icons} from '../../../../assets/icons';

const SharePanel = ({visible, onWhatsAppPress, onSmsPress}) => {
  const defaultSmsUrl = 'sms:?body=t';
  const defaultWhatsAppUrl = 'whatsapp://send?text=t';

  const [whatsAppAvailable, setWhatsAppAvailable] = useState(false);
  const [smsAvailable, setSmsAvailable] = useState(false);

  const whatsAppPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'whatsAppPressHandler()'});
  };

  const smsPressHandler = () => {
    SystemEventsHandler.onInfo({info: 'smsPressHandler()'});
  };

  useEffect(() => {
    const checkWhatsAppAndSms = async () => {
      try {
        const supported = await Linking.canOpenURL(defaultSmsUrl);
        setSmsAvailable(supported);
      } catch (e) {
        SystemEventsHandler.onInfo({info: 'SharePanel->SMS_NOT_SUPPORTED'});
      }

      try {
        const supported = await Linking.canOpenURL(defaultWhatsAppUrl);
        setWhatsAppAvailable(supported);
      } catch (e) {
        SystemEventsHandler.onInfo({
          info: 'SharePanel->WHATSAPP_NOT_SUPPORTED',
        });
      }
    };

    checkWhatsAppAndSms();
  }, []);

  if (!visible) {
    return null;
  }

  let optionsCount = 0;
  if (whatsAppAvailable && smsAvailable) {
    optionsCount = 2;
  } else if (whatsAppAvailable || smsAvailable) {
    optionsCount = 1;
  } else {
    optionsCount = 0;
  }

  const whatsAppComponent = whatsAppAvailable ? (
    <View style={styles.whatsAppShareOptionsContainer}>
      <TouchableHighlight
        style={styles.whatsAppShareButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={whatsAppPressHandler}>
        <View style={styles.whatsAppShareButton}>
          <Image style={styles.whatsAppIcon} source={icons.whatsapp} />
        </View>
      </TouchableHighlight>
    </View>
  ) : null;

  const smsComponent = smsAvailable ? (
    <View style={styles.smsShareOptionContainer}>
      <TouchableHighlight
        style={styles.smsShareButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={smsPressHandler}>
        <View style={styles.smsShareButton}>
          <Image style={styles.smsIcon} source={icons.sms} />
        </View>
      </TouchableHighlight>
    </View>
  ) : null;

  const spacer = <View style={styles.spacer} />;

  return (
    <View
      style={[styles.mainContainer, {height: optionsCount === 2 ? 130 : 65}]}>
      <View style={styles.shareOptionsContainer}>
        {whatsAppComponent}
        {spacer}
        {smsComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 130,
    width: 60,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    elevation: 10,
  },
  shareOptionsContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  whatsAppShareOptionsContainer: {
    alignSelf: 'stretch',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whatsAppShareButtonTouchable: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  whatsAppShareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  whatsAppIcon: {
    transform: [{scale: 1.0}],
  },
  spacer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  smsShareOptionContainer: {
    alignSelf: 'stretch',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smsShareButtonTouchable: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  smsShareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  smsIcon: {
    transform: [{scale: 0.9}],
  },
});

export default SharePanel;
