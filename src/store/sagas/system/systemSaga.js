import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {UPDATE_SYSTEM_LANGUAGE} from '../../types/system/systemTypes';
import s_updateSystemLanguageHandler from './handlers/s_updateSystemLanguageHandler';

function* systemSaga() {
  SystemEventsHandler.onInfo({info: 'systemSaga()'});

  yield takeLatest(UPDATE_SYSTEM_LANGUAGE, s_updateSystemLanguageHandler);
}

export default systemSaga;
