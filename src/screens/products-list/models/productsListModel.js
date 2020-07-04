import {useState, useEffect, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../components/common/localization';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

export const useProductsListModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [dataLoading, setDataLoading] = useState(true);
  const [usedCategoriesLoading, setUsedCategoriesLoading] = useState(false);
  const [inputAreaVisible, setInputAreaVisible] = useState(false);

  const shoppingListId = useSelector(
    (state) => state.productsList.productsList.id,
  );
  const listLoading = useSelector(
    (state) => state.productsList.productsList.loading,
  );
  const unitsLoading = useSelector((state) => state.units.units.loading);
  const categoriesLoading = useSelector(
    (state) => state.categories.categories.loading,
  );
  const listName = useSelector((state) => state.productsList.productsList.name);
  const products = useSelector(
    (state) => state.productsList.productsList.products,
  );
  const unitsList = useSelector((state) => state.units.units.list);
  const unitsMap = useSelector((state) => state.units.units.map);
  const categoriesList = useSelector(
    (state) => state.categories.categories.list,
  );
  const categoriesMap = useSelector((state) => state.categories.categories.map);

  // ===
  // SystemEventsHandler.onInfo({info: 'PRODUCTS_LENGTH: ' + products.length});
  // ===

  useEffect(() => {
    navigation.setOptions({title: listName});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listName]);

  useEffect(() => {
    if (!listLoading && !unitsLoading && !categoriesLoading) {
      setDataLoading(false);
    }
  }, [listLoading, unitsLoading, categoriesLoading]);

  return {
    data: {
      dataLoading,
      usedCategoriesLoading,
      shoppingListId,
      products,
      unitsList,
      unitsMap,
      categoriesList,
      categoriesMap,
      inputAreaVisible,
    },
    setters: {
      setInputAreaVisible,
    },
    navigation,
    dispatch,
    t,
  };
};
