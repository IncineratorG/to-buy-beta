import {
  CHECK_SHARE_AVAILABILITY,
  CHECK_SHARE_AVAILABILITY_BEGIN,
  CHECK_SHARE_AVAILABILITY_ERROR,
  SET_SHARE_AVAILABILITY,
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
