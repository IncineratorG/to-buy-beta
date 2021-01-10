import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingLists from '../../../screens/shopping-lists/ShoppingLists';
import {useTranslation} from '../../../utils/common/localization';
import CreateShoppingList from '../../../screens/create-shopping-list/CreateShoppingList';
import ProductsList from '../../../screens/products-list/ProductsList';
import ProductsLocation from '../../../screens/products-location/ProductsLocation';
import VoiceInputTest from '../../../screens/voice-input-test/VoiceInputTest';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import {useDispatch} from 'react-redux';
import {loadCategoriesAction} from '../../../store/actions/categories/categoriesActions';
import {loadUnitsAction} from '../../../store/actions/units/unitsActions';
import {loadProductsListAction} from '../../../store/actions/products-list/productsListActions';
import {updateShoppingListsAction} from '../../../store/actions/shopping-lists/shoppingListsActions';
import {CommonActions} from '@react-navigation/native';

const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();

const AppNavigation = ({navigationCommands}) => {
  // ===
  SystemEventsHandler.onInfo({
    info:
      'AppNavigation->NAVIGATION_COMMANDS_LENGTH: ' + navigationCommands.length,
  });
  navigationCommands.forEach((command) => {
    command.execute({navigation: {}, dispatch: {}});
  });
  // ===

  const dispatch = useDispatch();

  const navigationRef = React.useRef(null);

  const [navigationReady, setNavigationReady] = useState(false);

  const {t} = useTranslation();

  const mainStack = () => {
    return (
      <MainStack.Navigator mode="card">
        <MainStack.Screen
          name={'ShoppingLists'}
          component={ShoppingLists}
          options={{title: t('ShoppingLists_screenTitle')}}
        />
        <MainStack.Screen
          name={'ProductsList'}
          component={ProductsList}
          options={{title: '', headerShown: true}}
        />
        <MainStack.Screen
          name={'ProductsLocation'}
          component={ProductsLocation}
          options={{title: '', headerShown: true}}
        />
        <MainStack.Screen
          name={'VoiceInputTest'}
          component={VoiceInputTest}
          options={{title: 'Voice Input Test', headerShown: true}}
        />
      </MainStack.Navigator>
    );
  };

  const modalStack = (
    <ModalStack.Navigator mode="modal">
      <ModalStack.Screen
        name={'ShoppingLists'}
        component={mainStack}
        options={{title: t('ShoppingLists_screenTitle'), headerShown: false}}
      />
      <ModalStack.Screen
        name={'CreateShoppingList'}
        component={CreateShoppingList}
        options={{
          headerShown: false,
        }}
      />
    </ModalStack.Navigator>
  );

  // useEffect(() => {
  //   if (navigationReady) {
  //     SystemEventsHandler.onInfo({info: 'NAVIGATION_READY'});
  //
  //     if (navigationRef.current) {
  //       SystemEventsHandler.onInfo({info: 'HAS_NAVIGATION_REF'});
  //       if (predeterminedListId) {
  //         const listId = Number(predeterminedListId);
  //
  //         // SystemEventsHandler.onInfo({
  //         //   info: 'WILL_GO_TO_SHOPPING_LIST: ' + (listId < 0),
  //         // });
  //
  //         if (listId <= 0) {
  //           // navigationRef.current.goBack();
  //           // navigationRef.current.dispatch((state) => {
  //           //   // Remove the home route from the stack
  //           //   // const routes = state.routes.filter((r) => r.name !== 'Home');
  //           //
  //           //   return CommonActions.reset({
  //           //     ...state,
  //           //     index: 1,
  //           //   });
  //           // });
  //           // navigationRef.current.dispatch(
  //           //   CommonActions.reset({
  //           //     index: 1,
  //           //     routes: [{name: 'ShoppingLists'}],
  //           //   }),
  //           // );
  //           // dispatch(updateShoppingListsAction());
  //         } else {
  //           // dispatch(loadCategoriesAction({shoppingListId: listId}));
  //           // dispatch(loadUnitsAction({shoppingListId: listId}));
  //           // dispatch(loadProductsListAction({shoppingListId: listId}));
  //           //
  //           // navigationRef.current.navigate('ProductsList');
  //         }
  //       }
  //     } else {
  //       SystemEventsHandler.onInfo({info: 'NO_NAVIGATION_REF'});
  //     }
  //   }
  // }, [predeterminedListId, navigationReady, dispatch]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setNavigationReady(true);
      }}>
      {modalStack}
    </NavigationContainer>
  );
};

export default AppNavigation;

// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import ShoppingLists from '../../../screens/shopping-lists/ShoppingLists';
// import {useTranslation} from '../../../utils/common/localization';
// import CreateShoppingList from '../../../screens/create-shopping-list/CreateShoppingList';
// import ProductsList from '../../../screens/products-list/ProductsList';
// import ProductsLocation from '../../../screens/products-location/ProductsLocation';
// import VoiceInputTest from '../../../screens/voice-input-test/VoiceInputTest';
// import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
//
// const MainStack = createStackNavigator();
// const ModalStack = createStackNavigator();
//
// const AppNavigation = ({testData}) => {
//   // ===
//   // SystemEventsHandler.onInfo({info: JSON.stringify(testData)});
//   // ===
//
//   const {t} = useTranslation();
//
//   const mainStack = () => {
//     return (
//       <MainStack.Navigator mode="card">
//         <MainStack.Screen
//           name={'ShoppingLists'}
//           component={ShoppingLists}
//           options={{title: t('ShoppingLists_screenTitle')}}
//         />
//         <MainStack.Screen
//           name={'ProductsList'}
//           component={ProductsList}
//           options={{title: '', headerShown: true}}
//         />
//         <MainStack.Screen
//           name={'ProductsLocation'}
//           component={ProductsLocation}
//           options={{title: '', headerShown: true}}
//         />
//         <MainStack.Screen
//           name={'VoiceInputTest'}
//           component={VoiceInputTest}
//           options={{title: 'Voice Input Test', headerShown: true}}
//         />
//       </MainStack.Navigator>
//     );
//   };
//
//   const modalStack = (
//     <ModalStack.Navigator mode="modal">
//       <ModalStack.Screen
//         name={'ShoppingLists'}
//         component={mainStack}
//         options={{title: t('ShoppingLists_screenTitle'), headerShown: false}}
//       />
//       <ModalStack.Screen
//         name={'CreateShoppingList'}
//         component={CreateShoppingList}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </ModalStack.Navigator>
//   );
//
//   return <NavigationContainer>{modalStack}</NavigationContainer>;
// };
//
// export default AppNavigation;
