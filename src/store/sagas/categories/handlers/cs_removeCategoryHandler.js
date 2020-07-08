import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  removeCategoryBeginAction,
  updateCategoryBeginAction,
  updateCategoryErrorAction,
  updateCategoryFinishedAction,
} from '../../../actions/categories/categoriesActions';
import Services from '../../../../services/Services';

function* cs_removeCategoryHandler(action) {
  const {id} = action.payload;

  yield put(removeCategoryBeginAction({id}));

  // try {
  //   const shoppingListService = Services.get(
  //     Services.serviceTypes.SHOPPING_LIST,
  //   );
  //
  //   const updatedCategory = yield call(shoppingListService.updateCategory, {
  //     id,
  //     name,
  //     color,
  //   });
  //
  //   if (updatedCategory.id) {
  //     yield put(updateCategoryFinishedAction({category: updatedCategory}));
  //   } else {
  //     yield put(
  //       updateCategoryErrorAction({id, description: 'ERROR_UPDATING_CATEGORY'}),
  //     );
  //   }
  // } catch (e) {
  //   SystemEventsHandler.onError({
  //     err: 'cs_removeCategoryHandler()->ERROR: ' + e,
  //   });
  //
  //   yield put(updateCategoryErrorAction({id, description: e.toString()}));
  // }
}

export default cs_removeCategoryHandler;
