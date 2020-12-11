import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';

export class ObjectsValidator {
  #methodsResultsValidator = {};

  constructor(resultsValidator) {
    this.#methodsResultsValidator = resultsValidator;
  }

  async validateMethod(method, params) {
    SystemEventsHandler.onInfo({
      info: 'ObjectsValidator->validateMethod(): ' + method.name,
    });

    let methodResult = {};
    try {
      methodResult = await method(params);
    } catch (e) {
      SystemEventsHandler.onInfo({
        info: 'validateMethod() -> MY_ERROR: ' + e.toString(),
      });
    }

    const resultValidator = this.#methodsResultsValidator[method.name];
    if (resultValidator) {
      resultValidator(methodResult);
    }

    return methodResult;
  }
}
