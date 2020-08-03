import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';
import FuseProductsSuggester from './suggester/fuse-suggester/FuseProductsSuggester';
import SqliteProductsSuggesterStorage from './storage/sqlite-storage/SqliteProductsSuggesterStorage';

class ProductSuggestionService {
  static #productsDataStorage = SqliteProductsSuggesterStorage;
  static #suggester = FuseProductsSuggester;

  static async init() {
    await ProductSuggestionService.#productsDataStorage.init();

    const productsDataArray = [
      {id: 1, productName: 'Hamburger', unitId: 1, categoryId: 1},
      {id: 2, productName: 'Hamster', unitId: 3, categoryId: 5},
    ];

    await ProductSuggestionService.#suggester.init({productsDataArray});
  }

  static async updateProductData({name, productId, unitId, categoryId}) {
    SystemEventsHandler.onInfo({
      info:
        'ProductSuggestionService->updateProductData(): ' +
        name +
        ' - ' +
        unitId +
        ' - ' +
        categoryId,
    });
  }

  static async suggest({partialProductName}) {
    const suggestions = await ProductSuggestionService.#suggester.suggest({
      partialProductName,
    });

    return suggestions;
  }
}

export default ProductSuggestionService;
