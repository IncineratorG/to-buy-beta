import {useState, useEffect} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const useWidgetRequests = ({appWidgetService}) => {
  const [widgetRequests, setAppWidgetRequests] = useState(null);

  useEffect(() => {
    const getWidgetRequests = async () => {
      try {
        const appWidgetServiceRequests = await appWidgetService.getAndRemoveAllWidgetRequests();
        setAppWidgetRequests(appWidgetServiceRequests);
      } catch (e) {
        SystemEventsHandler.onError({
          err:
            'useWidgetRequests()->getWidgetRequests()->ERROR: ' + e.toString(),
        });
      }
    };

    if (appWidgetService) {
      getWidgetRequests();
    }
  }, [appWidgetService]);

  return {
    widgetRequests,
  };
};

export default useWidgetRequests;
