import {all, spawn, call} from 'redux-saga/effects';
import testSaga from './test/testSaga';
import shoppingListsSaga from './shopping-lists/shoppingListsSaga';
import {SystemEventsHandler} from '../../services/service-utils/system-events-handler/SystemEventsHandler';
import productsListSaga from './products-list/productsListSaga';
import unitsSaga from './units/unitsSaga';
import categoriesSaga from './categories/categoriesSaga';
import productEventsSaga from './products-list/productEventsSaga';

function* rootSaga() {
  const sagas = [
    testSaga,
    shoppingListsSaga,
    productsListSaga,
    productEventsSaga,
    unitsSaga,
    categoriesSaga,
  ];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            SystemEventsHandler.onError({err: 'rootSaga()->ERROR: ' + e});
          }
        }
      }),
    ),
  );
}

export default rootSaga;
