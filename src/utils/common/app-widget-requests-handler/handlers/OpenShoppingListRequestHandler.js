// import Command from '../../command/Command';
// import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';
// import {loadCategoriesAction} from '../../../../store/actions/categories/categoriesActions';
// import {loadUnitsAction} from '../../../../store/actions/units/unitsActions';
// import {loadProductsListAction} from '../../../../store/actions/products-list/productsListActions';
// import {updateShoppingListsAction} from '../../../../store/actions/shopping-lists/shoppingListsActions';
//
// const OpenShoppingListRequestHandler = () => {
//   const handle = ({request}) => {
//     SystemEventsHandler.onInfo({
//       info: 'OpenShoppingListRequestHandler: ' + JSON.stringify(request),
//     });
//   };
//
//   return {
//     handle,
//   };
// };
//
// export default OpenShoppingListRequestHandler();

import Command from '../../command/Command';
import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';
import {loadCategoriesAction} from '../../../../store/actions/categories/categoriesActions';
import {loadUnitsAction} from '../../../../store/actions/units/unitsActions';
import {loadProductsListAction} from '../../../../store/actions/products-list/productsListActions';
import appWidgetActions from '../../../../store/actions/app-widget/appWidgetActions';

const OpenShoppingListRequestHandler = () => {
  const handle = ({request, currentShoppingListId}) => {
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
      // SystemEventsHandler.onInfo({
      //   info:
      //     'NAVIGATION_REQUEST->CURRENT_SHOPPING_LIST_ID: ' +
      //     currentShoppingListId,
      // });
      // ===

      const listId = Number(listIdString);
      if (listId < 0 || listId === currentShoppingListId) {
        // SystemEventsHandler.onInfo({
        //   info:
        //     'OpenShoppingListRequestHandler->navigationCommandExecutable->UNDER_ZERO: ' +
        //     listId,
        // });
        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'ShoppingLists'}],
        // });
        //
        // dispatch(updateShoppingListsAction());

        dispatch(appWidgetActions.resetRequestedToOpenShoppingListId());
      } else {
        // SystemEventsHandler.onInfo({
        //   info:
        //     'OpenShoppingListRequestHandler->navigationCommandExecutable->OVER_ZERO: ' +
        //     listId,
        // });

        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'ShoppingLists'}],
        // });
        navigation.navigate('ProductsList');

        dispatch(loadCategoriesAction({shoppingListId: listId}));
        dispatch(loadUnitsAction({shoppingListId: listId}));
        dispatch(loadProductsListAction({shoppingListId: listId}));
        dispatch(appWidgetActions.resetRequestedToOpenShoppingListId());
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
