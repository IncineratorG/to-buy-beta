// import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
// import GeolocationService from './geolocation/GeolocationService';
// import MapProviders from './map-providers/MapProviders';
// import LocationUriBuilder from './location-uri-builder/LocationUriBuilder';
// import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
// import ProductsLocationServiceEventTypes from './data/event-types/ProductsLocationServiceEventTypes';

class ProductsLocationService {
  // static #notifier = new Notifier();
  // static #mapProviders = MapProviders;
  static #lastLocatedProductName = undefined;

  static subscribe({event, handler}) {
    // return ProductsLocationService.#notifier.subscribe({event, handler});
  }

  static async init() {
    // await ProductsLocationService.#mapProviders.init();
    // await ProductsLocationService.updateMapProviderType();
  }

  static async getMapProviderTypes() {
    // const providers = ProductsLocationService.#mapProviders.getAvailableProviders();
    // return providers.map((provider) => provider.getType());
  }

  static async setMapProviderType({type}) {
    // SystemEventsHandler.onInfo({
    //   info: 'ProductsLocationService->setMapProviderType(): ' + type,
    // });
    //
    // const success = await ProductsLocationService.#mapProviders.setCurrentProvider(
    //   {
    //     providerType: type,
    //   },
    // );
    //
    // if (success) {
    //   await ProductsLocationService.updateMapProviderType();
    //   if (ProductsLocationService.#lastLocatedProductName) {
    //     await ProductsLocationService.locateProduct({
    //       productName: ProductsLocationService.#lastLocatedProductName,
    //     });
    //   }
    // }
  }

  static async getActiveMapProviderType() {
    // const currentProvider = await ProductsLocationService.#mapProviders.getCurrentProvider();
    // return currentProvider.getType();
  }

  static async updateMapProviderType() {
    // const currentMapProviderType = await ProductsLocationService.getActiveMapProviderType();
    // const availableMapProviderTypes = await ProductsLocationService.getMapProviderTypes();
    //
    // ProductsLocationService.#notifier.notify({
    //   event: ProductsLocationServiceEventTypes.MAP_PROVIDER_SET,
    //   data: {
    //     mapProviderType: currentMapProviderType,
    //     availableMapProviderTypes,
    //   },
    // });
  }

  static async locateProduct({productName}) {
    // SystemEventsHandler.onInfo({
    //   info: 'ProductsLocationService->locateProduct(): ' + productName,
    // });
    //
    // ProductsLocationService.#lastLocatedProductName = productName;
    //
    // let latitude;
    // let longitude;
    // try {
    //   const {
    //     permissionGranted,
    //     coords: {latitude: latitudeValue, longitude: longitudeValue},
    //   } = await GeolocationService.currentLocation();
    //   if (!permissionGranted) {
    //     SystemEventsHandler.onError({
    //       err: 'ProductsLocationService->locateProduct()->PERMISSIONS_DENIED',
    //     });
    //     return;
    //   }
    //
    //   latitude = latitudeValue;
    //   longitude = longitudeValue;
    // } catch (e) {
    //   SystemEventsHandler.onError({
    //     err: 'ProductsLocationService->locateProduct()->ERROR: ' + e.toString(),
    //   });
    //   return;
    // }
    //
    // const currentMapProvider = await ProductsLocationService.#mapProviders.getCurrentProvider();
    // const locationUri = await LocationUriBuilder.build({
    //   mapProvider: currentMapProvider,
    //   productName,
    //   latitude,
    //   longitude,
    // });
    //
    // ProductsLocationService.#notifier.notify({
    //   event: ProductsLocationServiceEventTypes.LOCATION_URI_SET,
    //   data: {locationUri},
    // });
    //
    // return locationUri;
  }
}

export default ProductsLocationService;
