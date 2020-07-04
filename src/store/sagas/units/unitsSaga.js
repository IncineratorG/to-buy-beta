import {call, put, takeEvery, takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {LOAD_UNITS} from '../../types/units/unitsTypes';
import us_loadUnitsHandler from './handlers/us_loadUnitsHandler';

function* unitsSaga() {
  SystemEventsHandler.onInfo({info: 'unitsSaga()'});

  yield takeLatest(LOAD_UNITS, us_loadUnitsHandler);
}

export default unitsSaga;
