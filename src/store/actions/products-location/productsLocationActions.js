import {
  LOCATE_PRODUCT,
  LOCATE_PRODUCT_BEGIN,
  LOCATE_PRODUCT_ERROR,
  LOCATE_PRODUCT_FINISHED,
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

export const locateProductFinishedAction = ({product, locationUri}) => {
  return {
    type: LOCATE_PRODUCT_FINISHED,
    payload: {product, locationUri},
  };
};

export const locateProductErrorAction = ({product, description}) => {
  return {
    type: LOCATE_PRODUCT_ERROR,
    payload: {product, error: {description}},
  };
};
