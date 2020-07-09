import {
  UNITS_TABLE,
  UNITS_TABLE_CREATE_TIMESTAMP,
  UNITS_TABLE_DELETED,
  UNITS_TABLE_EDITABLE,
  UNITS_TABLE_UNIT_NAME,
  UNITS_TABLE_UPDATE_TIMESTAMP,
} from '../../tables/unitsTable';
import {SqlStatementExecutor} from '../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import unitsTableInitialData from './initial-data/unitsTableInitialData';
import {UnitsTableInitialDataParser} from './initial-data/UnitsTableInitialDataParser';
import {SystemEventsHandler} from '../../../../service-utils/system-events-handler/SystemEventsHandler';

export class UnitsTableOperations {
  static #className = 'UnitsTableOperations';
  static #initialUnits;

  static async getUnits({db}) {
    const getUnitsStatement = 'SELECT * FROM ' + UNITS_TABLE;
    const result = await SqlStatementExecutor.execute({
      db,
      statement: getUnitsStatement,
    });

    const units = [];
    for (let i = 0; i < result.rows.length; ++i) {
      units.push(result.rows.item(i));
    }

    if (!this.#initialUnits) {
      const initialUnitsData = unitsTableInitialData;
      this.#initialUnits = UnitsTableInitialDataParser.getInitialUnits({
        initialData: initialUnitsData,
      });
    }

    units.push(...this.#initialUnits);

    return units;
  }

  static async addUnit({db, name}) {
    const addUnitStatement =
      'INSERT INTO ' +
      UNITS_TABLE +
      ' (' +
      UNITS_TABLE_UNIT_NAME +
      ', ' +
      UNITS_TABLE_EDITABLE +
      ', ' +
      UNITS_TABLE_DELETED +
      ', ' +
      UNITS_TABLE_CREATE_TIMESTAMP +
      ', ' +
      UNITS_TABLE_UPDATE_TIMESTAMP +
      ') VALUES (?, ?, ?, ?, ?)';

    const timestamp = Date.now();
    const editable = 1;
    const deleted = 0;

    const statementParams = [name, editable, deleted, timestamp, timestamp];

    const result = {id: undefined, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: addUnitStatement,
        params: statementParams,
      });
      result.id = executionResult.insertId;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->addUnit()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }
}
