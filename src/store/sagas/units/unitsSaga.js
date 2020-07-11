import {call, put, takeEvery, takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  ADD_UNIT,
  LOAD_UNITS,
  REMOVE_UNIT,
  UPDATE_UNIT,
} from '../../types/units/unitsTypes';
import us_loadUnitsHandler from './handlers/us_loadUnitsHandler';
import us_addUnitHandler from './handlers/us_addUnitHandler';
import us_updateUnitHandler from './handlers/us_updateUnitHandler';
import us_removeUnitHandler from './handlers/us_removeUnitHandler';

function* unitsSaga() {
  SystemEventsHandler.onInfo({info: 'unitsSaga()'});

  yield takeLatest(LOAD_UNITS, us_loadUnitsHandler);
  yield takeLatest(ADD_UNIT, us_addUnitHandler);
  yield takeLatest(UPDATE_UNIT, us_updateUnitHandler);
  yield takeLatest(REMOVE_UNIT, us_removeUnitHandler);
}

export default unitsSaga;
