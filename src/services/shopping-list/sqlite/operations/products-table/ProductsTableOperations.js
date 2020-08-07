import {
  PRODUCTS_TABLE,
  PRODUCTS_TABLE_CATEGORY_ID,
  PRODUCTS_TABLE_COMPLETION_STATUS,
  PRODUCTS_TABLE_CREATE_TIMESTAMP,
  PRODUCTS_TABLE_ID,
  PRODUCTS_TABLE_NOTE,
  PRODUCTS_TABLE_PARENT_LIST_ID,
  PRODUCTS_TABLE_PRODUCT_COUNT,
  PRODUCTS_TABLE_PRODUCT_NAME,
  PRODUCTS_TABLE_UNIT_ID,
  PRODUCTS_TABLE_UPDATE_TIMESTAMP,
} from '../../tables/productsTable';
import {SystemEventsHandler} from '../../../../service-utils/system-events-handler/SystemEventsHandler';
import {SqlStatementExecutor} from '../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import ProductStatus from '../../../data/product-status/ProductStatus';

export class ProductsTableOperations {
  static #className = 'ProductsTableOperations';

  static async getShoppingListProducts({db, listId}) {
    const getProductsStatement =
      'SELECT * FROM ' +
      PRODUCTS_TABLE +
      ' WHERE ' +
      PRODUCTS_TABLE_PARENT_LIST_ID +
      ' = ?';

    const statementParams = [listId];

    const result = {products: [], hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getProductsStatement,
        params: statementParams,
      });
      const products = [];
      for (let i = 0; i < executionResult.rows.length; ++i) {
        products.push(executionResult.rows.item(i));
      }
      result.products = products;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getShoppingListProducts()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async getProduct({db, id}) {
    const getProductStatement =
      'SELECT * FROM ' +
      PRODUCTS_TABLE +
      ' WHERE ' +
      PRODUCTS_TABLE_ID +
      ' = ?';

    const statementParams = [id];

    const result = {product: undefined, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getProductStatement,
        params: statementParams,
      });
      if (executionResult.rows.length) {
        result.product = executionResult.rows.item(0);
      }
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getProduct()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async getProducts({db, productsIds}) {
    const productsIdsString = productsIds.join(', ');

    const getProductsStatement =
      'SELECT * FROM ' +
      PRODUCTS_TABLE +
      ' WHERE ' +
      PRODUCTS_TABLE_ID +
      ' IN (' +
      productsIdsString +
      ')';

    const result = {products: [], hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getProductsStatement,
      });
      const products = [];
      for (let i = 0; i < executionResult.rows.length; ++i) {
        products.push(executionResult.rows.item(i));
      }
      result.products = products;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getProducts()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async getListProductsWithStatus({db, shoppingListId, status}) {
    const getProductsStatement =
      'SELECT * FROM ' +
      PRODUCTS_TABLE +
      ' WHERE ' +
      PRODUCTS_TABLE_PARENT_LIST_ID +
      ' = ? AND ' +
      PRODUCTS_TABLE_COMPLETION_STATUS +
      ' LIKE ?';

    const statementParams = [shoppingListId, status];

    const result = {products: [], hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: getProductsStatement,
        params: statementParams,
      });
      const products = [];
      for (let i = 0; i < executionResult.rows.length; ++i) {
        products.push(executionResult.rows.item(i));
      }
      result.products = products;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->getListProductsWithStatus()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async addProduct({
    db,
    shoppingListId,
    name,
    quantity,
    note,
    unitId,
    categoryId,
  }) {
    const addProductStatement =
      'INSERT INTO ' +
      PRODUCTS_TABLE +
      ' (' +
      PRODUCTS_TABLE_PARENT_LIST_ID +
      ', ' +
      PRODUCTS_TABLE_PRODUCT_NAME +
      ', ' +
      PRODUCTS_TABLE_UNIT_ID +
      ', ' +
      PRODUCTS_TABLE_PRODUCT_COUNT +
      ', ' +
      PRODUCTS_TABLE_CATEGORY_ID +
      ', ' +
      PRODUCTS_TABLE_NOTE +
      ', ' +
      PRODUCTS_TABLE_COMPLETION_STATUS +
      ', ' +
      PRODUCTS_TABLE_CREATE_TIMESTAMP +
      ', ' +
      PRODUCTS_TABLE_UPDATE_TIMESTAMP +
      ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const timestamp = Date.now();
    const productStatus = ProductStatus.NOT_COMPLETED;

    const statementParams = [
      shoppingListId,
      name,
      unitId,
      quantity,
      categoryId,
      note,
      productStatus,
      timestamp,
      timestamp,
    ];

    const result = {id: undefined, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: addProductStatement,
        params: statementParams,
      });
      result.id = executionResult.insertId;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->addProduct()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async updateProduct({
    db,
    productId,
    name,
    quantity,
    note,
    unitId,
    categoryId,
  }) {
    const updateProductStatement =
      'UPDATE ' +
      PRODUCTS_TABLE +
      ' SET ' +
      PRODUCTS_TABLE_PRODUCT_NAME +
      ' = ?, ' +
      PRODUCTS_TABLE_UNIT_ID +
      ' = ?, ' +
      PRODUCTS_TABLE_PRODUCT_COUNT +
      ' = ?, ' +
      PRODUCTS_TABLE_CATEGORY_ID +
      ' = ?, ' +
      PRODUCTS_TABLE_NOTE +
      ' = ?, ' +
      PRODUCTS_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      PRODUCTS_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();

    const statementParams = [
      name,
      unitId,
      quantity,
      categoryId,
      note,
      timestamp,
      productId,
    ];

    const result = {updatedProductsCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: updateProductStatement,
        params: statementParams,
      });
      result.updatedProductsCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->updateProduct()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async changeProductStatus({db, productId, status}) {
    const changeProductStatusStatement =
      'UPDATE ' +
      PRODUCTS_TABLE +
      ' SET ' +
      PRODUCTS_TABLE_COMPLETION_STATUS +
      ' = ?, ' +
      PRODUCTS_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      PRODUCTS_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();

    const statementParams = [status, timestamp, productId];

    const result = {updatedProductsCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: changeProductStatusStatement,
        params: statementParams,
      });
      result.updatedProductsCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->changeProductStatus()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async changeMultipleProductsStatus({db, productsIds, status}) {
    const productsIdsString = productsIds.join(', ');

    const changeMultipleProductsStatusStatement =
      'UPDATE ' +
      PRODUCTS_TABLE +
      ' SET ' +
      PRODUCTS_TABLE_COMPLETION_STATUS +
      ' = ?, ' +
      PRODUCTS_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      PRODUCTS_TABLE_ID +
      ' IN (' +
      productsIdsString +
      ')';

    const timestamp = Date.now();

    const statementParams = [status, timestamp];

    const result = {updatedProductsCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: changeMultipleProductsStatusStatement,
        params: statementParams,
      });
      result.updatedProductsCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->changeMultipleProductsStatus()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async removeProductsWithShoppingListId({db, id}) {
    const removeProductsStatement =
      'DELETE FROM ' +
      PRODUCTS_TABLE +
      ' WHERE ' +
      PRODUCTS_TABLE_PARENT_LIST_ID +
      ' = ?';

    const statementParams = [id];

    const result = {removedProductsCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: removeProductsStatement,
        params: statementParams,
      });
      result.removedProductsCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err:
          this.#className + '->removeProductsWithShoppingListId()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async removeProduct({db, id}) {
    const removeProductStatement =
      'DELETE FROM ' + PRODUCTS_TABLE + ' WHERE ' + PRODUCTS_TABLE_ID + ' = ?';

    const statementParams = [id];

    const result = {removedProductsCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: removeProductStatement,
        params: statementParams,
      });
      result.removedProductsCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->removeProduct()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }

  static async removeMultipleProducts({db, productsIds}) {
    const productsIdsString = productsIds.join(', ');

    const removeMultipleProductsStatement =
      'DELETE FROM ' +
      PRODUCTS_TABLE +
      ' WHERE ' +
      PRODUCTS_TABLE_ID +
      ' IN (' +
      productsIdsString +
      ')';

    const result = {removedProductsCount: 0, hasError: false};
    try {
      const executionResult = await SqlStatementExecutor.execute({
        db,
        statement: removeMultipleProductsStatement,
      });
      result.removedProductsCount = executionResult.rowsAffected;
    } catch (e) {
      SystemEventsHandler.onError({
        err: this.#className + '->removeMultipleProducts()->ERROR: ' + e,
      });
      result.hasError = true;
    }

    return result;
  }
}
