import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

export class TestClass {
  func() {
    SystemEventsHandler.onInfo({info: 'TestClass->func()'});

    return {
      a: '1',
      b: '2',
    };
  }

  func_2({a, b}) {
    SystemEventsHandler.onInfo({info: 'TestClass->func_2(): ' + a + ' - ' + b});

    return {
      a: '1',
      b: '2',
    };
  }

  async func_3() {
    SystemEventsHandler.onInfo({info: 'TestClass->func_3()'});

    return {asyncResult: 'AS_RES'};
  }
}
