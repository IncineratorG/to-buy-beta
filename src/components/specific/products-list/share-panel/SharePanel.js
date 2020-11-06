import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {icons} from '../../../../assets/icons';
import ShareServiceAppTypes from '../../../../services/share/data/share-app-types/ShareServiceAppTypes';

const SharePanel = ({
  visible,
  shareServicesAvailabilityMap,
  onShareServicePress,
}) => {
  const [smsShareSupported, setSmsShareSupported] = useState(false);
  const [whatsAppShareSupported, setWhatsAppShareSupported] = useState(false);

  const whatsAppPressHandler = () => {
    if (onShareServicePress) {
      onShareServicePress({serviceType: ShareServiceAppTypes.WHATS_APP});
    }
  };

  const smsPressHandler = () => {
    if (onShareServicePress) {
      onShareServicePress({serviceType: ShareServiceAppTypes.SMS});
    }
  };

  let optionsCount = 2;
  if (whatsAppShareSupported && smsShareSupported) {
    optionsCount = 2;
  } else if (whatsAppShareSupported || smsShareSupported) {
    optionsCount = 1;
  } else {
    optionsCount = 0;
  }

  const whatsAppComponent = whatsAppShareSupported ? (
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

  const smsComponent = smsShareSupported ? (
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

  useEffect(() => {
    setSmsShareSupported(
      shareServicesAvailabilityMap.get(ShareServiceAppTypes.SMS),
    );
    setWhatsAppShareSupported(
      shareServicesAvailabilityMap.get(ShareServiceAppTypes.WHATS_APP),
    );
  }, [shareServicesAvailabilityMap]);

  if (!visible) {
    return null;
  }

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
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  whatsAppIcon: {
    transform: [{scale: 0.5}],
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
    paddingTop: 7,
    // backgroundColor: 'red',
  },
  smsIcon: {
    transform: [{scale: 0.9}],
  },
});

export default SharePanel;
