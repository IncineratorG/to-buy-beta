import {ShoppingListService} from './shopping-list/ShoppingListService';
import {ShareService} from './share/ShareService';
import ProductSuggestionService from './product-suggestion/ProductSuggestionService';
import SystemService from './system/SystemService';
import ProductsLocationService from './products-location/ProductsLocationService';
import AppWidgetService from './app-widget/AppWidgetService';
import ProductStatus from './shopping-list/data/product-status/ProductStatus';
import {SystemEventsHandler} from '../utils/common/system-events-handler/SystemEventsHandler';

class ServicesInstance {
  serviceTypes = {
    SHOPPING_LIST: 'SHOPPING_LIST',
    SHARE: 'SHARE',
    PRODUCT_SUGGESTION: 'PRODUCT_SUGGESTION',
    SYSTEM: 'SYSTEM',
    PRODUCTS_LOCATION: 'PRODUCTS_LOCATION',
    APP_WIDGET: 'APP_WIDGET',
  };

  #shoppingListService;
  #shareService;
  #productSuggestionService;
  #systemService;
  #productsLocationService;
  #appWidgetService;
  #className = 'ServicesInstance';

  constructor() {
    this.#shoppingListService = ShoppingListService;
    this.#shareService = ShareService;
    this.#productSuggestionService = ProductSuggestionService;
    this.#systemService = SystemService;
    this.#productsLocationService = ProductsLocationService;
    this.#appWidgetService = AppWidgetService();
  }

  async init() {
    await this.#systemService.init();
    await this.#shoppingListService.init(false);
    await this.#shareService.init();
    await this.#productSuggestionService.init();
    await this.#productsLocationService.init();

    // ===
    // const shoppingListsWithProducts = await this.#shoppingListService.getShoppingListsWithProducts(
    //   {productsStatus: ProductStatus.NOT_COMPLETED},
    // );
    // ===
    // const shoppingListsNoProducts = await this.#shoppingListService.getShoppingLists();
    await this.#appWidgetService.init();
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

      case this.serviceTypes.APP_WIDGET: {
        return this.#appWidgetService;
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
