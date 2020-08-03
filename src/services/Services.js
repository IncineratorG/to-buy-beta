import {ShoppingListService} from './shopping-list/ShoppingListService';
import {ShareService} from './share/ShareService';
import ProductSuggestionService from './product-suggestion/ProductSuggestionService';

class ServicesInstance {
  serviceTypes = {
    SHOPPING_LIST: 'SHOPPING_LIST',
    SHARE: 'SHARE',
    PRODUCT_SUGGESTION: 'PRODUCT_SUGGESTION',
  };

  #shoppingListService;
  #shareService;
  #productSuggestionService;
  #className = 'ServicesInstance';

  constructor() {
    this.#shoppingListService = ShoppingListService;
    this.#shareService = ShareService;
    this.#productSuggestionService = ProductSuggestionService;
  }

  async init() {
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

      default: {
        return undefined;
      }
    }
  }
}

const Services = new ServicesInstance();
Object.freeze(Services);

export default Services;
