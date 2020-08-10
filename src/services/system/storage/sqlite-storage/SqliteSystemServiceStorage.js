import SSSInitOperations from './operations/init/SSSInitOperations';
import PreferencesTableOperations from './operations/preferences/PreferencesTableOperations';

const DB_NAME = 'tobuy_system_service.db';

const SQlite = require('react-native-sqlite-storage');

class SqliteSystemServiceStorage {
  static #db;

  static async init() {
    if (!this.#db) {
      this.#db = await SSSInitOperations.init(SQlite, DB_NAME);
    }
  }

  static async getCurrentLanguageCode() {
    return await PreferencesTableOperations.getCurrentLanguageCode({
      db: this.#db,
    });
  }

  static async setCurrentLanguageCode({languageCode}) {
    const {id} = await PreferencesTableOperations.getPreferencesRowId({
      db: this.#db,
    });

    if (!id) {
      await PreferencesTableOperations.setCurrentLanguageCode({
        db: this.#db,
        languageCode,
      });
    } else {
      await PreferencesTableOperations.updateCurrentLanguageCode({
        db: this.#db,
        languageCode,
        rowId: id,
      });
    }
  }
}

export default SqliteSystemServiceStorage;
