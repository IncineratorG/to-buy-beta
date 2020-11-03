import Services from '../../../../services/Services';
import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

function* psl_setMapProviderHandler(action) {
  const {mapProviderType} = action.payload;

  SystemEventsHandler.onInfo({
    info: 'psl_setMapProviderHandler(): ' + mapProviderType,
  });

  try {
    const productsLocationService = Services.get(
      Services.serviceTypes.PRODUCTS_LOCATION,
    );

    yield call(productsLocationService.setMapProviderType, {
      type: mapProviderType,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'psl_setMapProviderHandler()->ERROR: ' + e,
    });
  }
}

export default psl_setMapProviderHandler;
