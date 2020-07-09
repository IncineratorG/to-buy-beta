import {call, put, takeEvery, takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {ADD_UNIT, LOAD_UNITS} from '../../types/units/unitsTypes';
import us_loadUnitsHandler from './handlers/us_loadUnitsHandler';
import us_addUnitHandler from './handlers/us_addUnitHandler';

function* unitsSaga() {
  SystemEventsHandler.onInfo({info: 'unitsSaga()'});

  yield takeLatest(LOAD_UNITS, us_loadUnitsHandler);
  yield takeLatest(ADD_UNIT, us_addUnitHandler);
}

export default unitsSaga;
