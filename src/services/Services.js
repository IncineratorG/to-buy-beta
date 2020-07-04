import {ShoppingListService} from './shopping-list/ShoppingListService';
import {SystemEventsHandler} from './service-utils/system-events-handler/SystemEventsHandler';

class ServicesInstance {
  serviceTypes = {
    SHOPPING_LIST: 'SHOPPING_LIST',
  };

  #shoppingListService;
  #className = 'ServicesInstance';

  constructor() {
    this.#shoppingListService = ShoppingListService;
  }

  async init() {
    await this.#shoppingListService.init();
  }

  get(serviceType) {
    // SystemEventsHandler.onInfo({
    //   info: this.#className + '->get(): ' + serviceType,
    // });

    switch (serviceType) {
      case this.serviceTypes.SHOPPING_LIST: {
        return this.#shoppingListService;
      }

      default: {
        return undefined;
      }
    }
  }
}

const Services = new ServicesInstance();
Object.freeze(Services);

export default Services;
