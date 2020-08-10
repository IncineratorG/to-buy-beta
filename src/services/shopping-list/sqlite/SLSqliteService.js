import {SLInitOperations} from './operations/init/SLInitOperations';
import {CategoriesTableOperations} from './operations/categories-table/CategoriesTableOperations';
import {UnitsTableOperations} from './operations/units-table/UnitsTableOperations';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {ShoppingListsTableOperations} from './operations/shopping-lists-table/ShoppingListsTableOperations';
import {ProductsTableOperations} from './operations/products-table/ProductsTableOperations';
import ProductStatus from '../data/product-status/ProductStatus';

const DB_NAME = 'tobuy_shopping_list.db';

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

  static async updateUnit({id, name}) {
    const {hasError} = await UnitsTableOperations.updateUnit({
      db: this.#db,
      id,
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

  static async removeUnit({id}) {
    const {hasError} = await UnitsTableOperations.removeUnit({
      db: this.#db,
      id,
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

  static async renameShoppingList({id, newName}) {
    const {hasError} = await ShoppingListsTableOperations.renameShoppingList({
      db: this.#db,
      id,
      newName,
    });
    if (hasError) {
      return undefined;
    }

    const {shoppingList} = await ShoppingListsTableOperations.getShoppingList({
      db: this.#db,
      id,
    });

    return shoppingList;
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

    const {products} = await ProductsTableOperations.getShoppingListProducts({
      db: this.#db,
      listId: id,
    });

    shoppingList.products = products;

    return shoppingList;
  }

  static async copyShoppingList({shoppingListId, copiedListName}) {
    const result = {
      shoppingList: undefined,
      error: {hasError: false, description: ''},
    };

    const {
      products,
      hasError: getProductsError,
    } = await ProductsTableOperations.getShoppingListProducts({
      db: this.#db,
      listId: shoppingListId,
    });
    if (getProductsError) {
      result.error.hasError = true;
      result.error.description = 'GET_PRODUCTS_ERROR';
      return result;
    }

    const {
      id: copiedListId,
      hasError: createListError,
    } = await ShoppingListsTableOperations.createShoppingList({
      db: this.#db,
      listName: copiedListName,
    });
    if (createListError) {
      result.error.hasError = true;
      result.error.description = 'CREATE_LIST_ERROR';
      return result;
    }

    const {
      hasError: addProductsError,
    } = await ProductsTableOperations.addMultipleProducts({
      db: this.#db,
      shoppingListId: copiedListId,
      products,
    });
    if (addProductsError) {
      result.error.hasError = true;
      result.error.description = 'ADD_PRODUCTS_ERROR';
      return result;
    }

    const {
      products: completedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: this.#db,
      shoppingListId: copiedListId,
      status: ProductStatus.COMPLETED,
    });

    const {
      products: notCompletedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: this.#db,
      shoppingListId: copiedListId,
      status: ProductStatus.NOT_COMPLETED,
    });

    const completedProductsCount = completedProducts.length;
    const totalProductsCount =
      completedProducts.length + notCompletedProducts.length;

    const {
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: this.#db,
      id: copiedListId,
      totalProductsCount,
      completedProductsCount,
    });
    if (updateShoppingListError) {
      result.error.hasError = true;
      result.error.description = 'UPDATE_SHOPPING_LIST_ERROR';
      return result;
    }

    result.shoppingList = await this.getProductsList({id: copiedListId});
    return result;
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
      onConfirmed({product, confirmed: true});
    }

    return true;
  }

  static async updateProduct({
    shoppingListId,
    productId,
    name,
    quantity,
    note,
    unitId,
    categoryId,
    onUpdated,
    onConfirmed,
    onError,
  }) {
    const {hasError} = await ProductsTableOperations.updateProduct({
      db: this.#db,
      productId,
      name,
      quantity,
      note,
      unitId,
      categoryId,
    });
    if (hasError) {
      if (onError) {
        onError({
          error: 'SLSqliteService->updateProduct()->UPDATE_PRODUCT_ERROR',
        });
      }
      return false;
    }

    const {product} = await ProductsTableOperations.getProduct({
      db: this.#db,
      id: productId,
    });

    if (onUpdated) {
      onUpdated({product});
    }

    if (onConfirmed) {
      onConfirmed({product, confirmed: true});
    }

    return true;
  }

  static async changeProductStatus({
    shoppingListId,
    productId,
    status,
    onChanged,
    onConfirmed,
    onError,
  }) {
    if (
      status !== ProductStatus.COMPLETED &&
      status !== ProductStatus.NOT_COMPLETED
    ) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->changeProductStatus()->BAD_PRODUCT_STATUS: ' +
            status,
        });
      }
      return false;
    }

    const {hasError} = await ProductsTableOperations.changeProductStatus({
      db: this.#db,
      productId,
      status,
    });
    if (hasError) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->changeProductStatus()->CHANGE_PRODUCT_STATUS_ERROR: ',
        });
      }
      return false;
    }

    const {product} = await ProductsTableOperations.getProduct({
      db: this.#db,
      id: productId,
    });

    if (onChanged) {
      onChanged({product});
    }

    // ===
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
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: this.#db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });
    // ===

    if (onConfirmed) {
      onConfirmed({product, confirmed: true});
    }

    return true;
  }

  static async changeMultipleProductsStatus({
    shoppingListId,
    productsIdsArray,
    status,
    onChanged,
    onConfirmed,
    onError,
  }) {
    if (
      status !== ProductStatus.COMPLETED &&
      status !== ProductStatus.NOT_COMPLETED
    ) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->changeMultipleProductsStatus()->BAD_PRODUCT_STATUS: ' +
            status,
        });
      }
      return false;
    }

    const {
      hasError: changeStatusError,
    } = await ProductsTableOperations.changeMultipleProductsStatus({
      db: this.#db,
      productsIds: productsIdsArray,
      status,
    });
    if (changeStatusError) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->changeMultipleProductsStatus()->CHANGE_PRODUCTS_STATUS_ERROR',
        });
      }
      return false;
    }

    const {products} = await ProductsTableOperations.getProducts({
      db: this.#db,
      productsIds: productsIdsArray,
    });

    if (onChanged) {
      onChanged({productsArray: products});
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
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: this.#db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });

    if (onConfirmed) {
      onConfirmed({productsArray: products, confirmed: true});
    }

    return true;
  }

  static async removeProduct({
    shoppingListId,
    productId,
    onRemoved,
    onConfirmed,
    onError,
  }) {
    const {hasError} = await ProductsTableOperations.removeProduct({
      db: this.#db,
      id: productId,
    });
    if (hasError) {
      if (onError) {
        onError({
          error: 'SLSqliteService->removeProduct()->REMOVE_PRODUCT_ERROR: ',
        });
      }
      return false;
    }

    if (onRemoved) {
      onRemoved({productId});
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
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: this.#db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });

    if (updateShoppingListError) {
      if (onError) {
        onError({
          error: 'SLSqliteService->removeProduct()->UPDATE_SHOPPING_LIST_ERROR',
        });
      }
      return false;
    }

    if (onConfirmed) {
      onConfirmed({productId, confirmed: true});
    }

    return true;
  }

  static async removeMultipleProducts({
    shoppingListId,
    productsIdsArray,
    onRemoved,
    onConfirmed,
    onError,
  }) {
    const {
      hasError: removeProductsError,
    } = await ProductsTableOperations.removeMultipleProducts({
      db: this.#db,
      productsIds: productsIdsArray,
    });
    if (removeProductsError) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->removeMultipleProducts()->REMOVE_MULTIPLE_PRODUCTS_ERROR',
        });
      }
      return false;
    }

    if (onRemoved) {
      onRemoved();
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
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: this.#db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });

    if (updateShoppingListError) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->removeMultipleProducts()->UPDATE_SHOPPING_LIST_ERROR',
        });
      }
      return false;
    }

    if (onConfirmed) {
      onConfirmed({confirmed: true});
    }

    return true;
  }
}
