import {
  SYSTEM_PREFERENCES_TABLE,
  SYSTEM_PREFERENCES_TABLE_LANGUAGE_CODE,
} from '../../tables/systemPreferencesTable';
import {SqlStatementExecutor} from '../../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import {SystemEventsHandler} from '../../../../../service-utils/system-events-handler/SystemEventsHandler';

class PreferencesTableOperations {
  static #className = 'PreferencesTableOperations';

  static async getCurrentLanguageCode({db}) {
    const getCurrentLanguageCodeStatement =
      'SELECT * FROM ' + SYSTEM_PREFERENCES_TABLE;

    const result = {languageCode: '', hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getCurrentLanguageCodeStatement,
      });
      if (executionResult.rows.length > 0) {
        const preferences = executionResult.rows.item(0);
        result.languageCode = preferences.systemLanguageCode
          ? preferences.systemLanguageCode
          : '';
      }
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getCurrentLanguageCode()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async setCurrentLanguageCode({db, languageCode}) {
    const setCurrentLanguageCodeStatement =
      'INSERT INTO ' +
      SYSTEM_PREFERENCES_TABLE +
      ' (' +
      SYSTEM_PREFERENCES_TABLE_LANGUAGE_CODE +
      ') VALUES (?)';

    const statementParams = [languageCode];
    const result = {hasError: false};
    try {
      await SqlStatementExecutor.execute({
        db,
        statement: setCurrentLanguageCodeStatement,
        params: statementParams,
      });
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->setCurrentLanguageCode()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }
}

export default PreferencesTableOperations;
