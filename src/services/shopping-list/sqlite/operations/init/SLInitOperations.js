import {SLInitManager} from './initializer/SLInitManager';
import dbUpgradeData from './initializer/init-scripts/dbUpgradeData';
import {DbUpgradeDataParser} from './initializer/init-scripts/DbUpgradeDataParser';
import {SystemEventsHandler} from '../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

export class SLInitOperations {
  static async init(sqlite, dbName) {
    const db = sqlite.openDatabase({name: dbName});

    const upgradeData = dbUpgradeData;

    const currentDbVersion = await SLInitManager.getVersion(db);
    const actualDbVersion = DbUpgradeDataParser.getActualVersion({upgradeData});

    if (currentDbVersion.toString() === actualDbVersion.toString()) {
      SystemEventsHandler.onInfo({
        info: 'SLInitOperations->init(): USING_ACTUAL_VERSION',
      });
      return db;
    } else {
      SystemEventsHandler.onInfo({
        info: 'SLInitOperations->init(): NEED_UPDATE',
      });
    }

    const upgradeScripts = DbUpgradeDataParser.getUpgradeScripts({
      currentVersion: currentDbVersion,
      targetVersion: actualDbVersion,
      upgradeData,
    });

    const success = await SLInitManager.runUpgradeScripts({
      db,
      scripts: upgradeScripts,
    });
    if (success) {
      await SLInitManager.setVersion({db, version: actualDbVersion});
    }

    return db;
  }
}
