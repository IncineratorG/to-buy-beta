import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import {SLCategoriesListChecker} from './handlers/categories-list/SLCategoriesListChecker';

export class ShoppingListServiceReturnedDataChecker {
  #checkers = {};

  types = {
    CATEGORIES_LIST: 'CATEGORIES_LIST',
  };

  constructor() {
    this.#checkers[this.types.CATEGORIES_LIST] = new SLCategoriesListChecker();
  }

  checkAndReturn({check, dataType, data}) {
    if (!check) {
      return data;
    }

    try {
      this.#checkers[dataType].check(data);
    } catch (e) {
      SystemEventsHandler.onError({
        err:
          'ShoppingListServiceReturnedDataChecker->checkAndReturn()->ERROR: ' +
          e.toString(),
      });
    }

    return data;
  }
}
