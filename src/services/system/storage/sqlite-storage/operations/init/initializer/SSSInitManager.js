import {SystemEventsHandler} from '../../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {SqlStatementExecutor} from '../../../../../../../utils/common/service-utils/sql-statement-executor/SqlStatementExecutor';

export class SSSInitManager {
  static async runUpgradeScripts({db, scripts}) {
    if (!db) {
      SystemEventsHandler.onError({
        err: 'SSSInitManager->runUpdateScripts(): BAD_DB',
      });
      return false;
    }

    if (!scripts) {
      SystemEventsHandler.onError({
        err: 'SSSInitManager->runUpdateScripts(): NOTHING_TO_UPDATE',
      });
      return false;
    }

    let success = true;
    for (let i = 0; i < scripts.length; ++i) {
      try {
        await SqlStatementExecutor.execute({db, statement: scripts[i]});
      } catch (e) {
        SystemEventsHandler.onError({
          err:
            'SSSInitManager->runUpdateScripts(): ERROR_EXECUTING_SCRIPT: ' +
            scripts[i],
        });
        success = false;
      }
    }

    return success;
  }

  static async getVersion(db) {
    const getVersionStatement = 'PRAGMA user_version';

    const result = await SqlStatementExecutor.execute({
      db,
      statement: getVersionStatement,
    });

    let version = 0;
    if (result.rows.length && result.rows.item(0).user_version) {
      version = result.rows.item(0).user_version;
    }

    return version;
  }

  static async setVersion({db, version}) {
    const setVersionStatement = 'PRAGMA user_version = ' + version;
    await SqlStatementExecutor.execute({db, statement: setVersionStatement});
  }
}

export default SSSInitManager;
