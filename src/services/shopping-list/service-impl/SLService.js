export class SLService {
  async init() {}
  async getCategories() {}
  async addCategory({name, color}) {}
  async updateCategory({id, name, color}) {}
  async removeCategory({id}) {}
  async getUnits() {}
  async addUnit({name}) {}
  async updateUnit({id, name}) {}
  async removeUnit({id}) {}
  async createShoppingList({listName, creator}) {}
  async removeShoppingList({id}) {}
  async renameShoppingList({id, newName}) {}
  async getShoppingLists() {}
  async getProductsList({id}) {}
  async copyShoppingList({shoppingListId, copiedListName}) {}
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
  }) {}
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
  }) {}
  async changeProductStatus({
    shoppingListId,
    productId,
    status,
    onChanged,
    onConfirmed,
    onError,
  }) {}
  async changeMultipleProductsStatus({
    shoppingListId,
    productsIdsArray,
    status,
    onChanged,
    onConfirmed,
    onError,
  }) {}
  async removeProduct({
    shoppingListId,
    productId,
    onRemoved,
    onConfirmed,
    onError,
  }) {}
  async removeMultipleProducts({
    shoppingListId,
    productsIdsArray,
    onRemoved,
    onConfirmed,
    onError,
  }) {}
}
