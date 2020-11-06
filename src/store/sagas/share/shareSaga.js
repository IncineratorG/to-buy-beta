import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  CHECK_SHARE_AVAILABILITY,
  SHARE_PRODUCTS_LIST_VIA_APP,
} from '../../types/share/shareTypes';
import ss_checkShareAvailabilityHandler from './handlers/ss_checkShareAvailabilityHandler';
import ss_shareProductsListViaAppHandler from './handlers/ss_shareProductsListViaAppHandler';

function* shareSaga() {
  SystemEventsHandler.onInfo({info: 'shareSaga()'});

  yield takeLatest(CHECK_SHARE_AVAILABILITY, ss_checkShareAvailabilityHandler);
  yield takeLatest(
    SHARE_PRODUCTS_LIST_VIA_APP,
    ss_shareProductsListViaAppHandler,
  );
}

export default shareSaga;
