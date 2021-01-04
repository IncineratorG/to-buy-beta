import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';

const SLServiceMethodResultValidators = {
  getCategories: (data) => {
    SystemEventsHandler.onInfo({
      info: 'SLServiceMethodResultValidators->getCategories',
    });
  },
};

export default SLServiceMethodResultValidators;
