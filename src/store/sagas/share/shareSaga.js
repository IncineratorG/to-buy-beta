import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {
  CHECK_SHARE_AVAILABILITY,
  SHARE_PRODUCTS_LIST_VIA_SMS,
  SHARE_PRODUCTS_LIST_VIA_WHATS_APP,
} from '../../types/share/shareTypes';
import ss_checkShareAvailabilityHandler from './handlers/ss_checkShareAvailabilityHandler';
import ss_shareProductsListViaSmsHandler from './handlers/ss_shareProductsListViaSmsHandler';
import ss_shareProductsListViaWhatsAppHandler from './handlers/ss_shareProductsListViaWhatsAppHandler';

function* shareSaga() {
  SystemEventsHandler.onInfo({info: 'shareSaga()'});

  yield takeLatest(CHECK_SHARE_AVAILABILITY, ss_checkShareAvailabilityHandler);
  yield takeLatest(
    SHARE_PRODUCTS_LIST_VIA_SMS,
    ss_shareProductsListViaSmsHandler,
  );
  yield takeLatest(
    SHARE_PRODUCTS_LIST_VIA_WHATS_APP,
    ss_shareProductsListViaWhatsAppHandler,
  );
}

export default shareSaga;
