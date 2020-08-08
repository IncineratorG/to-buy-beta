import {ShoppingListService} from './shopping-list/ShoppingListService';
import {ShareService} from './share/ShareService';
import ProductSuggestionService from './product-suggestion/ProductSuggestionService';
import SystemService from './system/SystemService';

class ServicesInstance {
  serviceTypes = {
    SHOPPING_LIST: 'SHOPPING_LIST',
    SHARE: 'SHARE',
    PRODUCT_SUGGESTION: 'PRODUCT_SUGGESTION',
    SYSTEM: 'SYSTEM',
  };

  #shoppingListService;
  #shareService;
  #productSuggestionService;
  #systemService;
  #className = 'ServicesInstance';

  constructor() {
    this.#shoppingListService = ShoppingListService;
    this.#shareService = ShareService;
    this.#productSuggestionService = ProductSuggestionService;
    this.#systemService = SystemService;
  }

  async init() {
    await this.#systemService.init();
    await this.#shoppingListService.init();
    await this.#shareService.init();
    await this.#productSuggestionService.init();
  }

  get(serviceType) {
    switch (serviceType) {
      case this.serviceTypes.SHOPPING_LIST: {
        return this.#shoppingListService;
      }

      case this.serviceTypes.SHARE: {
        return this.#shareService;
      }

      case this.serviceTypes.PRODUCT_SUGGESTION: {
        return this.#productSuggestionService;
      }

      case this.serviceTypes.SYSTEM: {
        return this.#systemService;
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
