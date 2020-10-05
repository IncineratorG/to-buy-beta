import SuggestedProductsDbInitOperations from './operations/init/SuggestedProductsDbInitOperations';
import SuggestedProductsTableOperations from './operations/suggested-products-table/SuggestedProductsTableOperations';

const DB_NAME = 'tobuy_products_suggester.db';

const SQlite = require('react-native-sqlite-storage');

class SqliteProductsSuggesterStorage {
  static #db;
  static #productsDataCache = new Map();

  static async init() {
    if (!this.#db) {
      this.#db = await SuggestedProductsDbInitOperations.init(SQlite, DB_NAME);
    }
    this.#productsDataCache.clear();

    const productsDataCount = await SuggestedProductsTableOperations.getProductsDataCount(
      {db: this.#db},
    );

    if (productsDataCount > 0 && productsDataCount / 100 === 0) {
      await SuggestedProductsTableOperations.removeUnusedRecords({
        db: this.#db,
      });
    }
  }

  static async getProductsData() {
    const {
      productsData,
    } = await SuggestedProductsTableOperations.getProductsData({
      db: this.#db,
    });

    productsData.forEach((productData) => {
      this.#productsDataCache.set(
        productData.productName.toLowerCase(),
        productData,
      );
    });

    return productsData;
  }

  static async updateProductData({name, unitId, categoryId}) {
    const nameLowerCase = name.toLowerCase();
    let updatedProductDataId;

    if (this.#productsDataCache.has(nameLowerCase)) {
      const productData = this.#productsDataCache.get(nameLowerCase);

      const {
        hasError: hasUpdateError,
      } = await SuggestedProductsTableOperations.updateProductData({
        db: this.#db,
        id: productData.id,
        name,
        unitId,
        categoryId,
        usageCount: productData.usageCount + 1,
      });

      updatedProductDataId = productData.id;
    } else {
      const {
        id: addedProductDataId,
      } = await SuggestedProductsTableOperations.addProductData({
        db: this.#db,
        name,
        unitId,
        categoryId,
      });

      updatedProductDataId = addedProductDataId;
    }

    if (!updatedProductDataId) {
      return undefined;
    }

    const {productData} = await SuggestedProductsTableOperations.getProductData(
      {
        db: this.#db,
        id: updatedProductDataId,
      },
    );

    if (productData) {
      this.#productsDataCache.set(
        productData.productName.toLowerCase(),
        productData,
      );
    }

    return productData;
  }
}

export default SqliteProductsSuggesterStorage;
