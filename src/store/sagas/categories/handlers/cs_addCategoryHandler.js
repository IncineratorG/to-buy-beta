import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  addCategoryBeginAction,
  addCategoryErrorAction,
  addCategoryFinishedAction,
} from '../../../actions/categories/categoriesActions';
import Services from '../../../../services/Services';

function* cs_addCategoryHandler(action) {
  const {name, color} = action.payload;

  yield put(addCategoryBeginAction());

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const newCategory = yield call(shoppingListService.addCategory, {
      name,
      color,
    });
    yield put(addCategoryFinishedAction({category: newCategory}));
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'cs_addCategoryHandler()->ERROR: ' + e,
    });

    yield put(addCategoryErrorAction({description: e.toString()}));
  }
}

export default cs_addCategoryHandler;
