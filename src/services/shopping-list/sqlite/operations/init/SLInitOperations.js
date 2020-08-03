import {SLManager} from './initializer/SLManager';
import dbUpgradeData from './initializer/init-scripts/dbUpgradeData';
import {DbUpgradeDataParser} from './initializer/init-scripts/DbUpgradeDataParser';
import {SystemEventsHandler} from '../../../../service-utils/system-events-handler/SystemEventsHandler';

export class SLInitOperations {
  static async init(sqlite, dbName) {
    const db = sqlite.openDatabase({name: dbName});

    const upgradeData = dbUpgradeData;

    const currentDbVersion = await SLManager.getVersion(db);
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

    const success = await SLManager.runUpgradeScripts({
      db,
      scripts: upgradeScripts,
    });
    if (success) {
      await SLManager.setVersion({db, version: actualDbVersion});
    }

    return db;
  }
}
