import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

export const useProductsLocationController = (model) => {
  const screenMenuMapProviderTypePressHandler = ({mapProviderType}) => {
    SystemEventsHandler.onInfo({
      info: 'screenMenuMapProviderTypePressHandler(): ' + mapProviderType,
    });
  };

  return {
    screenMenuMapProviderTypePressHandler,
  };
};
