import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';
import Grouping from './grouping/Grouping';
import ProductStatus from '../../shopping-list/data/product-status/ProductStatus';
import ListStringBuilder from './list-string-builder/ListStringBuilder';

class ListToTextConverter {
  static #className = 'ListToTextConverter';

  static async convert({productsList, listName, categoriesMap, unitsMap}) {
    const notCompletedProducts = productsList.filter(
      (p) => p.completionStatus !== ProductStatus.COMPLETED,
    );
    if (notCompletedProducts.length <= 0) {
      return '';
    }

    const productsListCategories = new Set();
    notCompletedProducts.forEach((p) => {
      productsListCategories.add(p.categoryId);
    });

    const groupedProductsList = Grouping.group({
      productsList: notCompletedProducts,
      strategyType:
        productsListCategories.size > 1
          ? Grouping.strategy.SIMPLE
          : Grouping.strategy.NONE,
    });

    const listTextForm = ListStringBuilder.build({
      productsList: groupedProductsList,
      categories: categoriesMap,
      units: unitsMap,
      strategyType: ListStringBuilder.strategy.GROUP_CATEGORIES,
    });

    return listName + '\n\n' + listTextForm;
  }
}

export default ListToTextConverter;
