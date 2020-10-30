import {MapProviderTypes} from '../types/MapProvidresTypes';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

class GoogleMapProvider {
  static getType() {
    return MapProviderTypes.GOOGLE;
  }

  static buildUri({longitude, latitude}) {
    // SystemEventsHandler.onInfo({});
  }
}

export default GoogleMapProvider;
