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

  static async createShoppingList({listName, creator}) {
    return await SLSqliteService.createShoppingList({
      listName,
      creator,
    });
  }

  static async removeShoppingList({id}) {
    return await SLSqliteService.removeShoppingList({id});
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
    unitId,
    note,
    categoryId,
  }) {
    const onCreated = ({product}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_CREATED,
        data: {shoppingListId, product},
      });
    };
    const onConfirmed = ({product}) => {
      ShoppingListService.#notifier.notify({
        event: ShoppingListServiceEvents.PRODUCT_CONFIRMED,
        data: {shoppingListId, product, confirmed: true},
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
}
