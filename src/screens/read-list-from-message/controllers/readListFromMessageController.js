import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

export const useReadListFromMessageController = (model) => {
  const testButtonHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'useReadListFromMessageController->testButtonHandler()',
    });
  };

  return {
    testButtonHandler,
  };
};
