import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  LOCATE_PRODUCT,
  SET_MAP_PROVIDER,
} from '../../types/products-location/productsLocationTypes';
import psl_locateProductHandler from './handlers/psl_locateProductHandler';
import psl_setMapProviderHandler from './handlers/psl_setMapProviderHandler';

function* productsLocationSaga() {
  SystemEventsHandler.onInfo({info: 'productsLocationSaga()'});

  yield takeLatest(LOCATE_PRODUCT, psl_locateProductHandler);
  yield takeLatest(SET_MAP_PROVIDER, psl_setMapProviderHandler);
}

export default productsLocationSaga;
