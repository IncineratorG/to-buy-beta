import {call, put, takeEvery, takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {
  ADD_CATEGORY,
  LOAD_CATEGORIES,
} from '../../types/categories/categoriesTypes';
import cs_loadCategoriesHandler from './handlers/cs_loadCategoriesHandler';
import cs_addCategoryHandler from './handlers/cs_addCategoryHandler';

function* categoriesSaga() {
  SystemEventsHandler.onInfo({info: 'categoriesSaga()'});

  yield takeLatest(LOAD_CATEGORIES, cs_loadCategoriesHandler);
  yield takeLatest(ADD_CATEGORY, cs_addCategoryHandler);
}

export default categoriesSaga;
