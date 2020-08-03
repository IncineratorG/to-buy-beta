import {SqlStatementExecutor} from '../../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import {SystemEventsHandler} from '../../../../../service-utils/system-events-handler/SystemEventsHandler';

export class SLManager {
  static async runUpgradeScripts({db, scripts}) {
    if (!db) {
      SystemEventsHandler.onError({
        err: 'SLManager->runUpdateScripts(): BAD_DB',
      });
      return;
    }

    if (!scripts) {
      SystemEventsHandler.onError({
        err: 'SLManager->runUpdateScripts(): NOTHING_TO_UPDATE',
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
            'SLManager->runUpdateScripts(): ERROR_EXECUTING_SCRIPT: ' +
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

// static async executeStatement({db, statement}) {
//   if (!db) {
//     console.log('SLManager->executeStatement(): BAD_DB');
//     return;
//   }
//
//   if (!statement) {
//     console.log('SLManager->executeStatement(): BAD_STATEMENT');
//     return;
//   }
//
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         statement,
//         [],
//         (_, result) => resolve(result),
//         (_, error) => reject(error),
//       );
//     });
//   });
// }

// static async testInsert(db) {
//   const d = new Date();
//   const n = d.toString();
//
//   const secondData = 'SECOND_DATA';
//
//   const insertStatement =
//       'INSERT INTO test (name, name_second) VALUES (?, ?)';
//
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(insertStatement, [n, secondData], (tx, result) => {
//         resolve(result.insertId);
//       });
//     });
//   });
// }
//
// static async testGet(db) {
//   const getStatement = 'SELECT * FROM test';
//
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(getStatement, [], (tx, result) => {
//         resolve(result.rows);
//       });
//     });
//   });
// }
//
// static async testAlterTable(db) {
//   const alterStatement = 'ALTER TABLE test ADD COLUMN name_second TEXT';
//
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(alterStatement, [], (tx, result) => {
//         resolve();
//       });
//     });
//   });
// }
