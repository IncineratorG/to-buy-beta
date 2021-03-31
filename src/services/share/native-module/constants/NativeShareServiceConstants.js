import PhoneMessaging from '../../libs/phone-messaging/PhoneMessaging';

const NativeShareServiceConstants = () => {
  const {
    actionTypes: {
      CHECK_SERVICE_AVAILABILITY,
      SEND_SMS_MESSAGE,
      SEND_WHATS_APP_MESSAGE,
      SEND_TELEGRAM_MESSAGE,
      GET_SMS_INBOX,
    },
  } = PhoneMessaging.getConstants();

  return {
    actionTypes: {
      CHECK_SERVICE_AVAILABILITY,
      SEND_SMS_MESSAGE,
      SEND_WHATS_APP_MESSAGE,
      SEND_TELEGRAM_MESSAGE,
      GET_SMS_INBOX,
    },
  };
};

export default NativeShareServiceConstants();
