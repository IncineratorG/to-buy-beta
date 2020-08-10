import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* s_setSystemLanguageHandler(action) {
  const {languageCode} = action.payload;

  try {
    const systemService = Services.get(Services.serviceTypes.SYSTEM);

    yield call(systemService.setSystemLanguageCode, {languageCode});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 's_setSystemLanguageHandler()->ERROR: ' + e,
    });
  }
}

export default s_setSystemLanguageHandler;
