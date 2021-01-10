import NativeWidgetConstants from '../../../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import Command from '../../../../../utils/common/command/Command';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';

const OpenShoppingListRequestHandler = () => {
  const handle = ({request}) => {
    const navigationCommandExecutable = ({navigation, dispatch}) => {
      if (!navigation) {
        SystemEventsHandler.onError({
          err:
            'OpenShoppingListRequestHandler->navigationCommandExecutable: NO_NAVIGATION',
        });
        return;
      } else if (!dispatch) {
        SystemEventsHandler.onError({
          err:
            'OpenShoppingListRequestHandler->navigationCommandExecutable: NO_DISPATCH',
        });
        return;
      }

      SystemEventsHandler.onInfo({
        info:
          'OpenShoppingListRequestHandler->navigationCommandExecutable: ' +
          JSON.stringify(request),
      });
    };

    const navigationCommand = Command(navigationCommandExecutable);

    return {
      navigationCommand,
    };
  };

  return {
    handle,
  };
};

export default OpenShoppingListRequestHandler();

// import NativeWidgetConstants from '../../../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
//
// const OpenShoppingListRequestHandler = () => {
//   const {OPEN_SHOPPING_LIST_REQUEST} = NativeWidgetConstants.widgetRequests;
//
//   const handle = ({request}) => {
//     if (request.type === OPEN_SHOPPING_LIST_REQUEST) {
//       return {
//         shoppingListId: request.listId,
//       };
//     }
//   };
//
//   return {
//     handle,
//   };
// };
//
// export default OpenShoppingListRequestHandler();
