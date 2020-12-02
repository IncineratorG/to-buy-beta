import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import {ServiceReturnedDataChecker} from '../../../../../../utils/common/service-utils/data-checker/returned-data/ServiceReturnedDataChecker';

export class SLCategoriesListChecker extends ServiceReturnedDataChecker {
  #className = 'SLCategoriesListChecker';
  #properties = [
    'id',
    'name',
    'color',
    'editable',
    'deleted',
    'createTimestamp',
    'updateTimestamp',
  ];

  check(data) {
    const marker = this.#className + '->check(): ';

    if (!data.length) {
      SystemEventsHandler.onError({err: marker + 'BAD_LIST_LENGTH'});
      return data;
    }

    data.forEach((category) => {
      const categoryProperties = Object.keys(category);

      this.#properties.forEach((property) => {
        // if (!category.hasOwnProperty(property)) {
        //   SystemEventsHandler.onError({
        //     err:
        //       marker +
        //       'NO_PROPERTY ' +
        //       property +
        //       ' IN_CATEGORY: ' +
        //       JSON.stringify(category),
        //   });
        // }
      });
    });

    return data;
  }
}
