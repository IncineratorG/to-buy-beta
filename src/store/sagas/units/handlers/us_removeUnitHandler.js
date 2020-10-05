import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  removeUnitBeginAction,
  removeUnitErrorAction,
  removeUnitFinishedAction,
} from '../../../actions/units/unitsActions';

function* us_removeUnitHandler(action) {
  const {id} = action.payload;

  yield put(removeUnitBeginAction({id}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const unit = yield call(shoppingListService.removeUnit, {id});
    if (unit.id) {
      yield put(removeUnitFinishedAction({unit}));
    } else {
      yield put(
        removeUnitErrorAction(id, {
          description: 'ERROR_REMOVING_UNIT: ' + id,
        }),
      );
    }
  } catch (e) {
    SystemEventsHandler.onError({err: 'us_removeUnitHandler()->ERROR: ' + e});
    yield put(removeUnitErrorAction({id, description: e.toString()}));
  }

  // const {id, name} = action.payload;
  //
  // yield put(updateUnitBeginAction({id}));
  //
  // try {
  //   const shoppingListService = Services.get(
  //     Services.serviceTypes.SHOPPING_LIST,
  //   );
  //
  //   const unit = yield call(shoppingListService.updateUnit, {id, name});
  //   if (unit.id) {
  //     yield put(updateUnitFinishedAction({unit}));
  //   } else {
  //     yield put(
  //       updateUnitErrorAction(id, {
  //         description: 'ERROR_UPDATING_UNIT: ' + name,
  //       }),
  //     );
  //   }
  // } catch (e) {
  //   SystemEventsHandler.onError({err: 'us_updateUnitHandler()->ERROR: ' + e});
  //   yield put(updateUnitErrorAction({id, description: e.toString()}));
  // }
}

export default us_removeUnitHandler;
