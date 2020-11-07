import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {useTranslation} from '../../../../utils/common/localization';
import {icons} from '../../../../assets/icons';
import ShareServiceAppTypes from '../../../../services/share/data/share-app-types/ShareServiceAppTypes';

const ShareShoppingListDialog = ({
  visible,
  shareServicesAvailabilityMap,
  onTouchOutside,
  onCancelPress,
  onShareServicePress,
}) => {
  const {t} = useTranslation();

  const [smsShareSupported, setSmsShareSupported] = useState(true);
  const [whatsAppShareSupported, setWhatsAppShareSupported] = useState(true);
  const [telegramShareSupported, setTelegramShareSupported] = useState(true);

  const smsOptionPressHandler = () => {
    if (onShareServicePress) {
      onShareServicePress({serviceType: ShareServiceAppTypes.SMS});
    }
  };

  const whatsAppOptionPressHandler = () => {
    if (onShareServicePress) {
      onShareServicePress({serviceType: ShareServiceAppTypes.WHATS_APP});
    }
  };

  const telegramOptionPressHandler = () => {
    if (onShareServicePress) {
      onShareServicePress({serviceType: ShareServiceAppTypes.TELEGRAM});
    }
  };

  const cancelButtonHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }
  };

  const touchOutsideHandler = () => {
    if (onTouchOutside) {
      onTouchOutside();
    }
  };

  const buttons = (
    <View style={styles.buttonsContainer}>
      <TouchableNativeFeedback
        style={styles.cancelButtonTouchable}
        underlayColor={'lightgrey'}
        onPress={cancelButtonHandler}>
        <View style={styles.cancelButtonContainer}>
          <Text style={styles.cancelButtonText}>
            {t('ShareShoppingListDialog_cancelButton')}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  useEffect(() => {
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

  return (
    <Dialog
      dialogStyle={{borderRadius: 10}}
      visible={visible}
      title={t('ShareShoppingListDialog_dialogTitle')}
      onTouchOutside={touchOutsideHandler}
      buttons={buttons}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        horizontal={true}>
        <View
          style={[styles.smsIconArea, {elevation: smsShareSupported ? 4 : 0}]}>
          <TouchableHighlight
            style={styles.smsIconTouchable}
            onPress={smsShareSupported ? smsOptionPressHandler : null}
            underlayColor={'grey'}>
            <View
              style={[
                styles.smsIconContainer,
                {opacity: smsShareSupported ? 1.0 : 0.15},
              ]}>
              <Image style={styles.smsIcon} source={icons.sms} />
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.whatsAppIconArea,
            {elevation: whatsAppShareSupported ? 4 : 0},
          ]}>
          <TouchableHighlight
            style={styles.whatsAppIconTouchable}
            onPress={whatsAppShareSupported ? whatsAppOptionPressHandler : null}
            underlayColor={'grey'}>
            <View
              style={[
                styles.whatsAppIconContainer,
                {opacity: whatsAppShareSupported ? 1.0 : 0.15},
              ]}>
              <Image style={styles.whatsAppIcon} source={icons.whatsapp} />
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.telegramIconArea,
            {elevation: telegramShareSupported ? 4 : 0},
          ]}>
          <TouchableHighlight
            style={styles.telegramIconTouchable}
            onPress={telegramShareSupported ? telegramOptionPressHandler : null}
            underlayColor={'grey'}>
            <View
              style={[
                styles.telegramIconContainer,
                {opacity: telegramShareSupported ? 1.0 : 0.15},
              ]}>
              <Image style={styles.telegramIcon} source={icons.telegram} />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 80,
    alignSelf: 'stretch',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smsIconArea: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: 'lightgrey',
    elevation: 4,
    marginLeft: 50,
  },
  smsIconTouchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
  smsIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smsIcon: {
    marginTop: 5,
    transform: [{scale: 0.9}],
  },
  whatsAppIconArea: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: 'lightgrey',
    elevation: 4,
    marginLeft: 50,
  },
  whatsAppIconTouchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
  whatsAppIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsAppIcon: {
    transform: [{scale: 0.5}],
  },
  telegramIconArea: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: 'lightgrey',
    elevation: 4,
  },
  telegramIconTouchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
  telegramIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  telegramIcon: {
    transform: [{scale: 0.5}],
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  cancelButtonTouchable: {
    alignSelf: 'flex-end',
  },
  cancelButtonContainer: {
    alignSelf: 'flex-end',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
    margin: 4,
  },
});

