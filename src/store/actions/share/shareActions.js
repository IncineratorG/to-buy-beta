import {
  CHECK_SHARE_AVAILABILITY,
  CHECK_SHARE_AVAILABILITY_BEGIN,
  CHECK_SHARE_AVAILABILITY_ERROR,
  SET_SHARE_AVAILABILITY,
  SHARE_PRODUCTS_LIST_VIA_SMS,
  SHARE_PRODUCTS_LIST_VIA_SMS_BEGIN,
  SHARE_PRODUCTS_LIST_VIA_SMS_ERROR,
  SHARE_PRODUCTS_LIST_VIA_SMS_FINISHED,
  SHARE_PRODUCTS_LIST_VIS_WHATS_APP,
  SHARE_PRODUCTS_LIST_VIS_WHATS_APP_BEGIN,
  SHARE_PRODUCTS_LIST_VIS_WHATS_APP_ERROR,
  SHARE_PRODUCTS_LIST_VIS_WHATS_APP_FINISHED,
} from '../../types/share/shareTypes';

export const setShareAvailabilityAction = ({
  smsSharingSupported,
  whatsAppSharingSupported,
}) => {
  return {
    type: SET_SHARE_AVAILABILITY,
    payload: {smsSharingSupported, whatsAppSharingSupported},
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

export const shareProductsListViaSmsAction = ({productsListTextForm}) => {
  return {
    type: SHARE_PRODUCTS_LIST_VIA_SMS,
    payload: {productsListTextForm},
  };
};

export const shareProductsListViaSmsBeginAction = () => {
  return {
    type: SHARE_PRODUCTS_LIST_VIA_SMS_BEGIN,
    payload: undefined,
  };
};

export const shareProductsListViaSmsFinishedAction = () => {
  return {
    type: SHARE_PRODUCTS_LIST_VIA_SMS_FINISHED,
    payload: undefined,
  };
};

export const shareProductsListViaSmsErrorAction = ({description}) => {
  return {
    type: SHARE_PRODUCTS_LIST_VIA_SMS_ERROR,
    payload: {error: {description}},
  };
};

export const shareProductsListViaWhatsAppAction = ({productsListTextForm}) => {
  return {
    type: SHARE_PRODUCTS_LIST_VIS_WHATS_APP,
    payload: {productsListTextForm},
  };
};

export const shareProductsListViaWhatsAppBeginAction = () => {
  return {
    type: SHARE_PRODUCTS_LIST_VIS_WHATS_APP_BEGIN,
    payload: undefined,
  };
};

export const shareProductsListViaWhatsAppFinishedAction = () => {
  return {
    type: SHARE_PRODUCTS_LIST_VIS_WHATS_APP_FINISHED,
    payload: undefined,
  };
};

export const shareProductsListViaWhatsAppErrorAction = () => {
  return {
    type: SHARE_PRODUCTS_LIST_VIS_WHATS_APP_ERROR,
    payload: undefined,
  };
};
