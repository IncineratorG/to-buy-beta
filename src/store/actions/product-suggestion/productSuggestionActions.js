import {
  CLEAR_INPUT_BASED_PRODUCTS_SUGGESTIONS,
  CLEAR_PRODUCTS_SUGGESTIONS,
  CLEAR_RANDOM_PRODUCTS_SUGGESTIONS,
  SUGGEST_PRODUCTS_BASED_ON_INPUT,
  SUGGEST_PRODUCTS_BASED_ON_INPUT_BEGIN,
  SUGGEST_PRODUCTS_BASED_ON_INPUT_ERROR,
  SUGGEST_PRODUCTS_BASED_ON_INPUT_FINISHED,
  SUGGEST_RANDOM_PRODUCTS,
  SUGGEST_RANDOM_PRODUCTS_BEGIN,
  SUGGEST_RANDOM_PRODUCTS_ERROR,
  SUGGEST_RANDOM_PRODUCTS_FINISHED,
} from '../../types/product-suggestion/productSuggestionTypes';

export const clearProductSuggestionsAction = () => {
  return {
    type: CLEAR_PRODUCTS_SUGGESTIONS,
    payload: undefined,
  };
};

export const clearInputBasedProductsSuggestionsAction = () => {
  return {
    type: CLEAR_INPUT_BASED_PRODUCTS_SUGGESTIONS,
    payload: undefined,
  };
};

export const clearRandomProductsSuggestionsAction = () => {
  return {
    type: CLEAR_RANDOM_PRODUCTS_SUGGESTIONS,
    payload: undefined,
  };
};

export const suggestProductsBasedOnInputAction = ({
  partialProductName,
  excludedProductNamesSet,
}) => {
  return {
    type: SUGGEST_PRODUCTS_BASED_ON_INPUT,
    payload: {partialProductName, excludedProductNamesSet},
  };
};

export const suggestProductsBasedOnInputBeginAction = () => {
  return {
    type: SUGGEST_PRODUCTS_BASED_ON_INPUT_BEGIN,
    payload: undefined,
  };
};

export const suggestProductsBasedOnInputFinishedAction = ({
  suggestedProductsData,
}) => {
  return {
    type: SUGGEST_PRODUCTS_BASED_ON_INPUT_FINISHED,
    payload: {suggestedProductsData},
  };
};

export const suggestProductsBasedOnInputErrorAction = ({description}) => {
  return {
    type: SUGGEST_PRODUCTS_BASED_ON_INPUT_ERROR,
    payload: {error: {description}},
  };
};

export const suggestRandomProductsAction = ({excludedProductNamesSet}) => {
  return {
    type: SUGGEST_RANDOM_PRODUCTS,
    payload: {excludedProductNamesSet},
  };
};

export const suggestRandomProductsBeginAction = () => {
  return {
    type: SUGGEST_RANDOM_PRODUCTS_BEGIN,
    payload: undefined,
  };
};

export const suggestRandomProductsFinishedAction = ({
  suggestedProductsData,
}) => {
  return {
    type: SUGGEST_RANDOM_PRODUCTS_FINISHED,
    payload: {suggestedProductsData},
  };
};

export const suggestRandomProductsErrorAction = ({description}) => {
  return {
    type: SUGGEST_RANDOM_PRODUCTS_ERROR,
    payload: {error: {description}},
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
