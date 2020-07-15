import React from 'react';
import ProductNotCompleted from './not-completed/ProductNotCompleted';
import {productNotCompletedStyles} from './not-completed/styles/productNotCompletedStyles';
import ProductCompleted from './completed/ProductCompleted';
import {productCompletedStyles} from './completed/styles/productCompletedStyles';
import ProductExtra from './extra/ProductExtra';
import {productExtraStyles} from './extra/styles/productExtraStyles';
import ProductStatus from '../../../../../services/shopping-list/data/product-status/ProductStatus';
import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';

const Product = ({
  product,
  onProductPress,
  onProductLongPress,
  onStatusPress,
  unitsMap,
  categoriesMap,
}) => {
  const productNotCompleted = (
    <ProductNotCompleted
      styles={productNotCompletedStyles}
      product={product}
      categoriesMap={categoriesMap}
      unitsMap={unitsMap}
      onProductPress={onProductPress}
      onProductLongPress={onProductLongPress}
      onStatusPress={onStatusPress}
    />
  );

  const productCompleted = (
    <ProductCompleted
      styles={productCompletedStyles}
      product={product}
      unitsMap={unitsMap}
      onProductLongPress={onProductLongPress}
      onStatusPress={onStatusPress}
    />
  );

  const productExtra = <ProductExtra styles={productExtraStyles} />;

  if (product.extra) {
    return productExtra;
  }

  const productIsCompleted =
    product.completionStatus === ProductStatus.COMPLETED;

  if (productIsCompleted) {
    return productCompleted;
  } else if (!productIsCompleted) {
    return productNotCompleted;
  } else {
    return null;
  }
};

export default React.memo(Product);

// import React from 'react';
// import ProductNotCompleted from './not-completed/ProductNotCompleted';
// import {productNotCompletedStyles} from './not-completed/styles/productNotCompletedStyles';
// import ProductCompleted from './completed/ProductCompleted';
// import {productCompletedStyles} from './completed/styles/productCompletedStyles';
// import ProductExtra from './extra/ProductExtra';
// import {productExtraStyles} from './extra/styles/productExtraStyles';
// import ProductStatus from '../../../../../services/shopping-list/data/product-status/ProductStatus';
// import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
//
// const Product = ({
//   product,
//   onProductPress,
//   onProductLongPress,
//   onStatusPress,
//   unitsMap,
//   categoriesMap,
//   selectedCategoriesIds,
// }) => {
//   const productNotCompleted = (
//     <ProductNotCompleted
//       styles={productNotCompletedStyles}
//       product={product}
//       categoriesMap={categoriesMap}
//       selectedCategoriesIds={selectedCategoriesIds}
//       unitsMap={unitsMap}
//       onProductPress={onProductPress}
//       onProductLongPress={onProductLongPress}
//       onStatusPress={onStatusPress}
//     />
//   );
//
//   const productCompleted = (
//     <ProductCompleted
//       styles={productCompletedStyles}
//       product={product}
//       unitsMap={unitsMap}
//       selectedCategoriesIds={selectedCategoriesIds}
//       onProductLongPress={onProductLongPress}
//       onStatusPress={onStatusPress}
//     />
//   );
//
//   const productExtra = <ProductExtra styles={productExtraStyles} />;
//
//   if (product.extra) {
//     return productExtra;
//   } else if (product.completionStatus === ProductStatus.COMPLETED) {
//     return productCompleted;
//   } else if (product.completionStatus === ProductStatus.NOT_COMPLETED) {
//     return productNotCompleted;
//   } else {
//     return null;
//   }
// };
//
// export default React.memo(Product);
