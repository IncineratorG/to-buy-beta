import PhoneMessaging from '../libs/phone-messaging/PhoneMessaging';
import NativeShareServiceActions from './actions/NativeShareServiceActions';

const NativeShareService = () => {
  const checkServicesAvailability = async () => {
    const action = NativeShareServiceActions.checkMessagingServicesAvailabilityAction();
    return await PhoneMessaging.execute(action);
  };

  const sendSmsMessage = async ({text}) => {
    const action = NativeShareServiceActions.sendSmsMessageAction({text});
    return await PhoneMessaging.execute(action);
  };

  const sendWhatsAppMessage = async ({text}) => {
    const action = NativeShareServiceActions.sendWhatsAppMessageAction({text});
    return await PhoneMessaging.execute(action);
  };

  const sendTelegramMessage = async ({text}) => {
    const action = NativeShareServiceActions.sendTelegramMessageAction({text});
    return await PhoneMessaging.execute(action);
  };

  return {
    checkServicesAvailability,
    sendSmsMessage,
    sendWhatsAppMessage,
    sendTelegramMessage,
  };
};

export default NativeShareService();
