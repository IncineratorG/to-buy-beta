import SPSInitOperations from './operations/init/SPSInitOperations';

const DB_NAME = 'tobuy_products_suggester.db';

const SQlite = require('react-native-sqlite-storage');

class SqliteProductsSuggesterStorage {
  static #db;

  static async init() {
    if (!this.#db) {
      this.#db = await SPSInitOperations.init(SQlite, DB_NAME);
    }
  }
}

export default SqliteProductsSuggesterStorage;
