import {SystemEventsHandler} from '../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import sssDbUpgradeData from './initializer/init-scripts/sssDbUpgradeData';
import {SqlGeneralInitManager} from '../../../../../../utils/common/service-utils/sql-general-init-manager/SqlGeneralInitManager';
import {SqlGeneralUpgradeDataParser} from '../../../../../../utils/common/service-utils/sql-general-upgrade-data-parser/SqlGeneralUpgradeDataParser';

class SystemDbInitOperations {
  static #initManager = new SqlGeneralInitManager({
    managerName: 'SystemDbInitManager',
  });
  static #upgradeDataParser = new SqlGeneralUpgradeDataParser({
    parserName: 'SystemDbUpgradeDataParser',
  });

  static async init(sqlite, dbName) {
    const db = sqlite.openDatabase({name: dbName});

    const upgradeData = sssDbUpgradeData;

    const currentDbVersion = await this.#initManager.getVersion(db);
    const actualDbVersion = this.#upgradeDataParser.getActualVersion({
      upgradeData,
    });

    if (currentDbVersion.toString() === actualDbVersion.toString()) {
      SystemEventsHandler.onInfo({
        info: 'SystemDbInitOperations->init(): USING_ACTUAL_VERSION',
      });
      return db;
    } else {
      SystemEventsHandler.onInfo({
        info: 'SystemDbInitOperations->init(): NEED_UPDATE',
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

export default SystemDbInitOperations;
