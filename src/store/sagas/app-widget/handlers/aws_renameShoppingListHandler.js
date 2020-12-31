import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* aws_renameShoppingListHandler(action) {
  const {payload} = action;

  SystemEventsHandler.onInfo({
    info: 'aws_renameShoppingListHandler(): ' + JSON.stringify(payload),
  });
}

export default aws_renameShoppingListHandler;
