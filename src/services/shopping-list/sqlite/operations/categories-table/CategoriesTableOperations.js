import {
  CATEGORIES_TABLE,
  CATEGORIES_TABLE_COLOR,
  CATEGORIES_TABLE_CREATE_TIMESTAMP,
  CATEGORIES_TABLE_DELETED,
  CATEGORIES_TABLE_EDITABLE,
  CATEGORIES_TABLE_ID,
  CATEGORIES_TABLE_NAME,
  CATEGORIES_TABLE_UPDATE_TIMESTAMP,
} from '../../tables/categoriesTable';
import {SqlStatementExecutor} from '../../../../../utils/common/service-utils/sql-statement-executor/SqlStatementExecutor';
import categoriesTableInitialData from './initial-data/categoriesTableIntitialData';
import {CategoriesTableInitialDataParser} from './initial-data/CategoriesTableInitialDataParser';
import {SystemEventsHandler} from '../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

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
      CATEGORIES_TABLE_EDITABLE +
      ', ' +
      CATEGORIES_TABLE_DELETED +
      ', ' +
      CATEGORIES_TABLE_CREATE_TIMESTAMP +
      ', ' +
      CATEGORIES_TABLE_UPDATE_TIMESTAMP +
      ') VALUES (?, ?, ?, ?, ?, ?)';

    const timestamp = Date.now();
    const editable = 1;
    const deleted = 0;

    const statementParams = [
      name,
      color,
      editable,
      deleted,
      timestamp,
      timestamp,
    ];

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

  static async updateCategory({db, id, name, color}) {
    const updateCategoryStatement =
      'UPDATE ' +
      CATEGORIES_TABLE +
      ' SET ' +
      CATEGORIES_TABLE_NAME +
      ' = ?, ' +
      CATEGORIES_TABLE_COLOR +
      ' = ?, ' +
      CATEGORIES_TABLE_DELETED +
      ' = ?, ' +
      CATEGORIES_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      CATEGORIES_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();
    const deleted = 0;

    const statementParams = [name, color, deleted, timestamp, id];

    const result = {updatedCategoriesCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: updateCategoryStatement,
        params: statementParams,
      });
      result.updatedCategoriesCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->updateCategory()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async removeCategory({db, id}) {
    const removeCategoryStatement =
      'UPDATE ' +
      CATEGORIES_TABLE +
      ' SET ' +
      CATEGORIES_TABLE_DELETED +
      ' = ?, ' +
      CATEGORIES_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      CATEGORIES_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();
    const deleted = 1;

    const statementParams = [deleted, timestamp, id];

    const result = {updatedCategoriesCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: removeCategoryStatement,
        params: statementParams,
      });
      result.updatedCategoriesCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->removeCategory()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }
}
