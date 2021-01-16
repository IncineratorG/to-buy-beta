import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';

const MarkProductAsBoughtRequestHandler = () => {
  const handle = async ({request, productToChangeStatusAccumulator}) => {
    if (!productToChangeStatusAccumulator) {
      SystemEventsHandler.onError({
        err: 'MarkProductAsBoughtRequestHandler->NO_ACCUMULATOR',
      });
      return;
    }

    const {listId, productId} = request;
    SystemEventsHandler.onInfo({
      info: 'MarkProductAsBoughtRequestHandler: ' + listId + ' - ' + productId,
    });

    let existedMarkedProductsIdsList = productToChangeStatusAccumulator.get(
      listId,
    );
    if (!existedMarkedProductsIdsList) {
      existedMarkedProductsIdsList = [];
    }
    existedMarkedProductsIdsList.push(productId);

    productToChangeStatusAccumulator.set(listId, existedMarkedProductsIdsList);
  };

  return {
    handle,
  };
};

export default MarkProductAsBoughtRequestHandler();
