import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

export class Checker {
  #validator = {};

  constructor(validator) {
    this.#validator = validator;
  }

  async call(method, params) {
    const methodResult = await method(params);

    const resultValidator = this.#validator[method.name];
    if (resultValidator) {
      resultValidator(methodResult);
    }

    return methodResult;
  }
}
