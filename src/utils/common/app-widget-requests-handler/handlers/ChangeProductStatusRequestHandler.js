const ChangeProductStatusRequestHandler = () => {
  const handle = ({request}) => {
    const {listId, productId, productStatus} = request;

    return {
      listId: Number(listId),
      productId: Number(productId),
      productStatus,
    };
  };

  return {
    handle,
  };
};

export default ChangeProductStatusRequestHandler();
