import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';

export class SqlStatementExecutor {
  static async execute({db, statement, params = []}) {
    if (!db) {
      SystemEventsHandler.onError({
        err: 'SqlStatementExecutor->execute(): BAD_DB',
      });
      return;
    }

    if (!statement) {
      SystemEventsHandler.onError({
        err: 'SqlStatementExecutor->execute(): BAD_STATEMENT',
      });
      return;
    }

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          statement,
          params,
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  }
}
