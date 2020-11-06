import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import ListToTextConverter from '../../../../utils/common/service-utils/list-to-text-converter/ListToTextConverter';
import {
  shareProductsListViaAppBeginAction,
  shareProductsListViaAppErrorAction,
  shareProductsListViaAppFinishedAction,
} from '../../../actions/share/shareActions';

function* ss_shareProductsListViaAppHandler(action) {
  const {appType, shoppingListId} = action.payload;

  yield put(shareProductsListViaAppBeginAction());

  try {
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );

    const productsList = yield call(shoppingListService.getProductsList, {
      id: shoppingListId,
    });
    const categoriesList = yield call(shoppingListService.getCategories, {
      shoppingListId,
    });
    const unitsList = yield call(shoppingListService.getUnits, {
      shoppingListId,
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

    yield call(shareService.shareViaApp, {appType, text: productsListTextForm});
    yield put(shareProductsListViaAppFinishedAction());
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ss_shareProductsListViaAppHandler()->ERROR: ' + e,
    });
    yield put(shareProductsListViaAppErrorAction({description: e.toString()}));
  }
}

export default ss_shareProductsListViaAppHandler;
