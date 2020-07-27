import {useState, useEffect, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../utils/common/localization';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {clearProductsListCachedData} from '../../../store/actions/products-list/productsListActions';

export const useShoppingListsModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [
    removeConfirmationDialogVisible,
    setRemoveConfirmationDialogVisible,
  ] = useState(false);
  const [shareDialogVisible, setShareDialogVisible] = useState(false);
  const [listToRemove, setListToRemove] = useState(null);

  const listsLoading = useSelector(
    (state) => state.shoppingLists.shoppingLists.loading,
  );
  const allShoppingLists = useSelector(
    (state) => state.shoppingLists.shoppingLists.allLists.lists,
  );

  // ===
  const online = false;
  const currentEmail = '';
  const selectedShoppingLists = allShoppingLists;
  // ===

  useFocusEffect(() => {
    dispatch(clearProductsListCachedData());
  }, []);

  return {
    data: {
      shareDialogVisible,
      removeConfirmationDialogVisible,
      online,
      currentEmail,
      selectedShoppingLists,
      listsLoading,
      listToRemove,
    },
    setters: {
      setShareDialogVisible,
      setRemoveConfirmationDialogVisible,
      setListToRemove,
    },
    navigation,
    dispatch,
    t,
  };
};
