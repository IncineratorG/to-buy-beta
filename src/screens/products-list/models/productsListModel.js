import {useState, useEffect, useReducer} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../components/common/localization';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import productListReducer from '../stores/produtcListReducer';
import productListState from '../stores/productListState';
import {pla_setDataLoading} from '../stores/productListActions';

export const useProductsListModel = () => {
  const [state, localDispatch] = useReducer(
    productListReducer,
    productListState,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {t} = useTranslation();

  // const [dataLoading, setDataLoading] = useState(true);
  // const [usedCategoriesLoading, setUsedCategoriesLoading] = useState(false);
  // const [inputAreaVisible, setInputAreaVisible] = useState(false);
  // const [addCategoryDialogVisible, setAddCategoryDialogVisible] = useState(
  //   false,
  // );
  // const [inputAreaState, setInputAreaState] = useState(null);

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

  useEffect(() => {
    navigation.setOptions({title: listName});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listName]);

  useEffect(() => {
    if (!listLoading && !unitsLoading && !categoriesLoading) {
      localDispatch(pla_setDataLoading({dataLoading: false}));
    }
  }, [listLoading, unitsLoading, categoriesLoading]);

  return {
    data: {
      state,
      // dataLoading,
      // usedCategoriesLoading,
      // inputAreaVisible,
      // addCategoryDialogVisible,
      // inputAreaState,
      shoppingListId,
      products,
      unitsList,
      unitsMap,
      categoriesList,
      categoriesMap,
    },
    setters: {
      // setInputAreaVisible,
      // setAddCategoryDialogVisible,
      // setInputAreaState,
    },
    navigation,
    dispatch,
    localDispatch,
    t,
  };
};
