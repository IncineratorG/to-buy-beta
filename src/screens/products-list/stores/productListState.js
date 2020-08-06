import ProductInitialCategories from '../../../components/specific/products-list/product-initial-categories/ProductInitialCategories';

const productListState = {
  dataLoading: true,
  usedCategories: {
    usedCategoriesLoading: false,
    usedCategoriesList: [],
    selectedCategoriesIds: new Set([ProductInitialCategories.ALL]),
  },
  removeProductDialog: {
    removeProductDialogVisible: false,
    removeProduct: {
      shoppingListId: '',
      productId: '',
      productName: '',
    },
  },
  inputArea: {
    inputAreaVisible: false,
    inputAreaState: null,
    editData: null,
  },
  addCategoryDialog: {
    addCategoryDialogVisible: false,
  },
  editCategoryDialog: {
    editCategoryDialogVisible: false,
    editCategory: null,
    canRemoveCategory: false,
  },
  addUnitDialog: {
    addUnitDialogVisible: false,
  },
  editUnitDialog: {
    editUnitDialogVisible: false,
    editUnit: null,
    canRemoveUnit: false,
  },
  shareButton: {
    shareButtonVisible: false,
  },
  sharePanel: {
    sharePanelVisible: false,
  },
  renameListDialog: {
    renameListDialogVisible: false,
  },
  removeAllProductsDialog: {
    removeAllProductsDialogVisible: false,
  },
};

export default productListState;
