import {UNITS_TABLE} from '../../tables/unitsTable';
import {SqlStatementExecutor} from '../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import unitsTableInitialData from './initial-data/unitsTableInitialData';
import {UnitsTableInitialDataParser} from './initial-data/UnitsTableInitialDataParser';

export class UnitsTableOperations {
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
}
