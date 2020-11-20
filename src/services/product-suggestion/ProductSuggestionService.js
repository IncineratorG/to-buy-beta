import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import FuseProductsSuggester from './suggester/fuse-suggester/FuseProductsSuggester';
import SqliteProductsSuggesterStorage from './storage/sqlite-storage/SqliteProductsSuggesterStorage';
import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';

class ProductSuggestionService {
  static #notifier = new Notifier();
  static #productsDataStorage = SqliteProductsSuggesterStorage;
  static #suggester = FuseProductsSuggester;

  static subscribe({event, handler}) {
    return ProductSuggestionService.#notifier.subscribe({event, handler});
  }

  static async init() {
    await ProductSuggestionService.#productsDataStorage.init();
    const productsData = await ProductSuggestionService.#productsDataStorage.getProductsData();

    // ===
    // productsData.forEach((productData) => {
    //   SystemEventsHandler.onInfo({info: JSON.stringify(productData)});
    // });
    // ===

    await ProductSuggestionService.#suggester.init({
      productsDataArray: productsData,
    });
  }

  static async updateProductData({name, unitId, categoryId}) {
    const updatedProductData = await ProductSuggestionService.#productsDataStorage.updateProductData(
      {
        name,
        unitId,
        categoryId,
      },
    );
    await ProductSuggestionService.#suggester.updateProductData({
      productData: updatedProductData,
    });
  }

  static async suggest({partialProductName}) {
    return await ProductSuggestionService.#suggester.suggest({
      partialProductName,
    });
  }

  // ===
  static async makeSuggestion({partialProductName, excludedProductNamesSet}) {
    SystemEventsHandler.onInfo({
      info:
        'ProductSuggestionService->makeSuggestion(): ' +
        partialProductName +
        ' - ' +
        excludedProductNamesSet.size,
    });

    return [];
  }
  // ===
}

export default ProductSuggestionService;

// import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
// import FuseProductsSuggester from './suggester/fuse-suggester/FuseProductsSuggester';
// import SqliteProductsSuggesterStorage from './storage/sqlite-storage/SqliteProductsSuggesterStorage';
//
// class ProductSuggestionService {
//   static #productsDataStorage = SqliteProductsSuggesterStorage;
//   static #suggester = FuseProductsSuggester;
//
//   static async init() {
//     await ProductSuggestionService.#productsDataStorage.init();
//     const productsData = await ProductSuggestionService.#productsDataStorage.getProductsData();
//
//     // ===
//     productsData.forEach((productData) => {
//       SystemEventsHandler.onInfo({info: JSON.stringify(productData)});
//     });
//     // ===
//
//     await ProductSuggestionService.#suggester.init({
//       productsDataArray: productsData,
//     });
//   }
//
//   static async updateProductData({name, unitId, categoryId}) {
//     const updatedProductData = await ProductSuggestionService.#productsDataStorage.updateProductData(
//       {
//         name,
//         unitId,
//         categoryId,
//       },
//     );
//     await ProductSuggestionService.#suggester.updateProductData({
//       productData: updatedProductData,
//     });
//   }
//
//   static async suggest({partialProductName}) {
//     return await ProductSuggestionService.#suggester.suggest({
//       partialProductName,
//     });
//   }
//
//   // ===
//   static async makeSuggestion({partialProductName, excludedProductNamesSet}) {
//     SystemEventsHandler.onInfo({
//       info: 'ProductSuggestionService->makeSuggestion()',
//     });
//   }
//   // ===
// }
//
// export default ProductSuggestionService;
