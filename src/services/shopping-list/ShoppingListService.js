import {SLSqliteService} from './service-impl/sqlite/SLSqliteService';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
import ShoppingListServiceEvents from './data/event-types/ShoppingListServiceEvents';
import {SLServiceDataValidatorWrapper} from './data-validator/SLServiceDataValidatorWrapper';
import slSqliteFunctionsService from './service-impl/sqlite/slSqliteFunctionsService';

export class ShoppingListService {
  static #notifier = new Notifier();
  static #serviceImpl = slSqliteFunctionsService();
  static #checkReturnedObjectsStructure = false;

  static subscribe({event, handler}) {
    return this.#notifier.subscribe({event, handler});
  }

  static async init(checkReturnedObjectsStructure) {
    // ===
    // try {
    //   const myClass = new MyClass();
    //   await myClass.func_1({one: 'one', two: 'two'});
    // } catch (e) {
    //   SystemEventsHandler.onError({err: 'MY_CLASS_ERR: ' + e.toString()});
    // }

    // =====
    // const testClass = new TestClass();
    //
    // const validator = TestValidator;
    // const checker = new Checker(validator);
    // const result = await checker.call(testClass.func_2, {a: 1, b: 2});

    // SystemEventsHandler.onInfo({
    //   info: 'ShoppingListService->init()->RESULT: ' + JSON.stringify(result),
    // });
    // testChecker.check(testClass.func);
    // =====
    // ===

    if (checkReturnedObjectsStructure) {
      ShoppingListService.#serviceImpl = new SLServiceDataValidatorWrapper(
        slSqliteFunctionsService(),
      );
    } else {
      ShoppingListService.#serviceImpl = slSqliteFunctionsService();
    }

    // ShoppingListService.#serviceImpl = slSqliteFunctionsService();
    // try {
    //   await ShoppingListService.#serviceImpl.init();
    // } catch (e) {
    //   SystemEventsHandler.onInfo({info: 'HERE_ERROR: ' + e.toString()});
    // }

