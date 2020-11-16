import {icons} from '../../../../../assets/icons';
import ProductInputType from './types/productInputAreaProductInputTypes';

const productInputAreaState = {
  currentInput: {
    type: ProductInputType.PRODUCT_NAME,
    keyboardType: 'default',
    icon: icons.title,
    placeholder: 'ProductMainInput_placeholderProductName',
    productsList: [],
    productsNamesSet: new Set(),
    values: {
      productName: '',
      quantity: '',
      note: '',
      acceptable: false,
    },
    selectedCategory: undefined,
    selectedUnit: undefined,
    productSuggestions: {
      suggestions: [],
    },
    suggestions: {
      productSuggestions: ['First', 'Second', 'Third'],
      // productSuggestions: [],
      // noteSuggestions: ['Suggestion'],
      noteSuggestions: [],
    },
    voiceInput: {
      serviceAvailable: false,
    },
  },
};

export default productInputAreaState;
