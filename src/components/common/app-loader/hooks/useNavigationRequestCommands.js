import {useState, useEffect} from 'react';
import NativeWidgetConstants from '../../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import OpenShoppingListRequestHandler from '../../../../utils/common/app-widget-requests-handler/handlers/OpenShoppingListRequestHandler';

const useNavigationRequestCommands = ({widgetRequests}) => {
  const [navigationCommands, setNavigationCommands] = useState([]);

  const {OPEN_SHOPPING_LIST_REQUEST} = NativeWidgetConstants.widgetRequests;

  useEffect(() => {
    if (widgetRequests && widgetRequests.length) {
      const widgetNavigationRequestsArray = widgetRequests.filter(
        (request) => request.type === OPEN_SHOPPING_LIST_REQUEST,
      );

      if (widgetNavigationRequestsArray.length > 0) {
        const lastNavigationRequest =
          widgetNavigationRequestsArray[
            widgetNavigationRequestsArray.length - 1
          ];

        const {navigationCommand} = OpenShoppingListRequestHandler.handle({
          request: lastNavigationRequest,
        });

        const navigationCommandsArray = navigationCommand
          ? [navigationCommand]
          : [];
        setNavigationCommands(navigationCommandsArray);
      } else {
        setNavigationCommands([]);
      }
    } else {
      setNavigationCommands([]);
    }
  }, [widgetRequests, OPEN_SHOPPING_LIST_REQUEST]);

  return {
    navigationCommands,
  };
};

export default useNavigationRequestCommands;
