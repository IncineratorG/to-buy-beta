import ProductInitialCategories from '../../product-initial-categories/ProductInitialCategories';
import ProductStatus from '../../../../../services/shopping-list/data/product-status/ProductStatus';

class ProductRenderManager {
  static canRender({product, selectedCategoriesIds}) {
    if (selectedCategoriesIds.has(ProductInitialCategories.ALL)) {
      return true;
    }

    if (selectedCategoriesIds.has(product.categoryId)) {
      return true;
    }

    const productCompleted =
      product.completionStatus === ProductStatus.COMPLETED;

    if (selectedCategoriesIds.has(ProductInitialCategories.COMPLETED)) {
      return productCompleted;
    }

    if (selectedCategoriesIds.has(ProductInitialCategories.NOT_COMPLETED)) {
      return !productCompleted;
    }

    return false;
  }
}

export default ProductRenderManager;
