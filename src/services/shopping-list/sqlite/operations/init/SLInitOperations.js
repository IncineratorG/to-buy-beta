import dbUpgradeData from './initializer/init-scripts/dbUpgradeData';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
import {SqlGeneralInitManager} from '../../../../../utils/common/service-utils/sql-general-init-manager/SqlGeneralInitManager';
import {SqlGeneralUpgradeDataParser} from '../../../../../utils/common/service-utils/sql-general-upgrade-data-parser/SqlGeneralUpgradeDataParser';

export class SLInitOperations {
  static #initManager = new SqlGeneralInitManager({
    managerName: 'ShoppingListDbInitManager',
  });
  static #upgradeDataParser = new SqlGeneralUpgradeDataParser({
    parserName: 'ShoppingListDbUpgradeDataParser',
  });

  static async init(sqlite, dbName) {
    const db = sqlite.openDatabase({name: dbName});

    const upgradeData = dbUpgradeData;

    const currentDbVersion = await this.#initManager.getVersion(db);
    const actualDbVersion = this.#upgradeDataParser.getActualVersion({
      upgradeData,
    });

    if (currentDbVersion.toString() === actualDbVersion.toString()) {
      SystemEventsHandler.onInfo({
        info: 'ShoppingListDbInitOperations->init(): USING_ACTUAL_VERSION',
      });
      return db;
    } else {
      SystemEventsHandler.onInfo({
        info: 'ShoppingListDbInitOperations->init(): NEED_UPDATE',
      });
    }

    const upgradeScripts = this.#upgradeDataParser.getUpgradeScripts({
      currentVersion: currentDbVersion,
      targetVersion: actualDbVersion,
      upgradeData,
    });

    const success = await this.#initManager.runUpgradeScripts({
      db,
      scripts: upgradeScripts,
    });
    if (success) {
      await this.#initManager.setVersion({db, version: actualDbVersion});
    }

    return db;
  }
}
