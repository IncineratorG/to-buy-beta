import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const apiCall = ({value}) => {
  return new Promise((resolve, reject) => {
    resolve(value + 1);
  });
};

function* testStart(action) {
  SystemEventsHandler.onInfo({info: 'testStart()'});

  try {
    const data = yield call(apiCall, {value: 0});
    SystemEventsHandler.onInfo({info: 'testSagaFunction()->DATA: ' + data});

    yield put({type: 'TEST_FINISHED', payload: {value: data}});
  } catch (e) {
    yield put({type: 'TEST_ERROR', message: e.message});
  }
}

function* test2Start() {
  SystemEventsHandler.onInfo({info: 'test2Start()'});
}

function test3Start() {
  SystemEventsHandler.onInfo({info: 'test3Start()'});
}

function* testSaga() {
  SystemEventsHandler.onInfo({info: 'testSaga()'});

  yield takeEvery('TEST_START', testStart);
  yield takeEvery('TEST2_START', test2Start);
  yield takeEvery('TEST3_START', test3Start);
}

export default testSaga;

// function* rootSaga () {
//   const sagas = [
//     saga1,
//     saga2,
//     saga3,
//   ];
//
//   yield all(sagas.map(sagas =>
//       spawn(function* () {
//         while (true) {
//           try {
//             yield call(sagas)
//             break
//           } catch (e) {
//             console.log(e)
//           }
//         }
//       }))
//   );
// }

// import {eventChannel, END} from 'redux-sagas';
//
// function countdown(secs) {
//   return eventChannel((emitter) => {
//     const iv = setInterval(() => {
//       secs -= 1;
//       if (secs > 0) {
//         emitter(secs);
//       } else {
//         // this causes the channel to close
//         emitter(END);
//       }
//     }, 1000);
//     // The subscriber must return an unsubscribe function
//     return () => {
//       clearInterval(iv);
//     };
//   });
// }
