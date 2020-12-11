import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const TestValidator = {
  prop: 'PROP',

  func: (data) => {
    SystemEventsHandler.onInfo({
      info: 'TestValidator->func(): ' + JSON.stringify(data),
    });
  },

  func_2: (data) => {
    SystemEventsHandler.onInfo({
      info: 'TestValidator->func_2(): ' + JSON.stringify(data),
    });
  },
};

export default TestValidator;
