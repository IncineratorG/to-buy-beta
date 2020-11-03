import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {setMapProviderAction} from '../../../store/actions/products-location/productsLocationActions';

export const useProductsLocationController = (model) => {
  const screenMenuMapProviderTypePressHandler = ({mapProviderType}) => {
    SystemEventsHandler.onInfo({
      info: 'screenMenuMapProviderTypePressHandler(): ' + mapProviderType,
    });

    model.dispatch(setMapProviderAction({mapProviderType}));
  };

  return {
    screenMenuMapProviderTypePressHandler,
  };
};
