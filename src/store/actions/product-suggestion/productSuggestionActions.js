import {
  CLEAR_PRODUCTS_SUGGESTIONS,
  SUGGEST_PRODUCTS,
} from '../../types/product-suggestion/productSuggestionTypes';

export const clearProductSuggestionsAction = () => {
  return {
    type: CLEAR_PRODUCTS_SUGGESTIONS,
    payload: undefined,
  };
};

export const suggestProductsAction = ({
  partialProductName,
  excludedProductNamesSet,
}) => {
  return {
    type: SUGGEST_PRODUCTS,
    payload: {partialProductName, excludedProductNamesSet},
  };
};

// export const suggestProductsBeginAction = () => {
//   return {
//     type: SUGGEST_PRODUCTS_BEGIN,
//     payload: undefined,
//   };
// };
//
// export const suggestProductsFinishedAction = ({suggestedProductsData}) => {
//   return {
//     type: SUGGEST_PRODUCTS_FINISHED,
//     payload: {suggestedProductsData},
//   };
// };
//
// export const suggestProductsErrorAction = ({description}) => {
//   return {
//     type: SUGGEST_PRODUCTS_ERROR,
//     payload: {error: {description}},
//   };
// };

// export const suggestProductsBasedOnCurrentProductsListAction = ({
//   productsList,
// }) => {
//   return {
//     type: SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST,
//     payload: {productsList},
//   };
// };
//
// export const suggestProductsBasedOnCurrentProductsListBeginAction = () => {
//   return {
//     type: SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_BEGIN,
//     payload: undefined,
//   };
// };
//
// export const suggestProductsBasedOnCurrentProductsListFinishedAction = ({
//   suggestedProductsData,
// }) => {
//   return {
//     type: SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_FINISHED,
//     payload: {suggestedProductsData},
//   };
// };
//
// export const suggestProductsBasedOnCurrentProductsListErrorAction = ({
//   description,
// }) => {
//   return {
//     type: SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_ERROR,
//     payload: {error: {description}},
//   };
// };
//
// export const suggestProductsBasedOnPartialInputAction = ({
//   partialProductName,
// }) => {
//   return {
//     type: SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT,
//     payload: {partialProductName},
//   };
// };
//
// export const suggestProductsBasedOnPartialInputBeginAction = () => {
//   return {
//     type: SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_BEGIN,
//     payload: undefined,
//   };
// };
//
// export const suggestProductsBasedOnPartialInputFinishedAction = ({
//   suggestedProductsData,
// }) => {
//   return {
//     type: SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_FINISHED,
//     payload: {suggestedProductsData},
//   };
// };
// export const suggestProductsBasedOnPartialInputErrorAction = ({
//   description,
// }) => {
//   return {
//     type: SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_ERROR,
//     payload: {error: {description}},
//   };
// };
