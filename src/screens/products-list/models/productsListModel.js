import {useState, useEffect, useReducer} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../utils/common/localization';
import productListReducer from '../stores/produtcListReducer';
import productListState from '../stores/productListState';
import {
  pla_setDataLoading,
  pla_setSelectedCategoryIdForCategoriesList,
  pla_setSelectedCategoryIdForProductsList,
  pla_setShareButtonVisibility,
  pla_setUsedCategories,
} from '../stores/productListActions';
import ProductStatus from '../../../services/shopping-list/data/product-status/ProductStatus';
import ProductInitialCategories from '../../../components/specific/products-list/product-initial-categories/ProductInitialCategories';
import {checkShareAvailabilityAction} from '../../../store/actions/share/shareActions';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

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
  const categoryAddInProgress = useSelector(
    (storeState) => storeState.categories.categories.addCategory.inProgress,
  );
  const lastAddedCategoryId = useSelector(
    (storeState) => storeState.categories.categories.addCategory.categoryId,
  );
  const lastAddedCategory = useSelector(
    (storeState) => storeState.categories.categories.addCategory.category,
  );
  const listName = useSelector(
    (storeState) => storeState.productsList.productsList.name,
  );
  const products = useSelector(
    (storeState) => storeState.productsList.productsList.products,
  );
  const unitsList = useSelector(
    (storeState) => storeState.units.units.active.list,
  );
  const unitsMap = useSelector(
    (storeState) => storeState.units.units.active.map,
  );
  const allUnitsList = useSelector(
    (storeState) => storeState.units.units.all.list,
  );
  const allUnitsMap = useSelector(
    (storeState) => storeState.units.units.all.map,
  );
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
  const smsShareSupported = useSelector(
    (storeState) => storeState.share.share.availability.smsSharingSupported,
  );
  const whatsAppShareSupported = useSelector(
    (storeState) =>
      storeState.share.share.availability.whatsAppSharingSupported,
  );

  useEffect(() => {
    dispatch(checkShareAvailabilityAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setOptions({title: listName});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listName]);

  useEffect(() => {
    if (!listLoading && !unitsLoading && !categoriesLoading) {
      localDispatch(pla_setDataLoading({dataLoading: false}));
    }
  }, [listLoading, unitsLoading, categoriesLoading]);

  // ===
  useEffect(() => {
    if (categoriesLoading || listLoading) {
      return;
    }

    const usedCategoriesList = [];
    const usedCategoriesStatisticMap = new Map();

    let hasCompletedProducts = false;
    let hasNotCompletedProducts = false;

    products.forEach((product) => {
      let productCompleted = false;
      if (product.completionStatus === ProductStatus.COMPLETED) {
        productCompleted = true;
        hasCompletedProducts = true;
      } else {
        hasNotCompletedProducts = true;
      }

      if (usedCategoriesStatisticMap.has(product.categoryId)) {
        const statObject = usedCategoriesStatisticMap.get(product.categoryId);
        if (productCompleted) {
          statObject.completedProductsCount =
            statObject.completedProductsCount + 1;
        } else {
          statObject.notCompletedProductsCount =
            statObject.notCompletedProductsCount + 1;
        }
      } else {
        const statObject = {
          categoryId: product.categoryId,
          completedProductsCount: productCompleted ? 1 : 0,
          notCompletedProductsCount: productCompleted ? 0 : 1,
        };
        usedCategoriesStatisticMap.set(product.categoryId, statObject);
      }
    });

    usedCategoriesStatisticMap.forEach((statObject) => {
      const {categoryId, notCompletedProductsCount} = statObject;

      let category = {...allCategoriesMap.get(categoryId)};
      if (notCompletedProductsCount === 0) {
        category.completed = true;
      }

      usedCategoriesList.push(category);
    });

    const allCategory = {
      id: ProductInitialCategories.ALL,
      name: t('ProductsListModel_allCategory'),
      color: '#D3D3D3',
    };
    const completedCategory = {
      id: ProductInitialCategories.COMPLETED,
      name: t('ProductsListModel_completedCategory'),
      color: '#D3D3D3',
    };
    const notCompletedCategory = {
      id: ProductInitialCategories.NOT_COMPLETED,
      name: t('ProductsListModel_notCompletedCategory'),
      color: '#D3D3D3',
    };

    usedCategoriesList.sort((c1, c2) => {
      return c1.createTimestamp < c2.createTimestamp;
    });

    if (hasCompletedProducts && hasNotCompletedProducts) {
      usedCategoriesList.unshift(completedCategory);
      usedCategoriesStatisticMap.set(ProductInitialCategories.COMPLETED, {});

      usedCategoriesList.unshift(notCompletedCategory);
      usedCategoriesStatisticMap.set(
        ProductInitialCategories.NOT_COMPLETED,
        {},
      );
    }
    usedCategoriesList.unshift(allCategory);
    usedCategoriesStatisticMap.set(ProductInitialCategories.ALL, {});

    localDispatch(pla_setUsedCategories({categories: usedCategoriesList}));

    if (hasNotCompletedProducts) {
      localDispatch(pla_setShareButtonVisibility({visible: true}));
    } else {
      localDispatch(pla_setShareButtonVisibility({visible: false}));
    }

    const currentSelectedCategoryId =
      state.selectedCategory.categoriesList.selectedCategoryId;
    if (
      currentSelectedCategoryId &&
      !usedCategoriesStatisticMap.has(currentSelectedCategoryId)
    ) {
      localDispatch(
        pla_setSelectedCategoryIdForCategoriesList({
          id: ProductInitialCategories.ALL,
        }),
      );
      setTimeout(() => {
        localDispatch(
          pla_setSelectedCategoryIdForProductsList({
            id: ProductInitialCategories.ALL,
          }),
        );
      }, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesLoading, listLoading, products, allCategoriesMap]);
  // ===

  return {
    data: {
      state,
      shoppingListId,
      listName,
      products,
      unitsList,
      unitsMap,
      allUnitsList,
      allUnitsMap,
      categoriesList,
      categoriesMap,
      allCategoriesList,
      allCategoriesMap,
      smsShareSupported,
      whatsAppShareSupported,
      categoryAddInProgress,
      lastAddedCategoryId,
      lastAddedCategory,
    },
    setters: {},
    navigation,
    dispatch,
    localDispatch,
    t,
  };
};
