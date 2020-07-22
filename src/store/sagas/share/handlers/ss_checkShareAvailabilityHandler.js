import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  checkShareAvailabilityBeginAction,
  checkShareAvailabilityErrorAction,
} from '../../../actions/share/shareActions';

function* ss_checkShareAvailability(action) {
  yield put(checkShareAvailabilityBeginAction());

  try {
    const shareService = Services.get(Services.serviceTypes.SHARE);
    yield call(shareService.checkAvailability);
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ss_checkShareAvailability()->ERROR: ' + e,
    });
    yield put(checkShareAvailabilityErrorAction({description: e.toString()}));
  }
}

export default ss_checkShareAvailability;
