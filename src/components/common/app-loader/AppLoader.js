import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AppNavigation from '../app-navigation/AppNavigation';
import AppLoading from '../app-loading/AppLoading';
import Services from '../../../services/Services';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import wait from '../../../utils/common/service-utils/wait/wait';
import {loadShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';

const AppLoader = () => {
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const initFunc = async () => {
      await wait(1000);

      try {
        await Services.init();
        await dispatch(loadShoppingListsAction());
      } catch (e) {
        SystemEventsHandler.onError({err: 'AppLoader->init()->ERROR'});
      }

      setReady(true);
    };

    initFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ready) {
    return <AppNavigation />;
  } else {
    return <AppLoading />;
  }
};

export default AppLoader;
