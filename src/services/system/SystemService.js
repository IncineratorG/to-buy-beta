import SqliteSystemServiceStorage from './storage/sqlite-storage/SqliteSystemServiceStorage';

class SystemService {
  static #storage = SqliteSystemServiceStorage;

  static async init() {
    await SystemService.#storage.init();
  }
}

export default SystemService;
