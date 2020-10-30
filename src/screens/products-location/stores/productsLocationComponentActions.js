import {
  SET_CURRENT_COORDINATES,
  SET_LOCATION_PERMISSIONS_GRANTED,
} from './productsLocationComponentActionTypes';

export const ploc_setLocationPermissionGranted = ({granted}) => {
  return {
    type: SET_LOCATION_PERMISSIONS_GRANTED,
    payload: {granted},
  };
};

export const ploc_setCurrentCoordinates = ({latitude, longitude}) => {
  return {
    type: SET_CURRENT_COORDINATES,
    payload: {latitude, longitude},
  };
};
