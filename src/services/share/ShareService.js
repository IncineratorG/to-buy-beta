import {Linking} from 'react-native';
import {Notifier} from '../service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';
import ShareServiceEvents from './data/event-types/ShareServiceEvents';
import {PhoneShareService} from './phone/PhoneShareService';

export class ShareService {
  // static #className = 'ShareService';
  static #notifier = new Notifier();
  // static #defaultSmsUrl = 'sms:?body=t';
  // static #defaultWhatsAppUrl = 'whatsapp://send?text=t';
  // static #smsSharingSupported = false;
  // static #whatsAppSharingSupported = false;

  static subscribe({event, handler}) {
    SystemEventsHandler.onInfo({info: 'HERE_HERE'});
    return ShareService.notifier.subscribe({event, handler});
  }

  static async init() {
    await PhoneShareService.init();
    // await this.checkAvailability();
  }

  static async checkAvailability() {
    SystemEventsHandler.onInfo({info: ShareService.STR});

    const smsSharingSupported = await PhoneShareService.checkSmsAvailability();
    const whatsAppSharingSupported = await PhoneShareService.checkWhatsAppAvailability();

    ShareService.notifier.notify({
      event: ShareServiceEvents.AVAILABILITY_STATUS_CHANGED,
      data: {
        smsSharingSupported,
        whatsAppSharingSupported,
      },
    });

    // try {
    //   this.#smsSharingSupported = await Linking.canOpenURL(this.#defaultSmsUrl);
    // } catch (e) {
    //   // SystemEventsHandler.onError({
    //   //   err: this.#className + '->checkAvailability(): SMS_NOT_SUPPORTED',
    //   // });
    // }
    //
    // try {
    //   this.#whatsAppSharingSupported = await Linking.canOpenURL(
    //     this.#defaultWhatsAppUrl,
    //   );
    // } catch (e) {
    //   // SystemEventsHandler.onError({
    //   //   err: this.#className + '->checkAvailability(): WHATSAPP_NOT_SUPPORTED',
    //   // });
    // }
    //
    // this.#notifier.notify({
    //   event: ShareServiceEvents.AVAILABILITY_STATUS_CHANGED,
    //   data: {
    //     smsSharingSupported: this.#smsSharingSupported,
    //     whatsAppSharingSupported: this.#whatsAppSharingSupported,
    //   },
    // });
  }

  static async getAvailabilityStatus() {
    const smsSharingSupported = await PhoneShareService.checkSmsAvailability();
    const whatsAppSharingSupported = await PhoneShareService.checkWhatsAppAvailability();

    return {
      smsSharingSupported,
      whatsAppSharingSupported,
    };
  }

  static async share() {
    // SystemEventsHandler.onInfo({info: this.#className + '->share()'});
  }
}

ShareService.notifier = new Notifier();
ShareService.STR = 'STR';
