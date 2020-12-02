import {ShoppingListService} from './shopping-list/ShoppingListService';
import {ShareService} from './share/ShareService';
import ProductSuggestionService from './product-suggestion/ProductSuggestionService';
import SystemService from './system/SystemService';
import ProductsLocationService from './products-location/ProductsLocationService';

class ServicesInstance {
  serviceTypes = {
    SHOPPING_LIST: 'SHOPPING_LIST',
    SHARE: 'SHARE',
    PRODUCT_SUGGESTION: 'PRODUCT_SUGGESTION',
    SYSTEM: 'SYSTEM',
    PRODUCTS_LOCATION: 'PRODUCTS_LOCATION',
  };

  #shoppingListService;
  #shareService;
  #productSuggestionService;
  #systemService;
  #productsLocationService;
  #className = 'ServicesInstance';

  constructor() {
    this.#shoppingListService = ShoppingListService;
    this.#shareService = ShareService;
    this.#productSuggestionService = ProductSuggestionService;
    this.#systemService = SystemService;
    this.#productsLocationService = ProductsLocationService;
  }

  async init() {
    await this.#systemService.init();
    await this.#shoppingListService.init(true);
    await this.#shareService.init();
    await this.#productSuggestionService.init();
    await this.#productsLocationService.init();
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

      case this.serviceTypes.PRODUCTS_LOCATION: {
        return this.#productsLocationService;
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
