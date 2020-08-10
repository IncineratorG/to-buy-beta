import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../utils/common/localization';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {loadProductsListAction} from '../../../store/actions/products-list/productsListActions';
import {loadUnitsAction} from '../../../store/actions/units/unitsActions';
import {loadCategoriesAction} from '../../../store/actions/categories/categoriesActions';

export const useCreateShoppingListModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [listName, setListName] = useState('');

  const listCreationRunning = useSelector(
    (state) => state.shoppingLists.create.running,
  );
  const listCreationSuccess = useSelector(
    (state) => state.shoppingLists.create.success,
  );
  const createdListId = useSelector(
    (state) => state.shoppingLists.create.createdListId,
  );

  useEffect(() => {
    if (listCreationSuccess) {
      dispatch(loadUnitsAction({shoppingListId: createdListId}));
      dispatch(loadCategoriesAction({shoppingListId: createdListId}));
      dispatch(loadProductsListAction({shoppingListId: createdListId}));
      navigation.navigate('ProductsList');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCreationSuccess]);

  return {
    data: {listName},
    setters: {setListName},
    navigation,
    dispatch,
    t,
  };
};
