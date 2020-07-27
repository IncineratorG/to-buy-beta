import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  shareProductsListViaSmsBeginAction,
  shareProductsListViaSmsErrorAction,
  shareProductsListViaSmsFinishedAction,
} from '../../../actions/share/shareActions';
import ListToTextConverter from '../../../../utils/specific/products-list/list-to-text-converter/ListToTextConverter';

function* ss_shareProductsListViaSmsHandler(action) {
  const {id} = action.payload;

  yield put(shareProductsListViaSmsBeginAction());

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const productsList = yield call(shoppingListService.getProductsList, {id});
    const categoriesList = yield call(shoppingListService.getCategories, {
      shoppingListId: id,
    });
    const unitsList = yield call(shoppingListService.getUnits, {
      shoppingListId: id,
    });

    const categoriesMap = new Map();
    categoriesList.forEach((c) => {
      categoriesMap.set(c.id, c);
    });

    const unitsMap = new Map();
    unitsList.forEach((u) => {
      unitsMap.set(u.id, u);
    });

    const productsListTextForm = yield call(ListToTextConverter.convert, {
      productsList: productsList.products,
      listName: productsList.name,
      categoriesMap,
      unitsMap,
    });

    const shareService = Services.get(Services.serviceTypes.SHARE);
    yield call(shareService.shareViaSms, {text: productsListTextForm});
    yield put(shareProductsListViaSmsFinishedAction());
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ss_shareProductsListViaSmsHandler()->ERROR: ' + e,
    });
    yield put(shareProductsListViaSmsErrorAction({description: e.toString()}));
  }
}

export default ss_shareProductsListViaSmsHandler;