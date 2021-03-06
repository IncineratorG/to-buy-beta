import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
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

    if (newCategory.id) {
      yield put(addCategoryFinishedAction({category: newCategory}));
    } else {
      yield put(
        addCategoryErrorAction({description: 'ERROR_CREATING_CATEGORY'}),
      );
    }
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'cs_addCategoryHandler()->ERROR: ' + e,
    });

    yield put(addCategoryErrorAction({description: e.toString()}));
  }
}

export default cs_addCategoryHandler;
