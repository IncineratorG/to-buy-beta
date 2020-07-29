import {ShoppingListService} from './shopping-list/ShoppingListService';
import {ShareService} from './share/ShareService';

class ServicesInstance {
  serviceTypes = {
    SHOPPING_LIST: 'SHOPPING_LIST',
    SHARE: 'SHARE',
  };

  #shoppingListService;
  #shareService;
  #className = 'ServicesInstance';

  constructor() {
    this.#shoppingListService = ShoppingListService;
    this.#shareService = ShareService;
  }

  async init() {
    await this.#shoppingListService.init();
    await this.#shareService.init();
  }

  get(serviceType) {
    switch (serviceType) {
      case this.serviceTypes.SHOPPING_LIST: {
        return this.#shoppingListService;
      }

      case this.serviceTypes.SHARE: {
        return this.#shareService;
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
