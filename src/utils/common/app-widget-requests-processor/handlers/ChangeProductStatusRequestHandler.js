import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';

const ChangeProductStatusRequestHandler = () => {
  const handle = ({request}) => {
    SystemEventsHandler.onInfo({
      info: 'ChangeProductStatusRequestHandler: ' + JSON.stringify(request),
    });

    const {listId, productId, productStatus} = request;

    return {
      listId,
      productId,
      productStatus,
    };
  };

  return {
    handle,
  };
};

export default ChangeProductStatusRequestHandler();
