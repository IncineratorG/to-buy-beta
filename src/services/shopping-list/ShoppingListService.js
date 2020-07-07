import {SLSqliteService} from './sqlite/SLSqliteService';
import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';
import wait from '../service-utils/wait/wait';
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

// import {SLSqliteService} from './sqlite/SLSqliteService';
// import {SystemEventsHandler} from '../service-utils/system-events-handler/SystemEventsHandler';
// import wait from '../service-utils/wait/wait';
// import {Notifier} from '../service-utils/notifier/Notifier';
//
// export class ShoppingListService {
//   notifier = new Notifier();
//
//   constructor() {
//     // this.#notifier = new Notifier();
//     this.str = 'MY_STR';
//   }
//
//   subscribe({event, handler}) {
//     return this.notifier.subscribe({event, handler});
//   }
//
//   async init() {
//     await SLSqliteService.init();
//   }
//
//   async getCategories({shoppingListId}) {
//     return await SLSqliteService.getCategories();
//   }
//
//   async getUnits({shoppingListId}) {
//     return await SLSqliteService.getUnits();
//   }
//
//   async createShoppingList({listName, creator}) {
//     SystemEventsHandler.onInfo({
//       info: 'ShoppingListService->createShoppingList(): ' + listName,
//     });
//
//     return await SLSqliteService.createShoppingList({
//       listName,
//       creator,
//     });
//   }
//
//   async removeShoppingList({id}) {
//     return await SLSqliteService.removeShoppingList({id});
//   }
//
//   async getShoppingLists() {
//     return await SLSqliteService.getShoppingLists();
//   }
//
//   async getProductsList({id}) {
//     return await SLSqliteService.getProductsList({id});
//   }
//
//   addProduct({
//     shoppingListId,
//     name,
//     quantity,
//     unitId,
//     note,
//     categoryId,
//     onCreated,
//     onConfirmed,
//   }) {
//     SystemEventsHandler.onInfo({info: 'ShoppingListService->addProduct()'});
//
//     const product = {
//       name,
//       quantity,
//       unitId,
//       note,
//       categoryId,
//     };
//
//     SystemEventsHandler.onInfo({info: this.str});
//
//     // SystemEventsHandler.onInfo({info: this.notifier === undefined});
//
//     // this.notifier.notify({event: 'CREATED', data: {product}});
//
//     // await wait(1000);
//
//     // this.notifier.notify({event: 'CONFIRMED', data: {product}});
//   }
// }
