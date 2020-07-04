import {call, put, takeEvery, takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {LOAD_CATEGORIES} from '../../types/categories/categoriesTypes';
import cs_loadCategoriesHandler from './handlers/cs_loadCategoriesHandler';

function* categoriesSaga() {
  SystemEventsHandler.onInfo({info: 'categoriesSaga()'});

  yield takeLatest(LOAD_CATEGORIES, cs_loadCategoriesHandler);
}

export default categoriesSaga;
