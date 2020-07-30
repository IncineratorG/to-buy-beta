import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {useTranslation} from '../../../../utils/common/localization';
import {icons} from '../../../../assets/icons';

const ShareShoppingListDialog = ({
  visible,
  smsShareSupported,
  whatsAppShareSupported,
  onTouchOutside,
  onCancelPress,
  onSmsOptionPress,
  onWhatsAppOptionPress,
}) => {
  const {t} = useTranslation();

  const smsOptionPressHandler = () => {
    if (onSmsOptionPress) {
      onSmsOptionPress();
    }
  };

  const whatsAppOptionPressHandler = () => {
    if (onWhatsAppOptionPress) {
      onWhatsAppOptionPress();
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

  const smsOptionComponent = smsShareSupported ? (
    <TouchableHighlight
      style={styles.smsIconContainerTouchable}
      onPress={smsOptionPressHandler}>
      <View style={styles.smsIconContainer}>
        <Image style={styles.smsIcon} source={icons.sms} />
      </View>
    </TouchableHighlight>
  ) : null;

  const whatsAppOptionComponent = whatsAppShareSupported ? (
    <TouchableHighlight
      style={styles.whatsAppIconContainerTouchable}
      onPress={whatsAppOptionPressHandler}>
      <View style={styles.whatsAppIconContainer}>
        <Image style={styles.whatsAppIcon} source={icons.whatsapp} />
      </View>
    </TouchableHighlight>
  ) : null;

  const spacerComponent =
    smsShareSupported && whatsAppShareSupported ? (
      <View style={styles.spacer} />
    ) : null;

  return (
    <Dialog
      visible={visible}
      title={t('ShareShoppingListDialog_dialogTitle')}
      onTouchOutside={touchOutsideHandler}
      buttons={buttons}>
      <View style={styles.mainContainer}>
        {smsOptionComponent}
        {spacerComponent}
        {whatsAppOptionComponent}
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 80,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smsIconContainerTouchable: {
    width: 60,
    height: 60,
    marginLeft: 50,
    borderRadius: 4,
  },
  smsIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'lightgrey',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  smsIcon: {
    marginTop: 5,
    transform: [{scale: 0.9}],
  },
  spacer: {
    flex: 1,
  },
  whatsAppIconContainerTouchable: {
    width: 60,
    height: 60,
    marginRight: 50,
    borderRadius: 4,
  },
  whatsAppIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  whatsAppIcon: {
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
