import spsDbUpgradeData from './initializer/init-scripts/spsDbUpgrageData';
import SPSInitManager from './initializer/SPSInitManager';
import SPSDbUpgradeDataParser from './initializer/init-scripts/SPSDbUpgradeDataParser';
import {SystemEventsHandler} from '../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

class SPSInitOperations {
  static async init(sqlite, dbName) {
    const db = sqlite.openDatabase({name: dbName});

    const upgradeData = spsDbUpgradeData;

    const currentDbVersion = await SPSInitManager.getVersion(db);
    const actualDbVersion = SPSDbUpgradeDataParser.getActualVersion({
      upgradeData,
    });

    if (currentDbVersion.toString() === actualDbVersion.toString()) {
      SystemEventsHandler.onInfo({
        info: 'SPSInitOperations->init(): USING_ACTUAL_VERSION',
      });
      return db;
    } else {
      SystemEventsHandler.onInfo({
        info: 'SPSInitOperations->init(): NEED_UPDATE',
      });
    }

    const upgradeScripts = SPSDbUpgradeDataParser.getUpgradeScripts({
      currentVersion: currentDbVersion,
      targetVersion: actualDbVersion,
      upgradeData,
    });

    const success = await SPSInitManager.runUpgradeScripts({
      db,
      scripts: upgradeScripts,
    });
    if (success) {
      await SPSInitManager.setVersion({db, version: actualDbVersion});
    }

    return db;
  }
}

export default SPSInitOperations;
