import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';

const MarkProductAsBoughtRequestHandler = () => {
  const handle = async ({request}) => {
    const {listId, productId} = request;
    SystemEventsHandler.onInfo({
      info: 'MarkProductAsBoughtRequestHandler: ' + JSON.stringify(request),
    });

    return {shoppingListId: listId, productId};
  };

  return {
    handle,
  };
};

export default MarkProductAsBoughtRequestHandler();
