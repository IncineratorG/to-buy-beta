import {SystemEventsHandler} from '../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import GeolocationService from './geolocation/GeolocationService';
import MapProviders from './map-providers/MapProviders';
import LocationUriBuilder from './location-uri-builder/LocationUriBuilder';

class ProductsLocationService {
  static #mapProviders = MapProviders;

  static async init() {
    await ProductsLocationService.#mapProviders.init();
  }

  static async getMapProviderTypes() {
    const providers = ProductsLocationService.#mapProviders.getAvailableProviders();
    return providers.map((provider) => provider.getType());
  }

  static async getActiveMapProviderType() {
    const currentProvider = await ProductsLocationService.#mapProviders.getCurrentProvider();
    return currentProvider.getType();
  }

  static async locateProduct({productName}) {
    SystemEventsHandler.onInfo({
      info: 'ProductsLocationService->locateProduct(): ' + productName,
    });

    let latitude;
    let longitude;
    try {
      const {
        permissionGranted,
        coords: {latitude: latitudeValue, longitude: longitudeValue},
      } = await GeolocationService.currentLocation();
      if (!permissionGranted) {
        SystemEventsHandler.onError({
          err: 'ProductsLocationService->locateProduct()->PERMISSIONS_DENIED',
        });
        return;
      }

      latitude = latitudeValue;
      longitude = longitudeValue;
    } catch (e) {
      SystemEventsHandler.onError({
        err: 'ProductsLocationService->locateProduct()->ERROR: ' + e.toString(),
      });
      return;
    }

    const currentMapProvider = await ProductsLocationService.#mapProviders.getCurrentProvider();
    const locationUri = await LocationUriBuilder.build({
      mapProvider: currentMapProvider,
      productName,
      latitude,
      longitude,
    });

    return locationUri;
  }
}

export default ProductsLocationService;
