import {SqlStatementExecutor} from '../../../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import {SystemEventsHandler} from '../../../../../../service-utils/system-events-handler/SystemEventsHandler';

export class SPSManager {
  static async runUpgradeScripts({db, scripts}) {
    if (!db) {
      SystemEventsHandler.onError({
        err: 'SPSManager->runUpdateScripts(): BAD_DB',
      });
      return;
    }

    if (!scripts) {
      SystemEventsHandler.onError({
        err: 'SPSManager->runUpdateScripts(): NOTHING_TO_UPDATE',
      });
      return;
    }

    let success = true;
    for (let i = 0; i < scripts.length; ++i) {
      try {
        await SqlStatementExecutor.execute({db, statement: scripts[i]});
      } catch (e) {
        SystemEventsHandler.onError({
          err:
            'SPSManager->runUpdateScripts(): ERROR_EXECUTING_SCRIPT: ' +
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

export default SPSManager;
