import NativeShareServiceConstants from '../constants/NativeShareServiceConstants';

const NativeShareServiceActions = () => {
  const {
    actionTypes: {
      CHECK_SERVICE_AVAILABILITY,
      SEND_SMS_MESSAGE,
      SEND_WHATS_APP_MESSAGE,
      SEND_TELEGRAM_MESSAGE,
      GET_SMS_INBOX,
    },
  } = NativeShareServiceConstants;

  const checkMessagingServicesAvailabilityAction = () => {
    return {
      type: CHECK_SERVICE_AVAILABILITY,
    };
  };

  const sendSmsMessageAction = ({text}) => {
    return {
      type: SEND_SMS_MESSAGE,
      payload: {text},
    };
  };

  const sendWhatsAppMessageAction = ({text}) => {
    return {
      type: SEND_WHATS_APP_MESSAGE,
      payload: {text},
    };
  };

  const sendTelegramMessageAction = ({text}) => {
    return {
      type: SEND_TELEGRAM_MESSAGE,
      payload: {text},
    };
  };

  const getSmsInboxAction = () => {
    return {
      type: GET_SMS_INBOX,
    };
  };

  return {
    checkMessagingServicesAvailabilityAction,
    sendSmsMessageAction,
    sendWhatsAppMessageAction,
    sendTelegramMessageAction,
    getSmsInboxAction,
  };
};

export default NativeShareServiceActions();
