import Command from '../../command/Command';
import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';
import {loadCategoriesAction} from '../../../../store/actions/categories/categoriesActions';
import {loadUnitsAction} from '../../../../store/actions/units/unitsActions';
import {loadProductsListAction} from '../../../../store/actions/products-list/productsListActions';
import {updateShoppingListsAction} from '../../../../store/actions/shopping-lists/shoppingListsActions';

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

      const {listId: listIdString} = request;
      if (!listIdString) {
        SystemEventsHandler.onInfo({
          info:
            'OpenShoppingListRequestHandler->navigationCommandExecutable: NO_LIST_ID',
        });
        return;
      }

      // ===
      SystemEventsHandler.onInfo({info: JSON.stringify(request)});
      // ===

      const listId = Number(listIdString);
      if (listId < 0) {
        // SystemEventsHandler.onInfo({
        //   info:
        //     'OpenShoppingListRequestHandler->navigationCommandExecutable->UNDER_ZERO: ' +
        //     listId,
        // });

        navigation.reset({
          index: 0,
          routes: [{name: 'ShoppingLists'}],
        });

        dispatch(updateShoppingListsAction());
      } else {
        // SystemEventsHandler.onInfo({
        //   info:
        //     'OpenShoppingListRequestHandler->navigationCommandExecutable->OVER_ZERO: ' +
        //     listId,
        // });

        navigation.reset({
          index: 0,
          routes: [{name: 'ShoppingLists'}],
        });
        navigation.navigate('ProductsList');

        dispatch(loadCategoriesAction({shoppingListId: listId}));
        dispatch(loadUnitsAction({shoppingListId: listId}));
        dispatch(loadProductsListAction({shoppingListId: listId}));
      }
    };

    const navigationCommand = Command({
      executable: navigationCommandExecutable,
    });

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
