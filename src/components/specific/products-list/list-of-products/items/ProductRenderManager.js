import ProductInitialCategories from '../../product-initial-categories/ProductInitialCategories';
import ProductStatus from '../../../../../services/shopping-list/data/product-status/ProductStatus';

class ProductRenderManager {
  static canRender({product, selectedCategoryId}) {
    if (selectedCategoryId === ProductInitialCategories.ALL) {
      return true;
    }

    if (selectedCategoryId === product.categoryId) {
      return true;
    }

    const productCompleted =
      product.completionStatus === ProductStatus.COMPLETED;

    if (selectedCategoryId === ProductInitialCategories.COMPLETED) {
      return productCompleted;
    }

    if (selectedCategoryId === ProductInitialCategories.NOT_COMPLETED) {
      return !productCompleted;
    }

    return false;
  }
}

export default ProductRenderManager;
