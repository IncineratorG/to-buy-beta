import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingLists from '../../../screens/shopping-lists/ShoppingLists';
import {useTranslation} from '../../../utils/common/localization';
import CreateShoppingList from '../../../screens/create-shopping-list/CreateShoppingList';
import ProductsList from '../../../screens/products-list/ProductsList';
import ProductsLocation from '../../../screens/products-location/ProductsLocation';
import VoiceInputTest from '../../../screens/voice-input-test/VoiceInputTest';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();

const AppNavigation = ({testData}) => {
  // ===
  // SystemEventsHandler.onInfo({info: JSON.stringify(testData)});
  // ===

  const navigationRef = React.useRef(null);

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

  return (
    <NavigationContainer ref={navigationRef}>{modalStack}</NavigationContainer>
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
