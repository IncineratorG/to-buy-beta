import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';

class ProductSuggestionService {
  static #productsDataStorage;
  static #suggester;

  static async init() {}

  static async updateProductData({}) {}

  static async suggest({partialProductName}) {
    // SystemEventsHandler.onInfo({info: partialProductName});

    let suggestions = [];
    if (partialProductName) {
      suggestions = [
        {id: 1, productName: 'Hamburger', unitId: 1, categoryId: 1},
        {id: 2, productName: 'Hamster', unitId: 3, categoryId: 5},
      ];
    }

    return suggestions;
  }
}

export default ProductSuggestionService;
