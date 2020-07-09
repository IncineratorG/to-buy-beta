import {SLInitOperations} from './operations/init/SLInitOperations';
import {CategoriesTableOperations} from './operations/categories-table/CategoriesTableOperations';
import {UnitsTableOperations} from './operations/units-table/UnitsTableOperations';
import {SystemEventsHandler} from '../../service-utils/system-events-handler/SystemEventsHandler';
import {ShoppingListsTableOperations} from './operations/shopping-lists-table/ShoppingListsTableOperations';
import {ProductsTableOperations} from './operations/products-table/ProductsTableOperations';
import ProductStatus from '../data/product-status/ProductStatus';

const DB_NAME = 'tobuy.db';

const SQlite = require('react-native-sqlite-storage');

export class SLSqliteService {
  static #className = 'SLSqliteService';
  static #db;

  static async init() {
    SystemEventsHandler.onInfo({info: this.#className + '->init()'});
    if (!this.#db) {
      this.#db = await SLInitOperations.init(SQlite, DB_NAME);
    }
  }

  static async getCategories() {
    return await CategoriesTableOperations.getCategories({
      db: this.#db,
    });
  }

  static async addCategory({name, color}) {
    if (!name || !color) {
      return {hasError: true};
    }

    const {id, hasError} = await CategoriesTableOperations.addCategory({
      db: this.#db,
      name,
      color,
    });
    if (hasError) {
      return {hasError};
    }

    const categories = await CategoriesTableOperations.getCategories({
      db: this.#db,
    });

    const filteredCategories = categories.filter(
      (category) => category.id === id,
    );
    if (filteredCategories.length) {
      return filteredCategories[0];
    } else {
      return {hasError: true};
    }
  }

  static async updateCategory({id, name, color}) {
    const {hasError} = await CategoriesTableOperations.updateCategory({
      db: this.#db,
      id,
      name,
      color,
    });
    if (hasError) {
      return {hasError};
    }

    const categories = await CategoriesTableOperations.getCategories({
      db: this.#db,
    });

    const filteredCategories = categories.filter(
      (category) => category.id === id,
    );
    if (filteredCategories.length) {
      return filteredCategories[0];
    } else {
      return {hasError: true};
    }
  }

  static async removeCategory({id}) {
    const {hasError} = await CategoriesTableOperations.removeCategory({
      db: this.#db,
      id,
    });
    if (hasError) {
      return {hasError};
    }

    const categories = await CategoriesTableOperations.getCategories({
      db: this.#db,
    });

    const filteredCategories = categories.filter(
      (category) => category.id === id,
    );
    if (filteredCategories.length) {
      return filteredCategories[0];
    } else {
      return {hasError: true};
    }
  }

  static async getUnits() {
    return await UnitsTableOperations.getUnits({db: this.#db});
  }

  static async addUnit({name}) {
    if (!name) {
      return {hasError: true};
    }

    const {id, hasError} = await UnitsTableOperations.addUnit({
      db: this.#db,
      name,
    });
    if (hasError) {
      return {hasError};
    }

    const units = await UnitsTableOperations.getUnits({db: this.#db});

    const filteredUnits = units.filter((unit) => unit.id === id);
    if (filteredUnits.length) {
      return filteredUnits[0];
    } else {
      return {hasError: true};
    }
  }

  static async createShoppingList({listName, creator}) {
    const {id} = await ShoppingListsTableOperations.createShoppingList({
      db: this.#db,
      listName,
    });

    const {shoppingList} = await ShoppingListsTableOperations.getShoppingList({
      db: this.#db,
      id,
    });

    return shoppingList;
  }

  static async removeShoppingList({id}) {
    const {
      hasError: listRemoveError,
    } = await ShoppingListsTableOperations.removeShoppingList({
      db: this.#db,
      id,
    });

    if (listRemoveError) {
      return false;
    }

    const {
      hasError: productsRemoveError,
    } = await ProductsTableOperations.removeProductsWithShoppingListId({
      db: this.#db,
      id,
    });

    return !productsRemoveError;
  }

  static async getShoppingLists() {
    const {
      shoppingLists,
    } = await ShoppingListsTableOperations.getShoppingLists({db: this.#db});

    return shoppingLists;
  }

  static async getProductsList({id}) {
    const {shoppingList} = await ShoppingListsTableOperations.getShoppingList({
      db: this.#db,
      id,
    });

    const {products} = await ProductsTableOperations.getProducts({
      db: this.#db,
      listId: id,
    });

    shoppingList.products = products;

    return shoppingList;
  }

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    categoryId,
    onCreated,
    onConfirmed,
    onError,
  }) {
    const {id} = await ProductsTableOperations.addProduct({
      db: this.#db,
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      categoryId,
    });

    if (!id) {
      if (onError) {
        onError({error: 'SLSqliteService->addProduct()->ADD_PRODUCT_ERROR'});
      }
      return false;
    }

    const {product} = await ProductsTableOperations.getProduct({
      db: this.#db,
      id,
    });

    if (onCreated) {
      onCreated({product});
    }

    const {
      products: completedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: this.#db,
      shoppingListId,
      status: ProductStatus.COMPLETED,
    });

    const {
      products: notCompletedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: this.#db,
      shoppingListId,
      status: ProductStatus.NOT_COMPLETED,
    });

    const completedProductsCount = completedProducts.length;
    const totalProductsCount =
      completedProducts.length + notCompletedProducts.length;

    const {
      hasError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: this.#db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });

    if (hasError) {
      if (onError) {
        onError({
          error: 'SLSqliteService->addProduct()->UPDATE_SHOPPING_LIST_ERROR',
        });
      }
      return false;
    }

    if (onConfirmed) {
      onConfirmed({product});
    }

    return true;
  }
}
