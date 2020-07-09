import {
  CLOSE_ADD_CATEGORY_DIALOG,
  CLOSE_ADD_UNIT_DIALOG,
  CLOSE_EDIT_CATEGORY_DIALOG,
  HIDE_PRODUCT_INPUT_AREA,
  OPEN_ADD_CATEGORY_DIALOG,
  OPEN_ADD_UNIT_DIALOG,
  OPEN_EDIT_CATEGORY_DIALOG,
  OPEN_PRODUCT_INPUT_AREA,
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

    case OPEN_PRODUCT_INPUT_AREA: {
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          inputAreaVisible: true,
          inputAreaState: null,
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

    default: {
      return state;
    }
  }
}

export default productListReducer;
