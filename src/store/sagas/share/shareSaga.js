import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {CHECK_SHARE_AVAILABILITY} from '../../types/share/shareTypes';
import ss_checkShareAvailability from './handlers/ss_checkShareAvailabilityHandler';

function* shareSaga() {
  SystemEventsHandler.onInfo({info: 'shareSaga()'});

  yield takeLatest(CHECK_SHARE_AVAILABILITY, ss_checkShareAvailability);
}

export default shareSaga;
