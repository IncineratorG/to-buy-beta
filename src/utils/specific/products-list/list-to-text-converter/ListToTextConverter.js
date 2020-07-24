import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import wait from '../../../../services/service-utils/wait/wait';

class ListToTextConverter {
  static #className = 'ListToTextConverter';

  static async convert({productsList, listName, categoriesMap, unitsMap}) {
    SystemEventsHandler.onInfo({
      info: ListToTextConverter.#className + '->convert(): BEGIN',
    });

    await wait(500);

    SystemEventsHandler.onInfo({
      info: ListToTextConverter.#className + '->convert(): END',
    });
  }
}

export default ListToTextConverter;
