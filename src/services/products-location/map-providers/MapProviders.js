import GoogleMapProvider from './google/GoogleMapProvider';
import YandexMapProvider from './yandex/YandexMapProvider';
import AsyncMapProvidersStorage from './storage/async-storage/AsyncMapProvidersStorage';
import {MapProviderTypes} from './types/MapProvidresTypes';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

class MapProviders {
  static #providers = [GoogleMapProvider, YandexMapProvider];
  static #storage = AsyncMapProvidersStorage;

  static async init() {
    await MapProviders.#storage.init();
  }

  static getAvailableProviders() {
    return this.#providers;
  }

  static async getCurrentProvider() {
    let currentSavedProviderType = await MapProviders.#storage.getCurrentMapProviderType();
    if (!currentSavedProviderType || currentSavedProviderType === '') {
      currentSavedProviderType = MapProviderTypes.GOOGLE;
    }

    switch (currentSavedProviderType) {
      case MapProviderTypes.GOOGLE: {
        return MapProviders.#providers[0];
      }

      case MapProviderTypes.YANDEX: {
        return MapProviders.#providers[1];
      }

      default: {
        SystemEventsHandler.onError({
          err:
            'MapProviders->getCurrentProvider()->UNKNOWN_TYPE: ' +
            currentSavedProviderType,
        });
        return undefined;
      }
    }
  }

  static async setCurrentProvider({providerType}) {
    await MapProviders.#storage.setCurrentMapProviderType({providerType});
  }
}

export default MapProviders;
