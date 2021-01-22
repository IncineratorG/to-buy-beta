import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';

const ChangeProductStatusRequestHandler = () => {
  const handle = ({request}) => {
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
