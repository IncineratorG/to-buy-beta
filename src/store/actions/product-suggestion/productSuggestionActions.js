import {
  CLEAR_PRODUCTS_SUGGESTIONS,
  SUGGEST_PRODUCTS,
  SUGGEST_PRODUCTS_BEGIN,
  SUGGEST_PRODUCTS_ERROR,
  SUGGEST_PRODUCTS_FINISHED,
} from '../../types/product-suggestion/productSuggestionTypes';

export const clearProductSuggestionsAction = () => {
  return {
    type: CLEAR_PRODUCTS_SUGGESTIONS,
    payload: undefined,
  };
};

export const suggestProductsAction = ({partialProductName}) => {
  return {
    type: SUGGEST_PRODUCTS,
    payload: {partialProductName},
  };
};

export const suggestProductsBeginAction = () => {
  return {
    type: SUGGEST_PRODUCTS_BEGIN,
    payload: undefined,
  };
};

export const suggestProductsFinishedAction = ({suggestedProductsData}) => {
  return {
    type: SUGGEST_PRODUCTS_FINISHED,
    payload: {suggestedProductsData},
  };
};

export const suggestProductsErrorAction = ({description}) => {
  return {
    type: SUGGEST_PRODUCTS_ERROR,
    payload: {error: {description}},
  };
};
