import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import {SLInitOperations} from './operations/init/SLInitOperations';
import {CategoriesTableOperations} from './operations/categories-table/CategoriesTableOperations';
import {UnitsTableOperations} from './operations/units-table/UnitsTableOperations';
import {ShoppingListsTableOperations} from './operations/shopping-lists-table/ShoppingListsTableOperations';
import {ProductsTableOperations} from './operations/products-table/ProductsTableOperations';
import ProductStatus from '../../data/product-status/ProductStatus';

const DB_NAME = 'tobuy_shopping_list.db';

const SQlite = require('react-native-sqlite-storage');

const slSqliteFunctionsService = () => {
  const className = 'slSqliteFunctionsService';
  let db;

  const init = async () => {
    SystemEventsHandler.onInfo({info: className + '->init()'});
    if (!db) {
      db = await SLInitOperations.init(SQlite, DB_NAME);
    }
  };

  const getCategories = async () => {
    return await CategoriesTableOperations.getCategories({
      db: db,
    });
  };

  const addCategory = async ({name, color}) => {
    if (!name || !color) {
      return {hasError: true};
    }

    const {id, hasError} = await CategoriesTableOperations.addCategory({
      db: db,
      name,
      color,
    });
    if (hasError) {
      return {hasError};
    }

    const categories = await CategoriesTableOperations.getCategories({
      db: db,
    });

    const filteredCategories = categories.filter(
      (category) => category.id === id,
    );
    if (filteredCategories.length) {
      return filteredCategories[0];
    } else {
      return {hasError: true};
    }
  };

  const updateCategory = async ({id, name, color}) => {
    const {hasError} = await CategoriesTableOperations.updateCategory({
      db: db,
      id,
      name,
      color,
    });
    if (hasError) {
      return {hasError};
    }

    const categories = await CategoriesTableOperations.getCategories({
      db: db,
    });

    const filteredCategories = categories.filter(
      (category) => category.id === id,
    );
    if (filteredCategories.length) {
      return filteredCategories[0];
    } else {
      return {hasError: true};
    }
  };

  const removeCategory = async ({id}) => {
    const {hasError} = await CategoriesTableOperations.removeCategory({
      db: db,
      id,
    });
    if (hasError) {
      return {hasError};
    }

    const categories = await CategoriesTableOperations.getCategories({
      db: db,
    });

    const filteredCategories = categories.filter(
      (category) => category.id === id,
    );
    if (filteredCategories.length) {
      return filteredCategories[0];
    } else {
      return {hasError: true};
    }
  };

  const getUnits = async () => {
    return await UnitsTableOperations.getUnits({db: db});
  };

  const addUnit = async ({name}) => {
    if (!name) {
      return {hasError: true};
    }

    const {id, hasError} = await UnitsTableOperations.addUnit({
      db: db,
      name,
    });
    if (hasError) {
      return {hasError};
    }

    const units = await UnitsTableOperations.getUnits({db: db});

    const filteredUnits = units.filter((unit) => unit.id === id);
    if (filteredUnits.length) {
      return filteredUnits[0];
    } else {
      return {hasError: true};
    }
  };

  const updateUnit = async ({id, name}) => {
    const {hasError} = await UnitsTableOperations.updateUnit({
      db: db,
      id,
      name,
    });
    if (hasError) {
      return {hasError};
    }

    const units = await UnitsTableOperations.getUnits({db: db});

    const filteredUnits = units.filter((unit) => unit.id === id);
    if (filteredUnits.length) {
      return filteredUnits[0];
    } else {
      return {hasError: true};
    }
  };

  const removeUnit = async ({id}) => {
    const {hasError} = await UnitsTableOperations.removeUnit({
      db: db,
      id,
    });
    if (hasError) {
      return {hasError};
    }

    const units = await UnitsTableOperations.getUnits({db: db});

    const filteredUnits = units.filter((unit) => unit.id === id);
    if (filteredUnits.length) {
      return filteredUnits[0];
    } else {
      return {hasError: true};
    }
  };

  const createShoppingList = async ({listName, creator}) => {
    const {id} = await ShoppingListsTableOperations.createShoppingList({
      db: db,
      listName,
    });

    const {shoppingList} = await ShoppingListsTableOperations.getShoppingList({
      db: db,
      id,
    });

    return shoppingList;
  };

  const removeShoppingList = async ({id}) => {
    const {
      hasError: listRemoveError,
    } = await ShoppingListsTableOperations.removeShoppingList({
      db: db,
      id,
    });

    if (listRemoveError) {
      return false;
    }

    const {
      hasError: productsRemoveError,
    } = await ProductsTableOperations.removeProductsWithShoppingListId({
      db: db,
      id,
    });

    return !productsRemoveError;
  };

  const renameShoppingList = async ({id, newName}) => {
    const {hasError} = await ShoppingListsTableOperations.renameShoppingList({
      db: db,
      id,
      newName,
    });
    if (hasError) {
      return undefined;
    }

    const {shoppingList} = await ShoppingListsTableOperations.getShoppingList({
      db: db,
      id,
    });

    return shoppingList;
  };

  const getShoppingLists = async () => {
    const {
      shoppingLists,
    } = await ShoppingListsTableOperations.getShoppingLists({db: db});

    return shoppingLists;
  };

  const getProductsList = async ({id}) => {
    const {shoppingList} = await ShoppingListsTableOperations.getShoppingList({
      db: db,
      id,
    });

    const {products} = await ProductsTableOperations.getShoppingListProducts({
      db: db,
      listId: id,
    });

    shoppingList.products = products;

    return shoppingList;
  };

  const copyShoppingList = async ({shoppingListId, copiedListName}) => {
    const result = {
      shoppingList: undefined,
      error: {hasError: false, description: ''},
    };

    const {
      products,
      hasError: getProductsError,
    } = await ProductsTableOperations.getShoppingListProducts({
      db: db,
      listId: shoppingListId,
    });
    if (getProductsError) {
      result.error.hasError = true;
      result.error.description = 'GET_PRODUCTS_ERROR';
      return result;
    }

    const {
      id: copiedListId,
      hasError: createListError,
    } = await ShoppingListsTableOperations.createShoppingList({
      db: db,
      listName: copiedListName,
    });
    if (createListError) {
      result.error.hasError = true;
      result.error.description = 'CREATE_LIST_ERROR';
      return result;
    }

    const {
      hasError: addProductsError,
    } = await ProductsTableOperations.addMultipleProducts({
      db: db,
      shoppingListId: copiedListId,
      products,
    });
    if (addProductsError) {
      result.error.hasError = true;
      result.error.description = 'ADD_PRODUCTS_ERROR';
      return result;
    }

    const {
      products: completedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId: copiedListId,
      status: ProductStatus.COMPLETED,
    });

    const {
      products: notCompletedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId: copiedListId,
      status: ProductStatus.NOT_COMPLETED,
    });

    const completedProductsCount = completedProducts.length;
    const totalProductsCount =
      completedProducts.length + notCompletedProducts.length;

    const {
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: db,
      id: copiedListId,
      totalProductsCount,
      completedProductsCount,
    });
    if (updateShoppingListError) {
      result.error.hasError = true;
      result.error.description = 'UPDATE_SHOPPING_LIST_ERROR';
      return result;
    }

    result.shoppingList = await this.getProductsList({id: copiedListId});
    return result;
  };

  const addProduct = async ({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    categoryId,
    onCreated,
    onConfirmed,
    onError,
  }) => {
    const {id} = await ProductsTableOperations.addProduct({
      db: db,
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      categoryId,
    });

    if (!id) {
      if (onError) {
        onError({error: 'SLSqliteService->addProduct()->ADD_PRODUCT_ERROR'});
      }
      return false;
    }

    const {product} = await ProductsTableOperations.getProduct({
      db: db,
      id,
    });

    if (onCreated) {
      onCreated({product});
    }

    const {
      products: completedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.COMPLETED,
    });

    const {
      products: notCompletedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.NOT_COMPLETED,
    });

    const completedProductsCount = completedProducts.length;
    const totalProductsCount =
      completedProducts.length + notCompletedProducts.length;

    const {
      hasError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });

    if (hasError) {
      if (onError) {
        onError({
          error: 'SLSqliteService->addProduct()->UPDATE_SHOPPING_LIST_ERROR',
        });
      }
      return false;
    }

    if (onConfirmed) {
      onConfirmed({product, confirmed: true});
    }

    return true;
  };

  const updateProduct = async ({
    shoppingListId,
    productId,
    name,
    quantity,
    note,
    unitId,
    categoryId,
    onUpdated,
    onConfirmed,
    onError,
  }) => {
    const {hasError} = await ProductsTableOperations.updateProduct({
      db: db,
      productId,
      name,
      quantity,
      note,
      unitId,
      categoryId,
    });
    if (hasError) {
      if (onError) {
        onError({
          error: 'SLSqliteService->updateProduct()->UPDATE_PRODUCT_ERROR',
        });
      }
      return false;
    }

    const {product} = await ProductsTableOperations.getProduct({
      db: db,
      id: productId,
    });

    if (onUpdated) {
      onUpdated({product});
    }

    if (onConfirmed) {
      onConfirmed({product, confirmed: true});
    }

    return true;
  };

  const changeProductStatus = async ({
    shoppingListId,
    productId,
    status,
    onChanged,
    onConfirmed,
    onError,
  }) => {
    if (
      status !== ProductStatus.COMPLETED &&
      status !== ProductStatus.NOT_COMPLETED
    ) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->changeProductStatus()->BAD_PRODUCT_STATUS: ' +
            status,
        });
      }
      return false;
    }

    const {hasError} = await ProductsTableOperations.changeProductStatus({
      db: db,
      productId,
      status,
    });
    if (hasError) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->changeProductStatus()->CHANGE_PRODUCT_STATUS_ERROR: ',
        });
      }
      return false;
    }

    const {product} = await ProductsTableOperations.getProduct({
      db: db,
      id: productId,
    });

    if (onChanged) {
      onChanged({product});
    }

    // ===
    const {
      products: completedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.COMPLETED,
    });

    const {
      products: notCompletedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.NOT_COMPLETED,
    });

    const completedProductsCount = completedProducts.length;
    const totalProductsCount =
      completedProducts.length + notCompletedProducts.length;

    const {
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });
    // ===

    if (onConfirmed) {
      onConfirmed({product, confirmed: true});
    }

    return true;
  };

  const changeMultipleProductsStatus = async ({
    shoppingListId,
    productsIdsArray,
    status,
    onChanged,
    onConfirmed,
    onError,
  }) => {
    if (
      status !== ProductStatus.COMPLETED &&
      status !== ProductStatus.NOT_COMPLETED
    ) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->changeMultipleProductsStatus()->BAD_PRODUCT_STATUS: ' +
            status,
        });
      }
      return false;
    }

    const {
      hasError: changeStatusError,
    } = await ProductsTableOperations.changeMultipleProductsStatus({
      db: db,
      productsIds: productsIdsArray,
      status,
    });
    if (changeStatusError) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->changeMultipleProductsStatus()->CHANGE_PRODUCTS_STATUS_ERROR',
        });
      }
      return false;
    }

    const {products} = await ProductsTableOperations.getProducts({
      db: db,
      productsIds: productsIdsArray,
    });

    if (onChanged) {
      onChanged({productsArray: products});
    }

    const {
      products: completedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.COMPLETED,
    });

    const {
      products: notCompletedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.NOT_COMPLETED,
    });

    const completedProductsCount = completedProducts.length;
    const totalProductsCount =
      completedProducts.length + notCompletedProducts.length;

    const {
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });

    if (onConfirmed) {
      onConfirmed({productsArray: products, confirmed: true});
    }

    return true;
  };

  const removeProduct = async ({
    shoppingListId,
    productId,
    onRemoved,
    onConfirmed,
    onError,
  }) => {
    const {hasError} = await ProductsTableOperations.removeProduct({
      db: db,
      id: productId,
    });
    if (hasError) {
      if (onError) {
        onError({
          error: 'SLSqliteService->removeProduct()->REMOVE_PRODUCT_ERROR: ',
        });
      }
      return false;
    }

    if (onRemoved) {
      onRemoved({productId});
    }

    const {
      products: completedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.COMPLETED,
    });

    const {
      products: notCompletedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.NOT_COMPLETED,
    });

    const completedProductsCount = completedProducts.length;
    const totalProductsCount =
      completedProducts.length + notCompletedProducts.length;

    const {
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });

    if (updateShoppingListError) {
      if (onError) {
        onError({
          error: 'SLSqliteService->removeProduct()->UPDATE_SHOPPING_LIST_ERROR',
        });
      }
      return false;
    }

    if (onConfirmed) {
      onConfirmed({productId, confirmed: true});
    }

    return true;
  };

  const removeMultipleProducts = async ({
    shoppingListId,
    productsIdsArray,
    onRemoved,
    onConfirmed,
    onError,
  }) => {
    const {
      hasError: removeProductsError,
    } = await ProductsTableOperations.removeMultipleProducts({
      db: db,
      productsIds: productsIdsArray,
    });
    if (removeProductsError) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->removeMultipleProducts()->REMOVE_MULTIPLE_PRODUCTS_ERROR',
        });
      }
      return false;
    }

    if (onRemoved) {
      onRemoved();
    }

    const {
      products: completedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.COMPLETED,
    });

    const {
      products: notCompletedProducts,
    } = await ProductsTableOperations.getListProductsWithStatus({
      db: db,
      shoppingListId,
      status: ProductStatus.NOT_COMPLETED,
    });

    const completedProductsCount = completedProducts.length;
    const totalProductsCount =
      completedProducts.length + notCompletedProducts.length;

    const {
      hasError: updateShoppingListError,
    } = await ShoppingListsTableOperations.updateShoppingListProductsCount({
      db: db,
      id: shoppingListId,
      totalProductsCount,
      completedProductsCount,
    });

    if (updateShoppingListError) {
      if (onError) {
        onError({
          error:
            'SLSqliteService->removeMultipleProducts()->UPDATE_SHOPPING_LIST_ERROR',
        });
      }
      return false;
    }

    if (onConfirmed) {
      onConfirmed({confirmed: true});
    }

    return true;
  };

  return {
    init,
    getCategories,
    addCategory,
    updateCategory,
    removeCategory,
    getUnits,
    addUnit,
    updateUnit,
    removeUnit,
    createShoppingList,
    removeShoppingList,
    renameShoppingList,
    getShoppingLists,
    getProductsList,
    copyShoppingList,
    addProduct,
    updateProduct,
    changeProductStatus,
    changeMultipleProductsStatus,
    removeProduct,
    removeMultipleProducts,
  };
};

export default slSqliteFunctionsService;
