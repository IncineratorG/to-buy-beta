import {all, spawn, call} from 'redux-saga/effects';
import testSaga from './test/testSaga';
import shoppingListsSaga from './shopping-lists/shoppingListsSaga';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import productsListSaga from './products-list/productsListSaga';
import unitsSaga from './units/unitsSaga';
import categoriesSaga from './categories/categoriesSaga';
import productEventsSaga from './products-list/productEventsSaga';
import shareEventsSaga from './share/shareEventsSaga';
import shareSaga from './share/shareSaga';
import productSuggestionSaga from './product-suggestion/productSuggestionSaga';
import systemSaga from './system/systemSaga';
import systemEventsSaga from './system/systemEventsSaga';
import productsLocationSaga from './products-location/productsLocationSaga';
import productsLocationEventsSaga from './products-location/productsLocationEventsSaga';
import appWidgetSaga from './app-widget/appWidgetSaga';

function* rootSaga() {
  const sagas = [
    testSaga,
    shoppingListsSaga,
    productsListSaga,
    productEventsSaga,
    unitsSaga,
    categoriesSaga,
    shareSaga,
    shareEventsSaga,
    productSuggestionSaga,
    systemSaga,
    systemEventsSaga,
    productsLocationSaga,
    productsLocationEventsSaga,
    appWidgetSaga,
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
