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
  const [listIdToShare, setListIdToShare] = useState(-1);
  const [renameDialogVisible, setRenameDialogVisible] = useState(false);
  const [listToRename, setListToRename] = useState(null);
  const [copyDialogVisible, setCopyDialogVisible] = useState(false);
  const [listToCopy, setListToCopy] = useState(null);

  const listsLoading = useSelector(
    (state) => state.shoppingLists.shoppingLists.loading,
  );
  const allShoppingLists = useSelector(
    (state) => state.shoppingLists.shoppingLists.allLists.lists,
  );
  const smsShareSupported = useSelector(
    (storeState) => storeState.share.share.availability.smsSharingSupported,
  );
  const whatsAppShareSupported = useSelector(
    (storeState) =>
      storeState.share.share.availability.whatsAppSharingSupported,
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
      renameDialogVisible,
      removeConfirmationDialogVisible,
      copyDialogVisible,
      online,
      currentEmail,
      selectedShoppingLists,
      listsLoading,
      listToRemove,
      listToRename,
      listToCopy,
      listIdToShare,
      smsShareSupported,
      whatsAppShareSupported,
    },
    setters: {
      setShareDialogVisible,
      setRenameDialogVisible,
      setRemoveConfirmationDialogVisible,
      setCopyDialogVisible,
      setListToRemove,
      setListToRename,
      setListToCopy,
      setListIdToShare,
    },
    navigation,
    dispatch,
    t,
  };
};
