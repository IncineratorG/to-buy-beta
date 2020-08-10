import {SystemEventsHandler} from '../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import sssDbUpgradeData from './initializer/init-scripts/sssDbUpgradeData';
import SSSInitManager from './initializer/SSSInitManager';
import SSSDbUpgradeDataParser from './initializer/init-scripts/SSSDbUpgradeDataParser';

class SSSInitOperations {
  static async init(sqlite, dbName) {
    const db = sqlite.openDatabase({name: dbName});

    const upgradeData = sssDbUpgradeData;

    const currentDbVersion = await SSSInitManager.getVersion(db);
    const actualDbVersion = SSSDbUpgradeDataParser.getActualVersion({
      upgradeData,
    });

    if (currentDbVersion.toString() === actualDbVersion.toString()) {
      SystemEventsHandler.onInfo({
        info: 'SSSInitOperations->init(): USING_ACTUAL_VERSION',
      });
      return db;
    } else {
      SystemEventsHandler.onInfo({
        info: 'SSSInitOperations->init(): NEED_UPDATE',
      });
    }

    const upgradeScripts = SSSDbUpgradeDataParser.getUpgradeScripts({
      currentVersion: currentDbVersion,
      targetVersion: actualDbVersion,
      upgradeData,
    });

    const success = await SSSInitManager.runUpgradeScripts({
      db,
      scripts: upgradeScripts,
    });
    if (success) {
      await SSSInitManager.setVersion({db, version: actualDbVersion});
    }

    return db;
  }
}

export default SSSInitOperations;
