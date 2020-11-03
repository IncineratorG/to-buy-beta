import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

class LocationUriBuilder {
  static async build({mapProvider, productName, longitude, latitude}) {
    return mapProvider.buildUri({longitude, latitude, productName});
  }
}

export default LocationUriBuilder;