export default ShareShoppingListDialog;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableHighlight,
//   TouchableNativeFeedback,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import {Dialog} from 'react-native-simple-dialogs';
// import {useTranslation} from '../../../../utils/common/localization';
// import {icons} from '../../../../assets/icons';
// import ShareServiceAppTypes from '../../../../services/share/data/share-app-types/ShareServiceAppTypes';
//
// const ShareShoppingListDialog = ({
//   visible,
//   shareServicesAvailabilityMap,
//   onTouchOutside,
//   onCancelPress,
//   onShareServicePress,
// }) => {
//   const {t} = useTranslation();
//
//   const [smsShareSupported, setSmsShareSupported] = useState(false);
//   const [whatsAppShareSupported, setWhatsAppShareSupported] = useState(false);
//
//   const smsOptionPressHandler = () => {
//     if (onShareServicePress) {
//       onShareServicePress({serviceType: ShareServiceAppTypes.SMS});
//     }
//   };
//
//   const whatsAppOptionPressHandler = () => {
//     if (onShareServicePress) {
//       onShareServicePress({serviceType: ShareServiceAppTypes.WHATS_APP});
//     }
//   };
//
//   const cancelButtonHandler = () => {
//     if (onCancelPress) {
//       onCancelPress();
//     }
//   };
//
//   const touchOutsideHandler = () => {
//     if (onTouchOutside) {
//       onTouchOutside();
//     }
//   };
//
//   const buttons = (
//     <View style={styles.buttonsContainer}>
//       <TouchableNativeFeedback
//         style={styles.cancelButtonTouchable}
//         underlayColor={'lightgrey'}
//         onPress={cancelButtonHandler}>
//         <View style={styles.cancelButtonContainer}>
//           <Text style={styles.cancelButtonText}>
//             {t('ShareShoppingListDialog_cancelButton')}
//           </Text>
//         </View>
//       </TouchableNativeFeedback>
//     </View>
//   );
//
//   const smsOptionComponent = smsShareSupported ? (
//     <TouchableHighlight
//       style={styles.smsIconContainerTouchable}
//       onPress={smsOptionPressHandler}>
//       <View style={styles.smsIconContainer}>
//         <Image style={styles.smsIcon} source={icons.sms} />
//       </View>
//     </TouchableHighlight>
//   ) : null;
//
//   const whatsAppOptionComponent = whatsAppShareSupported ? (
//     <TouchableHighlight
//       style={styles.whatsAppIconContainerTouchable}
//       onPress={whatsAppOptionPressHandler}>
//       <View style={styles.whatsAppIconContainer}>
//         <Image style={styles.whatsAppIcon} source={icons.whatsapp} />
//       </View>
//     </TouchableHighlight>
//   ) : null;
//
//   const spacerComponent =
//     smsShareSupported && whatsAppShareSupported ? (
//       <View style={styles.spacer} />
//     ) : null;
//
//   useEffect(() => {
//     setSmsShareSupported(
//       shareServicesAvailabilityMap.get(ShareServiceAppTypes.SMS),
//     );
//     setWhatsAppShareSupported(
//       shareServicesAvailabilityMap.get(ShareServiceAppTypes.WHATS_APP),
//     );
//   }, [shareServicesAvailabilityMap]);
//
//   return (
//     <Dialog
//       dialogStyle={{borderRadius: 10}}
//       visible={visible}
//       title={t('ShareShoppingListDialog_dialogTitle')}
//       onTouchOutside={touchOutsideHandler}
//       buttons={buttons}>
//       <View style={styles.mainContainer}>
//         {smsOptionComponent}
//         {spacerComponent}
//         {whatsAppOptionComponent}
//       </View>
//     </Dialog>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     height: 80,
//     alignSelf: 'stretch',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   smsIconContainerTouchable: {
//     width: 60,
//     height: 60,
//     marginLeft: 50,
//     borderRadius: 4,
//   },
//   smsIconContainer: {
//     width: 60,
//     height: 60,
//     backgroundColor: 'lightgrey',
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 10,
//   },
//   smsIcon: {
//     marginTop: 5,
//     transform: [{scale: 0.9}],
//   },
//   spacer: {
//     flex: 1,
//   },
//   whatsAppIconContainerTouchable: {
//     width: 60,
//     height: 60,
//     marginRight: 50,
//     borderRadius: 4,
//   },
//   whatsAppIconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 4,
//     backgroundColor: 'lightgrey',
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 10,
//   },
//   whatsAppIcon: {
//     transform: [{scale: 0.5}],
//   },
//   buttonsContainer: {
//     flexDirection: 'row-reverse',
//     alignSelf: 'stretch',
//     backgroundColor: 'transparent',
//   },
//   cancelButtonTouchable: {
//     alignSelf: 'flex-end',
//   },
//   cancelButtonContainer: {
//     alignSelf: 'flex-end',
//     marginRight: 12,
//   },
//   cancelButtonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'grey',
//     margin: 4,
//   },
// });
//
// export default ShareShoppingListDialog;
