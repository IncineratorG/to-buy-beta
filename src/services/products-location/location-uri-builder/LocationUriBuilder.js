import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

class LocationUriBuilder {
  static async build({mapProvider, longitude, latitude}) {
    SystemEventsHandler.onInfo({
      info:
        'LocationUriBuilder->build(): ' +
        mapProvider.getType() +
        ' - ' +
        longitude +
        ' - ' +
        latitude,
    });
  }
}

export default LocationUriBuilder;
