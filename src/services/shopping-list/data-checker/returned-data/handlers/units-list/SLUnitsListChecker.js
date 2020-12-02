import {ServiceReturnedDataChecker} from '../../../../../../utils/common/service-utils/data-checker/returned-data/ServiceReturnedDataChecker';
import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';

export class SLUnitsListChecker extends ServiceReturnedDataChecker {
  #className = 'SLUnitsListChecker';
  #properties = [
    'id',
    'name',
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

    const objectProps = ['1', '2', '3'];
    const props = ['1', '2', '3'];

    const objectPropsSet = new Set(objectProps);
    const propsSet = new Set(props);

    // if (objectProps.length === props.length) {
    //   const difference = [...new Set(objectProps.fil)]
    // }

    // const objectPropsSet = new Set(objectProps);
    // const propsSet = new Set(props);

    // const arr1 = ['1', '2', '3'];
    // const arr2 = ['1', '2', '3', '4'];
    //
    // const set1 = new Set(arr1);
    // const set2 = new Set(arr2);
    //
    // const intersection = new Set([...set2].filter((i) => set1.has(i)));
    // const difference = new Set([...set2].filter((i) => !set1.has(i)));
    //
    // SystemEventsHandler.onInfo({info: JSON.stringify([...difference])});
    // SystemEventsHandler.onInfo({info: JSON.stringify([...intersection])});

    // const firstUnit = data[0];
    // const unitKeys = Object.keys(firstUnit);
    // SystemEventsHandler.onInfo({info: JSON.stringify(unitKeys)});

    return data;
  }
}
