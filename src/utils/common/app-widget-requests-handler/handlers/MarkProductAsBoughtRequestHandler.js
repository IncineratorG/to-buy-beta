import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';

const MarkProductAsBoughtRequestHandler = () => {
  const handle = async ({request, productToChangeStatusAccumulator}) => {
    if (!productToChangeStatusAccumulator) {
      SystemEventsHandler.onError({
        err: 'MarkProductAsBoughtRequestHandler->NO_ACCUMULATOR',
      });
      return;
    }

    // const {listId, productId} = request;
    // const integerListId = Number(listId);
    // const integerProductId = Number(productId);

    SystemEventsHandler.onInfo({
      info: 'MarkProductAsBoughtRequestHandler: ' + JSON.stringify(request),
    });
  };

  return {
    handle,
  };
};

export default MarkProductAsBoughtRequestHandler();

// import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';
//
// const MarkProductAsBoughtRequestHandler = () => {
//   const handle = async ({request, productToChangeStatusAccumulator}) => {
//     if (!productToChangeStatusAccumulator) {
//       SystemEventsHandler.onError({
//         err: 'MarkProductAsBoughtRequestHandler->NO_ACCUMULATOR',
//       });
//       return;
//     }
//
//     const {listId, productId} = request;
//     const integerListId = Number(listId);
//     const integerProductId = Number(productId);
//
//     SystemEventsHandler.onInfo({
//       info:
//         'MarkProductAsBoughtRequestHandler: ' +
//         integerListId +
//         ' - ' +
//         integerProductId,
//     });
//
//     let existedMarkedProductsIdsList = productToChangeStatusAccumulator.get(
//       integerListId,
//     );
//     if (!existedMarkedProductsIdsList) {
//       existedMarkedProductsIdsList = [];
//     }
//     existedMarkedProductsIdsList.push(integerProductId);
//
//     productToChangeStatusAccumulator.set(
//       integerListId,
//       existedMarkedProductsIdsList,
//     );
//   };
//
//   return {
//     handle,
//   };
// };
//
// export default MarkProductAsBoughtRequestHandler();
