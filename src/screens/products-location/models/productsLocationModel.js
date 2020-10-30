import {useState, useEffect, useReducer} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../utils/common/localization';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import productsLocationComponentReducer from '../stores/productsLocationComponentReducer';
import productsLocationComponentState from '../stores/productsLocationComponentState';
import {
  ploc_setCurrentCoordinates,
  ploc_setLocationPermissionGranted,
} from '../stores/productsLocationComponentActions';

export const useProductsLocationModel = () => {
  const [state, localDispatch] = useReducer(
    productsLocationComponentReducer,
    productsLocationComponentState,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {t} = useTranslation();

  const ACCESS_COARSE_LOCATION_PERMISSION =
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
  const ACCESS_FINE_LOCATION_PERMISSION =
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

  const [permissionsResponse, setPermissionsResponse] = useState(null);

  useEffect(() => {
    const requestLocationPermissions = async () => {
      try {
        const userResponse = await PermissionsAndroid.requestMultiple([
          ACCESS_COARSE_LOCATION_PERMISSION,
          ACCESS_FINE_LOCATION_PERMISSION,
        ]);

        setPermissionsResponse(userResponse);
      } catch (err) {
        SystemEventsHandler.onError({err: 'PERMISSIONS_REQUEST_ERROR: ' + err});
      }
    };

    requestLocationPermissions();
  }, [ACCESS_COARSE_LOCATION_PERMISSION, ACCESS_FINE_LOCATION_PERMISSION]);

  useEffect(() => {
    if (permissionsResponse) {
      const accessCoarseLocationPermissionGranted =
        permissionsResponse[ACCESS_COARSE_LOCATION_PERMISSION] === 'granted';
      const accessFineLocationPermissionGranted =
        permissionsResponse[ACCESS_FINE_LOCATION_PERMISSION] === 'granted';
      if (
        accessFineLocationPermissionGranted &&
        accessCoarseLocationPermissionGranted
      ) {
        localDispatch(ploc_setLocationPermissionGranted({granted: true}));
      }
    }
  }, [
    permissionsResponse,
    ACCESS_COARSE_LOCATION_PERMISSION,
    ACCESS_FINE_LOCATION_PERMISSION,
  ]);

  useEffect(() => {
    if (!state.locationPermissionsGranted) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const {coords} = position;
        const {longitude, latitude} = coords;

        localDispatch(ploc_setCurrentCoordinates({latitude, longitude}));
      },
      (error) => {
        SystemEventsHandler.onError({err: error.code + ' - ' + error.message});
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [state.locationPermissionsGranted]);

  return {
    data: {
      state,
    },
    setters: {},
    navigation,
    dispatch,
    localDispatch,
    t,
  };
};
