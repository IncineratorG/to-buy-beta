import {call, take, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {eventChannel} from 'redux-saga';
import {setShareAvailabilityAction} from '../../actions/share/shareActions';
import Services from '../../../services/Services';
import ShareServiceEvents from '../../../services/share/data/event-types/ShareServiceEvents';

function shareEventsChannel() {
  return eventChannel((emit) => {
    const availabilityChangedHandler = ({
      smsSharingSupported,
      whatsAppSharingSupported,
    }) => {
      emit(
        setShareAvailabilityAction({
          smsSharingSupported,
          whatsAppSharingSupported,
        }),
      );
    };

    const shareService = Services.get(Services.serviceTypes.SHARE);

    const availabilityChangedUnsubscribe = shareService.subscribe({
      event: ShareServiceEvents.AVAILABILITY_STATUS_CHANGED,
      handler: availabilityChangedHandler,
    });

    return () => {
      availabilityChangedUnsubscribe();
    };
  });
}

function* shareEventsSaga() {
  SystemEventsHandler.onInfo({info: 'shareEventsSaga()'});

  const channel = yield call(shareEventsChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default shareEventsSaga;
