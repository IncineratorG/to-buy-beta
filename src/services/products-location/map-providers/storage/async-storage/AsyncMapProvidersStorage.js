import AsyncStorage from '@react-native-async-storage/async-storage';
import {SystemEventsHandler} from '../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

class AsyncMapProvidersStorage {
  static #PROVIDER_TYPE_KEY = 'PROVIDER_TYPE_KEY';

  static async init() {}

  static async getCurrentMapProviderType() {
    try {
      return await AsyncStorage.getItem(
        AsyncMapProvidersStorage.#PROVIDER_TYPE_KEY,
      );
    } catch (e) {
      SystemEventsHandler.onError({
        err:
          'AsyncMapProvidersStorage->getCurrentMapProviderType()->ERROR: ' +
          e.toString(),
      });
      return undefined;
    }
  }

  static async setCurrentMapProviderType({providerType}) {
    try {
      await AsyncStorage.setItem(
        AsyncMapProvidersStorage.#PROVIDER_TYPE_KEY,
        providerType,
      );
      return true;
    } catch (e) {
      SystemEventsHandler.onError({
        err:
          'AsyncMapProvidersStorage->setCurrentMapProviderType()->ERROR: ' +
          e.toString(),
      });
      return false;
    }
  }
}

export default AsyncMapProvidersStorage;
