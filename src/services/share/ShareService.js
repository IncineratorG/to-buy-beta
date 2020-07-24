import {Linking} from 'react-native';
import {Notifier} from '../service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';
import ShareServiceEvents from './data/event-types/ShareServiceEvents';

export class ShareService {
  static #className = 'ShareService';
  static #notifier = new Notifier();
  static #defaultSmsUrl = 'sms:?body=t';
  static #defaultWhatsAppUrl = 'whatsapp://send?text=t';
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
    try {
      ShareService.#smsSharingSupported = await Linking.canOpenURL(
        ShareService.#defaultSmsUrl,
      );
    } catch (e) {
      SystemEventsHandler.onError({
        err:
          ShareService.#className + '->checkAvailability(): SMS_NOT_SUPPORTED',
      });
    }

    try {
      ShareService.#whatsAppSharingSupported = await Linking.canOpenURL(
        ShareService.#defaultWhatsAppUrl,
      );
    } catch (e) {
      SystemEventsHandler.onError({
        err:
          ShareService.#className +
          '->checkAvailability(): WHATSAPP_NOT_SUPPORTED',
      });
    }
  }

  static async getAvailabilityStatus() {
    await this.checkAvailability();

    return {
      smsSharingSupported: ShareService.#smsSharingSupported,
      whatsAppSharingSupported: ShareService.#whatsAppSharingSupported,
    };
  }

  static async shareViaSms(text) {
    SystemEventsHandler.onInfo({
      info: ShareService.#className + '->shareViaSms(): ' + text,
    });
  }

  static async shareViaWhatsApp(text) {
    SystemEventsHandler.onInfo({
      info: ShareService.#className + '->shareViaWhatsApp(): ' + text,
    });
  }
}
