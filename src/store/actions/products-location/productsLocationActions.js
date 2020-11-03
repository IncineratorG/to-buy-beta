import {
  LOCATE_PRODUCT,
  LOCATE_PRODUCT_BEGIN,
  LOCATE_PRODUCT_ERROR,
  LOCATE_PRODUCT_FINISHED,
  MAP_PROVIDER_SET,
  SET_MAP_PROVIDER,
} from '../../types/products-location/productsLocationTypes';

export const locateProductAction = ({product}) => {
  return {
    type: LOCATE_PRODUCT,
    payload: {product},
  };
};

export const locateProductBeginAction = ({product}) => {
  return {
    type: LOCATE_PRODUCT_BEGIN,
    payload: {product},
  };
};

export const locateProductFinishedAction = ({locationUri}) => {
  return {
    type: LOCATE_PRODUCT_FINISHED,
    payload: {locationUri},
  };
};

export const locateProductErrorAction = ({product, description}) => {
  return {
    type: LOCATE_PRODUCT_ERROR,
    payload: {product, error: {description}},
  };
};

export const setMapProviderAction = ({mapProviderType}) => {
  return {
    type: SET_MAP_PROVIDER,
    payload: {mapProviderType},
  };
};

export const mapProviderSetAction = ({
  mapProviderType,
  availableMapProviderTypes,
}) => {
  return {
    type: MAP_PROVIDER_SET,
    payload: {mapProviderType, availableMapProviderTypes},
  };
};
