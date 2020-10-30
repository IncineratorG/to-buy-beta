import {SystemEventsHandler} from '../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

class ProductsLocationService {
  static async init() {}

  static async locateProduct({productName}) {
    SystemEventsHandler.onInfo({
      info: 'ProductsLocationService->locateProduct(): ' + productName,
    });
  }
}

export default ProductsLocationService;
