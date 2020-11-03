import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';
import {SqlStatementExecutor} from '../sql-statement-executor/SqlStatementExecutor';

export class SqlGeneralInitManager {
  #managerName;

  constructor({managerName}) {
    this.#managerName = managerName;
  }

  async runUpgradeScripts({db, scripts}) {
    if (!db) {
      SystemEventsHandler.onError({
        err: this.#managerName + '->runUpdateScripts(): BAD_DB',
      });
      return;
    }

    if (!scripts) {
      SystemEventsHandler.onError({
        err: this.#managerName + '->runUpdateScripts(): NOTHING_TO_UPDATE',
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
            this.#managerName +
            '->runUpdateScripts(): ERROR_EXECUTING_SCRIPT: ' +
            scripts[i],
        });
        success = false;
      }
    }

    return success;
  }

  async getVersion(db) {
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

  async setVersion({db, version}) {
    const setVersionStatement = 'PRAGMA user_version = ' + version;
    await SqlStatementExecutor.execute({db, statement: setVersionStatement});
  }
}
