import {
  SET_CURRENT_COORDINATES,
  SET_LOCATION_PERMISSIONS_GRANTED,
} from './productsLocationComponentActionTypes';

function productsLocationComponentReducer(state, action) {
  switch (action.type) {
    case SET_LOCATION_PERMISSIONS_GRANTED: {
      return {
        ...state,
        locationPermissionsGranted: action.payload.granted,
      };
    }

    case SET_CURRENT_COORDINATES: {
      return {
        ...state,
        coords: {
          ...state.coords,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    }

    default: {
      return state;
    }
  }
}

export default productsLocationComponentReducer;
