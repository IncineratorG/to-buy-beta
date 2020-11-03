import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  updateCategoryBeginAction,
  updateCategoryErrorAction,
  updateCategoryFinishedAction,
} from '../../../actions/categories/categoriesActions';
import Services from '../../../../services/Services';

function* cs_updateCategoryHandler(action) {
  const {id, name, color} = action.payload;

  yield put(updateCategoryBeginAction({id}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const updatedCategory = yield call(shoppingListService.updateCategory, {
      id,
      name,
      color,
    });

    if (updatedCategory.id) {
      yield put(updateCategoryFinishedAction({category: updatedCategory}));
    } else {
      yield put(
        updateCategoryErrorAction({id, description: 'ERROR_UPDATING_CATEGORY'}),
      );
    }
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'cs_updateCategoryHandler()->ERROR: ' + e,
    });

    yield put(updateCategoryErrorAction({id, description: e.toString()}));
  }
}

export default cs_updateCategoryHandler;