    ShoppingListService.#checkReturnedObjectsStructure = true;
    await ShoppingListService.#serviceImpl.init();
  }

  static async getCategories({shoppingListId}) {
    return await ShoppingListService.#serviceImpl.getCategories();
  }

  static async addCategory({name, color}) {
    return await ShoppingListService.#serviceImpl.addCategory({name, color});
  }

  static async updateCategory({id, name, color}) {
    return await ShoppingListService.#serviceImpl.updateCategory({
      id,
      name,
      color,
    });
  }

  static async removeCategory({id}) {
    return await ShoppingListService.#serviceImpl.removeCategory({id});
  }

  static async getUnits({shoppingListId}) {
    return await ShoppingListService.#serviceImpl.getUnits();
  }

  static async addUnit({name}) {
    return await ShoppingListService.#serviceImpl.addUnit({name});
  }

  static async updateUnit({id, name}) {
    return await ShoppingListService.#serviceImpl.updateUnit({id, name});
  }

  static async removeUnit({id}) {
    return await ShoppingListService.#serviceImpl.removeUnit({id});
  }

  static async createShoppingList({listName, creator}) {
    return await ShoppingListService.#serviceImpl.createShoppingList({
      listName,
      creator,
    });
  }

  static async removeShoppingList({id}) {
    return await ShoppingListService.#serviceImpl.removeShoppingList({id});
  }

  static async renameShoppingList({id, newName}) {
    return await ShoppingListService.#serviceImpl.renameShoppingList({
      id,
      newName,
    });
  }

  static async getShoppingLists() {
    return await ShoppingListService.#serviceImpl.getShoppingLists();
  }

  static async getShoppingListsWithProducts({productsStatus}) {
    return await ShoppingListService.#serviceImpl.getShoppingListsWithProducts({
      productsStatus,
    });
  }

  static async getProductsList({id, productStatus}) {
    return await ShoppingListService.#serviceImpl.getProductsList({
      id,
      productStatus,
    });
  }

  static async copyShoppingList({shoppingListId, copiedListName}) {
    return await ShoppingListService.#serviceImpl.copyShoppingList({
      shoppingListId,
      copiedListName,
    });
  }

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    note,
    unitId,
    categoryId,
  }) {
    const onCreated = ({product}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_CREATED,
        data: {shoppingListId, product},
      });
    };
    const onConfirmed = ({product, confirmed}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_CONFIRMED,
        data: {shoppingListId, product, confirmed},
      });
    };
    const onError = ({error}) => {
      SystemEventsHandler.onError({
        err: 'ShoppingListService->addProduct()->ERROR: ' + error,
      });
    };

    await ShoppingListService.#serviceImpl.addProduct({
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      categoryId,
      onCreated,
      onConfirmed,
      onError,
    });
  }

  static async updateProduct({
    shoppingListId,
    productId,
    name,
    quantity,
    note,
    unitId,
    categoryId,
  }) {
    const onUpdated = ({product}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_UPDATED,
        data: {shoppingListId, product},
      });
    };
    const onConfirmed = ({product, confirmed}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_UPDATE_CONFIRMED,
        data: {shoppingListId, product, confirmed},
      });
    };
    const onError = ({error}) => {
      SystemEventsHandler.onError({
        err: 'ShoppingListService->updateProduct()->ERROR: ' + error,
      });
    };

    await ShoppingListService.#serviceImpl.updateProduct({
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
    });
  }

  static async changeProductStatus({
    shoppingListId,
    productId,
    status,
    notifyWidget = true,
  }) {
    const onChanged = ({product}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_STATUS_CHANGED,
        data: {shoppingListId, product, notifyWidget},
      });
    };
    const onConfirmed = ({product, confirmed}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_STATUS_CHANGE_CONFIRMED,
        data: {shoppingListId, product, confirmed, notifyWidget},
      });
    };
    const onError = ({error}) => {
      SystemEventsHandler.onError({
        err: 'ShoppingListService->changeProductStatus()->ERROR: ' + error,
      });
    };

    await ShoppingListService.#serviceImpl.changeProductStatus({
      shoppingListId,
      productId,
      status,
      onChanged,
      onConfirmed,
      onError,
    });
  }

  static async changeMultipleProductsStatus({
    shoppingListId,
    productsIdsArray,
    status,
  }) {
    const onChanged = ({productsArray}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.MULTIPLE_PRODUCTS_STATUS_CHANGED,
        data: {shoppingListId, productsArray},
      });
    };
    const onConfirmed = ({productsArray, confirmed}) => {
      ShoppingListService.#notifier.notify({
        event:
          ShoppingListServiceEvents.MULTIPLE_PRODUCTS_STATUS_CHANGE_CONFIRMED,
        data: {
          shoppingListId,
          productsArray,
          confirmed,
        },
      });
    };
    const onError = ({error}) => {
      SystemEventsHandler.onError({
        err:
          'ShoppingListService->changeMultipleProductsStatus()->ERROR: ' +
          error,
      });
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.MULTIPLE_PRODUCTS_STATUS_CHANGE_ERROR,
        data: {shoppingListId, productsIdsArray, error},
      });
    };

    await ShoppingListService.#serviceImpl.changeMultipleProductsStatus({
      shoppingListId,
      productsIdsArray,
      status,
      onChanged,
      onConfirmed,
      onError,
    });
  }

  static async changeMultipleShoppingListsProductsStatus({
    shoppingListsProductsChangeStatusMap,
  }) {
    const onChanged = () => {
      ShoppingListService.#notifier.notify({
        event:
          ShoppingListServiceEvents.MULTIPLE_SHOPPING_LISTS_PRODUCTS_STATUS_CHANGED,
        data: {shoppingListsProductsChangeStatusMap},
      });
    };
    const onConfirmed = ({confirmed}) => {
      ShoppingListService.#notifier.notify({
        event:
          ShoppingListServiceEvents.MULTIPLE_SHOPPING_LISTS_PRODUCTS_STATUS_CHANGE_CONFIRMED,
        data: {
          shoppingListsProductsChangeStatusMap,
          confirmed,
        },
      });
    };
    const onError = ({error}) => {
      SystemEventsHandler.onError({
        err:
          'ShoppingListService->changeMultipleShoppingListsProductsStatus()->ERROR: ' +
          error,
      });
      ShoppingListService.#notifier.notify({
        event:
          ShoppingListServiceEvents.MULTIPLE_SHOPPING_LISTS_PRODUCTS_STATUS_CHANGE_ERROR,
        data: {shoppingListsProductsChangeStatusMap, error},
      });
    };

    if (
      !shoppingListsProductsChangeStatusMap ||
      !shoppingListsProductsChangeStatusMap.size
    ) {
      return;
    }

    await ShoppingListService.#serviceImpl.changeMultipleShoppingListsProductsStatus(
      {
        shoppingListsIdsWithProductsIdsAndNewStatusesMap: shoppingListsProductsChangeStatusMap,
        onChanged,
        onConfirmed,
        onError,
      },
    );
  }

  static async removeProduct({shoppingListId, productId}) {
    const onRemoved = ({productId}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_REMOVED,
        data: {shoppingListId, productId},
      });
    };
    const onConfirmed = ({productId, confirmed}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_REMOVE_CONFIRMED,
        data: {shoppingListId, productId, confirmed},
      });
    };
    const onError = ({error}) => {
      SystemEventsHandler.onError({
        err: 'ShoppingListService->removeProduct()->ERROR: ' + error,
      });
    };

    await ShoppingListService.#serviceImpl.removeProduct({
      shoppingListId,
      productId,
      onRemoved,
      onConfirmed,
      onError,
    });
  }

  static async removeMultipleProducts({shoppingListId, productsIdsArray}) {
    const onRemoved = () => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.MULTIPLE_PRODUCTS_REMOVED,
        data: {shoppingListId, productsIdsArray},
      });
    };
    const onConfirmed = ({confirmed}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.MULTIPLE_PRODUCTS_REMOVE_CONFIRMED,
        data: {shoppingListId, productsIdsArray, confirmed},
      });
    };
    const onError = ({error}) => {
      SystemEventsHandler.onError({
        err: 'ShoppingListService->removeMultipleProducts()->ERROR: ' + error,
      });
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.MULTIPLE_PRODUCTS_REMOVE_ERROR,
        data: {shoppingListId, productsIdsArray, error},
      });
    };

    await ShoppingListService.#serviceImpl.removeMultipleProducts({
      shoppingListId,
      productsIdsArray,
      onRemoved,
      onConfirmed,
      onError,
    });
  }
}
