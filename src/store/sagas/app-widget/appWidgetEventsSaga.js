import {call, put, take} from '@redux-saga/core/effects';
import {eventChannel} from 'redux-saga';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppWidgetEvents from './events/AppWidgetEvents';

function createAppWidgetEventsChannel() {
  return eventChannel((emit) => {
    const openShoppingListRequestEventUnsubscribe = AppWidgetEvents.openShoppingListRequestEvent(
      emit,
    );

    // const widgetInitialStatusChangedUnsubscribe = AppWidgetEvents.widgetInitialStatusChangedEvent(
    //   emit,
    // );
    //
    // const widgetStatusChangedUnsubscribe = AppWidgetEvents.widgetActiveStatusChangedEvent(
    //   emit,
    // );
    //
    // const shoppingListChangedUnsubscribe = AppWidgetEvents.shoppingListChangedEvent(
    //   emit,
    // );

    return () => {
      openShoppingListRequestEventUnsubscribe();

      // widgetInitialStatusChangedUnsubscribe();
      // widgetStatusChangedUnsubscribe();
      // shoppingListChangedUnsubscribe();
    };
  });
}

function* appWidgetEventsSaga() {
  SystemEventsHandler.onInfo({info: 'appWidgetEventsSaga()'});

  const channel = yield call(createAppWidgetEventsChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default appWidgetEventsSaga;
