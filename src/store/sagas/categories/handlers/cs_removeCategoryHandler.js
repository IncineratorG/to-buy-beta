import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {
  removeCategoryBeginAction,
  removeCategoryErrorAction,
  removeCategoryFinishedAction,
} from '../../../actions/categories/categoriesActions';
import Services from '../../../../services/Services';

function* cs_removeCategoryHandler(action) {
  const {id} = action.payload;

  yield put(removeCategoryBeginAction({id}));

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const removedCategory = yield call(shoppingListService.removeCategory, {
      id,
    });
    if (removedCategory.id) {
      yield put(removeCategoryFinishedAction({category: removedCategory}));
    } else {
      yield put(
        removeCategoryErrorAction({
          id,
          description: 'ERROR_REMOVING_CATEGORY_WITH_ID: ' + id,
        }),
      );
    }
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'cs_removeCategoryHandler()->ERROR: ' + e,
    });

    yield put(removeCategoryErrorAction({id, description: e.toString()}));
  }
}

export default cs_removeCategoryHandler;
