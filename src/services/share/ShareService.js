import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import ShareServiceEvents from './data/event-types/ShareServiceEvents';
import PhoneMessaging from './libs/phone-messaging/PhoneMessaging';
import ShareServiceAppTypes from './data/share-app-types/ShareServiceAppTypes';

export class ShareService {
  static #className = 'ShareService';
  static #notifier = new Notifier();
  static #shareServicesAvailabilityMap = new Map();

  static subscribe({event, handler}) {
    return ShareService.#notifier.subscribe({event, handler});
  }

  static async init() {
    await this.checkAvailability();

    this.#notifier.notify({
      event: ShareServiceEvents.AVAILABILITY_STATUS_CHANGED,
      data: {
        shareServiceAvailabilityMap: new Map(
          ShareService.#shareServicesAvailabilityMap,
        ),
      },
    });
  }

  static async checkAvailability() {
    const {sms, whatsApp} = await PhoneMessaging.checkServicesAvailability();

    ShareService.#shareServicesAvailabilityMap.clear();
    ShareService.#shareServicesAvailabilityMap.set(
      ShareServiceAppTypes.SMS,
      sms,
    );
    ShareService.#shareServicesAvailabilityMap.set(
      ShareServiceAppTypes.WHATS_APP,
      whatsApp,
    );
  }

  static async getAvailabilityStatus() {
    await this.checkAvailability();

    return {
      shareServiceAvailabilityMap: new Map(
        ShareService.#shareServicesAvailabilityMap,
      ),
    };
  }

  static async shareViaApp({appType, text}) {
    switch (appType) {
      case ShareServiceAppTypes.SMS: {
        try {
          await PhoneMessaging.sendSmsMessage(text);
        } catch (e) {
          SystemEventsHandler.onError({
            err:
              ShareService.#className +
              '->shareViaApp()->APP_TYPE: ' +
              appType +
              '; ERROR: ' +
              e.toString(),
          });
        }
        break;
      }

      case ShareServiceAppTypes.WHATS_APP: {
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
        break;
      }

      default: {
        SystemEventsHandler.onError({
          err:
            ShareService.#className +
            '->shareViaWhatsApp()->ERROR->UNKNOWN_APP_TYPE: ' +
            appType,
        });
      }
    }
  }
}
