import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* aws_updateProductHandler(action) {
  const {payload} = action;

  SystemEventsHandler.onInfo({
    info: 'aws_updateProductHandler(): ' + JSON.stringify(payload),
  });
}

export default aws_updateProductHandler;
