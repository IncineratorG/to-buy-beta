import {SLSqliteService} from './sqlite/SLSqliteService';
import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';
import {Notifier} from '../service-utils/notifier/Notifier';
import ShoppingListServiceEvents from './data/event-types/ShoppingListServiceEvents';

export class ShoppingListService {
  static #notifier = new Notifier();

  static subscribe({event, handler}) {
    return this.#notifier.subscribe({event, handler});
  }

  static async init() {
    await SLSqliteService.init();
  }

  static async getCategories({shoppingListId}) {
    return await SLSqliteService.getCategories();
  }

  static async addCategory({name, color}) {
    return await SLSqliteService.addCategory({name, color});
  }

  static async updateCategory({id, name, color}) {
    return await SLSqliteService.updateCategory({id, name, color});
  }

  static async removeCategory({id}) {
    return await SLSqliteService.removeCategory({id});
  }

  static async getUnits({shoppingListId}) {
    return await SLSqliteService.getUnits();
  }

  static async addUnit({name}) {
    return await SLSqliteService.addUnit({name});
  }

  static async updateUnit({id, name}) {
    return await SLSqliteService.updateUnit({id, name});
  }

  static async removeUnit({id}) {
    return await SLSqliteService.removeUnit({id});
  }

  static async createShoppingList({listName, creator}) {
    return await SLSqliteService.createShoppingList({
      listName,
      creator,
    });
  }

  static async removeShoppingList({id}) {
    return await SLSqliteService.removeShoppingList({id});
  }

  static async renameShoppingList({id, newName}) {
    return await SLSqliteService.renameShoppingList({id, newName});
  }

  static async getShoppingLists() {
    return await SLSqliteService.getShoppingLists();
  }

  static async getProductsList({id}) {
    return await SLSqliteService.getProductsList({id});
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

    await SLSqliteService.addProduct({
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

    await SLSqliteService.updateProduct({
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

  static async changeProductStatus({shoppingListId, productId, status}) {
    const onChanged = ({product}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_STATUS_CHANGED,
        data: {shoppingListId, product},
      });
    };
    const onConfirmed = ({product, confirmed}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_STATUS_CHANGE_CONFIRMED,
        data: {shoppingListId, product, confirmed},
      });
    };
    const onError = ({error}) => {
      SystemEventsHandler.onError({
        err: 'ShoppingListService->changeProductStatus()->ERROR: ' + error,
      });
    };

    await SLSqliteService.changeProductStatus({
      shoppingListId,
      productId,
      status,
      onChanged,
      onConfirmed,
      onError,
    });
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

    await SLSqliteService.removeProduct({
      shoppingListId,
      productId,
      onRemoved,
      onConfirmed,
      onError,
    });
  }
}
