import {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import wait from '../../../utils/common/service-utils/wait/wait';

const useTestHook = () => {
  const [appIsVisible, setAppIsVisible] = useState(false);
  const [servicesIsInitialized, setServicesIsInitialized] = useState(false);
  const [commands, setCommands] = useState({one: [], two: []});

  useEffect(() => {
    const appStateChangeHandler = (nextAppState) => {
      if (nextAppState === 'active') {
        setAppIsVisible(true);
      } else {
        setAppIsVisible(false);
      }
    };

    AppState.addEventListener('change', appStateChangeHandler);

    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);

  useEffect(() => {
    const initializeServices = async () => {
      SystemEventsHandler.onInfo({info: 'WILL_INIT_SERVICES'});
      await wait(500);
      setServicesIsInitialized(true);
    };

    initializeServices();
  }, []);

  useEffect(() => {
    if (servicesIsInitialized && appIsVisible) {
      SystemEventsHandler.onInfo({info: 'WILL_COMMUNICATE_WITH_WIDGET'});
    }
  }, [servicesIsInitialized, appIsVisible]);

  return commands;
};

export default useTestHook;
