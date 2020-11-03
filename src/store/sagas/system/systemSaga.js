import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  SET_SYSTEM_LANGUAGE,
  UPDATE_SYSTEM_LANGUAGE,
} from '../../types/system/systemTypes';
import s_updateSystemLanguageHandler from './handlers/s_updateSystemLanguageHandler';
import s_setSystemLanguageHandler from './handlers/s_setSystemLanguageHandler';

function* systemSaga() {
  SystemEventsHandler.onInfo({info: 'systemSaga()'});

  yield takeLatest(UPDATE_SYSTEM_LANGUAGE, s_updateSystemLanguageHandler);
  yield takeLatest(SET_SYSTEM_LANGUAGE, s_setSystemLanguageHandler);
}

export default systemSaga;
