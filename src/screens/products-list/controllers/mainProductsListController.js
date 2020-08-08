import {useProductsListController} from './products-list/productsListController';
import {useAddCategoryDialogController} from './add-category-dialog/addCategoryDialogController';
import {useAddUnitDialogController} from './add-unit-dialog/addUnitDialogController';
import {useEditCategoryDialogController} from './edit-category-dialog/editCategoryDialogController';
import {useEditUnitDialogController} from './edit-unit-dialog/editUnitDialogController';
import {useRemoveAllProductsDialogController} from './remove-all-products-dialog/removeAllProductsDialogController';
import {useRemoveProductDialogController} from './remove-products-dialog/removeProductDialogController';
import {useRenameListDialogController} from './rename-list-dialog/renameListDialogController';
import {useScreenMenuButtonController} from './screen-menu-button/screenMenuButtonController';
import {useRemoveAllBoughtProductsDialogController} from './remove-all-bought-products-dialog/removeAllBoughtProductsDialogController';
import {useRemoveAllCategoryProductsDialogController} from './remove-all-category-products-dialog/removeAllCategoryProductsDialogController';

export const useMainProductsListController = (model) => {
  const addCategoryDialogController = useAddCategoryDialogController(model);
  const addUnitDialogController = useAddUnitDialogController(model);
  const editCategoryDialogController = useEditCategoryDialogController(model);
  const editUnitDialogController = useEditUnitDialogController(model);
  const productsListController = useProductsListController(model);
  const removeAllProductsDialogController = useRemoveAllProductsDialogController(
    model,
  );
  const removeProductDialogController = useRemoveProductDialogController(model);
  const renameListDialogController = useRenameListDialogController(model);
  const screenMenuButtonController = useScreenMenuButtonController(model);
  const removeAllBoughtProductsDialogController = useRemoveAllBoughtProductsDialogController(
    model,
  );
  const removeAllCategoryProductsDialogController = useRemoveAllCategoryProductsDialogController(
    model,
  );

  return {
    addCategoryDialogController,
    addUnitDialogController,
    editCategoryDialogController,
    editUnitDialogController,
    productsListController,
    removeAllProductsDialogController,
    removeProductDialogController,
    renameListDialogController,
    screenMenuButtonController,
    removeAllBoughtProductsDialogController,
    removeAllCategoryProductsDialogController,
  };
};
