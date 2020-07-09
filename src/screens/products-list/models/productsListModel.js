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

  const shoppingListId = useSelector(
    (storeState) => storeState.productsList.productsList.id,
  );
  const listLoading = useSelector(
    (storeState) => storeState.productsList.productsList.loading,
  );
  const unitsLoading = useSelector(
    (storeState) => storeState.units.units.loading,
  );
  const categoriesLoading = useSelector(
    (storeState) => storeState.categories.categories.loading,
  );
  const listName = useSelector(
    (storeState) => storeState.productsList.productsList.name,
  );
  const products = useSelector(
    (storeState) => storeState.productsList.productsList.products,
  );
  const unitsList = useSelector((storeState) => storeState.units.units.list);
  const unitsMap = useSelector((storeState) => storeState.units.units.map);
  const categoriesList = useSelector(
    (storeState) => storeState.categories.categories.active.list,
  );
  const categoriesMap = useSelector(
    (storeState) => storeState.categories.categories.active.map,
  );
  const allCategoriesList = useSelector(
    (storeState) => storeState.categories.categories.all.list,
  );
  const allCategoriesMap = useSelector(
    (storeState) => storeState.categories.categories.all.map,
  );

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
      shoppingListId,
      products,
      unitsList,
      unitsMap,
      categoriesList,
      categoriesMap,
    },
    setters: {},
    navigation,
    dispatch,
    localDispatch,
    t,
  };
};
