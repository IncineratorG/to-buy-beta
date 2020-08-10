import {SystemEventsHandler} from '../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

export class UnitsTableInitialDataParser {
  static getInitialUnits({initialData}) {
    if (!initialData) {
      SystemEventsHandler.onError({
        err: 'UnitsTableInitialDataParser->getInitialUnits(): BAD_INITIAL_DATA',
      });
      // console.log(
      //   'UnitsTableInitialDataParser->getInitialUnits(): BAD_INITIAL_DATA',
      // );
      return [];
    }

    if (!initialData.units) {
      SystemEventsHandler.onError({
        err: 'UnitsTableInitialDataParser->getInitialUnits(): NO_INITIAL_UNITS',
      });
      // console.log(
      //   'UnitsTableInitialDataParser->getInitialUnits(): NO_INITIAL_UNITS',
      // );
      return [];
    }

    return initialData.units;
  }
}
