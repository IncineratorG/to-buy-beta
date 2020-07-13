const productInputAcceptable = ({productName, quantity, note}) => {
  if (productName && productName.length) {
    return true;
  }

  return false;
};

export default productInputAcceptable;
