import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {
  loadUnitsBeginAction,
  loadUnitsErrorAction,
  loadUnitsFinishedAction,
} from '../../../actions/units/unitsActions';
import Services from '../../../../services/Services';

function* us_loadUnitsHandler(action) {
  const {shoppingListId} = action.payload;

  yield put(loadUnitsBeginAction({shoppingListId}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const units = yield call(shoppingListService.getUnits, {shoppingListId});
    yield put(loadUnitsFinishedAction({shoppingListId, units}));
  } catch (e) {
    SystemEventsHandler.onError({err: 'us_loadUnitsHandler()->ERROR: ' + e});

    yield put(
      loadUnitsErrorAction({shoppingListId, description: e.toString()}),
    );
  }
}

export default us_loadUnitsHandler;
