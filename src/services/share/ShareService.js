import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import ShareServiceEvents from './data/event-types/ShareServiceEvents';
import ShareServiceAppTypes from './data/share-app-types/ShareServiceAppTypes';
import NativeShareService from './native-module/NativeShareService';

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

    // ===
    // SystemEventsHandler.onInfo({info: 'ADDING_LISTENER_FROM_SERVICE'});
    // const eventEmitter = new NativeEventEmitter(NativeModules.SharedStorage);
    // const eventListener = eventEmitter.addListener('EventReminder', (event) => {
    //   SystemEventsHandler.onInfo({
    //     info: 'EVENT_FROM_SERVICE: ' + event.eventProperty,
    //   });
    // });
    // ===
  }

  static async checkAvailability() {
    const {
      sms,
      whatsApp,
      telegram,
    } = await NativeShareService.checkServicesAvailability();

    ShareService.#shareServicesAvailabilityMap.clear();
    ShareService.#shareServicesAvailabilityMap.set(
      ShareServiceAppTypes.SMS,
      sms,
    );
    ShareService.#shareServicesAvailabilityMap.set(
      ShareServiceAppTypes.WHATS_APP,
      whatsApp,
    );
    ShareService.#shareServicesAvailabilityMap.set(
      ShareServiceAppTypes.TELEGRAM,
      telegram,
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
          await NativeShareService.sendSmsMessage({text});
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
          await NativeShareService.sendWhatsAppMessage({text});
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

      case ShareServiceAppTypes.TELEGRAM: {
        try {
          await NativeShareService.sendTelegramMessage({text});
        } catch (e) {
          SystemEventsHandler.onError({
            err:
              ShareService.#className +
              '->shareViaTelegram()->ERROR: ' +
              e.toString(),
          });
        }
        break;
      }

      default: {
        SystemEventsHandler.onError({
          err:
            ShareService.#className +
            '->shareViaApp()->ERROR->UNKNOWN_APP_TYPE: ' +
            appType,
        });
      }
    }
  }
}

// import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
// import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
// import ShareServiceEvents from './data/event-types/ShareServiceEvents';
// import PhoneMessaging from './libs/phone-messaging/PhoneMessaging';
// // import TestWidget from './libs/test-widget/TestWidget';
// import ShareServiceAppTypes from './data/share-app-types/ShareServiceAppTypes';
// // import {NativeEventEmitter, NativeModules} from 'react-native';
//
// export class ShareService {
//   static #className = 'ShareService';
//   static #notifier = new Notifier();
//   static #shareServicesAvailabilityMap = new Map();
//
//   static subscribe({event, handler}) {
//     return ShareService.#notifier.subscribe({event, handler});
//   }
//
//   static async init() {
//     await this.checkAvailability();
//
//     this.#notifier.notify({
//       event: ShareServiceEvents.AVAILABILITY_STATUS_CHANGED,
//       data: {
//         shareServiceAvailabilityMap: new Map(
//           ShareService.#shareServicesAvailabilityMap,
//         ),
//       },
//     });
//
//     // ===
//     // SystemEventsHandler.onInfo({info: 'ADDING_LISTENER_FROM_SERVICE'});
//     // const eventEmitter = new NativeEventEmitter(NativeModules.SharedStorage);
//     // const eventListener = eventEmitter.addListener('EventReminder', (event) => {
//     //   SystemEventsHandler.onInfo({
//     //     info: 'EVENT_FROM_SERVICE: ' + event.eventProperty,
//     //   });
//     // });
//     // ===
//   }
//
//   static async checkAvailability() {
//     const {
//       sms,
//       whatsApp,
//       telegram,
//     } = await PhoneMessaging.checkServicesAvailability();
//
//     ShareService.#shareServicesAvailabilityMap.clear();
//     ShareService.#shareServicesAvailabilityMap.set(
//       ShareServiceAppTypes.SMS,
//       sms,
//     );
//     ShareService.#shareServicesAvailabilityMap.set(
//       ShareServiceAppTypes.WHATS_APP,
//       whatsApp,
//     );
//     ShareService.#shareServicesAvailabilityMap.set(
//       ShareServiceAppTypes.TELEGRAM,
//       telegram,
//     );
//   }
//
//   static async getAvailabilityStatus() {
//     await this.checkAvailability();
//
//     return {
//       shareServiceAvailabilityMap: new Map(
//         ShareService.#shareServicesAvailabilityMap,
//       ),
//     };
//   }
//
//   // static async shareViaApp({appType, text}) {
//   //   SystemEventsHandler.onInfo({info: 'shareViaApp()'});
//   //   TestWidget.set(
//   //     JSON.stringify({text: 'This is data from the React Native app'}),
//   //   );
//   // }
//   static async shareViaApp({appType, text}) {
//     switch (appType) {
//       case ShareServiceAppTypes.SMS: {
//         try {
//           await PhoneMessaging.sendSmsMessage(text);
//         } catch (e) {
//           SystemEventsHandler.onError({
//             err:
//               ShareService.#className +
//               '->shareViaApp()->APP_TYPE: ' +
//               appType +
//               '; ERROR: ' +
//               e.toString(),
//           });
//         }
//         break;
//       }
//
//       case ShareServiceAppTypes.WHATS_APP: {
//         try {
//           await PhoneMessaging.sendWhatsAppMessage(text);
//         } catch (e) {
//           SystemEventsHandler.onError({
//             err:
//               ShareService.#className +
//               '->shareViaWhatsApp()->ERROR: ' +
//               e.toString(),
//           });
//         }
//         break;
//       }
//
//       case ShareServiceAppTypes.TELEGRAM: {
//         try {
//           await PhoneMessaging.sendTelegramMessage(text);
//         } catch (e) {
//           SystemEventsHandler.onError({
//             err:
//               ShareService.#className +
//               '->shareViaTelegram()->ERROR: ' +
//               e.toString(),
//           });
//         }
//         break;
//       }
//
//       default: {
//         SystemEventsHandler.onError({
//           err:
//             ShareService.#className +
//             '->shareViaApp()->ERROR->UNKNOWN_APP_TYPE: ' +
//             appType,
//         });
//       }
//     }
//   }
// }
