import {useState, useEffect} from 'react';
import NativeWidgetConstants from '../../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import OpenShoppingListRequestHandler from '../../../../utils/common/app-widget-requests-handler/handlers/OpenShoppingListRequestHandler';
import {useSelector} from 'react-redux';

const useNavigationRequestCommands = ({widgetRequests}) => {
  const [navigationCommands, setNavigationCommands] = useState([]);

  const {OPEN_SHOPPING_LIST_REQUEST} = NativeWidgetConstants.widgetRequests;

  const currentShoppingListId = useSelector(
    (storeState) => storeState.productsList.productsList.id,
  );

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
          currentShoppingListId,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetRequests, OPEN_SHOPPING_LIST_REQUEST]);

  return {
    navigationCommands,
  };
};

export default useNavigationRequestCommands;
