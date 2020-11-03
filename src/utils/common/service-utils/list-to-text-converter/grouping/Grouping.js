import {SystemEventsHandler} from '../../../system-events-handler/SystemEventsHandler';

class Grouping {
  static strategy = {
    NONE: 'NONE',
    SIMPLE: 'SIMPLE',
  };
  static #className = 'Grouping';

  static #groupBy = (objectArray, property) => {
    const reduced = objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    let arr = [];
    for (let [key, value] of Object.entries(reduced)) {
      arr.push(...value);
    }

    return arr;
  };

  static group({productsList, strategyType}) {
    if (!productsList) {
      return [];
    }

    switch (strategyType) {
      case this.strategy.NONE: {
        return [...productsList];
      }

      case this.strategy.SIMPLE: {
        return this.#groupBy(productsList, 'categoryId');
      }

      default: {
        SystemEventsHandler.onError({
          err:
            this.#className +
            '->group()->UNKNOWN_STRATEGY_TYPE: ' +
            strategyType,
        });
        return [...productsList];
      }
    }
  }
}

export default Grouping;
