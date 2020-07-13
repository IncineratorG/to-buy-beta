import {SystemEventsHandler} from '../../../../../service-utils/system-events-handler/SystemEventsHandler';

export class CategoriesTableInitialDataParser {
  static getInitialCategories({initialData}) {
    if (!initialData) {
      SystemEventsHandler.onError({
        err:
          'CategoriesTableInitialDataParser->getInitialCategories(): BAD_INITIAL_DATA',
      });
      return [];
    }

    if (!initialData.categories) {
      SystemEventsHandler.onError({
        err:
          'CategoriesTableInitialDataParser->getInitialCategories(): NO_INITIAL_CATEGORIES',
      });
      return [];
    }

    return initialData.categories;
  }
}
