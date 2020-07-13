import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  updateUnitBeginAction,
  updateUnitErrorAction,
  updateUnitFinishedAction,
} from '../../../actions/units/unitsActions';

function* us_updateUnitHandler(action) {
  const {id, name} = action.payload;

  yield put(updateUnitBeginAction({id}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const unit = yield call(shoppingListService.updateUnit, {id, name});
    if (unit.id) {
      yield put(updateUnitFinishedAction({unit}));
    } else {
      yield put(
        updateUnitErrorAction(id, {
          description: 'ERROR_UPDATING_UNIT: ' + name,
        }),
      );
    }
  } catch (e) {
    SystemEventsHandler.onError({err: 'us_updateUnitHandler()->ERROR: ' + e});
    yield put(updateUnitErrorAction({id, description: e.toString()}));
  }
}

export default us_updateUnitHandler;
