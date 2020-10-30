import {PermissionsAndroid} from 'react-native';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import Geolocation from 'react-native-geolocation-service';

class GeolocationService {
  static ERROR = {
    PERMISSION_DENIED: 'PERMISSION_DENIED',
    SUBSERVICE_ERROR: 'SUBSERVICE_ERROR',
  };
  static #ACCESS_COARSE_LOCATION_PERMISSION = PermissionsAndroid.PERMISSIONS
    .ACCESS_COARSE_LOCATION;
  static #ACCESS_FINE_LOCATION_PERMISSION = PermissionsAndroid.PERMISSIONS
    .ACCESS_FINE_LOCATION;

  static async currentLocation() {
    const result = {
      permissionGranted: false,
      coords: {longitude: undefined, latitude: undefined},
    };

    const locationPermissionsGranted = await GeolocationService.hasLocationPermissions();
    if (!locationPermissionsGranted) {
      result.permissionGranted = false;
      return result;
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const {coords} = position;
          const {longitude, latitude} = coords;
          result.permissionGranted = true;
          result.coords.latitude = latitude;
          result.coords.longitude = longitude;
          resolve(result);
        },
        (error) => {
          reject(error.code + ' - ' + error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  }

  static async hasLocationPermissions() {
    const userResponse = await PermissionsAndroid.requestMultiple([
      GeolocationService.#ACCESS_COARSE_LOCATION_PERMISSION,
      GeolocationService.#ACCESS_FINE_LOCATION_PERMISSION,
    ]);

    const accessCoarseLocationPermissionGranted =
      userResponse[GeolocationService.#ACCESS_COARSE_LOCATION_PERMISSION] ===
      'granted';
    const accessFineLocationPermissionGranted =
      userResponse[GeolocationService.#ACCESS_FINE_LOCATION_PERMISSION] ===
      'granted';
    return (
      accessCoarseLocationPermissionGranted &&
      accessFineLocationPermissionGranted
    );
  }
}

export default GeolocationService;
