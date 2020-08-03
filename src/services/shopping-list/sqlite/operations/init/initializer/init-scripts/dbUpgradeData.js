import {
  CATEGORIES_TABLE,
  CATEGORIES_TABLE_COLOR,
  CATEGORIES_TABLE_CREATE_TIMESTAMP,
  CATEGORIES_TABLE_DELETED,
  CATEGORIES_TABLE_EDITABLE,
  CATEGORIES_TABLE_ID,
  CATEGORIES_TABLE_NAME,
  CATEGORIES_TABLE_UPDATE_TIMESTAMP,
} from '../../../../tables/categoriesTable';
import {
  UNITS_TABLE,
  UNITS_TABLE_CREATE_TIMESTAMP,
  UNITS_TABLE_DELETED,
  UNITS_TABLE_EDITABLE,
  UNITS_TABLE_ID,
  UNITS_TABLE_UNIT_NAME,
  UNITS_TABLE_UPDATE_TIMESTAMP,
} from '../../../../tables/unitsTable';
import {
  SHOPPING_LISTS_TABLE,
  SHOPPING_LISTS_TABLE_ID,
  SHOPPING_LISTS_TABLE_LIST_NAME,
  SHOPPING_LISTS_TABLE_TOTAL_ITEMS,
  SHOPPING_LISTS_TABLE_COMPLETED_ITEMS,
  SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP,
  SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP,
  SHOPPING_LISTS_TABLE_CREATOR,
} from '../../../../tables/shoppingListsTable';
import {
  PRODUCTS_TABLE,
  PRODUCTS_TABLE_ID,
  PRODUCTS_TABLE_PARENT_LIST_ID,
  PRODUCTS_TABLE_PRODUCT_NAME,
  PRODUCTS_TABLE_UNIT_ID,
  PRODUCTS_TABLE_PRODUCT_COUNT,
  PRODUCTS_TABLE_CATEGORY_ID,
  PRODUCTS_TABLE_NOTE,
  PRODUCTS_TABLE_COMPLETION_STATUS,
  PRODUCTS_TABLE_CREATE_TIMESTAMP,
  PRODUCTS_TABLE_UPDATE_TIMESTAMP,
} from '../../../../tables/productsTable';

const dbUpgradeData = {
  actualVersion: '1',
  versions: {
    v1: {
      upgradeScripts: [
        'CREATE TABLE IF NOT EXISTS ' +
          CATEGORIES_TABLE +
          ' ' +
          '(' +
          CATEGORIES_TABLE_ID +
          ' INTEGER PRIMARY KEY NOT NULL, ' +
          CATEGORIES_TABLE_NAME +
          ' TEXT NOT NULL, ' +
          CATEGORIES_TABLE_COLOR +
          ' TEXT NOT NULL, ' +
          CATEGORIES_TABLE_EDITABLE +
          ' INTEGER NOT NULL, ' +
          CATEGORIES_TABLE_DELETED +
          ' INTEGER NOT NULL, ' +
          CATEGORIES_TABLE_CREATE_TIMESTAMP +
          ' INTEGER NOT NULL, ' +
          CATEGORIES_TABLE_UPDATE_TIMESTAMP +
          ' INTEGER NOT NULL)',

        'CREATE TABLE IF NOT EXISTS ' +
          UNITS_TABLE +
          ' ' +
          '(' +
          UNITS_TABLE_ID +
          ' INTEGER PRIMARY KEY NOT NULL, ' +
          UNITS_TABLE_UNIT_NAME +
          ' TEXT NOT NULL, ' +
          UNITS_TABLE_EDITABLE +
          ' INTEGER NOT NULL, ' +
          UNITS_TABLE_DELETED +
          ' INTEGER NOT NULL, ' +
          UNITS_TABLE_CREATE_TIMESTAMP +
          ' INTEGER NOT NULL, ' +
          UNITS_TABLE_UPDATE_TIMESTAMP +
          ' INTEGER NOT NULL)',

        'CREATE TABLE IF NOT EXISTS ' +
          SHOPPING_LISTS_TABLE +
          ' (' +
          SHOPPING_LISTS_TABLE_ID +
          ' INTEGER PRIMARY KEY NOT NULL, ' +
          SHOPPING_LISTS_TABLE_CREATOR +
          ' TEXT NOT_NULL, ' +
          SHOPPING_LISTS_TABLE_LIST_NAME +
          ' TEXT NOT NULL, ' +
          SHOPPING_LISTS_TABLE_TOTAL_ITEMS +
          ' INTEGER NOT NULL, ' +
          SHOPPING_LISTS_TABLE_COMPLETED_ITEMS +
          ' INTEGER NOT NULL, ' +
          SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP +
          ' INTEGER NOT NULL, ' +
          SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP +
          ' INTEGER NOT NULL)',

        'CREATE TABLE IF NOT EXISTS ' +
          PRODUCTS_TABLE +
          ' (' +
          PRODUCTS_TABLE_ID +
          ' INTEGER PRIMARY KEY NOT NULL, ' +
          PRODUCTS_TABLE_PARENT_LIST_ID +
          ' INTEGER, ' +
          PRODUCTS_TABLE_PRODUCT_NAME +
          ' TEXT, ' +
          PRODUCTS_TABLE_UNIT_ID +
          ' INTEGER, ' +
          PRODUCTS_TABLE_PRODUCT_COUNT +
          ' INTEGER, ' +
          PRODUCTS_TABLE_CATEGORY_ID +
          ' INTEGER, ' +
          PRODUCTS_TABLE_NOTE +
          ' TEXT, ' +
          PRODUCTS_TABLE_COMPLETION_STATUS +
          ' TEXT, ' +
          PRODUCTS_TABLE_CREATE_TIMESTAMP +
          ' INTEGER NOT NULL, ' +
          PRODUCTS_TABLE_UPDATE_TIMESTAMP +
          ' INTEGER NOT NULL)',
      ],
    },
  },
};

// const dbUpgradeData = {
//   actualVersion: '2',
//   versions: {
//     v1: {
//       upgradeScripts: [
//         'V1_FIRST_UPGRADE_SCRIPT',
//         'V1_SECOND_UPGRADE_SCRIPT',
//         'V1_THIRD_UPGRADE_SCRIPT',
//       ],
//     },
//     v2: {
//       upgradeScripts: ['V2_FIRST_UPGRADE_SCRIPT', 'V2_SECOND_UPGRADE_SCRIPT'],
//     },
//     v3: {
//       upgradeScripts: ['V3_FIRST_UPGRADE_SCRIPT'],
//     },
//     v4: {
//       upgradeScripts: ['V4_FIRST_UPGRADE_SCRIPT'],
//     },
//   },
// };

export default dbUpgradeData;
