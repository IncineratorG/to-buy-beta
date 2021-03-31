import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../services/Services';

export const useReadListFromMessageController = (model) => {
  const testButtonHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'useReadListFromMessageController->testButtonHandler()',
    });

    const shareService = Services.get(Services.serviceTypes.SHARE);
    shareService.getSmsInbox();
  };

  return {
    testButtonHandler,
  };
};
