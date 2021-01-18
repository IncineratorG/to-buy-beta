import Services from '../../../../../services/Services';
import ProductStatus from '../../../../../services/shopping-list/data/product-status/ProductStatus';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';

const AppWidgetSagaHelpers = () => {
  const getShoppingListData = async ({shoppingListId}) => {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const shoppingListData = await shoppingListService.getProductsList({
      id: shoppingListId,
      productStatus: ProductStatus.NOT_COMPLETED,
    });
    if (!shoppingListData || !shoppingListData.id) {
      SystemEventsHandler.onError({
        err:
          'AppWidgetSagaHelpers->getShoppingListData(): BAD_SHOPPING_LIST_DATA',
      });
      return null;
    }

    // ===
    // shoppingListData.products.forEach((product) => {
    //   SystemEventsHandler.onInfo({info: JSON.stringify(product)});
    // });
    // ===

    return {
      listId: shoppingListData.id,
      listName: shoppingListData.name,
      productsList: shoppingListData.products,
    };
  };

  return {
    getShoppingListData,
  };
};

export default AppWidgetSagaHelpers();
