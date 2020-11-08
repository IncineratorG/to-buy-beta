import {
  CHECK_SHARE_AVAILABILITY,
  CHECK_SHARE_AVAILABILITY_BEGIN,
  CHECK_SHARE_AVAILABILITY_ERROR,
  SET_SHARE_AVAILABILITY,
  SHARE_PRODUCTS_LIST_VIA_APP,
  SHARE_PRODUCTS_LIST_VIA_APP_BEGIN,
  SHARE_PRODUCTS_LIST_VIA_APP_ERROR,
  SHARE_PRODUCTS_LIST_VIA_APP_FINISHED,
} from '../../types/share/shareTypes';

export const setShareAvailabilityAction = ({shareServiceAvailabilityMap}) => {
  return {
    type: SET_SHARE_AVAILABILITY,
    payload: {
      shareServiceAvailabilityMap,
    },
  };
};

export const checkShareAvailabilityAction = () => {
  return {
    type: CHECK_SHARE_AVAILABILITY,
    payload: undefined,
  };
};

export const checkShareAvailabilityBeginAction = () => {
  return {
    type: CHECK_SHARE_AVAILABILITY_BEGIN,
    payload: undefined,
  };
};

export const checkShareAvailabilityErrorAction = ({description}) => {
  return {
    type: CHECK_SHARE_AVAILABILITY_ERROR,
    payload: {error: {description}},
  };
};

export const shareProductsListViaAppAction = ({appType, shoppingListId}) => {
  return {
    type: SHARE_PRODUCTS_LIST_VIA_APP,
    payload: {appType, shoppingListId},
  };
};

export const shareProductsListViaAppBeginAction = () => {
  return {
    type: SHARE_PRODUCTS_LIST_VIA_APP_BEGIN,
    payload: undefined,
  };
};

export const shareProductsListViaAppFinishedAction = () => {
  return {
    type: SHARE_PRODUCTS_LIST_VIA_APP_FINISHED,
    payload: undefined,
  };
};

export const shareProductsListViaAppErrorAction = ({description}) => {
  return {
    type: SHARE_PRODUCTS_LIST_VIA_APP_ERROR,
    payload: {error: {description}},
  };
};
