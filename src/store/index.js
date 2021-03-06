import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root';
import {testReducer} from './reducers/test/testReducer';
import {shoppingListsReducer} from './reducers/shopping-lists/shoppingListsReducer';
import {productsListReducer} from './reducers/products-list/productsListReducer';
import {categoriesReducer} from './reducers/categories/categoriesReducer';
import {unitsReducer} from './reducers/units/unitsReducer';
import {shareReducer} from './reducers/share/shareReducer';
import {productSuggestionReducer} from './reducers/product-suggestion/productSuggestionReducer';
import {systemReducer} from './reducers/system/systemReducer';
import {productsLocationReducer} from './reducers/productsLocationReducer/productsLocationReducer';
import {appWidgetReducer} from './reducers/app-widget/appWidgetReducer';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  test: testReducer,
  shoppingLists: shoppingListsReducer,
  productsList: productsListReducer,
  categories: categoriesReducer,
  units: unitsReducer,
  share: shareReducer,
  productSuggestion: productSuggestionReducer,
  system: systemReducer,
  productsLocation: productsLocationReducer,
  appWidget: appWidgetReducer,
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
