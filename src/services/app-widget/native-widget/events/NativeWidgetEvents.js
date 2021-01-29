import NativeWidgetConstants from '../constants/NativeWidgetConstants';

const NativeWidgetEvents = () => {
  const openShoppingListRequestEventPayload = (data) => {
    const {listId} = data;

    let listIdNumber = Number(listId);
    if (Number.isNaN(listIdNumber)) {
      listIdNumber = -1;
    }

    return {
      listId: listIdNumber,
    };
  };

  const changeProductStatusRequestEventPayload = (data) => {
    const {requestId, listId, productId, productStatus} = data;

    let listIdNumber = Number(listId);
    let productIdNumber = Number(productId);
    if (Number.isNaN(listIdNumber)) {
      listIdNumber = -1;
    }
    if (Number.isNaN(productIdNumber)) {
      productIdNumber = -1;
    }

    return {
      requestId,
      listId: listIdNumber,
      productId: productIdNumber,
      productStatus,
    };
  };

  return {
    types: NativeWidgetConstants.widgetEvents,
    openShoppingListRequestEventPayload,
    changeProductStatusRequestEventPayload,
  };
};

export default NativeWidgetEvents();
