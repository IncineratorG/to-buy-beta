import {useState, useEffect, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../components/common/localization';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

export const useShoppingListsModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [
    removeConfirmationDialogVisible,
    setRemoveConfirmationDialogVisible,
  ] = useState(false);
  const [removeItemName, setRemoveItemName] = useState('');

  const listsLoading = useSelector(
    (state) => state.shoppingLists.shoppingLists.loading,
  );
  const allShoppingLists = useSelector(
    (state) => state.shoppingLists.shoppingLists.allLists.lists,
  );

  // SystemEventsHandler.onInfo({
  //   info:
  //     'useShoppingListsModel()->ALL_SHOPPING_LISTS_LENGTH: ' +
  //     allShoppingLists.length,
  // });
  // SystemEventsHandler.onInfo({
  //   info: 'useShoppingListsModel()->LOADING: ' + listsLoading,
  // });

  // ===
  const online = false;
  const currentEmail = '';
  const selectedShoppingLists = allShoppingLists;
  // ===

  // useFocusEffect(() => {
  //   dispatch(loadShoppingListsAction());
  // }, []);

  return {
    data: {
      removeConfirmationDialogVisible,
      removeItemName,
      online,
      currentEmail,
      selectedShoppingLists,
      listsLoading,
    },
    setters: {
      setRemoveConfirmationDialogVisible,
      setRemoveItemName,
    },
    navigation,
    dispatch,
    t,
  };
};
