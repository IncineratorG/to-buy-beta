import {Notifier} from '../service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';
import ShareServiceEvents from './data/event-types/ShareServiceEvents';
import PhoneMessaging from './libs/phone-messaging/PhoneMessaging';

export class ShareService {
  static #className = 'ShareService';
  static #notifier = new Notifier();
  static #smsSharingSupported = false;
  static #whatsAppSharingSupported = false;

  static subscribe({event, handler}) {
    return ShareService.#notifier.subscribe({event, handler});
  }

  static async init() {
    await this.checkAvailability();

    this.#notifier.notify({
      event: ShareServiceEvents.AVAILABILITY_STATUS_CHANGED,
      data: {
        smsSharingSupported: ShareService.#smsSharingSupported,
        whatsAppSharingSupported: ShareService.#whatsAppSharingSupported,
      },
    });
  }

  static async checkAvailability() {
    const {sms, whatsApp} = await PhoneMessaging.checkServicesAvailability();

    ShareService.#smsSharingSupported = sms;
    ShareService.#whatsAppSharingSupported = whatsApp;
  }

  static async getAvailabilityStatus() {
    await this.checkAvailability();

    return {
      smsSharingSupported: ShareService.#smsSharingSupported,
      whatsAppSharingSupported: ShareService.#whatsAppSharingSupported,
    };
  }

  static async shareViaSms({text}) {
    SystemEventsHandler.onInfo({
      info: ShareService.#className + '->shareViaSms(): ' + text,
    });

    try {
      await PhoneMessaging.sendSmsMessage(text);
    } catch (e) {
      SystemEventsHandler.onError({
        err:
          ShareService.#className + '->shareViaSms()->ERROR: ' + e.toString(),
      });
    }
  }

  static async shareViaWhatsApp({text}) {
    SystemEventsHandler.onInfo({
      info: ShareService.#className + '->shareViaWhatsApp(): ' + text,
    });

    try {
      await PhoneMessaging.sendWhatsAppMessage(text);
    } catch (e) {
      SystemEventsHandler.onError({
        err:
          ShareService.#className +
          '->shareViaWhatsApp()->ERROR: ' +
          e.toString(),
      });
    }
  }
}
