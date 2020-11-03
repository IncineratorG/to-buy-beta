import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* s_updateSystemLanguageHandler(action) {
  try {
    const systemService = Services.get(Services.serviceTypes.SYSTEM);

    yield call(systemService.updateSystemLanguageInfo);
  } catch (e) {
    SystemEventsHandler.onError({
      err: 's_updateSystemLanguageHandler()->ERROR: ' + e,
    });
  }
}

export default s_updateSystemLanguageHandler;
