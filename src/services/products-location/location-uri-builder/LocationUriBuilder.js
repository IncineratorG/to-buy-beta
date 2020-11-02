import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

class LocationUriBuilder {
  static async build({mapProvider, productName, longitude, latitude}) {
    return mapProvider.buildUri({longitude, latitude, productName});
  }
}

export default LocationUriBuilder;
