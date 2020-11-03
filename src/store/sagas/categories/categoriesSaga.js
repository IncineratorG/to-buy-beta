import {call, put, takeEvery, takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {
  ADD_CATEGORY,
  LOAD_CATEGORIES,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from '../../types/categories/categoriesTypes';
import cs_loadCategoriesHandler from './handlers/cs_loadCategoriesHandler';
import cs_addCategoryHandler from './handlers/cs_addCategoryHandler';
import cs_updateCategoryHandler from './handlers/cs_updateCategoryHandler';
import cs_removeCategoryHandler from './handlers/cs_removeCategoryHandler';

function* categoriesSaga() {
  SystemEventsHandler.onInfo({info: 'categoriesSaga()'});

  yield takeLatest(LOAD_CATEGORIES, cs_loadCategoriesHandler);
  yield takeLatest(ADD_CATEGORY, cs_addCategoryHandler);
  yield takeLatest(UPDATE_CATEGORY, cs_updateCategoryHandler);
  yield takeLatest(REMOVE_CATEGORY, cs_removeCategoryHandler);
}

export default categoriesSaga;
