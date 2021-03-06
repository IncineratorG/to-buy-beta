import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';

const productInputAcceptable = ({
  productName,
  quantity,
  note,
  productsNames,
}) => {
  if (productName && productName.length) {
    if (productsNames) {
      return !productsNames.has(productName);
    } else {
      return true;
    }
  }

  return false;
};

export default productInputAcceptable;
