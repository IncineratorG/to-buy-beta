import {call, put, take} from '@redux-saga/core/effects';
import {eventChannel} from 'redux-saga';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {systemLanguageSetAction} from '../../actions/system/systemActions';
import Services from '../../../services/Services';
import SystemServiceEventTypes from '../../../services/system/data/event-types/SystemServiceEventTypes';

function createSystemEventsChannel() {
  return eventChannel((emit) => {
    const languageSetHandler = ({languageCode}) => {
      emit(systemLanguageSetAction({languageCode}));
    };

    const systemService = Services.get(Services.serviceTypes.SYSTEM);

    const languageSetUnsubscribe = systemService.subscribe({
      event: SystemServiceEventTypes.LANGUAGE_SET,
      handler: languageSetHandler,
    });

    return () => {
      languageSetUnsubscribe();
    };
  });
}

function* systemEventsSaga() {
  SystemEventsHandler.onInfo({info: 'systemEventsSaga()'});

  const channel = yield call(createSystemEventsChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default systemEventsSaga;
