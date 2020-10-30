import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {LOCATE_PRODUCT} from '../../types/products-location/productsLocationTypes';
import psl_locateProductHandler from './handlers/psl_locateProductHandler';

function* productsLocationSaga() {
  SystemEventsHandler.onInfo({info: 'productsLocationSaga()'});

  yield takeLatest(LOCATE_PRODUCT, psl_locateProductHandler);
}

export default productsLocationSaga;
