const productListState = {
  dataLoading: true,
  usedCategoriesLoading: false,
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
  },
  addUnitDialog: {
    addUnitDialogVisible: false,
  },
  editUnitDialog: {
    editUnitDialogVisible: false,
    editUnit: null,
  },
};

export default productListState;
