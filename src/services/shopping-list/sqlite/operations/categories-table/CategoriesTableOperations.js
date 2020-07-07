import {
  CATEGORIES_TABLE,
  CATEGORIES_TABLE_COLOR,
  CATEGORIES_TABLE_CREATE_TIMESTAMP,
  CATEGORIES_TABLE_NAME,
  CATEGORIES_TABLE_UPDATE_TIMESTAMP,
} from '../../tables/categoriesTable';
import {SqlStatementExecutor} from '../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import categoriesTableInitialData from './initial-data/categoriesTableIntitialData';
import {CategoriesTableInitialDataParser} from './initial-data/CategoriesTableInitialDataParser';
import {SystemEventsHandler} from '../../../../service-utils/system-events-handler/SystemEventsHandler';

export class CategoriesTableOperations {
  static #className = 'CategoriesTableOperations';
  static #initialCategories;

  static async getCategories({db}) {
    const getCategoriesStatement = 'SELECT * FROM ' + CATEGORIES_TABLE;
    const result = await SqlStatementExecutor.execute({
      db,
      statement: getCategoriesStatement,
    });

    const categories = [];
    for (let i = 0; i < result.rows.length; ++i) {
      categories.push(result.rows.item(i));
    }

    if (!this.#initialCategories) {
      const initialCategoriesData = categoriesTableInitialData;
      this.#initialCategories = CategoriesTableInitialDataParser.getInitialCategories(
        {initialData: initialCategoriesData},
      );
    }

    categories.push(...this.#initialCategories);

    return categories;
  }

  static async addCategory({db, name, color}) {
    const addCategoryStatement =
      'INSERT INTO ' +
      CATEGORIES_TABLE +
      ' (' +
      CATEGORIES_TABLE_NAME +
      ', ' +
      CATEGORIES_TABLE_COLOR +
      ', ' +
      CATEGORIES_TABLE_CREATE_TIMESTAMP +
      ', ' +
      CATEGORIES_TABLE_UPDATE_TIMESTAMP +
      ') VALUES (?, ?, ?, ?)';

    const timestamp = Date.now();

    const statementParams = [name, color, timestamp, timestamp];

    const result = {id: undefined, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: addCategoryStatement,
        params: statementParams,
      });
      result.id = executionResult.insertId;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->addCategory()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }
}
