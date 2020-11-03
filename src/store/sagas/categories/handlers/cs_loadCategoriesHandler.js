import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  loadCategoriesBeginAction,
  loadCategoriesErrorAction,
  loadCategoriesFinishedAction,
} from '../../../actions/categories/categoriesActions';
import Services from '../../../../services/Services';

function* cs_loadCategoriesHandler(action) {
  const {shoppingListId} = action.payload;

  yield put(loadCategoriesBeginAction({shoppingListId}));

  SystemEventsHandler.onInfo({
    info: 'cs_loadCategoriesHandler()',
  });

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const categories = yield call(shoppingListService.getCategories, {
      shoppingListId,
    });
    yield put(loadCategoriesFinishedAction({shoppingListId, categories}));
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'cs_loadCategoriesHandler()->ERROR: ' + e,
    });

    yield put(
      loadCategoriesErrorAction({shoppingListId, description: e.toString()}),
    );
  }
}

export default cs_loadCategoriesHandler;
