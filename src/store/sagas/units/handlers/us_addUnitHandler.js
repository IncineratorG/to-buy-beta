import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  addUnitBeginAction,
  addUnitErrorAction,
  addUnitFinishedAction,
} from '../../../actions/units/unitsActions';

function* us_addUnitHandler(action) {
  const {name} = action.payload;

  yield put(addUnitBeginAction());

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const unit = yield call(shoppingListService.addUnit, {name});
    if (unit.id) {
      yield put(addUnitFinishedAction({unit}));
    } else {
      yield put(
        addUnitErrorAction({description: 'ERROR_ADDING_UNIT: ' + name}),
      );
    }
  } catch (e) {
    SystemEventsHandler.onError({err: 'us_addUnitHandler()->ERROR: ' + e});

    yield put(addUnitErrorAction({description: e.toString()}));
  }
}

export default us_addUnitHandler;
