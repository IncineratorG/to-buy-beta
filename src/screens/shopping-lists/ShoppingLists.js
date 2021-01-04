import React, {useEffect} from 'react';
import {NativeEventEmitter, NativeModules, ToastAndroid} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {shoppingListsStyles} from './styles/shoppingListsStyles';
import ShoppingListsView from './views/ShoppingListsView';
import {useShoppingListsModel} from './models/shoppingListsModel';
import {useShoppingListsController} from './controllers/shoppingListsController';
import ShoppingListScreenMenuButton from '../../components/specific/shopping-lists/screen-menu-button/ShoppingListScreenMenuButton';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';

const ShoppingLists = () => {
  const styles = shoppingListsStyles;
  const model = useShoppingListsModel();
  const controller = useShoppingListsController(model);

  useFocusEffect(() => {
    model.navigation.setOptions({
      headerRight: (props) => (
        <ShoppingListScreenMenuButton
          availableLanguages={model.data.availableLanguages}
          currentLanguage={model.data.currentLanguage}
          onLanguagePress={controller.screenMenuLanguagePressHandler}
        />
      ),
    });
  });

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  // ===
  // =====
  // useEffect(() => {
  //   SystemEventsHandler.onInfo({info: 'EVENT_LISTENER_REGISTERED'});
  //
  //   const eventEmitter = new NativeEventEmitter(NativeModules.SharedStorage);
  //
  //   const eventListener = eventEmitter.addListener('EventReminder', (event) => {
  //     SystemEventsHandler.onInfo({info: 'EVENT: ' + event.eventProperty});
  //     showToastWithGravityAndOffset();
  //     // console.log(event.eventProperty); // "someValue"
  //   });
  //
  //   return () => {
  //     eventListener.remove();
  //   };
  // }, []);
  // =====
  // ===

  return (
    <ShoppingListsView styles={styles} model={model} controller={controller} />
  );
};

export default ShoppingLists;
