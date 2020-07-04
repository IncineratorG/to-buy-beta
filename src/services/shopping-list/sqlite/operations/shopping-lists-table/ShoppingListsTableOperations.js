import {
  SHOPPING_LISTS_TABLE,
  SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP,
  SHOPPING_LISTS_TABLE_CREATOR,
  SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP,
  SHOPPING_LISTS_TABLE_LIST_NAME,
  SHOPPING_LISTS_TABLE_TOTAL_ITEMS,
  SHOPPING_LISTS_TABLE_COMPLETED_ITEMS,
  SHOPPING_LISTS_TABLE_ID,
} from '../../tables/shoppingListsTable';
import {SqlStatementExecutor} from '../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import {SystemEventsHandler} from '../../../../service-utils/system-events-handler/SystemEventsHandler';

export class ShoppingListsTableOperations {
  static #className = 'ShoppingListsTableOperations';

  static async createShoppingList({db, listName}) {
    const createShoppingListStatement =
      'INSERT INTO ' +
      SHOPPING_LISTS_TABLE +
      ' (' +
      SHOPPING_LISTS_TABLE_LIST_NAME +
      ', ' +
      SHOPPING_LISTS_TABLE_TOTAL_ITEMS +
      ', ' +
      SHOPPING_LISTS_TABLE_COMPLETED_ITEMS +
      ', ' +
      SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP +
      ', ' +
      SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP +
      ', ' +
      SHOPPING_LISTS_TABLE_CREATOR +
      ') VALUES (?, ?, ?, ?, ?, ?)';

    const currentTimestamp = Date.now();

    const listCreator = '';
    const listCreateTimestamp = currentTimestamp;
    const listUpdateTimestamp = currentTimestamp;

    const statementParams = [
      listName,
      0,
      0,
      listCreateTimestamp,
      listUpdateTimestamp,
      listCreator,
    ];

    const result = {id: undefined, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: createShoppingListStatement,
        params: statementParams,
      });
      result.id = executionResult.insertId;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->createShoppingList()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async getShoppingList({db, id}) {
    const getShoppingListStatement =
      'SELECT * FROM ' +
      SHOPPING_LISTS_TABLE +
      ' WHERE ' +
      SHOPPING_LISTS_TABLE_ID +
      ' = ?';

    const statementParams = [id];

    const result = {shoppingList: undefined, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getShoppingListStatement,
        params: statementParams,
      });
      result.shoppingList = executionResult.rows.item(0);
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getShoppingList()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async getShoppingLists({db}) {
    const getShoppingListsStatement = 'SELECT * FROM ' + SHOPPING_LISTS_TABLE;

    const result = {shoppingLists: [], hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getShoppingListsStatement,
      });
      const shoppingLists = [];
      for (let i = 0; i < executionResult.rows.length; ++i) {
        shoppingLists.push(executionResult.rows.item(i));
      }
      result.shoppingLists = shoppingLists;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getShoppingLists()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async removeShoppingList({db, id}) {
    const removeShoppingListStatement =
      'DELETE FROM ' +
      SHOPPING_LISTS_TABLE +
      ' WHERE ' +
      SHOPPING_LISTS_TABLE_ID +
      ' = ?';

    const statementParams = [id];

    const result = {removedListsCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: removeShoppingListStatement,
        params: statementParams,
      });
      result.removedListsCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->removeShoppingList()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async updateShoppingListProductsCount({
    db,
    id,
    completedProductsCount,
    totalProductsCount,
  }) {
    const updateStatement =
      'UPDATE ' +
      SHOPPING_LISTS_TABLE +
      ' SET ' +
      SHOPPING_LISTS_TABLE_COMPLETED_ITEMS +
      ' = ?, ' +
      SHOPPING_LISTS_TABLE_TOTAL_ITEMS +
      ' = ?, ' +
      SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      SHOPPING_LISTS_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();

    const statementParams = [
      completedProductsCount,
      totalProductsCount,
      timestamp,
      id,
    ];

    const result = {updatedListsCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: updateStatement,
        params: statementParams,
      });
      result.updatedListsCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->updateShoppingListItemsCount()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }
}
