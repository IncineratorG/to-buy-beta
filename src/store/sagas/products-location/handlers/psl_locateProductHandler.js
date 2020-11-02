import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {
  locateProductBeginAction,
  locateProductErrorAction,
  locateProductFinishedAction,
} from '../../../actions/products-location/productsLocationActions';
import Services from '../../../../services/Services';

function* psl_locateProductHandler(action) {
  const {product} = action.payload;

  SystemEventsHandler.onInfo({
    info: 'psl_locateProductHandler(): ' + JSON.stringify(product),
  });

  yield put(locateProductBeginAction({product}));

  try {
    const productsLocationService = Services.get(
      Services.serviceTypes.PRODUCTS_LOCATION,
    );

    const uri = yield call(productsLocationService.locateProduct, {
      productName: product.name,
    });

    yield put(locateProductFinishedAction({product, locationUri: uri}));
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'psl_locateProductHandler()->ERROR: ' + e,
    });

    yield put(locateProductErrorAction({product, description: e.toString()}));
  }
}

export default psl_locateProductHandler;
