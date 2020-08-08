import SSSInitOperations from './operations/init/SSSInitOperations';

const DB_NAME = 'tobuy_system_service.db';

const SQlite = require('react-native-sqlite-storage');

class SqliteSystemServiceStorage {
  static #db;

  static async init() {
    if (!this.#db) {
      this.#db = await SSSInitOperations.init(SQlite, DB_NAME);
    }
  }
}

export default SqliteSystemServiceStorage;
