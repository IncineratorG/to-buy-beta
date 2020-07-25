import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';

class ListStringBuilder {
  static strategy = {
    SIMPLE: 'SIMPLE',
    GROUP_CATEGORIES: 'GROUP_CATEGORIES',
  };
  static #className = 'ListStringBuilder';

  static #simpleListBuilder = ({productsList, categories, units}) => {
    let productsStringsArr = [];
    let counter = 1;

    productsList.forEach((p) => {
      const productName = p.name;
      const category = categories.get(p.categoryId).name;
      const quantity = p.quantity;
      const unit = units.get(p.unitId).name;
      const note = p.note;

      const noteString = note ? '(' + note + ')' : '';

      const productDescription =
        counter.toString() +
        '. ' +
        category +
        ' - ' +
        productName +
        ' ' +
        quantity.toString() +
        ' ' +
        unit +
        ' ' +
        noteString;

      productsStringsArr.push(productDescription + '\n');

      ++counter;
    });

    return productsStringsArr.join('');
  };

  static #groupCategoriesListBuilder = ({productsList, categories, units}) => {
    const productsStringsArr = [];
    let previousCategoryId = -1;

    productsList.forEach((p) => {
      const productName = p.name;
      const category = categories.get(p.categoryId).name;
      const quantity = p.quantity;
      const unit = units.get(p.unitId).name;
      const note = p.note;

      const noteString = note ? '(' + note + ')' : '';

      let productDescription = '';

      if (previousCategoryId === p.categoryId) {
        productDescription =
          ' - ' +
          productName +
          ' ' +
          quantity.toString() +
          ' ' +
          unit +
          ' ' +
          noteString;
      } else {
        let newLineSymbol = '';
        if (previousCategoryId !== -1) {
          newLineSymbol = '\n';
        }

        productDescription =
          newLineSymbol +
          category +
          '\n' +
          ' - ' +
          productName +
          ' ' +
          quantity.toString() +
          ' ' +
          unit +
          ' ' +
          noteString;
      }

      previousCategoryId = p.categoryId;

      productsStringsArr.push(productDescription + '\n');
    });

    return productsStringsArr.join('');
  };

  static build({productsList, categories, units, strategyType}) {
    switch (strategyType) {
      case this.strategy.SIMPLE: {
        return this.#simpleListBuilder({productsList, categories, units});
      }

      case this.strategy.GROUP_CATEGORIES: {
        return this.#groupCategoriesListBuilder({
          productsList,
          categories,
          units,
        });
      }

      default: {
        SystemEventsHandler.onError({
          err:
            this.#className +
            '->build()->UNKNOWN_STRATEGY_TYPE: ' +
            strategyType,
        });
        return '';
      }
    }
  }
}

export default ListStringBuilder;
