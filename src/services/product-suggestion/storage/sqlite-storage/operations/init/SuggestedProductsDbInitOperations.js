import spsDbUpgradeData from './initializer/init-scripts/spsDbUpgrageData';
import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import {SqlGeneralInitManager} from '../../../../../../utils/common/service-utils/sql-general-init-manager/SqlGeneralInitManager';
import {SqlGeneralUpgradeDataParser} from '../../../../../../utils/common/service-utils/sql-general-upgrade-data-parser/SqlGeneralUpgradeDataParser';

class SuggestedProductsDbInitOperations {
  static #initManager = new SqlGeneralInitManager({
    managerName: 'SuggestedProductsDbInitManager',
  });
  static #upgradeDataParser = new SqlGeneralUpgradeDataParser({
    parserName: 'SuggestedProductsDbUpgradeDataParser',
  });

  static async init(sqlite, dbName) {
    const db = sqlite.openDatabase({name: dbName});

    const upgradeData = spsDbUpgradeData;

    const currentDbVersion = await this.#initManager.getVersion(db);
    const actualDbVersion = this.#upgradeDataParser.getActualVersion({
      upgradeData,
    });

    if (currentDbVersion.toString() === actualDbVersion.toString()) {
      SystemEventsHandler.onInfo({
        info: 'SuggestedProductsDbInitOperations->init(): USING_ACTUAL_VERSION',
      });
      return db;
    } else {
      SystemEventsHandler.onInfo({
        info: 'SuggestedProductsInitDbOperations->init(): NEED_UPDATE',
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

export default SuggestedProductsDbInitOperations;
