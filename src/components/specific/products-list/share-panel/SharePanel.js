import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {icons} from '../../../../assets/icons';
import ShareServiceAppTypes from '../../../../services/share/data/share-app-types/ShareServiceAppTypes';
import ShareOption from './ShareOption';

const SharePanel = ({
  visible,
  shareServicesAvailabilityMap,
  onShareServicePress,
}) => {
  const [supportedOptionsCount, setSupportedOptionsCount] = useState(0);
  const [smsShareSupported, setSmsShareSupported] = useState(true);
  const [whatsAppShareSupported, setWhatsAppShareSupported] = useState(true);
  const [telegramShareSupported, setTelegramShareSupported] = useState(true);

  const smsPressHandler = () => {
    if (onShareServicePress) {
      onShareServicePress({serviceType: ShareServiceAppTypes.SMS});
    }
  };

  const whatsAppPressHandler = () => {
    if (onShareServicePress) {
      onShareServicePress({serviceType: ShareServiceAppTypes.WHATS_APP});
    }
  };

  const telegramPressHandler = () => {
    if (onShareServicePress) {
      onShareServicePress({serviceType: ShareServiceAppTypes.TELEGRAM});
    }
  };

  useEffect(() => {
    let availableServicesCount = 0;
    shareServicesAvailabilityMap.forEach((isAvailable, serviceType) => {
      if (isAvailable) {
        ++availableServicesCount;
      }
    });

    setSupportedOptionsCount(availableServicesCount);

    setSmsShareSupported(
      shareServicesAvailabilityMap.get(ShareServiceAppTypes.SMS),
    );
    setWhatsAppShareSupported(
      shareServicesAvailabilityMap.get(ShareServiceAppTypes.WHATS_APP),
    );
    setTelegramShareSupported(
      shareServicesAvailabilityMap.get(ShareServiceAppTypes.TELEGRAM),
    );
  }, [shareServicesAvailabilityMap]);

  if (!visible) {
    return null;
  }

  const smsOptionComponent = smsShareSupported ? (
    <ShareOption
      icon={icons.sms}
      iconStyles={styles.smsOptionIcon}
      onOptionPress={smsPressHandler}
    />
  ) : null;
  const whatsAppOptionComponent = whatsAppShareSupported ? (
    <ShareOption
      icon={icons.whatsapp}
      iconStyles={styles.whatsAppOptionIcon}
      onOptionPress={whatsAppPressHandler}
    />
  ) : null;
  const telegramOptionComponent = telegramShareSupported ? (
    <ShareOption
      icon={icons.telegram}
      iconStyles={styles.telegramOptionIcon}
      onOptionPress={telegramPressHandler}
    />
  ) : null;

  return (
    <View style={[styles.mainContainer, {height: 60 * supportedOptionsCount}]}>
      <View style={styles.shareOptionsContainer}>
        {smsOptionComponent}
        {whatsAppOptionComponent}
        {telegramOptionComponent}
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
    flexDirection: 'column-reverse',
  },
  smsOptionIcon: {
    transform: [{scale: 0.9}],
  },
  whatsAppOptionIcon: {
    transform: [{scale: 0.5}],
  },
  telegramOptionIcon: {
    transform: [{scale: 0.5}],
  },
});

export default SharePanel;
