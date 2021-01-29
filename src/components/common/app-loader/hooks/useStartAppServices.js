import {useState, useEffect} from 'react';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const useStartAppServices = () => {
  const [servicesStarted, setServicesStarted] = useState(false);

  useEffect(() => {
    const startAppServices = async () => {
      try {
        await Services.init();
        setServicesStarted(true);
      } catch (e) {
        SystemEventsHandler.onError({
          err:
            'useStartAppServices()->startAppServices()->ERROR: ' + e.toString(),
        });
      }
    };

    startAppServices();
  }, []);

  return {
    servicesStarted,
  };
};

export default useStartAppServices;
