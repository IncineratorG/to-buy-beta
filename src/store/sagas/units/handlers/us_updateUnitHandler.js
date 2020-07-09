import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* us_updateUnitHandler(action) {
  const {id, name} = action.payload;

  // const {name} = action.payload;
  //
  // yield put(addUnitBeginAction());
  //
  // try {
  //   const shoppingListService = Services.get(
  //     Services.serviceTypes.SHOPPING_LIST,
  //   );
  //
  //   const unit = yield call(shoppingListService.addUnit, {name});
  //   if (unit.id) {
  //     yield put(addUnitFinishedAction({unit}));
  //   } else {
  //     yield put(
  //       addUnitErrorAction({description: 'ERROR_ADDING_UNIT: ' + name}),
  //     );
  //   }
  // } catch (e) {
  //   SystemEventsHandler.onError({err: 'us_addUnitHandler()->ERROR: ' + e});
  //
  //   yield put(addUnitErrorAction({description: e.toString()}));
  // }
}

export default us_updateUnitHandler;
