import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root';
import {testReducer} from './reducers/test/test';
import {shoppingListsReducer} from './reducers/shopping-lists/shoppingListsReducer';
import {productsListReducer} from './reducers/products-list/productsListReducer';
import {categoriesReducer} from './reducers/categories/categoriesReducer';
import {unitsReducer} from './reducers/units/unitsReducer';
import {shareReducer} from './reducers/share/shareReducer';
import {productSuggestionReducer} from './reducers/product-suggestion/productSuggestionReducer';
import {systemReducer} from './reducers/system/systemReducer';

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
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
