import SqliteSystemServiceStorage from './storage/sqlite-storage/SqliteSystemServiceStorage';
import {Notifier} from '../service-utils/notifier/Notifier';
import SystemLocalization from './localization/system-localization/SystemLocalization';
import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';
import SystemServiceEventTypes from './data/event-types/SystemServiceEventTypes';

class SystemService {
  static #notifier = new Notifier();
  static #storage = SqliteSystemServiceStorage;
  static #systemLocalization = SystemLocalization;

  static subscribe({event, handler}) {
    return SystemService.#notifier.subscribe({event, handler});
  }

  static async init() {
    await SystemService.#storage.init();
    await SystemService.#systemLocalization.init();

    await SystemService.updateSystemLanguageInfo();
  }

  static async updateSystemLanguageInfo() {
    let systemLanguageCode = '';

    const {
      languageCode: savedLanguageCode,
    } = await SystemService.#storage.getCurrentLanguageCode();

    systemLanguageCode = savedLanguageCode;

    if (!systemLanguageCode) {
      systemLanguageCode = SystemService.#systemLocalization.getOptimalLanguageCode();
    }

    const availableLanguageCodes = SystemService.#systemLocalization.getAvailableLanguageCodes();

    SystemService.#notifier.notify({
      event: SystemServiceEventTypes.LANGUAGE_SET,
      data: {languageCode: systemLanguageCode, availableLanguageCodes},
    });
  }

  static async setSystemLanguageCode({languageCode}) {
    SystemEventsHandler.onInfo({
      info: 'SystemService->setSystemLanguageCode(): ' + languageCode,
    });

    await SystemService.updateSystemLanguageInfo();
  }
}

export default SystemService;
