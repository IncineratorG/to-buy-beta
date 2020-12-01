import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';

export class SLCategoriesListChecker {
  check(categoriesList) {
    SystemEventsHandler.onInfo({
      info: 'SLCategoriesListChecker->check(): ' + categoriesList.length,
    });
  }
}
