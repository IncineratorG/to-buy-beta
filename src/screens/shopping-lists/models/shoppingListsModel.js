import {NativeEventEmitter, NativeModules} from 'react-native';
import {useState, useEffect} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../utils/common/localization';
import {clearProductsListCachedData} from '../../../store/actions/products-list/productsListActions';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

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
  const availableLanguages = useSelector(
    (state) => state.system.system.localization.availableLanguageCodes,
  );
  const currentLanguage = useSelector(
    (state) => state.system.system.localization.currentLanguageCode,
  );
  const shareServicesAvailabilityMap = useSelector(
    (state) => state.share.share.availability.shareServiceAvailabilityMap,
  );

  // ===
  const online = false;
  const currentEmail = '';
  const selectedShoppingLists = allShoppingLists;
  // ===

  useFocusEffect(() => {
    dispatch(clearProductsListCachedData());
  }, []);

  // ===
  // =====
  useEffect(() => {
    SystemEventsHandler.onInfo({info: 'EVENT_LISTENER_REGISTERED'});

    const eventEmitter = new NativeEventEmitter(NativeModules.SharedStorage);

    const eventListener = eventEmitter.addListener('EventReminder', (event) => {
      SystemEventsHandler.onInfo({info: 'EVENT: ' + event.eventProperty});
      // console.log(event.eventProperty); // "someValue"
    });

    return () => {
      eventListener.remove();
    };
  }, []);
  // =====
  // ===

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
      shareServicesAvailabilityMap,
      availableLanguages,
      currentLanguage,
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
