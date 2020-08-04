import {
  SUGGESTED_PRODUCTS_TABLE,
  SUGGESTED_PRODUCTS_TABLE_CATEGORY_ID,
  SUGGESTED_PRODUCTS_TABLE_CREATE_TIMESTAMP,
  SUGGESTED_PRODUCTS_TABLE_ID,
  SUGGESTED_PRODUCTS_TABLE_PRODUCT_NAME,
  SUGGESTED_PRODUCTS_TABLE_UNIT_ID,
  SUGGESTED_PRODUCTS_TABLE_UPDATE_TIMESTAMP,
  SUGGESTED_PRODUCTS_TABLE_USAGE_COUNT,
} from '../../tables/suggestedProductsTable';
import {SystemEventsHandler} from '../../../../../service-utils/system-events-handler/SystemEventsHandler';
import {SqlStatementExecutor} from '../../../../../service-utils/sql-statement-executor/SqlStatementExecutor';

class SuggestedProductsTableOperations {
  static #className = 'SuggestedProductsTableOperations';

  static async getProductsData({db}) {
    const getProductsDataStatement =
      'SELECT * FROM ' +
      SUGGESTED_PRODUCTS_TABLE +
      ' ORDER BY ' +
      SUGGESTED_PRODUCTS_TABLE_USAGE_COUNT +
      ' DESC';

    const result = {productsData: [], hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getProductsDataStatement,
      });

      const productsData = [];
      for (let i = 0; i < executionResult.rows.length; ++i) {
        productsData.push(executionResult.rows.item(i));
      }
      result.productsData = productsData;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getProductsData()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async getProductData({db, id}) {
    const getProductDataStatement =
      'SELECT * FROM ' +
      SUGGESTED_PRODUCTS_TABLE +
      ' WHERE ' +
      SUGGESTED_PRODUCTS_TABLE_ID +
      ' = ?';

    const statementParams = [id];

    const result = {productData: undefined, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getProductDataStatement,
        params: statementParams,
      });
      if (executionResult.rows.length) {
        result.productData = executionResult.rows.item(0);
      }
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getProductData()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async getProductsDataCount({db}) {
    const getProductsDataCountStatement =
      'SELECT COUNT(' +
      SUGGESTED_PRODUCTS_TABLE_ID +
      ') FROM ' +
      SUGGESTED_PRODUCTS_TABLE;

    const result = {productDataCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getProductsDataCountStatement,
      });

      if (executionResult.rows.length) {
        result.productDataCount = executionResult.rows.item(0)['COUNT(id)'];
      }
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getProductsDataCount()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async addProductData({db, name, unitId, categoryId}) {
    const addProductDataStatement =
      'INSERT INTO ' +
      SUGGESTED_PRODUCTS_TABLE +
      ' (' +
      SUGGESTED_PRODUCTS_TABLE_PRODUCT_NAME +
      ', ' +
      SUGGESTED_PRODUCTS_TABLE_UNIT_ID +
      ', ' +
      SUGGESTED_PRODUCTS_TABLE_CATEGORY_ID +
      ', ' +
      SUGGESTED_PRODUCTS_TABLE_CREATE_TIMESTAMP +
      ', ' +
      SUGGESTED_PRODUCTS_TABLE_UPDATE_TIMESTAMP +
      ', ' +
      SUGGESTED_PRODUCTS_TABLE_USAGE_COUNT +
      ') VALUES (?, ?, ?, ?, ?, ?)';

    const timestamp = Date.now();
    const usageCount = 1;

    const statementParams = [
      name,
      unitId,
      categoryId,
      timestamp,
      timestamp,
      usageCount,
    ];

    const result = {id: undefined, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: addProductDataStatement,
        params: statementParams,
      });
      result.id = executionResult.insertId;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->addProductData()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async updateProductData({
    db,
    id,
    name,
    unitId,
    categoryId,
    usageCount,
  }) {
    const updateProductDataStatement =
      'UPDATE ' +
      SUGGESTED_PRODUCTS_TABLE +
      ' SET ' +
      SUGGESTED_PRODUCTS_TABLE_PRODUCT_NAME +
      ' = ?, ' +
      SUGGESTED_PRODUCTS_TABLE_UNIT_ID +
      ' = ?, ' +
      SUGGESTED_PRODUCTS_TABLE_CATEGORY_ID +
      ' = ?, ' +
      SUGGESTED_PRODUCTS_TABLE_UPDATE_TIMESTAMP +
      ' = ?, ' +
      SUGGESTED_PRODUCTS_TABLE_USAGE_COUNT +
      ' = ? WHERE ' +
      SUGGESTED_PRODUCTS_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();

    const statementParams = [
      name,
      unitId,
      categoryId,
      timestamp,
      usageCount,
      id,
    ];

    const result = {updatedProductsDataCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: updateProductDataStatement,
        params: statementParams,
      });
      result.updatedProductsDataCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->updateProductData()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async removeUnusedRecords({db}) {
    const removeUnusedRecordsStatement =
      'DELETE FROM ' +
      SUGGESTED_PRODUCTS_TABLE +
      ' WHERE ' +
      SUGGESTED_PRODUCTS_TABLE_USAGE_COUNT +
      ' < ? AND ' +
      SUGGESTED_PRODUCTS_TABLE_UPDATE_TIMESTAMP +
      ' < ?';

    const currentTimeInMilliseconds = Date.now();
    const oneMonthAgoInMilliseconds =
      currentTimeInMilliseconds - 1000 * 60 * 60 * 24 * 30;

    const minimalUsageCount = 3;

    const statementParams = [minimalUsageCount, oneMonthAgoInMilliseconds];

    const result = {removedProductsDataCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: removeUnusedRecordsStatement,
        params: statementParams,
      });
      result.removedProductsDataCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->removeUnusedRecords()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }
}

export default SuggestedProductsTableOperations;
