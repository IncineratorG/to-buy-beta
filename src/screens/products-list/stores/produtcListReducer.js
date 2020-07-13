import {
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
  SET_DATA_LOADING,
} from './types/productListActionTypes';

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

    default: {
      return state;
    }
  }
}

export default productListReducer;
