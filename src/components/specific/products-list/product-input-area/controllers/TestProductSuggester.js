import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';

export class TestProductSuggester {
  static suggest() {
    SystemEventsHandler.onInfo({info: 'TestProductSuggester->suggest()'});

    const v0Products = [];
    const v1Products = ['h'];
    const v2Products = ['h', 'x'];
    const v3Products = ['h', 'x', 'a'];

    const currentList = {
      id: 5,
      name: 'Current list',
      products: v0Products,
    };

    const {shoppingLists} = this.getData();

    // ===

    // ===
  }

  static getData() {
    const firstShoppingList = {
      id: 1,
      name: 'First Shopping List',
      products: [],
    };
    const secondShoppingList = {
      id: 2,
      name: 'Second Shopping List',
      products: [],
    };
    const thirdShoppingList = {
      id: 3,
      name: 'Third Shopping List',
      products: [],
    };

    const fProduct_1 = {
      id: 1,
      parentListId: 1,
      name: 'a',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };
    const fProduct_2 = {
      id: 2,
      parentListId: 1,
      name: 'b',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };
    const fProduct_3 = {
      id: 3,
      parentListId: 1,
      name: 'c',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };
    const fProduct_4 = {
      id: 11,
      parentListId: 1,
      name: 'd',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };

    const sProduct_1 = {
      id: 4,
      parentListId: 2,
      name: 'e',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: 'Note Prod',
    };
    const sProduct_2 = {
      id: 5,
      parentListId: 2,
      name: 'f',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: 'Another note',
    };
    const sProduct_3 = {
      id: 6,
      parentListId: 2,
      name: 'a',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };
    const sProduct_4 = {
      id: 7,
      parentListId: 2,
      name: 'c',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: 'No product note',
    };
    const sProduct_5 = {
      id: 12,
      parentListId: 2,
      name: 'g',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };
    const sProduct_6 = {
      id: 13,
      parentListId: 2,
      name: 'k',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };

    const tProduct_1 = {
      id: 14,
      parentListId: 3,
      name: 'z',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: 'Note Prod',
    };
    const tProduct_2 = {
      id: 15,
      parentListId: 3,
      name: 'x',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: 'Another note',
    };
    const tProduct_3 = {
      id: 16,
      parentListId: 3,
      name: 'c',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };
    const tProduct_4 = {
      id: 17,
      parentListId: 3,
      name: 'y',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: 'No product note',
    };
    const tProduct_5 = {
      id: 18,
      parentListId: 3,
      name: 'm',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };
    const tProduct_6 = {
      id: 19,
      parentListId: 3,
      name: 'k',
      unitId: 1,
      quantity: 1,
      categoryId: 1,
      note: '',
    };

    firstShoppingList.products.push(
      fProduct_1,
      fProduct_2,
      fProduct_3,
      fProduct_4,
    );
    secondShoppingList.products.push(
      sProduct_1,
      sProduct_2,
      sProduct_3,
      sProduct_4,
      sProduct_5,
      sProduct_6,
    );
    thirdShoppingList.products.push(
      tProduct_1,
      tProduct_2,
      tProduct_3,
      tProduct_4,
      tProduct_5,
      tProduct_6,
    );

    return {
      shoppingLists: [firstShoppingList, secondShoppingList, thirdShoppingList],
    };
  }
}
