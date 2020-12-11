import {SLService} from '../service-impl/SLService';
import {ObjectsValidator} from '../../../utils/common/service-utils/objects-validator/ObjectsValidator';
import SLServiceMethodResultValidators from './validators/returned-objects/SLServiceMethodResultValidators';
import {TestClass} from './test-classes/TestClass';

export class SLServiceDataValidatorWrapper extends SLService {
  #shoppingListService;
  #serviceDataValidator;
  // #testClass;

  constructor(shoppingListService) {
    super();
    this.#shoppingListService = shoppingListService;

    const serviceResultValidators = SLServiceMethodResultValidators;
    this.#serviceDataValidator = new ObjectsValidator(serviceResultValidators);

    // this.#testClass = new TestClass();
  }

  async init(): Promise<*> {
    await this.#shoppingListService.init();
  }

  async getCategories(): Promise<*> {
    // await this.#serviceDataValidator.validateMethod(this.#testClass.func_3);

    // return await this.#shoppingListService.getCategories();
    return await this.#serviceDataValidator.validateMethod(
      this.#shoppingListService.getCategories,
    );
  }

  async addCategory({name, color}: {name: *, color: *}): Promise<*> {
    return await this.#shoppingListService.addCategory({name, color});
  }

  async updateCategory({
    id,
    name,
    color,
  }: {
    id: *,
    name: *,
    color: *,
  }): Promise<*> {
    return await this.#shoppingListService.updateCategory({id, name, color});
  }

  async removeCategory({id}: {id: *}): Promise<*> {
    return await this.#shoppingListService.removeCategory({id});
  }

  async getUnits(): Promise<*> {
    return await this.#shoppingListService.getUnits();
  }

  async addUnit({name}: {name: *}): Promise<*> {
    return await this.#shoppingListService.addUnit({name});
  }

  async updateUnit({id, name}: {id: *, name: *}): Promise<*> {
    return await this.#shoppingListService.updateUnit({id, name});
  }

  async removeUnit({id}: {id: *}): Promise<*> {
    return await this.#shoppingListService.removeUnit({id});
  }

  async createShoppingList({
    listName,
    creator,
  }: {
    listName: *,
    creator: *,
  }): Promise<*> {
    return await this.#shoppingListService.createShoppingList({
      listName,
      creator,
    });
  }

  async removeShoppingList({id}: {id: *}): Promise<*> {
    return await this.#shoppingListService.removeShoppingList({id});
  }

  async renameShoppingList({id, newName}: {id: *, newName: *}): Promise<*> {
    return await this.#shoppingListService.renameShoppingList({id, newName});
  }

  async getShoppingLists(): Promise<*> {
    return await this.#shoppingListService.getShoppingLists();
  }

  async getProductsList({id}: {id: *}): Promise<*> {
    return await this.#shoppingListService.getProductsList({id});
  }

  async copyShoppingList({
    shoppingListId,
    copiedListName,
  }: {
    shoppingListId: *,
    copiedListName: *,
  }): Promise<*> {
    return await this.#shoppingListService.copyShoppingList({
      shoppingListId,
      copiedListName,
    });
  }

  async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    categoryId,
    onCreated,
    onConfirmed,
    onError,
  }: {
    shoppingListId: *,
    name: *,
    quantity: *,
    unitId: *,
    note: *,
    categoryId: *,
    onCreated: *,
    onConfirmed: *,
    onError: *,
  }): Promise<*> {
    return await this.#shoppingListService.addProduct({
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      categoryId,
      onCreated,
      onConfirmed,
      onError,
    });
  }

  async updateProduct({
    shoppingListId,
    productId,
    name,
    quantity,
    note,
    unitId,
    categoryId,
    onUpdated,
    onConfirmed,
    onError,
  }: {
    shoppingListId: *,
    productId: *,
    name: *,
    quantity: *,
    note: *,
    unitId: *,
    categoryId: *,
    onUpdated: *,
    onConfirmed: *,
    onError: *,
  }): Promise<*> {
    return await this.#shoppingListService.updateProduct({
      shoppingListId,
      productId,
      name,
      quantity,
      note,
      unitId,
      categoryId,
      onUpdated,
      onConfirmed,
      onError,
    });
  }

  async changeProductStatus({
    shoppingListId,
    productId,
    status,
    onChanged,
    onConfirmed,
    onError,
  }: {
    shoppingListId: *,
    productId: *,
    status: *,
    onChanged: *,
    onConfirmed: *,
    onError: *,
  }): Promise<*> {
    return await this.#shoppingListService.changeProductStatus({
      shoppingListId,
      productId,
      status,
      onChanged,
      onConfirmed,
      onError,
    });
  }

  async changeMultipleProductsStatus({
    shoppingListId,
    productsIdsArray,
    status,
    onChanged,
    onConfirmed,
    onError,
  }: {
    shoppingListId: *,
    productsIdsArray: *,
    status: *,
    onChanged: *,
    onConfirmed: *,
    onError: *,
  }): Promise<*> {
    return await this.#shoppingListService.changeMultipleProductsStatus({
      shoppingListId,
      productsIdsArray,
      status,
      onChanged,
      onConfirmed,
      onError,
    });
  }

  async removeProduct({
    shoppingListId,
    productId,
    onRemoved,
    onConfirmed,
    onError,
  }: {
    shoppingListId: *,
    productId: *,
    onRemoved: *,
    onConfirmed: *,
    onError: *,
  }): Promise<*> {
    return await this.#shoppingListService.removeProduct({
      shoppingListId,
      productId,
      onRemoved,
      onConfirmed,
      onError,
    });
  }

  async removeMultipleProducts({
    shoppingListId,
    productsIdsArray,
    onRemoved,
    onConfirmed,
    onError,
  }: {
    shoppingListId: *,
    productsIdsArray: *,
    onRemoved: *,
    onConfirmed: *,
    onError: *,
  }): Promise<*> {
    return await this.#shoppingListService.removeMultipleProducts({
      shoppingListId,
      productsIdsArray,
      onRemoved,
      onConfirmed,
      onError,
    });
  }
}
