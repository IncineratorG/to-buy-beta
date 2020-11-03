import {MapProviderTypes} from '../types/MapProvidresTypes';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

class YandexMapProvider {
  static getType() {
    return MapProviderTypes.YANDEX;
  }

  static buildUri({longitude, latitude, productName}) {
    SystemEventsHandler.onInfo({
      info:
        'YandexMapProvider->buildUri(): ' +
        latitude +
        ' - ' +
        longitude +
        ' - ' +
        productName,
    });

    // 'https://yandex.ru/maps/?ll=30.310182,59.951059&z=16&text=кафе%20с%20wi-fi';

    const mapsUri = 'https://yandex.ru/maps/';
    const searchRequest = '&text=' + productName;
    const coordinates = '?ll=' + latitude + ',' + longitude;
    const scale = '&z=18';

    const uri = mapsUri + coordinates + scale + searchRequest;
    return uri;
  }
}

export default YandexMapProvider;
