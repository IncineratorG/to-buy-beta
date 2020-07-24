import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  CHECK_SHARE_AVAILABILITY,
  SHARE_PRODUCTS_LIST_VIA_SMS,
} from '../../types/share/shareTypes';
import ss_checkShareAvailabilityHandler from './handlers/ss_checkShareAvailabilityHandler';
import ss_shareProductsListViaSmsHandler from './handlers/ss_shareProductsListViaSmsHandler';

function* shareSaga() {
  SystemEventsHandler.onInfo({info: 'shareSaga()'});

  yield takeLatest(CHECK_SHARE_AVAILABILITY, ss_checkShareAvailabilityHandler);
  yield takeLatest(
    SHARE_PRODUCTS_LIST_VIA_SMS,
    ss_shareProductsListViaSmsHandler,
  );
}

export default shareSaga;
