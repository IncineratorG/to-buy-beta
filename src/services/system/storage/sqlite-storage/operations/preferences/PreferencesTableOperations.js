import {
  SYSTEM_PREFERENCES_TABLE,
  SYSTEM_PREFERENCES_TABLE_ID,
  SYSTEM_PREFERENCES_TABLE_LANGUAGE_CODE,
} from '../../tables/systemPreferencesTable';
import {SqlStatementExecutor} from '../../../../../../utils/common/service-utils/sql-statement-executor/SqlStatementExecutor';
import {SystemEventsHandler} from '../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

class PreferencesTableOperations {
  static #className = 'PreferencesTableOperations';

  static async getPreferencesRowId({db}) {
    const getPreferencesId = 'SELECT * FROM ' + SYSTEM_PREFERENCES_TABLE;

    const result = {id: '', hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getPreferencesId,
      });
      if (executionResult.rows.length > 0) {
        result.id = executionResult.rows.item(0).id;
      }
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getPreferencesRowId()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

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

  static async updateCurrentLanguageCode({db, languageCode, rowId}) {
    const updateCurrentLanguageCodeStatement =
      'UPDATE ' +
      SYSTEM_PREFERENCES_TABLE +
      ' SET ' +
      SYSTEM_PREFERENCES_TABLE_LANGUAGE_CODE +
      ' = ? WHERE ' +
      SYSTEM_PREFERENCES_TABLE_ID +
      ' = ?';

    const statementParams = [languageCode, rowId];
    const result = {hasError: false};
    try {
      await SqlStatementExecutor.execute({
        db,
        statement: updateCurrentLanguageCodeStatement,
        params: statementParams,
      });
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->updateCurrentLanguageCode()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }
}

export default PreferencesTableOperations;
