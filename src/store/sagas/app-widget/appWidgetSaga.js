import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {SET_WIDGET_SHOPPING_LIST} from '../../types/app-widget/appWidgetTypes';
import aws_setWidgetShoppingListHandler from './handlers/aws_setWidgetShoppingListHandler';

function* appWidgetSaga() {
  SystemEventsHandler.onInfo({info: 'appWidgetSaga()'});

  yield takeLatest(SET_WIDGET_SHOPPING_LIST, aws_setWidgetShoppingListHandler);
}

export default appWidgetSaga;
