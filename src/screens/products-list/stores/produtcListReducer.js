import {
  ADD_SELECTED_CATEGORY_ID,
  CLOSE_ADD_CATEGORY_DIALOG,
  CLOSE_ADD_UNIT_DIALOG,
  CLOSE_EDIT_CATEGORY_DIALOG,
  CLOSE_EDIT_UNIT_DIALOG,
  CLOSE_REMOVE_PRODUCT_DIALOG,
  HIDE_PRODUCT_INPUT_AREA,
  OPEN_ADD_CATEGORY_DIALOG,
  OPEN_ADD_UNIT_DIALOG,
  OPEN_EDIT_CATEGORY_DIALOG,
  OPEN_EDIT_UNIT_DIALOG,
  OPEN_PRODUCT_INPUT_AREA_IN_CREATE_MODE,
  OPEN_PRODUCT_INPUT_AREA_IN_EDIT_MODE,
  OPEN_REMOVE_PRODUCT_DIALOG,
  REMOVE_SELECTED_CATEGORY_ID,
  SET_DATA_LOADING,
  SET_REMOVE_ALL_PRODUCTS_DIALOG_VISIBILITY,
  SET_RENAME_LIST_DIALOG_VISIBILITY,
  SET_SELECTED_CATEGORY_ID,
  SET_SHARE_BUTTON_VISIBILITY,
  SET_SHARE_PANEL_VISIBILITY,
  SET_USED_CATEGORIES,
} from './types/productListActionTypes';
import ProductInitialCategories from '../../../components/specific/products-list/product-initial-categories/ProductInitialCategories';

function productListReducer(state, action) {
  switch (action.type) {
    case SET_DATA_LOADING: {
      return {
        ...state,
        dataLoading: action.payload.dataLoading,
      };
    }

    case OPEN_PRODUCT_INPUT_AREA_IN_CREATE_MODE: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaVisible: true,
          inputAreaState: null,
          editData: null,
        },
      };
    }

    case OPEN_PRODUCT_INPUT_AREA_IN_EDIT_MODE: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaState: null,
          inputAreaVisible: true,
          editData: {
            ...action.payload,
          },
        },
      };
    }

    case HIDE_PRODUCT_INPUT_AREA: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaVisible: false,
        },
      };
    }

    case OPEN_ADD_CATEGORY_DIALOG: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaState: action.payload.productInputAreaState,
          inputAreaVisible: false,
        },
        addCategoryDialog: {
          addCategoryDialogVisible: true,
        },
      };
    }

    case CLOSE_ADD_CATEGORY_DIALOG: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaVisible: true,
        },
        addCategoryDialog: {
          addCategoryDialogVisible: false,
        },
      };
    }

    case OPEN_EDIT_CATEGORY_DIALOG: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaState: action.payload.productInputAreaState,
          inputAreaVisible: false,
        },
        editCategoryDialog: {
          editCategoryDialogVisible: true,
          editCategory: action.payload.category,
          canRemoveCategory: action.payload.canRemove,
        },
      };
    }

    case CLOSE_EDIT_CATEGORY_DIALOG: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaVisible: true,
        },
        editCategoryDialog: {
          editCategoryDialogVisible: false,
        },
      };
    }

    case OPEN_ADD_UNIT_DIALOG: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaState: action.payload.productInputAreaState,
          inputAreaVisible: false,
        },
        addUnitDialog: {
          addUnitDialogVisible: true,
        },
      };
    }

    case CLOSE_ADD_UNIT_DIALOG: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaVisible: true,
        },
        addUnitDialog: {
          addUnitDialogVisible: false,
        },
      };
    }

    case OPEN_EDIT_UNIT_DIALOG: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaState: action.payload.productInputAreaState,
          inputAreaVisible: false,
        },
        editUnitDialog: {
          editUnitDialogVisible: true,
          editUnit: action.payload.unit,
          canRemoveUnit: action.payload.canRemove,
        },
      };
    }

    case CLOSE_EDIT_UNIT_DIALOG: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaVisible: true,
        },
        editUnitDialog: {
          editUnitDialogVisible: false,
        },
      };
    }

    case OPEN_REMOVE_PRODUCT_DIALOG: {
      return {
        ...state,
        removeProductDialog: {
          ...state.removeProductDialog,
          removeProductDialogVisible: true,
          removeProduct: {
            ...state.removeProductDialog.removeProduct,
            shoppingListId: action.payload.shoppingListId,
            productId: action.payload.productId,
            productName: action.payload.productName,
          },
        },
      };
    }

    case CLOSE_REMOVE_PRODUCT_DIALOG: {
      return {
        ...state,
        removeProductDialog: {
          ...state.removeProductDialog,
          removeProductDialogVisible: false,
          removeProduct: {
            ...state.removeProductDialog.removeProduct,
            shoppingListId: '',
            productId: '',
            productName: '',
          },
        },
      };
    }

    case SET_SELECTED_CATEGORY_ID: {
      const selectedCategoriesIds = new Set();
      selectedCategoriesIds.add(action.payload.id);

      return {
        ...state,
        usedCategories: {
          ...state.usedCategories,
          selectedCategoriesIds,
        },
      };
    }

    case ADD_SELECTED_CATEGORY_ID: {
      const selectedCategoriesIds = new Set(
        state.usedCategories.selectedCategoriesIds,
      );

      if (selectedCategoriesIds.has(ProductInitialCategories.ALL)) {
        selectedCategoriesIds.delete(ProductInitialCategories.ALL);
      }

      if (action.payload.id === ProductInitialCategories.ALL) {
        selectedCategoriesIds.clear();
      }

      selectedCategoriesIds.add(action.payload.id);

      return {
        ...state,
        usedCategories: {
          ...state.usedCategories,
          selectedCategoriesIds,
        },
      };
    }

    case REMOVE_SELECTED_CATEGORY_ID: {
      const selectedCategoriesIds = new Set(
        state.usedCategories.selectedCategoriesIds,
      );
      selectedCategoriesIds.delete(action.payload.id);

      if (!selectedCategoriesIds.size) {
        selectedCategoriesIds.add(ProductInitialCategories.ALL);
      }

      return {
        ...state,
        usedCategories: {
          ...state.usedCategories,
          selectedCategoriesIds,
        },
      };
    }

    case SET_USED_CATEGORIES: {
      return {
        ...state,
        usedCategories: {
          ...state.usedCategories,
          usedCategoriesList: [...action.payload.categories],
        },
      };
    }

    case SET_SHARE_BUTTON_VISIBILITY: {
      return {
        ...state,
        shareButton: {
          shareButtonVisible: action.payload.visible,
        },
      };
    }

    case SET_SHARE_PANEL_VISIBILITY: {
      return {
        ...state,
        sharePanel: {
          sharePanelVisible: action.payload.visible,
        },
      };
    }

    case SET_RENAME_LIST_DIALOG_VISIBILITY: {
      return {
        ...state,
        renameListDialog: {
          renameListDialogVisible: action.payload.visible,
        },
      };
    }

    case SET_REMOVE_ALL_PRODUCTS_DIALOG_VISIBILITY: {
      return {
        ...state,
        removeAllProductsDialog: {
          removeAllProductsDialogVisible: action.payload.visible,
        },
      };
    }

    default: {
      return state;
    }
  }
}

export default productListReducer;
